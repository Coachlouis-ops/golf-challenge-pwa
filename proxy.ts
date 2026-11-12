import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Site-wide under-construction gate.
 * Next.js 16 runs this file as the request proxy (the successor to middleware).
 *
 * Public page requests are served this maintenance document with HTTP 503.
 * Public API routes are refused with 503, except the payment webhooks listed
 * below. Static files and /_next stay available so the page, icons, and
 * manifests still load.
 *
 * Owner bypass: GET /?preview=<SITE_BYPASS_TOKEN> sets an httpOnly Secure
 * cookie. Later requests from that browser skip the gate. If
 * SITE_BYPASS_TOKEN is unset or blank, the cookie is never issued and any
 * existing cookie is ignored.
 */

const BYPASS_COOKIE = "teez_site_bypass";
const BYPASS_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const RETRY_AFTER_SECONDS = "86400";

const MAINTENANCE_MESSAGE =
  "TEEZ Golf Challenges is under construction. We'll be back soon!";

const WEBHOOK_PATHS = new Set([
  "/api/peach/webhook",
  "/api/stripe-webhook",
  "/api/payfast-notify",
]);

const STATIC_EXTENSION =
  /\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff|woff2|ttf|webmanifest|json|pdf)$/i;

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <meta name="theme-color" content="#020817" />
  <title>${MAINTENANCE_MESSAGE}</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #020817;
      color: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background:
        linear-gradient(to bottom, rgba(1, 6, 18, 0.18) 0%, rgba(2, 8, 23, 0.28) 38%, rgba(2, 8, 23, 0.82) 72%, rgba(2, 8, 23, 0.98) 100%),
        radial-gradient(circle at center, rgba(0, 153, 255, 0.16), transparent 62%),
        rgba(0, 0, 0, 0.35),
        url("/logo.png") center / cover no-repeat,
        #020817;
    }
    main {
      position: relative;
      z-index: 1;
      width: min(100%, 40rem);
      padding: max(24px, env(safe-area-inset-top)) 24px max(24px, env(safe-area-inset-bottom));
      text-align: center;
    }
    .logo {
      position: relative;
      display: inline-block;
    }
    .logo::before {
      content: "";
      position: absolute;
      inset: -18%;
      border-radius: 999px;
      background: rgba(0, 153, 255, 0.22);
      filter: blur(36px);
    }
    img {
      position: relative;
      width: min(220px, 62vw);
      height: auto;
      filter: drop-shadow(0 0 28px rgba(0, 153, 255, 0.8));
    }
    p {
      margin: 28px auto 0;
      max-width: 34rem;
      font-size: clamp(1.05rem, 2.5vw, 1.45rem);
      font-weight: 800;
      letter-spacing: 0.03em;
      line-height: 1.45;
      text-shadow: 0 0 22px rgba(0, 153, 255, 0.75);
    }
  </style>
</head>
<body>
  <div class="backdrop" aria-hidden="true"></div>
  <main>
    <div class="logo">
      <img src="/transparent.png" alt="" />
    </div>
    <p>${MAINTENANCE_MESSAGE}</p>
  </main>
</body>
</html>
`;

function readBypassToken(): string | null {
  const raw = process.env.SITE_BYPASS_TOKEN;
  if (typeof raw !== "string") return null;
  const token = raw.trim();
  return token.length > 0 ? token : null;
}

function secretsMatch(provided: string, expected: string): boolean {
  const left = createHash("sha256").update(provided, "utf8").digest();
  const right = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(left, right);
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

function isStaticAsset(pathname: string): boolean {
  if (pathname.startsWith("/_next/")) return true;
  if (pathname === "/favicon.ico") return true;
  if (
    pathname === "/manifest.json" ||
    pathname === "/site.webmanifest" ||
    pathname === "/icons" ||
    pathname.startsWith("/icons/")
  ) {
    return true;
  }
  if (pathname === "/api" || pathname.startsWith("/api/")) return false;
  return STATIC_EXTENSION.test(pathname);
}

function isWebhook(pathname: string): boolean {
  return WEBHOOK_PATHS.has(pathname);
}

function maintenanceHeaders(contentType: string): Headers {
  return new Headers({
    "Content-Type": contentType,
    "Retry-After": RETRY_AFTER_SECONDS,
    "X-Robots-Tag": "noindex",
    "Cache-Control": "no-store",
    Vary: "Cookie",
  });
}

function maintenancePage(): NextResponse {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: maintenanceHeaders("text/html; charset=utf-8"),
  });
}

function maintenanceApi(): NextResponse {
  return NextResponse.json(
    { error: MAINTENANCE_MESSAGE },
    {
      status: 503,
      headers: maintenanceHeaders("application/json; charset=utf-8"),
    }
  );
}

function grantBypass(request: NextRequest, token: string): NextResponse {
  const destination = request.nextUrl.clone();
  destination.searchParams.delete("preview");

  const response = NextResponse.redirect(destination);
  response.cookies.set({
    name: BYPASS_COOKIE,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: BYPASS_MAX_AGE_SECONDS,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function proxy(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname);
  const token = readBypassToken();

  if (token && pathname === "/") {
    const preview = request.nextUrl.searchParams.get("preview");
    if (preview !== null && secretsMatch(preview.trim(), token)) {
      return grantBypass(request, token);
    }
  }

  if (token) {
    const cookie = request.cookies.get(BYPASS_COOKIE)?.value;
    if (cookie && secretsMatch(cookie.trim(), token)) {
      return NextResponse.next();
    }
  }

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (isWebhook(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return maintenanceApi();
  }

  return maintenancePage();
}

export const config = {
  matcher: [
    "/((?!_next/|favicon.ico|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff|woff2|ttf|webmanifest|json|pdf)$).*)",
  ],
};
