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
              Members can create and join challenges, earn ranking points and
              compete with golfers around the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. Buy Tokens
            </h2>
            <p>
              Tokens are used to enter challenges. Purchase tokens securely
              through your wallet and use them to compete against other golfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. Compete in Challenges
            </h2>
            <p>
              Create or join challenges at your club or globally. Choose your
              format and scoring method, submit your scores and compete on the
              leaderboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Leaderboards
            </h2>
            <p>
              Each challenge generates a leaderboard based on the selected format:
              <br /><br />
              <strong>• Stroke / Nett / Medal:</strong> Lowest score wins<br />
              <strong>• Points / Stableford:</strong> Highest score wins<br />
              <strong>• Matchplay:</strong> Win = 1, Draw = 0.5, Loss = 0<br /><br />
              Players with the same score share the same position, and the next
              position is skipped (e.g. 1, 2, 2, 4).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Token Payouts
            </h2>
            <p>
              At the end of each challenge, the token pool is distributed based on performance:
              <br /><br />
              <strong>• 2–7 Players:</strong> Winner takes 100% of the pool<br />
              <strong>• 8+ Players:</strong> Top 25% of players are paid<br /><br />
              The winner receives <strong>65% of the total pool</strong>.
              The remaining 35% is distributed across the other winning positions,
              decreasing by 10% per position.
              <br /><br />
              If players tie, their combined winnings are split evenly.
              All payouts are rounded to whole tokens, and any leftover tokens are
              awarded to the winner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6. Ranking Points
            </h2>
            <p>
              Every challenge awards ranking points that contribute to your global standing:
              <br /><br />
              <strong>Matchplay:</strong><br />
              Win = 130 points<br />
              Draw = 65 points<br />
              Loss = 25 points<br /><br />
              <strong>Stroke / Points Formats:</strong><br />
              Points are based on your final position and the size of the field.
              Better positions and larger fields earn more points.
              <br /><br />
              If players tie, their average position is used for point calculation.
              <br /><br />
              Every player earns points, with a minimum of 25% of the winner’s points.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7. Global Rankings
            </h2>
            <p>
              Your points are tracked across four ranking levels:
              <br /><br />
              <strong>• Club</strong><br />
              <strong>• Province</strong><br />
              <strong>• National</strong><br />
              <strong>• International</strong><br /><br />
              Each challenge contributes to all ranking levels, allowing you to
              climb leaderboards locally and globally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8. Redeem Rewards
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