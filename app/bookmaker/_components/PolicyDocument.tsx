import Link from "next/link";
import type { ReactNode } from "react";

import {
  bookmakerPolicies,
  bookmakerPolicyUpdated,
} from "@/app/bookmaker/policies";

const textLinkClass =
  "text-green-400 underline decoration-green-400/60 underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff88]";

export function PolicyDocument({
  currentHref,
  title,
  summary,
  children,
}: {
  currentHref: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  const otherPolicies = bookmakerPolicies.filter(
    (policy) => policy.href !== currentHref
  );

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <header className="sticky top-0 z-20 border-b border-cyan-400/25 bg-[#020817]/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/register"
            className="inline-flex items-center rounded-full border border-cyan-300/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff88]"
          >
            Back
          </Link>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00ff88] sm:text-xs">
            18+ only
          </p>
        </div>
      </header>

      <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-xs">
          ABC Bookmakers
        </p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
          {summary}
        </p>
        <p className="mt-3 text-xs leading-5 text-gray-400 sm:text-sm">
          Applies from {bookmakerPolicyUpdated}. TEEZ Golf Challenges is the
          golf game offered on your ABC Bookmakers player account.
        </p>

        <div className="mt-8 space-y-8 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
          {children}
        </div>

        <nav
          aria-label="Other ABC Bookmakers policies"
          className="mt-12 border-t border-cyan-400/20 pt-8"
        >
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Other ABC Bookmakers policies
          </h2>
          <ul className="mt-4 space-y-3">
            {otherPolicies.map((policy) => (
              <li key={policy.href}>
                <Link href={policy.href} className={textLinkClass}>
                  {policy.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/register" className={textLinkClass}>
              Back to register
            </Link>
          </p>
        </nav>
      </article>
    </main>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function PolicyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-cyan-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={textLinkClass}>
      {children}
    </a>
  );
}
