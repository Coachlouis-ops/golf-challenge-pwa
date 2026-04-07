"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="bg-black text-white">

      {/* ================= HEADER ================= */}
      <header className="w-full bg-black px-6 py-4 flex justify-end items-center gap-4">

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

        <a
          href="mailto:admin@teezgolfchallenges.com"
          className="bg-white text-black px-4 py-2 text-sm rounded"
        >
          Contact us
        </a>

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
            The Worlds Only Mobile Golf Wallet
          </h2>

          <p className="text-gray-600 mb-8">
            Join the Teez Golf Challenge for exciting matchups.<br />
            Compete. Win. Elevate your game.
          </p>

          <button
            onClick={() => router.push("/app")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            REGISTER
          </button>

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
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            Join Now
          </button>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-xl md:text-2xl font-semibold mb-12">
            HOW IT WORKS
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            {/* 1 */}
            <div className="text-center">
              <img src="/hero-teez.jpg" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">Play a Match against an Opponent</h3>
              <p className="text-gray-400 text-sm">
                Create any type of challenge - Matchplay, Strokeplay. Choose from over 30 type of Challenges.
              </p>
            </div>

            {/* 2 */}
            <div className="text-center">
              <img src="/wallet.png" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">Your Golf Wallet</h3>
              <p className="text-gray-400 text-sm">
                Buy tokens to fund your wallet. Enter a challenge by tokens. Win tokens, redeem tokens. See your wallet grow!
              </p>
            </div>

            {/* 3 */}
            <div className="text-center">
              <img src="/voucher_badger.png" className="w-full mb-4" />
              <h3 className="font-semibold mb-2">Redeem your Vouchers</h3>
              <p className="text-gray-400 text-sm">
                Tokens can be redeemed for prizes, equipment, vouchers or cash withdrawals.
              </p>
            </div>

            {/* 4 */}
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

          <div className="text-center md:text-left">
            <p className="font-semibold">Teez Golf Challenges</p>
            <p className="text-sm text-gray-600">Honey Badger Technologies PTY.LTD</p>
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

            <a
              href="mailto:admin@teezgolfchallenges.com"
              className="bg-black text-white px-4 py-2 text-sm"
            >
              EMAIL
            </a>

          </div>

        </div>
      </footer>

    </main>
  );
}