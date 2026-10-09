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
              Join the global golf competition platform by creating your account.
              Members can create and join challenges, earn ranking points and
              compete with golfers around the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. Enter Tournaments
            </h2>
            <p>
              Accepting an invite gets you into the tournament challenges. 
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
        5. Challenge Rewards
  </h2>
  <p>
        Play Tokens used to enter a challenge contribute to the challenge reward pool.
    <br /><br />

    <strong>Matchplay Challenges:</strong><br />
    Players results are based on matchplay outcomes (Win = 1, Draw = 0.5, Loss = 0).<br />
    <br /><br />

    <strong>Stroke / Points Challenges:</strong><br />
    • 2–8 Players: Only 8 positions for prizes<br />
    • 8+ Players: Top 25% of players receive prizes<br /><br />

        Challenge entry tokens are allocated according to the
     TEEZ Golf Challenges rewards system:
     <br /><br />

     <strong>25%:</strong> Permanently removed from circulation.
     <br />
     <strong>15%:</strong> Allocated to Events Tokens.
     <br />
     <strong>60%:</strong> Allocated to player winnings,
     recorded as fictional TEEZ Dollars.
     <br /><br />

     Each winning Play Token is valued at $14.90 in
     fictional TEEZ Dollars.
     <br /><br />

     TEEZ Dollars have no cash value and cannot be
     withdrawn, transferred or redeemed.
  </p>
</section>

<section>
  <h2 className="text-2xl font-semibold text-white mb-2">
    6. Ranking Points
  </h2>
  <p>
    Every challenge awards ranking points based on performance:
    <br /><br />

    <strong>Matchplay:</strong><br />
    Win = 130 points<br />
    Draw = 65 points<br />
    Loss = 25 points<br /><br />

    <strong>Stroke / Points Formats:</strong><br />
    Points are calculated based on your final position and the number of players in the field.
    Higher positions and larger fields result in more points.
    <br /><br />

    If players tie, their average finishing position is used for calculation.
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
              8. Build Your TEEZ Career
            </h2>
            <p>
              Compete in challenges to build your golfing career,
              improve your rankings and earn TEEZ rewards.
              <br /><br />

              <strong>Play Tokens:</strong> Used to enter golf challenges.
              <br /><br />

              <strong>TEEZ Dollars:</strong> Fictional career winnings
              that reflect your achievements. They have no cash value
              and cannot be withdrawn or redeemed.
              <br /><br />

              <strong>Events Tokens:</strong> Earned through challenge
              participation and tracked separately in your player profile.
              <br /><br />

              Track your progress, career statistics and rewards
              through your TEEZ Wallet and My Career dashboard.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
        </div>

      </main>
    </div>
  );
}
