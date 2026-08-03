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
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6">
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />

          <p className="mt-4 font-semibold text-gray-700">
            Loading Player Vault...
          </p>
        </div>
      </main>
    );
  }

  const completedMilestones = Object.keys(
    vault.claimedMilestones ?? {}
  ).length;

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
                Career Rewards
              </p>

              <h1 className="text-xl font-black">
                Player Vault
              </h1>
            </div>

            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          {/* HERO */}

          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#153d2b] via-[#10271c] to-black p-6 text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-400">
              Mystery Coin Vault
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Earn Keys. Flip Coins.
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              Career milestones award Vault Keys. Use each key to open
              one mystery coin and reveal an in-game reward.
            </p>

            {newKeysEarned > 0 && (
              <div className="mt-5 rounded-2xl border border-green-400/30 bg-green-400/15 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-green-300">
                  New milestone reward
                </p>

                <p className="mt-1 text-2xl font-black">
                  +{newKeysEarned} Vault{" "}
                  {newKeysEarned === 1 ? "Key" : "Keys"}
                </p>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <SummaryCard
                title="Available Keys"
                value={vault.availableKeys}
              />

              <SummaryCard
                title="Lifetime Keys"
                value={vault.lifetimeKeysEarned}
              />

              <SummaryCard
                title="Coins Opened"
                value={vault.totalCoinsOpened}
              />

              <SummaryCard
                title="Milestones"
                value={completedMilestones}
              />
            </div>
          </section>

          {/* VAULTS */}

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Career Vaults
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Complete each vault to unlock the next board.
              </p>
            </div>

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

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-xs font-semibold text-gray-300">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black text-white">
        {value}
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
      playerVault.totalCoinsOpened -
        openedBeforeVault
    )
  );

  const progress =
    (coinsOpenedInVault / 50) * 100;

  const completed = coinsOpenedInVault >= 50;

  return (
    <div
      className={`overflow-hidden rounded-[26px] border bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${
        isUnlocked
          ? "border-gray-200"
          : "border-gray-200 opacity-70"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl ${
              isUnlocked
                ? "bg-gray-100"
                : "bg-gray-100 grayscale"
            }`}
          >
            {isUnlocked ? config.icon : "🔒"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              Coins {config.coinStart}–{config.coinEnd}
            </p>

            <h3 className="mt-1 text-xl font-black">
              {config.title}
            </h3>

            <p className="mt-2 text-sm leading-5 text-gray-500">
              {config.description}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-bold">
            <span className="text-gray-500">
              Vault progress
            </span>

            <span className="text-gray-800">
              {coinsOpenedInVault} / 50
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${Math.min(100, progress)}%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onEnter}
          disabled={!isUnlocked}
          className={`mt-5 w-full rounded-2xl py-3 text-sm font-black transition ${
            isUnlocked
              ? "bg-green-600 text-white hover:bg-green-500"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          {!isUnlocked
            ? `Complete the previous vault`
            : completed
              ? `${config.title} Completed`
              : `Enter ${config.title}`}
        </button>
      </div>
    </div>
  );
}