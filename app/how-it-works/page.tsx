"use client";

import { useRouter } from "next/navigation";

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 bg-black/60 backdrop-blur-md">
        <div className="font-bold tracking-wide">
          TEEZ GOLF CHALLENGES
        </div>

        <div className="flex gap-6 text-sm">
          <button onClick={() => router.push("/")}>Home</button>
          <button onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/register")}>Register</button>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          How Teez Golf Challenges Works
        </h1>

        <div className="space-y-10 text-gray-300 text-lg leading-relaxed">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1. Create Your Account
            </h2>
            <p>
              Join the global golf challenge platform by creating your account.
              Members gain access to create and join golf challenges, earn
              ranking points and compete with golfers around the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. Buy Tokens
            </h2>
            <p>
              Tokens are used to enter challenges and tournaments. Purchase
              tokens securely through the platform wallet and use them to
              compete in matches against other golfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. Create or Join Challenges
            </h2>
            <p>
              Challenge other golfers at your club or anywhere in the world.
              Choose your course, format and entry tokens. Players compete and
              the winner takes the token prize pool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Climb the Rankings
            </h2>
            <p>
              Every challenge awards ranking points. Build your reputation and
              move up the rankings from club level to national and global
              leaderboards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Win Rewards
            </h2>
            <p>
              Winning players earn tokens that can be redeemed for prizes,
              equipment, vouchers or cash withdrawals depending on eligibility.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => router.push("/register")}
            className="px-10 py-4 rounded-xl bg-[#00ff88] text-black font-semibold text-lg"
          >
            Create Your Account
          </button>
        </div>

      </main>
    </div>
  );
}