"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="bg-black text-white">

      {/* ================= HEADER ================= */}
      <header className="w-full bg-black px-6 py-4 flex justify-end items-center gap-4">

        <a href="https://facebook.com/profile.php?id=61575742530808" target="_blank">
          <span className="text-white text-sm">FB</span>
        </a>

        <a href="https://youtube.com/teezgolfchallenges" target="_blank">
          <span className="text-white text-sm">YT</span>
        </a>

        <a href="https://tiktok.com/teezgolfchallenges" target="_blank">
          <span className="text-white text-sm">TT</span>
        </a>

        <a href="https://instagram.com/teezgolfchallenges" target="_blank">
          <span className="text-white text-sm">IG</span>
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

            <a href="https://facebook.com/profile.php?id=61575742530808" target="_blank">FB</a>
            <a href="https://youtube.com/teezgolfchallenges" target="_blank">YT</a>
            <a href="https://tiktok.com/teezgolfchallenges" target="_blank">TT</a>
            <a href="https://instagram.com/teezgolfchallenges" target="_blank">IG</a>

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