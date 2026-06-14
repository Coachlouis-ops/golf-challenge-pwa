"use client";

import { useRouter } from "next/navigation";

export default function TeezScoringPage() {

  const router = useRouter();

  return (

    <main className="h-screen overflow-y-scroll bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-3 text-green-400">
          TEEZ GOLF SCORING
        </h1>

        <p className="text-gray-400 mb-12 text-xl">
          Golf Club Competition Management Platform
        </p>

        {/* ACTIVE BUTTONS */}

        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <button
         onClick={() =>
  window.location.href =
    "mailto:admin@teezgolfchallenges.com?subject=Application%20For%20Teez%20Golf%20Scoring%20System&body=Club%20Name%3A%0AContact%20Person%3A%0AEmail%3A%0APhone%3A%0AProvince%3A%0ACountry%3A%0A%0APlease%20contact%20us%20regarding%20the%20Teez%20Golf%20Scoring%20System."
}
            className="
              bg-green-400
              text-black
              rounded-3xl
              p-10
              text-left
              font-bold
              hover:scale-[1.02]
              transition
            "
          >
            <h2 className="text-3xl font-black mb-4">
              APPLY FOR SCORING SYSTEM
            </h2>

            <p>
              Apply for your golf club to use the
              Teez Competition Scoring System.
            </p>

          </button>

          <button
            onClick={() =>
              router.push(
                "/teez-scoring/login"
              )
            }
            className="
              bg-cyan-400
              text-black
              rounded-3xl
              p-10
              text-left
              font-bold
              hover:scale-[1.02]
              transition
            "
          >
            <h2 className="text-3xl font-black mb-4">
              REGISTER / LOGIN
            </h2>

            <p>
              Existing approved clubs login here.
            </p>

          </button>

        </div>

        {/* FEATURE CARDS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="
            bg-neutral-900
            border border-cyan-400/20
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold mb-3 text-cyan-400">
              Create Competition
            </h2>

            <p className="text-gray-400 text-sm">
              Create competitions, generate tee sheets,
              enter scores, manage divisions and finalize events.
            </p>
          </div>

          <div className="
            bg-neutral-900
            border border-orange-400/20
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold mb-3 text-orange-400">
              Add Device
            </h2>

            <p className="text-gray-400 text-sm">
              Connect Smart TVs and display screens
              for clubhouse broadcasting.
            </p>
          </div>

          <div className="
            bg-neutral-900
            border border-purple-400/20
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold mb-3 text-purple-400">
              Competition History
            </h2>

            <p className="text-gray-400 text-sm">
              Store historical competitions,
              final results and export reports.
            </p>
          </div>

          <div className="
            bg-neutral-900
            border border-green-400/20
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold mb-3 text-green-400">
              Live Leaderboards
            </h2>

            <p className="text-gray-400 text-sm">
              Realtime overall and division
              leaderboard management.
            </p>
          </div>

          <div className="
            bg-neutral-900
            border border-yellow-400/20
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold mb-3 text-yellow-400">
              TV Broadcasting
            </h2>

            <p className="text-gray-400 text-sm">
              Broadcast leaderboards,
              tee sheets and sponsor content.
            </p>
          </div>

          <div className="
            bg-neutral-900
            border border-red-400/20
            rounded-3xl
            p-8
          ">
            <h2 className="text-2xl font-bold mb-3 text-red-400">
              Sponsor Advertising
            </h2>

            <p className="text-gray-400 text-sm">
              Display sponsor campaigns
              during and after competitions.
            </p>
          </div>

        </div>

      </div>

    </main>

  );
}