"use client";

import { useRouter } from "next/navigation";

export default function HowCareerWorksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#eef1f4] text-[#111827]">
      <div className="mx-auto max-w-md pb-14">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-xl text-slate-600"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#0f5132]">
                TEEZ Career System
              </p>

              <h1 className="mt-1 text-lg font-black tracking-tight">
                CAREER GUIDE
              </h1>
            </div>

            <div className="h-9 w-9" />
          </div>
        </header>

        <div className="space-y-7 px-4 pt-5">

          {/* INTRO */}

          <section className="overflow-hidden border border-[#1f2937] bg-[#0d1821] shadow-[0_8px_22px_rgba(15,23,42,0.16)]">
            <div className="flex items-start gap-4 p-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#b89b5e] bg-[#14232d]">
                <span className="text-[10px] font-black tracking-[0.08em] text-[#d6bd7a]">
                  CAREER
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8eb89f]">
                  Player Information
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
                  How My Career Works
                </h2>

                <p className="mt-2 text-sm leading-5 text-slate-300">
                  Every completed challenge contributes to your
                  TEEZ career record and competitive standing.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <p className="text-xs leading-5 text-slate-400">
                Results can affect Career Points, rankings,
                Power Score, XP, player level, form, streaks
                and Race to Final points.
              </p>
            </div>
          </section>

            <GuideSection
            code="PTS"
            eyebrow="COMPETITION VALUE"
            title="Career Points"
            description="Every finalized challenge is scored using the same competition-value system."
          >
            <InfoLine
              title="Three Factors"
              text="Career Points are calculated from your finishing position, the number of tokens played and the total number of players in the challenge."
            />

            <FormulaBox>
              Competition Score =
              {"\n"}
              100 × Position Factor × Token Factor × Field Factor
            </FormulaBox>

            <InfoLine
              title="Position Factor"
              text="Finishing higher earns a larger share of the available competition value. First place receives the maximum position factor."
            />

            <InfoLine
              title="Token Factor"
              text="Higher-token challenges carry greater competitive value, but the increase is controlled so players cannot simply buy ranking position."
            />

            <InfoLine
              title="Field Factor"
              text="Challenges with more players carry greater competitive value because the player is competing against a larger field."
            />

            <InfoLine
              title="All Game Formats"
              text="The same three-factor principle applies to Match Play, Stroke Play, Stableford, Scramble and other supported competitive formats."
            />

            <InfoLine
              title="Career Total"
              text="Your Competition Score is added to your Career Points after the challenge is finalized."
            />
          </GuideSection>

               <GuideSection
            code="RPTS"
            eyebrow="RANKING SYSTEM"
            title="Ranking Points"
            description="Ranking Points are derived directly from your Competition Score."
          >
            <ValueRow
              title="Club"
              value="100%"
              text="of Competition Score"
            />

            <ValueRow
              title="Province"
              value="70%"
              text="of Competition Score"
            />

            <ValueRow
              title="National"
              value="40%"
              text="of Competition Score"
            />

            <ValueRow
              title="Global"
              value="20%"
              text="of Competition Score"
            />

            <InfoLine
              title="Ranking Progress"
              text="These points accumulate after every finalized challenge and determine your position against other players at each ranking level."
            />
          </GuideSection>

          <GuideSection
            code="RNK"
            eyebrow="OFFICIAL STANDINGS"
            title="Ranking Positions"
            description="Positions are determined by comparing accumulated points against other players."
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
              text="The ranking process is repeated against players within your selected division."
            />

            <InfoLine
              title="Personal Best"
              text="TEEZ records the highest ranking position you have achieved during your career."
            />
          </GuideSection>
          <GuideSection
            code="PWR"
            eyebrow="COMPETITIVE RATING"
            title="Power Score"
            description="Power Score now derives directly from the Competition Score earned in each finalized challenge."
          >
            <FormulaBox>
              Power Score Gain =
              {"\n"}
              Competition Score × 10%
            </FormulaBox>

            <InfoLine
              title="Competition Value"
              text="Because Competition Score already includes finishing position, tokens played and field size, Power Score automatically reflects all three factors."
            />

            <InfoLine
              title="Career Total"
              text="The calculated Power Score gain is added to your existing Power Score after each finalized challenge."
            />
          </GuideSection>

                   <GuideSection
            code="XP"
            eyebrow="PLAYER DEVELOPMENT"
            title="Career XP"
            description="Career XP is now based directly on the competitive value of each finalized challenge."
          >
            <FormulaBox>
              Career XP Earned =
              {"\n"}
              Competition Score × 50%
            </FormulaBox>

            <InfoLine
              title="Competition Value"
              text="A stronger result in a higher-token challenge or larger field produces more Career XP because all three factors are already included in the Competition Score."
            />

            <InfoLine
              title="Career Progression"
              text="Career XP accumulates over time and is used to determine your Player Level."
            />
          </GuideSection>


          <GuideSection
            code="LVL"
            eyebrow="PLAYER DEVELOPMENT"
            title="Player Level"
            description="Your level increases automatically as Career XP grows."
          >
            <FormulaBox>
              Level = floor(√(Career XP ÷ 100)) + 1
            </FormulaBox>

            <p className="text-sm leading-5 text-slate-500">
              Player Level can never fall below Level 1.
            </p>
          </GuideSection>

          <GuideSection
            code="WIN%"
            eyebrow="PERFORMANCE"
            title="Win Percentage"
            description="Your career success rate across completed matches."
          >
            <FormulaBox>
              Win % = Wins ÷ Matches Played × 100
            </FormulaBox>

            <p className="text-sm leading-5 text-slate-500">
              The displayed percentage is rounded to the nearest whole number.
            </p>
          </GuideSection>

          <GuideSection
            code="FORM"
            eyebrow="CURRENT FORM"
            title="Winning & Losing Streaks"
            description="Tracks current form and career-best competitive runs."
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
          </GuideSection>

          <GuideSection
            code="FIN"
            eyebrow="CAREER RECORD"
            title="Finishing Records"
            description="Tracks your strongest challenge finishes."
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
          </GuideSection>

          <GuideSection
            code="FMT"
            eyebrow="PERFORMANCE ANALYSIS"
            title="Best Format"
            description="Results are tracked separately across game formats."
          >
            <InfoLine title="Match Play" text="Matches played and wins are recorded." />
            <InfoLine title="Stroke Play" text="Matches played and wins are recorded." />
            <InfoLine title="Stableford" text="Matches played and wins are recorded." />
            <InfoLine title="Scramble" text="Matches played and wins are recorded." />

            <p className="text-sm leading-5 text-slate-500">
              Best Format is determined primarily by your highest
              win percentage within these formats.
            </p>
          </GuideSection>

          {/* RACE TO FINAL */}

          <section className="overflow-hidden border border-[#1c4532] bg-[#10261c] shadow-sm">

            <div className="flex items-start gap-4 border-b border-white/10 p-5">

              <div className="flex h-12 min-w-12 items-center justify-center border border-[#c6a96a] bg-[#172d23] px-2">
                <span className="text-[9px] font-black tracking-[0.08em] text-[#d8c18a]">
                  RTF
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8eb89f]">
                  Season Championship
                </p>

                <h2 className="mt-1 text-xl font-black text-white">
                  Race to Final
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-300">
                  Race Points form a separate annual competition
                  toward the TEEZ Championship Final.
                </p>
              </div>
            </div>

                        <div className="bg-white px-5">
              <InfoLine
                title="Race Points"
                text="Race Points earned from finalized challenges are calculated from the same Competition Score used by the career system."
              />

              <FormulaBox>
                Race Points Earned =
                {"\n"}
                Competition Score × 25%
              </FormulaBox>

              <InfoLine
                title="Competition Value"
                text="Finishing position, tokens played and field size therefore all influence Race Points earned from a challenge."
              />

              <InfoLine
                title="Vault Bonuses"
                text="From Silver Vault onward, selected mystery coins can also award additional Race to Final bonus points."
              />
            </div>

            <div className="border-t border-[#d7c28c] bg-[#faf7ef] px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a6b30]">
                Qualification
              </p>

              <p className="mt-1 text-sm font-black text-[#111827]">
                Global Top 8 qualify for the TEEZ Championship Final.
              </p>
            </div>
          </section>

          {/* PLAYER VAULT */}

          <GuideSection
            code="VLT"
            eyebrow="CAREER REWARDS"
            title="Player Vault"
            description="Career milestones earn Vault Keys."
            premium
          >
            <InfoLine
              title="Vault Keys"
              text="Each earned key allows you to flip one unopened mystery coin."
            />

                       <VaultRow
              title="Bronze"
              text="50 mystery coins focused on core career and gameplay rewards."
            />

            <VaultRow
              title="Silver"
              text="Unlocks after Bronze. Race to Final bonus points become available from this tier."
            />

            <VaultRow
              title="Gold"
              text="Unlocks after Silver. Contains stronger career rewards and increased Race to Final reward potential."
            />

            <VaultRow
              title="Diamond"
              text="Unlocks after Gold. The final Vault tier with the highest career and Race to Final reward potential."
            />

            <InfoLine
              title="Vault Progression"
              text="Each Vault contains 50 mystery coins. One Vault Key opens one coin, and all 50 coins in the current Vault must be opened before the next tier unlocks."
            />

            <InfoLine
              title="Mystery Rewards"
              text="Mystery coins can contain bonus tokens, Career XP, Career Points, Power Score boosts and free challenge entries. From Silver onward, selected coins can also contain Race to Final bonus points."
            />
          </GuideSection>

          {/* IMPORTANT */}

          <section className="border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 h-[2px] w-8 bg-[#0f5132]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f5132]">
              System Information
            </p>

            <h2 className="mt-1 text-lg font-black">
              Scoring & Progression
            </h2>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              TEEZ may adjust scoring, progression and reward
              formulas as the platform develops to maintain fair
              competition and balanced gameplay.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

function GuideSection({
  code,
  eyebrow,
  title,
  description,
  children,
  premium = false,
}: {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  premium?: boolean;
}) {
  return (
    <section
      className={`border bg-white shadow-sm ${
        premium
          ? "border-[#c9b37a]"
          : "border-slate-200"
      }`}
    >
      <div className="flex gap-4 border-b border-slate-100 p-5">

        <div
          className={`flex h-12 min-w-12 shrink-0 items-center justify-center border px-2 text-[9px] font-black tracking-[0.08em] ${
            premium
              ? "border-[#c9b37a] bg-[#faf7ef] text-[#9a7531]"
              : "border-[#b8c7bd] bg-[#f3f7f4] text-[#0f5132]"
          }`}
        >
          {code}
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0f5132]">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-xl font-black tracking-tight text-[#111827]">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-4 p-5">
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
    <div className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
        {title}
      </p>

      <p className="mt-1 text-sm leading-5 text-slate-500">
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
    <div className="border-l-[3px] border-[#0f5132] bg-[#f7f8f9] px-4 py-3 font-mono text-xs leading-6 text-slate-700">
      <div className="mb-1 text-[9px] font-sans font-black uppercase tracking-[0.16em] text-[#0f5132]">
        Formula
      </div>

      <div className="whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}

function ValueRow({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 last:border-b-0">
      <div>
        <p className="text-sm font-black text-[#111827]">
          {title}
        </p>

        <p className="text-xs text-slate-400">
          {text}
        </p>
      </div>

      <p className="text-xl font-black text-[#0f5132]">
        {value}
      </p>
    </div>
  );
}

function RaceRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
      <p className="text-sm font-bold text-slate-600">
        {title}
      </p>

      <p className="text-sm font-black text-[#0f5132]">
        {value} pts
      </p>
    </div>
  );
}

function VaultRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[70px_1fr] items-center border-b border-slate-100 py-2 last:border-b-0">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-[#9a7531]">
        {title}
      </p>

      <p className="text-sm text-slate-500">
        {text}
      </p>
    </div>
  );
}