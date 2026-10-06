"use client";

import { useRouter } from "next/navigation";

const journey = [
  {
    number: "01",
    title: "CREATE THE EVENT",
    text: "Set up the competition, format, scoring structure and divisions.",
  },
  {
    number: "02",
    title: "BUILD THE FIELD",
    text: "Organise players, pairings and the tee sheet.",
  },
  {
    number: "03",
    title: "PLAYERS SCORE DIGITALLY",
    text: "Capture scores directly during the round from the course.",
  },
  {
    number: "04",
    title: "TEEZ CALCULATES & UPDATES",
    text: "Competition totals develop as the golf is played.",
  },
  {
    number: "05",
    title: "LIVE LEADERBOARDS",
    text: "Follow the competition as positions and totals change.",
  },
  {
    number: "06",
    title: "EVENT BROADCAST",
    text: "Take leaderboards, pairings and event information onto clubhouse screens.",
  },
  {
    number: "07",
    title: "FINALIZE RESULTS",
    text: "Complete the competition and lock the final result.",
  },
  {
    number: "08",
    title: "STORE & EXPORT",
    text: "Retain your competition history and final results.",
  },
];

const formats = [
  "STROKE PLAY",
  "STABLEFORD",
  "COMBINED STABLEFORD",
  "IPS",
  "MATCHPLAY",
  "SCRAMBLE",
  "BETTERBALL",
  "FOURBALL ALLIANCE",
];

const leaderboard = [
  { pos: "1", team: "TEAM ALPHA", score: "91", status: "F" },
  { pos: "2", team: "TEAM BRAVO", score: "89", status: "17" },
  { pos: "3", team: "TEAM CHARLIE", score: "87", status: "16" },
  { pos: "4", team: "TEAM DELTA", score: "84", status: "F" },
];

export default function TeezScoringInfoPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-hidden bg-[#071c13] text-[#f5f1e7]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[92vh] overflow-hidden border-b border-[#d6b56c]/30">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#d6b56c]/10 blur-[140px]" />
        <div className="absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-[#1b6b48]/20 blur-[140px]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-20 lg:px-10">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <div className="h-px w-12 bg-[#d6b56c]" />
                <p className="text-xs font-bold tracking-[0.32em] text-[#d6b56c] sm:text-sm">
                  TEEZ SCORING — LIVE GOLF TECHNOLOGY
                </p>
              </div>

              <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:text-[88px]">
                Run Your Entire
                <span className="block text-[#d6b56c]">
                  Golf Competition.
                </span>
                <span className="block">Live.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8d5cb] sm:text-xl">
                Competition management, digital scoring, live leaderboards,
                clubhouse broadcasting and final results — connected through
                one golf scoring platform.
              </p>

         <div className="mt-10 grid w-full max-w-xl gap-3 sm:grid-cols-3">
  <button
    onClick={() =>
      document
        .getElementById("journey")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    className="w-full rounded-sm border border-[#f5f1e7]/30 px-4 py-4 text-xs font-black tracking-[0.08em] transition hover:border-[#d6b56c] hover:text-[#d6b56c]"
  >
    EXPLORE THE SYSTEM
  </button>

  <button
    onClick={() => router.push("/teez-scoring")}
    className="w-full rounded-sm border border-[#d6b56c] px-4 py-4 text-xs font-black tracking-[0.08em] text-[#d6b56c] transition hover:bg-[#d6b56c] hover:text-[#071c13]"
  >
    ENTER TEEZ SCORING
  </button>

  <button
    onClick={() =>
      window.open(
        "https://wa.me/27636501619?text=Hi%20TEEZ%2C%20I%20am%20interested%20in%20TEEZ%20Golf%20Scoring.",
        "_blank"
      )
    }
    className="w-full rounded-sm bg-[#d6b56c] px-4 py-4 text-xs font-black tracking-[0.08em] text-[#071c13] transition hover:bg-[#ead49d]"
  >
    GET TEEZ SCORING
  </button>
</div>

            </div>

            {/* LIVE SCORING BOARD */}
           <div className="relative min-w-0">
              <div className="border border-[#d6b56c]/40 bg-[#0b271c]/95 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.28em] text-[#d6b56c]">
                      LIVE COMPETITION
                    </p>
                    <p className="mt-1 text-xl font-black">
                      TEEZ CHAMPIONSHIP
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    LIVE
                  </div>
                </div>

              <div className="grid grid-cols-[34px_minmax(0,1fr)_44px_38px] border-b border-white/10 bg-[#06160f] px-3 py-3 text-[9px] font-bold tracking-[0.08em] text-white/45 sm:grid-cols-[45px_1fr_55px_45px] sm:px-4 sm:text-[10px] sm:tracking-[0.18em]">
                  <span>POS</span>
                  <span>TEAM</span>
                  <span className="text-right">PTS</span>
                  <span className="text-right">THRU</span>
                </div>

                {leaderboard.map((row) => (
                  <div
                    key={row.team}
                   className="grid grid-cols-[34px_minmax(0,1fr)_44px_38px] items-center border-b border-white/10 px-3 py-4 sm:grid-cols-[45px_1fr_55px_45px] sm:px-4 sm:py-5"
                  >
                    <span className="text-xl font-black text-[#d6b56c]">
                      {row.pos}
                    </span>
                    <span className="font-bold">{row.team}</span>
                    <span className="text-right text-xl font-black">
                      {row.score}
                    </span>
                    <span className="text-right text-sm text-white/55">
                      {row.status}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between px-5 py-4 text-[10px] font-bold tracking-[0.2em] text-white/45">
                  <span>POWERED BY TEEZ</span>
                  <span>LIVE GOLF TECHNOLOGY</span>
                </div>
              </div>

              <div className="absolute -bottom-7 -left-6 hidden border border-white/10 bg-[#f5f1e7] px-6 py-4 text-[#071c13] shadow-xl sm:block">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#806c3e]">
                  ROUND STATUS
                </p>
                <p className="mt-1 text-2xl font-black">LIVE SCORING</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK SYSTEM STRIP
      ========================================================= */}
      <section className="border-b border-white/10 bg-[#05150e]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-6">
          {[
            ["01", "CREATE"],
            ["02", "PLAY"],
            ["03", "SCORE"],
            ["04", "LIVE"],
            ["05", "BROADCAST"],
            ["06", "FINALIZE"],
          ].map(([number, label]) => (
            <div
              key={number}
              className="border-r border-white/10 px-5 py-6 last:border-r-0"
            >
              <p className="text-xs font-black text-[#d6b56c]">{number}</p>
              <p className="mt-2 text-sm font-black tracking-[0.12em]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          JOURNEY
      ========================================================= */}
      <section id="journey" className="bg-[#f2efe5] px-6 py-24 text-[#071c13]">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black tracking-[0.3em] text-[#8a713b]">
            THE COMPLETE COMPETITION
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-none sm:text-6xl">
            From First Tee
            <span className="block text-[#927536]">To Final Result.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#405047]">
            One connected competition journey from setup to scoring,
            broadcasting and final results.
          </p>

     <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-[#c9c4b7] bg-[#c9c4b7] sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((step) => (
              <div
                key={step.number}
              className="min-h-[185px] bg-[#f8f6ef] p-4 sm:min-h-[230px] sm:p-7"
              >
                <p className="text-sm font-black text-[#a18443]">
                  {step.number}
                </p>
                <div className="my-3 h-px w-8 bg-[#a18443] sm:my-5 sm:w-10" />

<h3 className="text-sm font-black leading-tight sm:text-xl">
  {step.title}
</h3>

<p className="mt-3 text-xs leading-5 text-[#59645e] sm:mt-4 sm:text-base sm:leading-7">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          DIGITAL SCORING
      ========================================================= */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black tracking-[0.3em] text-[#d6b56c]">
              ON-COURSE DIGITAL SCORING
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-6xl">
              Your Players Play.
              <span className="block text-[#d6b56c]">
                Teez Handles The Scoring.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
              Capture scores during the round, calculate points and keep
              individual and team totals moving as the competition develops.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 text-sm font-bold">
              {[
                "18-HOLE SCORECARD",
                "MEN & LADIES",
                "STROKE INDEX",
                "TEE DISTANCES",
                "PLAYER TOTALS",
                "TEAM TOTALS",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <span className="mr-2 text-[#d6b56c]">+</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* SCORECARD MOCKUP */}
          <div className="mx-auto w-full max-w-[430px] rounded-[34px] border-[8px] border-[#161a17] bg-[#f4f1e8] p-4 text-[#071c13] shadow-2xl">
            <div className="rounded-[22px] bg-[#0b271c] p-5 text-white">
              <p className="text-[10px] font-black tracking-[0.25em] text-[#d6b56c]">
                LIVE SCORECARD
              </p>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/55">HOLE</p>
                  <p className="text-5xl font-black">12</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-white/55">PAR</p>
                  <p className="text-3xl font-black">4</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-[#d5d0c4] py-4 text-center">
              <div>
                <p className="text-[10px] font-bold text-black/45">STROKE</p>
                <p className="font-black">7</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-black/45">MEN</p>
                <p className="font-black">386m</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-black/45">LADIES</p>
                <p className="font-black">331m</p>
              </div>
            </div>

            {[
              ["PLAYER 1", "5", "2"],
              ["PLAYER 2", "4", "3"],
              ["PLAYER 3", "6", "1"],
              ["PLAYER 4", "4", "3"],
            ].map(([player, score, points]) => (
              <div
                key={player}
                className="grid grid-cols-[1fr_60px_60px] items-center border-b border-[#d5d0c4] py-4"
              >
                <span className="font-black">{player}</span>
                <span className="text-center text-xl font-black">{score}</span>
                <span className="text-center font-black text-[#876c31]">
                  {points} PTS
                </span>
              </div>
            ))}

            <div className="mt-4 flex items-center justify-between bg-[#0b271c] px-5 py-4 text-white">
              <span className="text-xs font-black tracking-[0.15em]">
                TEAM TOTAL
              </span>
              <span className="text-3xl font-black text-[#d6b56c]">
                67
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LIVE LEADERBOARD
      ========================================================= */}
      <section className="border-y border-[#d6b56c]/20 bg-[#04120c] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
              <span className="text-xs font-black tracking-[0.3em] text-red-400">
                LIVE
              </span>
            </div>

            <h2 className="text-4xl font-black uppercase leading-none sm:text-6xl">
              Every Score Can
              <span className="block text-[#d6b56c]">
                Change The Leaderboard.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Keep players, organisers and spectators connected to the
              competition as scoring develops around the course.
            </p>
          </div>

         <div className="mt-10 w-full overflow-hidden border border-white/15 sm:mt-14">
           <div className="grid grid-cols-[34px_minmax(0,1fr)_52px_42px] bg-[#d6b56c] px-3 py-4 text-[9px] font-black tracking-[0.06em] text-[#071c13] sm:grid-cols-[55px_1fr_75px_60px] sm:px-5 sm:text-xs sm:tracking-[0.15em]">
              <span>POS</span>
              <span>TEAM</span>
              <span className="text-right">TOTAL</span>
              <span className="text-right">THRU</span>
            </div>

            {leaderboard.map((row) => (
              <div
                key={row.team}
                className="grid grid-cols-[34px_minmax(0,1fr)_52px_42px] items-center border-b border-white/10 px-3 py-5 last:border-b-0 sm:grid-cols-[55px_1fr_75px_60px] sm:px-5 sm:py-6"
              >
                <span className="text-2xl font-black text-[#d6b56c]">
                  {row.pos}
                </span>
               <span className="min-w-0 truncate pr-2 text-sm font-black sm:text-lg">
  {row.team}
</span>
                <span className="text-right text-2xl font-black">
                  {row.score}
                </span>
                <span className="text-right text-white/45">{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BROADCASTING
      ========================================================= */}
      <section className="bg-[#f2efe5] px-6 py-24 text-[#071c13]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="border-[10px] border-[#181c19] bg-[#071c13] p-5 shadow-2xl">
            <div className="border border-[#d6b56c]/40">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-white">
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-[#d6b56c]">
                    CLUBHOUSE LIVE
                  </p>
                  <p className="mt-1 font-black">TEEZ CHAMPIONSHIP</p>
                </div>
                <p className="text-xs font-black text-red-400">● LIVE</p>
              </div>

              <div className="p-5 text-white">
                <p className="mb-5 text-xs font-black tracking-[0.2em] text-white/40">
                  LEADERBOARD
                </p>

                {leaderboard.slice(0, 3).map((row) => (
                  <div
                    key={row.team}
                    className="grid grid-cols-[35px_1fr_45px] border-b border-white/10 py-4"
                  >
                    <span className="font-black text-[#d6b56c]">
                      {row.pos}
                    </span>
                    <span className="min-w-0 truncate pr-2 text-sm font-bold sm:text-base">
  {row.team}
</span>
                    <span className="text-right font-black">
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#d6b56c] px-5 py-3 text-center text-xs font-black tracking-[0.18em] text-[#071c13]">
                YOUR SPONSOR MESSAGE CAN APPEAR HERE
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-black tracking-[0.3em] text-[#8a713b]">
              LIVE EVENT BROADCASTING
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-6xl">
              Bring The Competition
              <span className="block text-[#927536]">
                Into The Clubhouse.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#536058]">
              Turn clubhouse TVs and event displays into part of the golf
              experience with competition information that can include live
              leaderboards, tee sheets, player pairings and sponsor content.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-px bg-[#c8c2b4]">
              {[
                "LIVE LEADERBOARDS",
                "TEE SHEETS",
                "PLAYER PAIRINGS",
                "SPONSOR CONTENT",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-[#faf8f2] p-5 text-sm font-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SPONSORS
      ========================================================= */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl border border-[#d6b56c]/30 bg-[#0a2419] p-8 sm:p-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-xs font-black tracking-[0.3em] text-[#d6b56c]">
                EVENT VALUE
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-6xl">
                Give Your Sponsors
                <span className="block text-[#d6b56c]">
                  More Than A Banner.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
                Incorporate sponsor exposure into the competition broadcast
                and create a more connected digital event experience.
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-full border border-white/10 bg-[#06170f] p-8 text-center">
                <p className="text-xs font-black tracking-[0.25em] text-white/40">
                  EVENT BROADCAST
                </p>
                <p className="mt-8 text-2xl font-black">
                  LIVE GOLF
                </p>
                <p className="my-4 text-[#d6b56c]">+</p>
                <p className="text-2xl font-black">
                  SPONSOR VISIBILITY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FORMATS
      ========================================================= */}
      <section className="border-y border-white/10 bg-[#05150e] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black tracking-[0.3em] text-[#d6b56c]">
            FLEXIBLE COMPETITION MANAGEMENT
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase sm:text-6xl">
            Your Competition.
            <span className="text-[#d6b56c]"> Your Format.</span>
          </h2>

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((format) => (
              <div
                key={format}
                className="bg-[#071c13] p-6 text-center text-sm font-black tracking-[0.08em]"
              >
                {format}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "SINGLES",
              "DOUBLES",
              "FOURSOMES",
              "GROSS",
              "NETT",
              "POINTS",
              "DIVISIONS",
            ].map((item) => (
              <span
                key={item}
                className="border border-[#d6b56c]/35 px-5 py-3 text-xs font-black tracking-[0.15em] text-[#d6b56c]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CORPORATE DAYS
      ========================================================= */}
      <section className="bg-[#e9e5d9] px-6 py-24 text-[#071c13]">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black tracking-[0.3em] text-[#8a713b]">
                TEEZ CORPORATE GOLF DAYS
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] sm:text-7xl">
                Your Event.
                <span className="block">Your Brand.</span>
                <span className="block text-[#927536]">
                  Powered By Teez.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-[#536058]">
              Create a dedicated digital golf-day experience with event
              branding, participating companies or teams, controlled scorecard
              access, live scoring and a live event leaderboard.
            </p>
          </div>

          <div className="mt-16 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              "EVENT BRANDING",
              "TEAMS",
              "SECURE ACCESS",
              "LIVE SCORING",
              "LEADERBOARD",
              "FINAL RESULTS",
            ].map((item, index) => (
              <div
                key={item}
                className="border border-[#bdb6a6] bg-[#f7f4eb] p-6"
              >
                <p className="text-xs font-black text-[#927536]">
                  0{index + 1}
                </p>
                <p className="mt-4 text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PAYOFF
      ========================================================= */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-black tracking-[0.3em] text-[#d6b56c]">
            TEEZ SCORING
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.95] sm:text-7xl">
            One Platform.
            <span className="block text-[#d6b56c]">
              The Complete Competition.
            </span>
          </h2>

          <div className="mx-auto mt-14 grid max-w-5xl gap-px bg-white/10 text-left md:grid-cols-2">
            <div className="bg-[#06170f] p-8">
              <p className="text-xs font-black tracking-[0.25em] text-white/35">
                TRADITIONAL EVENT
              </p>
              <div className="mt-6 space-y-4 text-white/55">
                <p>Separate competition processes</p>
                <p>Manual score handling</p>
                <p>Delayed results</p>
                <p>Static event displays</p>
                <p>Limited digital sponsor exposure</p>
              </div>
            </div>

            <div className="bg-[#0b291d] p-8">
              <p className="text-xs font-black tracking-[0.25em] text-[#d6b56c]">
                WITH TEEZ
              </p>
              <div className="mt-6 space-y-4 font-bold">
                <p>Competition management</p>
                <p>Digital scorecards</p>
                <p>Live scoring & leaderboards</p>
                <p>Clubhouse broadcasting</p>
                <p>Sponsor integration</p>
                <p>Final results & competition history</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="border-t border-[#d6b56c]/30 bg-[#031009] px-6 py-24 text-center">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-black tracking-[0.32em] text-[#d6b56c]">
            FROM THE FIRST TEE TO THE FINAL RESULT
          </p>

          <h2 className="mt-6 text-4xl font-black uppercase leading-none sm:text-7xl">
            Ready To Change The Way
            <span className="block text-[#d6b56c]">
              You Run Golf Competitions?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/60">
            Bring competition management, digital scoring, live leaderboards
            and event broadcasting together with TEEZ.
          </p>


          <div className="mt-16 border-t border-white/10 pt-8">
            <p className="text-xs font-black tracking-[0.25em] text-white/30">
              TEEZ SCORING — LIVE GOLF TECHNOLOGY
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}