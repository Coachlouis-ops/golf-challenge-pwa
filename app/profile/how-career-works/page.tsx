"use client";

import { useRouter } from "next/navigation";

export default function HowCareerWorksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-gray-900">
      <div className="mx-auto max-w-md pb-12">
        {/* HEADER */}

        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-5 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-600 hover:bg-gray-100"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-600">
                Career Guide
              </p>

              <h1 className="text-xl font-black">
                How My Career Works
              </h1>
            </div>

            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          {/* INTRO */}

          <section className="rounded-[28px] bg-gradient-to-br from-[#153d2b] via-[#10271c] to-black p-6 text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-400">
              TEEZ Career System
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Every Challenge Counts
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              Your TEEZ career develops every time a completed challenge
              is finalized. Results affect your rankings, career points,
              power score, XP, level, streaks and Race to Final points.
            </p>
          </section>

          {/* CAREER POINTS */}

          <CareerSection
            icon="🏆"
            title="Career Points"
            description="Career Points are your permanent lifetime competitive points."
          >
            <InfoLine
              title="Match Play"
              text="Win = 130 Club Points, Draw = 65, Loss = 25."
            />

            <InfoLine
              title="Other Formats"
              text="Points are calculated from your finishing position and the number of players in the challenge."
            />

            <FormulaBox>
              Position Score = (Players − Position + 1) ÷ Players
              {"\n"}
              Volume Multiplier = log₁₀(Players) + 1
              {"\n"}
              Base Points = Position Score × Volume Multiplier × 100
            </FormulaBox>

            <InfoLine
              title="Minimum Points"
              text="A minimum floor of 25% of the available volume-based points ensures every completed player earns points."
            />

            <InfoLine
              title="Career Total"
              text="Your Club Points earned from every challenge are added to your Career Points."
            />
          </CareerSection>

          {/* RANKING POINTS */}

          <CareerSection
            icon="📊"
            title="Ranking Points"
            description="The same challenge result contributes to four ranking levels."
          >
            <InfoLine title="Club" text="100% of base points" />
            <InfoLine title="Province" text="Approximately 70% of Club Points" />
            <InfoLine title="National" text="Approximately 40% of Club Points" />
            <InfoLine title="Global" text="Approximately 20% of Club Points" />
          </CareerSection>

          {/* RANKING POSITIONS */}

          <CareerSection
            icon="🌍"
            title="Ranking Positions"
            description="Ranking position is determined by comparing your accumulated points against other players."
          >
            <InfoLine
              title="Club Ranking"
              text="Players are ordered from highest to lowest accumulated Club Points."
            />

            <InfoLine
              title="Province Ranking"
              text="Players are ordered from highest to lowest accumulated Province Points."
            />

            <InfoLine
              title="National Ranking"
              text="Players are ordered from highest to lowest accumulated National Points."
            />

            <InfoLine
              title="Global Ranking"
              text="Players are ordered from highest to lowest accumulated Global Points."
            />

            <InfoLine
              title="Division Rankings"
              text="The same ranking process is repeated only against players within your selected division."
            />

            <InfoLine
              title="Personal Best"
              text="TEEZ also records the highest ranking position you have achieved during your career."
            />
          </CareerSection>

          {/* POWER SCORE */}

          <CareerSection
            icon="⚡"
            title="Power Score"
            description="Power Score reflects your current competitive strength."
          >
            <p className="text-sm leading-6 text-gray-600">
              Your Power Score starts at 1,000 and increases after each
              completed challenge.
            </p>

            <FormulaBox>
              Club Points ÷ 10
              {"\n"}+ 25 for winning
              {"\n"}+ 10 for a Top 3 finish
              {"\n"}+ Field Size bonus
              {"\n"}+ Win Streak bonus
              {"\n"}+ Win Percentage bonus
            </FormulaBox>

            <InfoLine
              title="Field Size"
              text="An additional point is earned for every five players in the challenge."
            />

            <InfoLine
              title="Streak"
              text="Your current win streak contributes 2 Power Score points per consecutive win."
            />
          </CareerSection>

          {/* XP */}

          <CareerSection
            icon="⭐"
            title="Career XP"
            description="XP measures long-term activity and progression."
          >
            <p className="text-sm leading-6 text-gray-600">
              Every completed challenge starts with 25 XP.
            </p>

            <FormulaBox>
              25 Base XP
              {"\n"}+ Finishing Position XP
              {"\n"}+ 50 XP for winning
              {"\n"}+ Number of players in the field
              {"\n"}+ Club Points ÷ 10
            </FormulaBox>

            <InfoLine
              title="Finishing Position XP"
              text="Higher finishing positions earn more XP. The calculation awards 5 XP for every position from your finishing place to the bottom of the field."
            />
          </CareerSection>

          {/* LEVEL */}

          <CareerSection
            icon="🎯"
            title="Player Level"
            description="Your level increases automatically as your Career XP grows."
          >
            <FormulaBox>
              Level = floor(√(Career XP ÷ 100)) + 1
            </FormulaBox>

            <p className="text-sm leading-6 text-gray-600">
              Player Level can never fall below Level 1.
            </p>
          </CareerSection>

          {/* WIN RATE */}

          <CareerSection
            icon="📈"
            title="Win Percentage"
            description="Your win percentage measures your career success rate."
          >
            <FormulaBox>
              Win % = Wins ÷ Matches Played × 100
            </FormulaBox>

            <p className="text-sm leading-6 text-gray-600">
              The displayed percentage is rounded to the nearest whole number.
            </p>
          </CareerSection>

          {/* STREAKS */}

          <CareerSection
            icon="🔥"
            title="Winning & Losing Streaks"
            description="TEEZ records both your current form and your career-best streaks."
          >
            <InfoLine
              title="Current Win Streak"
              text="Increases by one after every consecutive win and resets to zero after a loss."
            />

            <InfoLine
              title="Best Win Streak"
              text="Records the longest winning streak achieved during your career."
            />

            <InfoLine
              title="Losing Streak"
              text="Works in the same way for consecutive losses."
            />
          </CareerSection>

          {/* FINISHES */}

          <CareerSection
            icon="🥇"
            title="Finishing Records"
            description="Your career keeps track of your strongest challenge finishes."
          >
            <InfoLine
              title="Best Finish"
              text="The highest finishing position you have achieved."
            />

            <InfoLine
              title="Top 3"
              text="Number of challenges where you finished 1st, 2nd or 3rd."
            />

            <InfoLine
              title="Top 5"
              text="Number of challenges where you finished inside the Top 5."
            />

            <InfoLine
              title="Top 10"
              text="Number of challenges where you finished inside the Top 10."
            />
          </CareerSection>

          {/* BEST FORMAT */}

          <CareerSection
            icon="⛳"
            title="Best Format"
            description="Your results are tracked separately across game formats."
          >
            <InfoLine title="Match Play" text="Matches played and wins are recorded." />
            <InfoLine title="Stroke Play" text="Matches played and wins are recorded." />
            <InfoLine title="Stableford" text="Matches played and wins are recorded." />
            <InfoLine title="Scramble" text="Matches played and wins are recorded." />

            <p className="text-sm leading-6 text-gray-600">
              Your Best Format is determined primarily by your highest win
              percentage within these formats.
            </p>
          </CareerSection>

          {/* RACE */}

          <CareerSection
            icon="🏝️"
            title="Race to Final"
            description="Race Points form a separate annual competition toward the the TEEZ Challenges Final."
          >
            <InfoLine
              title="Complete a Challenge"
              text="+10 Race Points"
            />

            <InfoLine
              title="Win"
              text="+25 additional Race Points"
            />

            <InfoLine
              title="Top 3 Finish"
              text="+10 additional Race Points"
            />

            <InfoLine
              title="3-Win Streak"
              text="+10 Race Points when the streak reaches 3"
            />

            <InfoLine
              title="5-Win Streak"
              text="+20 Race Points when the streak reaches 5"
            />

            <InfoLine
              title="10-Win Streak"
              text="+50 Race Points when the streak reaches 10"
            />

            <InfoLine
              title="Qualification"
              text="The Top 8 players on the global Race qualify for the TEEZ Championship Final."
            />
          </CareerSection>

          {/* VAULT */}

          <CareerSection
            icon="🗝️"
            title="Player Vault"
            description="Career milestones earn Vault Keys."
          >
            <InfoLine
              title="Vault Keys"
              text="Each earned key allows you to flip one unopened mystery coin."
            />

            <InfoLine
              title="Bronze"
              text="50 mystery coins"
            />

            <InfoLine
              title="Silver"
              text="Unlocks after Bronze is completed."
            />

            <InfoLine
              title="Gold"
              text="Unlocks after Silver is completed."
            />

            <InfoLine
              title="Diamond"
              text="Unlocks after Gold is completed."
            />

            <p className="text-sm leading-6 text-gray-600">
              Mystery coins can contain bonus tokens, Career XP,
              Career Points, Power Score boosts and free challenge entries.
            </p>
          </CareerSection>

          {/* DISCLAIMER */}

          <section className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
            <h2 className="font-black text-gray-900">
              Important
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              TEEZ may adjust scoring, progression and reward formulas
              as the platform grows to maintain fair competition and
              balanced gameplay.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function CareerSection({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-2xl">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-black text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  );
}

function InfoLine({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
      <p className="text-sm font-black text-gray-800">
        {title}
      </p>

      <p className="mt-1 text-sm leading-5 text-gray-500">
        {text}
      </p>
    </div>
  );
}

function FormulaBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="whitespace-pre-line rounded-2xl bg-gray-50 p-4 font-mono text-xs leading-6 text-gray-700">
      {children}
    </div>
  );
}