"use client";

import { useRouter } from "next/navigation";

export default function CorporateDaysPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="w-full max-w-[520px] mx-auto">

        <section className="mb-8">
          <p className="text-xs tracking-[0.35em] text-green-400 font-black">
            TEEZ GOLF SCORING
          </p>

          <h1 className="text-4xl font-black mt-3">
            Corporate Days
          </h1>

          <p className="text-gray-400 mt-3">
            Select a corporate golf day to open its branded event dashboard.
          </p>
        </section>

        <section className="grid gap-4">

          <div
            className="
              relative
              overflow-hidden
              bg-neutral-950
              border
              border-red-500/50
              rounded-3xl
              p-5
              text-left
              shadow-[0_0_30px_rgba(220,38,38,0.35)]
              min-h-[210px]
            "
          >
            <img
              src="/jk6_logo.png"
              alt="JK6"
              className="absolute right-2 top-2 w-36 h-36 object-contain opacity-35"
            />

            <div className="relative z-10">
              <p className="text-xs tracking-[0.25em] text-red-400 font-black">
                FEATURED CORPORATE DAY
              </p>

              <h2 className="text-4xl font-black mt-3 text-red-500 animate-pulse drop-shadow-[0_0_14px_rgba(239,68,68,1)]">
                JK6 2026
              </h2>

             <p className="text-cyan-300 font-black mt-2 animate-pulse drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
  4 Ball Alliance · Scramble Drive · Mystery Count
</p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="bg-black/50 border border-white/10 rounded-2xl p-3">
                  <p className="text-[10px] text-gray-500 font-black">
                    VENUE
                  </p>

                  <p className="text-sm font-black mt-1">
                    Woodhill Country Club
                  </p>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-3">
                  <p className="text-[10px] text-gray-500 font-black">
                    START
                  </p>

                 <p className="text-sm font-black mt-1">
  10:00am Shotgun
</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-4">
                JK6 Annual Fundraiser Golf Day 2026.
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              router.push("/teez-scoring/corporate-days/jk6-2026")
            }
            className="
              w-full
              bg-red-600
              text-white
              rounded-3xl
              py-5
              px-5
              font-black
              text-xl
              animate-pulse
              shadow-[0_0_25px_rgba(220,38,38,0.65)]
              hover:scale-[1.01]
              transition
            "
          >
            ENTER JK6 GOLFDAY
          </button>

        </section>

        <button
          onClick={() =>
            router.push("/teez-scoring")
          }
          className="
            mt-6
            w-full
            bg-white/10
            border
            border-white/10
            rounded-2xl
            py-4
            font-black
            hover:border-green-400
            transition
          "
        >
          BACK TO TEEZ SCORING
        </button>

      </div>
    </main>
  );
}