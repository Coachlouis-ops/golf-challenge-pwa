
"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function HomePage() {
  const router = useRouter();
  const [showCookies, setShowCookies] = React.useState(false);

  // ================= COOKIE LOAD =================
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cookie_consent");
      if (!stored) {
        setShowCookies(true);
      }
    }
  }, []);

  // ================= ACCEPT ALL =================
  const acceptCookies = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie_consent", JSON.stringify(consent));
    setShowCookies(false);
  };

  // ================= REJECT NON-ESSENTIAL =================
  const rejectCookies = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie_consent", JSON.stringify(consent));
    setShowCookies(false);
  };

  // ================= EXIT =================
  const handleExit = () => {
    if (typeof window !== "undefined") {
      window.open("", "_self");
      window.close();

      // fallback if blocked
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
  };

  return (
    <main className="bg-black text-white">
{/* ================= HEADER ================= */}
<header className="w-full bg-[#07110d] px-4 py-3 text-white">

  {/* BRAND */}
  <div className="text-center">
    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-green-400">
      TEEZ GOLF CHALLENGES
    </p>

    <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-gray-500">
      A Honey Badger Technologies Platform
    </p>
  </div>

  {/* INTERNATIONAL GOLF STRIP */}
  <div className="mt-3 border-y border-white/10 py-2">
    <div className="flex items-center justify-center gap-2">
      <span className="text-base">🇺🇸</span>
      <span className="text-base">🇬🇧</span>
      <span className="text-base">🇿🇦</span>
      <span className="text-base">🇦🇺</span>
      <span className="text-base">🇯🇵</span>
      <span className="text-base">🇦🇪</span>
      <span className="text-base">🇪🇺</span>
    </div>

    <p className="mt-1 text-center text-[8px] font-bold uppercase tracking-[0.22em] text-gray-400">
      Global Golf Competition Platform
    </p>
  </div>

  {/* ACTION / SOCIAL ROW */}
  <div className="mt-3 flex items-center justify-between">

    <button
      onClick={handleExit}
      className="border border-red-500/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-red-400"
    >
      Exit
    </button>

    <div className="flex items-center gap-2">

      {/* FACEBOOK */}
      <a
        href="https://facebook.com/profile.php?id=61575742530808"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]"
      >
        <svg
          width="15"
          height="15"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54v1.85H16l-.4 2.88h-2.21v6.99A10 10 0 0 0 22 12z" />
        </svg>
      </a>

      {/* YOUTUBE */}
      <a
        href="https://youtube.com/teezgolfchallenges"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]"
      >
        <svg
          width="16"
          height="16"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C17.8 2.5 12 2.5 12 2.5s-5.8 0-8.6.3c-.4.1-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S.3 8.2.3 10.2v1.6c0 2 .2 4 .2 4s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.7.2 7.3.3 7.3.3s5.8 0 8.6-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-2 .2-4v-1.6c0-2-.2-4-.2-4zM9.8 14.7V7.9l6.4 3.4-6.4 3.4z" />
        </svg>
      </a>

      {/* TIKTOK */}
      <a
        href="https://tiktok.com/teezgolfchallenges"
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M9 3v12.5a2.5 2.5 0 1 1-2.5-2.5H8V9H6.5A6.5 6.5 0 1 0 13 15.5V8.5c1.1 1 2.6 1.5 4 1.5V6.5c-1.6 0-3-1.3-3-3H9z" />
        </svg>
      </a>

      {/* INSTAGRAM */}
      <a
        href="https://instagram.com/teezgolfchallenges"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 4.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8zm6.5-.3a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2zM12 9.3A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3z" />
        </svg>
      </a>

    </div>
  </div>

  {/* COMPACT CONTACT */}
  <div className="mt-3 text-center">
    <p className="text-[9px] text-gray-500">
      Global Platform
    </p>

    <p className="mt-1 text-[9px] text-gray-400">
      admin@teezgolfchallenges.com · +27 63 650 1619
    </p>
  </div>

</header>

  {/* ================= MAIN HERO / ACTION AREA ================= */}
<section className="relative overflow-hidden bg-[#020817] px-6 pb-10 pt-2 text-center text-white">

  {/* BLUE BACKGROUND GLOW */}
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />

  <div className="relative z-10 mx-auto max-w-4xl">


    {/* MAIN HEADING */}
    <h2 className="text-3xl font-black uppercase tracking-[0.08em] text-white drop-shadow-[0_0_18px_rgba(0,170,255,0.95)] md:text-5xl">
      ONLY FOR THE PASSIONATE
    </h2>

    <p className="mt-4 text-base font-semibold tracking-[0.12em] text-slate-300 md:text-lg">
      Join. Grow. Experience.
    </p>

       {/* MAIN BUTTONS */}
    <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4">

      <button
        onClick={() => router.push("/how-teez-works")}
        className="h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:scale-[1.03] hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(0,170,255,0.95)] animate-pulse"
      >
        HOW TEEZ WORKS
      </button>

      <button
        onClick={() => router.push("/login")}
        className="h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:scale-[1.03] hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(0,170,255,0.95)] animate-pulse"
      >
        LOGIN
      </button>

      <button
        onClick={() => router.push("/register")}
        className="h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:scale-[1.03] hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(0,170,255,0.95)] animate-pulse"
      >
        JOIN US
      </button>

      <button
        onClick={() => router.push("/dashboard")}
        className="h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:scale-[1.03] hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(0,170,255,0.95)] animate-pulse"
      >
        VIEW PLAYER DASHBOARD
      </button>

      <button
       onClick={() => router.push("/teez-scoring/scoring-info")}
        className="h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:scale-[1.03] hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(0,170,255,0.95)] animate-pulse"
      >
        GOLF SCORING SYSTEMS
      </button>

    <button
  type="button"
  onClick={() => router.push("/teez-finals")}
  className="h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 px-3 text-center text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:bg-blue-500/20 animate-pulse sm:text-sm sm:tracking-[0.16em]"
>
  TEEZ FINALS - "RACE TO" EVENTS
</button>

    </div>

  </div>
</section>




{/* ================= BADGER HERO IMAGE ================= */}
<section className="w-full overflow-hidden bg-[#020817]">
  <img
    src="/hero_main2.png"
    className="h-[600px] w-full object-cover object-center md:h-auto"
    alt="Teez Badger"
  />
</section>
      
  {/* ================= FOOTER ================= */}
<footer className="relative overflow-hidden border-t border-blue-400/20 bg-[#020817] px-6 py-14 text-white">

  {/* BACKGROUND GLOW */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

  <div className="relative z-10 mx-auto max-w-6xl">

    {/* BRAND */}
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

    {/* CONTACT */}
    <div className="mb-10 text-center text-xs leading-6 text-slate-400">
      <p className="font-bold uppercase tracking-[0.14em] text-slate-200">
        Contact Teez Golf Challenges
      </p>

      <p className="mt-2">
        admin@teezgolfchallenges.com
      </p>

      <p>
        info@honeybadgertechnologies.com
      </p>

      <p>
        Tel No: +27 63 650 1619
      </p>

      <p>
        71 Silver Stream, Silver Lakes, Silver Lakes Road, Pretoria, South Africa, 0081 
      </p>
    </div>

    {/* LEGAL LINKS */}
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

    {/* SOCIAL ICONS */}
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
        href="https://youtube.com/teezgolfchallenges"
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
        href="https://tiktok.com/teezgolfchallenges"
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

      {/* ================= COOKIE BANNER ================= */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white px-6 py-4 z-50 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-300 text-center md:text-left">
              We use cookies to improve your experience, analyze traffic, and
              support marketing. By clicking accept, you agree to our use of
              cookies.
            </p>

           <div className="flex gap-3 flex-wrap justify-center">
  <button
    type="button"
    onClick={acceptCookies}
    className="bg-green-400 text-black px-4 py-2 rounded text-xs font-semibold hover:scale-105 transition"
  >
    Accept All
  </button>

  <button
    type="button"
    onClick={rejectCookies}
    className="border border-white px-4 py-2 rounded text-xs hover:bg-white hover:text-black transition"
  >
    Reject Non-Essential
  </button>

  <button
    type="button"
    onClick={() => router.push("/legal/cookie-policy")}
    className="underline text-xs text-gray-300 hover:text-white transition"
  >
    Cookie Policy
  </button>
</div>
          </div>
        </div>
      )}
    </main>
  );
}


