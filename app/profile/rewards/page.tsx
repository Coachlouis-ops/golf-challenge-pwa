"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import { useAuth } from "@/src/lib/AuthContext";
import { db, functions } from "@/src/lib/firebase";

type VaultName = "bronze" | "silver" | "gold" | "diamond";

type VaultData = {
  availableKeys: number;
  lifetimeKeysEarned: number;
  totalCoinsOpened: number;
  currentVault: VaultName;
  unlockedVaults: VaultName[];
  claimedMilestones?: Record<
    string,
    {
      title?: string;
      keys?: number;
    }
  >;
};

type VaultConfig = {
  id: VaultName;
  title: string;
  icon: string;
  coinStart: number;
  coinEnd: number;
  description: string;
};

const VAULTS: VaultConfig[] = [
  {
    id: "bronze",
    title: "Bronze Vault",
    icon: "🥉",
    coinStart: 1,
    coinEnd: 50,
    description: "Build your career and open your first 50 mystery coins.",
  },
  {
    id: "silver",
    title: "Silver Vault",
    icon: "🥈",
    coinStart: 51,
    coinEnd: 100,
    description: "Unlock after every Bronze Vault coin has been opened.",
  },
  {
    id: "gold",
    title: "Gold Vault",
    icon: "🥇",
    coinStart: 101,
    coinEnd: 150,
    description: "Unlock after completing the Silver Vault.",
  },
  {
    id: "diamond",
    title: "Diamond Vault",
    icon: "💎",
    coinStart: 151,
    coinEnd: 200,
    description: "The final vault for long-term career achievement.",
  },
];

const EMPTY_VAULT: VaultData = {
  availableKeys: 0,
  lifetimeKeysEarned: 0,
  totalCoinsOpened: 0,
  currentVault: "bronze",
  unlockedVaults: ["bronze"],
  claimedMilestones: {},
};

export default function PlayerVaultPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [vault, setVault] = useState<VaultData>(EMPTY_VAULT);
  const [newKeysEarned, setNewKeysEarned] = useState(0);

  const loadVault = useCallback(async () => {
    if (!user) return;

    const uid = user.uid;

    const syncVaultKeys = httpsCallable<
      Record<string, never>,
      {
        success: boolean;
        keysEarnedNow: number;
        availableKeys: number;
        lifetimeKeysEarned: number;
      }
    >(functions, "syncVaultKeys");

    const syncResult = await syncVaultKeys({});

    setNewKeysEarned(
      Number(syncResult.data.keysEarnedNow ?? 0)
    );

    const vaultSnap = await getDoc(
      doc(db, "userVaults", uid)
    );

    if (!vaultSnap.exists()) {
      setVault(EMPTY_VAULT);
      return;
    }

    const data = vaultSnap.data();

    setVault({
      availableKeys: Number(data.availableKeys ?? 0),
      lifetimeKeysEarned: Number(
        data.lifetimeKeysEarned ?? 0
      ),
      totalCoinsOpened: Number(
        data.totalCoinsOpened ?? 0
      ),
      currentVault: data.currentVault ?? "bronze",
      unlockedVaults: Array.isArray(data.unlockedVaults)
        ? data.unlockedVaults
        : ["bronze"],
      claimedMilestones:
        data.claimedMilestones ?? {},
    });
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function initialiseVault() {
      try {
        await loadVault();
      } catch (error) {
        console.error(
          "Unable to load Player Vault:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    initialiseVault();
  }, [user, loadVault]);

 if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef1f4] px-6">
      <div className="border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#0f5132]" />

        <p className="mt-4 text-sm font-semibold text-slate-700">
          Loading Player Vault
        </p>
      </div>
    </main>
  );
}

const completedMilestones = Object.keys(
  vault.claimedMilestones ?? {}
).length;

return (
  <main className="min-h-screen bg-[#eef1f4] text-[#111827]">
      <div className="mx-auto max-w-md pb-14">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-xl text-slate-600"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#0f5132]">
                TEEZ Career Rewards
              </p>

              <h1 className="mt-1 text-lg font-black tracking-tight">
                PLAYER VAULT
              </h1>
            </div>

            <div className="h-9 w-9" />
          </div>
        </header>

        <div className="space-y-7 px-4 pt-5">

          {/* VAULT HERO */}

          <section className="overflow-hidden border border-[#1f2937] bg-[#0d1821] shadow-[0_8px_22px_rgba(15,23,42,0.16)]">

            <div className="flex items-start gap-4 border-b border-white/10 p-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#b89b5e] bg-[#14232d]">
                <span className="text-[10px] font-black tracking-[0.08em] text-[#d6bd7a]">
                  VAULT
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8eb89f]">
                  Career Reward System
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
                  Earn Keys. Open Vaults.
                </h2>

                <p className="mt-2 text-sm leading-5 text-slate-300">
                  Career milestones award Vault Keys.
                  Each key opens one mystery coin containing
                  a player reward.
                </p>
              </div>
            </div>

            {newKeysEarned > 0 && (
              <div className="border-b border-white/10 bg-[#10261c] px-5 py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8eb89f]">
                  New Milestone
                </p>

                <p className="mt-1 text-xl font-black text-[#d6bd7a]">
                  +{newKeysEarned} Vault{" "}
                  {newKeysEarned === 1 ? "Key" : "Keys"}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 border-t border-white/10">
              <VaultSummary
                code="AVL"
                title="Available Keys"
                value={vault.availableKeys}
              />

              <VaultSummary
                code="LIFE"
                title="Lifetime Keys"
                value={vault.lifetimeKeysEarned}
              />

              <VaultSummary
                code="OPEN"
                title="Coins Opened"
                value={vault.totalCoinsOpened}
              />

              <VaultSummary
                code="MILE"
                title="Milestones"
                value={completedMilestones}
              />
            </div>
          </section>

          {/* VAULT PROGRESSION */}

          <section>
            <SectionHeading
              eyebrow="CAREER REWARD SERIES"
              title="Vault Progression"
              description="Complete each 50-coin vault to advance to the next reward tier"
            />

            <div className="space-y-4">
              {VAULTS.map((vaultConfig) => (
                <VaultCard
                  key={vaultConfig.id}
                  config={vaultConfig}
                  playerVault={vault}
                  onEnter={() =>
                    router.push(
                      `/profile/rewards/${vaultConfig.id}`
                    )
                  }
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3">
      <div className="mb-2 h-[2px] w-8 bg-[#0f5132]" />

      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0f5132]">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-black tracking-tight">
        {title}
      </h2>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function VaultSummary({
  code,
  title,
  value,
}: {
  code: string;
  title: string;
  value: number;
}) {
  return (
    <div className="border-b border-r border-white/10 px-5 py-4">
      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#8eb89f]">
        {code}
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {title}
      </p>
    </div>
  );
}

function VaultCard({
  config,
  playerVault,
  onEnter,
}: {
  config: VaultConfig;
  playerVault: VaultData;
  onEnter: () => void;
}) {
  const isUnlocked =
    playerVault.unlockedVaults.includes(config.id);

  const openedBeforeVault =
    config.coinStart - 1;

  const coinsOpenedInVault = Math.min(
    50,
    Math.max(
      0,
      playerVault.totalCoinsOpened - openedBeforeVault
    )
  );

  const progress =
    (coinsOpenedInVault / 50) * 100;

  const completed =
    coinsOpenedInVault >= 50;

  const vaultStyle = {
    bronze: {
      code: "BRZ",
      border: "border-[#9a6a3a]",
      accent: "#9a6a3a",
      panel: "bg-[#fbf6f1]",
    },
    silver: {
      code: "SLV",
      border: "border-[#9ca3af]",
      accent: "#6b7280",
      panel: "bg-[#f8fafc]",
    },
    gold: {
      code: "GLD",
      border: "border-[#c9b37a]",
      accent: "#9a7531",
      panel: "bg-[#faf7ef]",
    },
    diamond: {
      code: "DIA",
      border: "border-[#7c95a5]",
      accent: "#4f6978",
      panel: "bg-[#f3f7f9]",
    },
  }[config.id];

  return (
    <div
      className={`overflow-hidden border bg-white shadow-sm ${
        isUnlocked
          ? vaultStyle.border
          : "border-slate-200 opacity-70"
      }`}
    >
      <div className="flex items-start gap-4 p-5">

        <div
          className={`flex h-14 min-w-14 items-center justify-center border px-2 text-[9px] font-black tracking-[0.08em] ${
            isUnlocked
              ? `${vaultStyle.border} ${vaultStyle.panel}`
              : "border-slate-200 bg-slate-50 text-slate-400"
          }`}
          style={{
            color: isUnlocked
              ? vaultStyle.accent
              : undefined,
          }}
        >
          {isUnlocked
            ? vaultStyle.code
            : "LOCK"}
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Coins {config.coinStart}–{config.coinEnd}
          </p>

          <h3 className="mt-1 text-xl font-black">
            {config.title}
          </h3>

          <p className="mt-2 text-sm leading-5 text-slate-500">
            {config.description}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4">

        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Vault Progress
          </p>

          <p className="text-sm font-black text-[#111827]">
            {coinsOpenedInVault} / 50
          </p>
        </div>

        <div className="mt-3 h-2 bg-slate-200">
          <div
            className="h-full"
            style={{
              width: `${Math.min(
                100,
                progress
              )}%`,
              backgroundColor: isUnlocked
                ? vaultStyle.accent
                : "#cbd5e1",
            }}
          />
        </div>

        <button
          type="button"
          onClick={onEnter}
          disabled={!isUnlocked}
          className={`mt-4 w-full border py-3 text-xs font-black uppercase tracking-[0.12em] ${
            isUnlocked
              ? "border-[#0f5132] bg-[#0f5132] text-white"
              : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          {!isUnlocked
            ? "Complete Previous Vault"
            : completed
              ? `${config.title} Completed`
              : `Enter ${config.title}`}
        </button>
      </div>
    </div>
  );
}