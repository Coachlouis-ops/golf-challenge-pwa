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
    <header className="w-full bg-black px-4 py-3 flex flex-col gap-3">

  {/* TOP ROW */}
  <div className="flex items-center justify-between">

    {/* LEFT */}
    <button
      onClick={handleExit}
      className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs"
    >
      Exit
    </button>

    {/* SOCIALS */}
    <div className="flex items-center gap-3">

      <a href="https://facebook.com/profile.php?id=61575742530808" target="_blank">
        <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54v1.85H16l-.4 2.88h-2.21v6.99A10 10 0 0 0 22 12z"/>
        </svg>
      </a>

      <a href="https://youtube.com/teezgolfchallenges" target="_blank">
        <svg width="18" height="18" fill="#FF0000" viewBox="0 0 24 24">
          <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C17.8 2.5 12 2.5 12 2.5h0s-5.8 0-8.6.3c-.4.1-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S.3 8.2.3 10.2v1.6c0 2 .2 4 .2 4s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.7.2 7.3.3 7.3.3s5.8 0 8.6-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-2 .2-4v-1.6c0-2-.2-4-.2-4zM9.8 14.7V7.9l6.4 3.4-6.4 3.4z"/>
        </svg>
      </a>

      <a href="https://tiktok.com/teezgolfchallenges" target="_blank">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#25F4EE" d="M9 3v12.5a2.5 2.5 0 1 1-2.5-2.5H8V9H6.5A6.5 6.5 0 1 0 13 15.5V8.5c1.1 1 2.6 1.5 4 1.5V6.5c-1.6 0-3-1.3-3-3H9z"/>
        </svg>
      </a>

      <a href="https://instagram.com/teezgolfchallenges" target="_blank">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#feda75"/>
              <stop offset="50%" stopColor="#d62976"/>
              <stop offset="100%" stopColor="#4f5bd5"/>
            </linearGradient>
          </defs>
          <path fill="url(#ig)" d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7z"/>
        </svg>
      </a>

    </div>
  </div>

  {/* SHOP BUTTON */}
  <div className="flex justify-center">
    <button
      onClick={() => router.push("/honeybadgergolfshop")}
      className="px-6 py-2 rounded-xl text-sm font-semibold 
      bg-cyan-400 text-black 
      shadow-[0_0_20px_rgba(34,211,238,1)] 
      animate-pulse hover:scale-110 transition"
    >
      Honey Badger Golf Shop
    </button>
  </div>

  {/* CONTACT */}
  <div className="flex justify-center">
    <button
      onClick={() => router.push("/contact")}
      className="bg-white text-black px-4 py-1 text-xs rounded"
    >
      Contact
    </button>
  </div>

</header>

      {/* ================= HERO ================= */}
      <section className="w-full">
        <img
          src="/hero_main.png"
          className="w-full h-auto object-cover"
          alt="Teez Hero"
        />
      </section>

      {/* ================= WALLET SECTION ================= */}
      <section className="bg-gray-100 text-black text-center py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            The Worlds Only On-Line Golf Competition Platform
          </h2>

          <p className="text-gray-600 mb-8">
            Join the Teez Golf Challenge for exciting competitions.<br />
            Compete. Win. Elevate your game.
          </p>

          <p className="text-xs text-gray-500 mb-6 max-w-xl mx-auto">
            Teez Golf Challenges is operated by Honey Badger Technologies PTY LTD. 
            All payments are made to Honey Badger Technologies PTY LTD registration and competition participation access to challenges. 
            Payments are non-refundable & non-transferable.
          </p>

         <div className="flex flex-col items-center gap-4">

  <div className="flex justify-center gap-4 flex-wrap">

             <button
  onClick={() => router.push("/app")}
  className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.8)] hover:scale-105 transition"
>
  REGISTER
</button>

<button
  onClick={() => router.push("/app")}
  className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.8)] hover:scale-105 transition"
>
  LOGIN
</button>

            </div>

            <button
  onClick={() => router.push("/how-it-works")}
  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
>
  HOW IT WORKS
</button>

          </div>

        </div>
      </section>

      {/* ================= BADGER IMAGE ================= */}
      <section className="py-16 px-6 flex justify-center">
        <img
          src="/hero_main2.png"
          className="w-full max-w-5xl object-contain"
          alt="Teez Badger"
        />
      </section>

      {/* ================= STORY SECTION ================= */}
      <section className="bg-gray-100 text-black text-center py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            The original game of golf was never a scorecard — it was a challenge between players.
          </h2>

          <p className="text-gray-600 mb-8">
            Golf dates back to at least 1457 in Scotland, where it was played as a direct contest between players.
          </p>

          <button
            onClick={() => router.push("/app")}
            className="bg-green-400 text-black px-8 py-3 rounded-full font-semibold animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.8)] hover:scale-105 transition"
          >
            Join Now
          </button>

        </div>
      </section>


            {/* ================= ABOUT US ================= */}
      <section className="bg-white text-black py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ABOUT TEEZ GOLF CHALLENGES
            </h2>

            <div className="w-24 h-1 bg-green-400 mx-auto rounded-full" />
          </div>

          <div className="space-y-8 text-gray-700 text-base md:text-lg leading-8">

            <p>
              Teez Golf Challenges is built around the original essence of golf — 
              competition between players, where every round matters and every match has a winner.
            </p>

            <p>
              Golf was never meant to be played only against the course. 
              At its core, it is a game of matchplay — player versus player, strategizing, 
              out thinking, where the combinations of decisions backed by skill determines the outcome.
            </p>

            <p>
              Teez Golf Challenges brings that format back into focus by creating structured 
              challenges for players to compete. 
            </p>

            <p>
              Players enter matches and compete over real rounds of golf. 
              Whether it’s stroke play, matchplay, or challenge-based formats, each competition is designed 
              to produce a clear result — a winner and a loser — just as the game was always intended.
            </p>

            <p>
              Performance drives everything. There are no shortcuts, no luck, and no randomness. 
              The outcome is determined entirely by how you think and how you back it by play.
            </p>

            <p>
              Competitions are won and there are lost of prizes up for grabs.
            </p>

            <p className="font-semibold text-black">
              Teez Golf Challenges is not a betting platform. 
              It is a structured, skills-based competition system that invites and creates a platform for competing. 
            </p>

          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => router.push("/app")}
              className="bg-green-400 text-black px-10 py-4 rounded-full font-bold 
              shadow-[0_0_25px_rgba(34,197,94,0.8)] 
              hover:scale-105 transition"
            >
              START COMPETING
            </button>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-xl md:text-2xl font-semibold mb-12">
            HOW IT WORKS
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            <div className="text-center">
              <img src="/hero-teez.jpg" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">A competition is created</h3>
              <p className="text-gray-400 text-sm">
                The challenge format is set - Matchplay, Strokeplay. Choose from over 30 type of Challenges.
              </p>
            </div>

            <div className="text-center">
              <img src="/wallet.png" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">Enter the Competition</h3>
              <p className="text-gray-400 text-sm">
                Enter a challenge by adding funds to your wallet. 
              </p>
            </div>

            <div className="text-center">
              <img src="/voucher_badger.png" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">Redeem your Prizes</h3>
              <p className="text-gray-400 text-sm">
                At conclusion - prizes can be redeemed.
              </p>
            </div>

            <div className="text-center">
              <img src="/main_ranking.png" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">Rankings</h3>
              <p className="text-gray-400 text-sm">
                Real-time rankings at Club, State/Province, National, International Level.
              </p>
            </div>

          </div>
        </div>
      </section>

    {/* ================= FOOTER ================= */} 
<footer className="bg-gray-100 text-black py-12 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

    <div className="text-center md:text-left space-y-2">
      <p className="font-semibold">Teez Golf Challenges</p>
      <p className="text-sm text-gray-600">
        Developed and Managed by Honey Badger Technologies (PTY) LTD
      </p>

      <div className="flex flex-col gap-3 justify-center md:justify-start text-xs">

        <span
          onClick={() => router.push("/legal/terms")}
          className="underline cursor-pointer hover:text-gray-800"
        >
          Terms & Conditions
        </span>

        {/* PAYMENT LOGOS */}
        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">

          <img src="/Payfast logo.svg" className="h-6 object-contain" />
          <img src="/Visa.png" className="h-5 object-contain" />
          <img src="/Master Card.png" className="h-5 object-contain" />
          <img src="/American Express Logo.png" className="h-5 object-contain" />
          <img src="/Diners Club Logo.png" className="h-5 object-contain" />
          <img src="/instantEFT_hi-Res_logo.png" className="h-5 object-contain" />

        </div>

      </div>
    </div>

    <div className="flex items-center gap-4">

      <a href="https://facebook.com/profile.php?id=61575742530808" target="_blank" className="hover:scale-110 transition">
        <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54v1.85H16l-.4 2.88h-2.21v6.99A10 10 0 0 0 22 12z"/>
        </svg>
      </a>

      <a href="https://youtube.com/teezgolfchallenges" target="_blank" className="hover:scale-110 transition">
        <svg width="22" height="22" fill="#FF0000" viewBox="0 0 24 24">
          <path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C17.8 2.5 12 2.5 12 2.5h0s-5.8 0-8.6.3c-.4.1-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S.3 8.2.3 10.2v1.6c0 2 .2 4 .2 4s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.7.2 7.3.3 7.3.3s5.8 0 8.6-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-2 .2-4v-1.6c0-2-.2-4-.2-4zM9.8 14.7V7.9l6.4 3.4-6.4 3.4z"/>
        </svg>
      </a>

      <a href="https://tiktok.com/teezgolfchallenges" target="_blank" className="hover:scale-110 transition">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
          <path fill="#25F4EE" d="M9 3v12.5a2.5 2.5 0 1 1-2.5-2.5H8V9H6.5A6.5 6.5 0 1 0 13 15.5V8.5c1.1 1 2.6 1.5 4 1.5V6.5c-1.6 0-3-1.3-3-3H9z"/>
        </svg>
      </a>

      <a href="https://instagram.com/teezgolfchallenges" target="_blank" className="hover:scale-110 transition">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#feda75"/>
              <stop offset="50%" stopColor="#d62976"/>
              <stop offset="100%" stopColor="#4f5bd5"/>
            </linearGradient>
          </defs>
          <path fill="url(#ig)" d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 
          5-5V7c0-2.8-2.2-5-5-5H7zm5 4.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8zm6.5-.3a1.2 
          1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2zM12 9.3A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 
          12 9.3z"/>
        </svg>
      </a>

      <button
        onClick={() => router.push("/contact")}
        className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition"
      >
        EMAIL
      </button>

    </div>

  </div>
</footer>
      {/* ================= COOKIE BANNER ================= */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white px-6 py-4 z-50 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs text-gray-300 text-center md:text-left">
              We use cookies to improve your experience, analyze traffic, and support marketing.
              By clicking accept, you agree to our use of cookies.
            </p>

            <div className="flex gap-3 flex-wrap justify-center">

              <button
                onClick={acceptCookies}
                className="bg-green-400 text-black px-4 py-2 rounded text-xs font-semibold hover:scale-105 transition"
              >
                Accept All
              </button>

              <button
                onClick={rejectCookies}
                className="border border-white px-4 py-2 rounded text-xs hover:bg-white hover:text-black transition"
              >
                Reject
              </button>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}