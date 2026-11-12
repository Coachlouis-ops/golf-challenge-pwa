"use client";

import { useRouter } from "next/navigation";

export default function SiteFooter() {
  const router = useRouter();

  return (
    <footer className="relative overflow-hidden border-t border-blue-400/20 bg-[#020817] px-6 py-14 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-lg font-black uppercase tracking-[0.18em] text-white drop-shadow-[0_0_14px_rgba(0,170,255,0.8)]">
            TEEZ GOLF CHALLENGES
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-blue-300">
            Play With Purpose
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Developed and Managed by Honey Badger Technologies (PTY) LTD
          </p>
        </div>

        <div className="mb-10 text-center text-xs leading-6 text-slate-400">
          <p className="font-bold uppercase tracking-[0.14em] text-slate-200">
            Contact Teez Golf Challenges
          </p>

          <p className="mt-2">admin@teezgolfchallenges.com</p>

          <p>info@honeybadgertechnologies.com</p>

          <p>Tel No: +27 63 650 1619</p>

          <p>
            71 Silver Stream, Silver Lakes, Silver Lakes Road, Pretoria, South
            Africa, 0081
          </p>
        </div>

        <div className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-3 text-center text-[10px] uppercase tracking-[0.08em] text-slate-400">
          <button
            onClick={() => router.push("/legal/terms")}
            className="transition hover:text-blue-300"
          >
            Website Terms & Conditions
          </button>

          <button
            onClick={() => router.push("/terms")}
            className="transition hover:text-blue-300"
          >
            Platform Terms & Conditions
          </button>

          <button
            onClick={() => router.push("/legal/payment-policy")}
            className="transition hover:text-blue-300"
          >
            Payment & Subscription Policy
          </button>

          <button
            onClick={() => router.push("/legal/refund-policy")}
            className="transition hover:text-blue-300"
          >
            Refund, Cancellation & Delivery Policy
          </button>

          <button
            onClick={() => router.push("/privacy")}
            className="transition hover:text-blue-300"
          >
            Privacy Policy
          </button>

          <button
            onClick={() => router.push("/legal/cookie-policy")}
            className="transition hover:text-blue-300"
          >
            Cookie Policy
          </button>

          <button
            onClick={() => router.push("/legal/acceptable-use")}
            className="transition hover:text-blue-300"
          >
            Acceptable Use Policy
          </button>

          <button
            onClick={() => router.push("/legal/community-rules")}
            className="transition hover:text-blue-300"
          >
            Community & Competition Rules
          </button>

          <button
            onClick={() => router.push("/contact")}
            className="transition hover:text-blue-300"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://facebook.com/profile.php?id=61575742530808"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/10 shadow-[0_0_14px_rgba(0,170,255,0.25)] transition hover:scale-110 hover:border-blue-300 hover:shadow-[0_0_22px_rgba(0,170,255,0.65)]"
          >
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54v1.85H16l-.4 2.88h-2.21v6.99A10 10 0 0 0 22 12z" />
            </svg>
          </a>

          <a
            href="https://www.youtube.com/@TEEZGOLFCHALLENGES"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/10 shadow-[0_0_14px_rgba(0,170,255,0.25)] transition hover:scale-110 hover:border-blue-300 hover:shadow-[0_0_22px_rgba(0,170,255,0.65)]"
          >
            <svg width="19" height="19" fill="white" viewBox="0 0 24 24">
              <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C17.8 2.5 12 2.5 12 2.5s-5.8 0-8.6.3c-.4.1-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S.3 8.2.3 10.2v1.6c0 2 .2 4 .2 4s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.7.2 7.3.3 7.3.3s5.8 0 8.6-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-2 .2-4v-1.6c0-2-.2-4-.2-4zM9.8 14.7V7.9l6.4 3.4-6.4 3.4z" />
            </svg>
          </a>

          <a
            href="https://www.tiktok.com/@teez.golf.challen"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/10 shadow-[0_0_14px_rgba(0,170,255,0.25)] transition hover:scale-110 hover:border-blue-300 hover:shadow-[0_0_22px_rgba(0,170,255,0.65)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M9 3v12.5a2.5 2.5 0 1 1-2.5-2.5H8V9H6.5A6.5 6.5 0 1 0 13 15.5V8.5c1.1 1 2.6 1.5 4 1.5V6.5c-1.6 0-3-1.3-3-3H9z" />
            </svg>
          </a>

          <a
            href="https://instagram.com/teezgolfchallenges"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/10 shadow-[0_0_14px_rgba(0,170,255,0.25)] transition hover:scale-110 hover:border-blue-300 hover:shadow-[0_0_22px_rgba(0,170,255,0.65)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 4.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8zm6.5-.3a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2zM12 9.3A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3z" />
            </svg>
          </a>
        </div>

        <div className="mt-10 border-t border-blue-400/10 pt-6 text-center">
          <p className="text-[9px] uppercase tracking-[0.16em] text-slate-600">
            TEEZ GOLF CHALLENGES · HONEY BADGER TECHNOLOGIES
          </p>
        </div>
      </div>
    </footer>
  );
}
