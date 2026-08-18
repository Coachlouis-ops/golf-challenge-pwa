"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  httpsCallable,
} from "firebase/functions";

import { useAuth } from "@/src/lib/AuthContext";
import {
  db,
  functions,
} from "@/src/lib/firebase";

type OpenedCoin = {
  coinNumber: number;
  rewardType: string;
  rewardValue: number | string;
  rewardLabel: string;
  rewardIcon: string;
};

type CoinResult = OpenedCoin & {
  availableKeys: number;
  bronzeCoinsOpened: number;
  bronzeCompleted: boolean;
};

export default function BronzeVaultPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [openingCoin, setOpeningCoin] =
    useState<number | null>(null);

  const [openedCoins, setOpenedCoins] =
    useState<Record<number, OpenedCoin>>({});

  const [availableKeys, setAvailableKeys] =
    useState(0);

  const [revealedCoin, setRevealedCoin] =
    useState<CoinResult | null>(null);

  const loadBronzeVault = useCallback(async () => {
    if (!user) return;

    const syncVaultKeys = httpsCallable(
      functions,
      "syncVaultKeys"
    );

    const syncResult = await syncVaultKeys();

    const syncData = syncResult.data as {
      availableKeys?: number;
    };

    setAvailableKeys(
      Number(syncData.availableKeys ?? 0)
    );

    const coinsSnap = await getDocs(
      collection(
        db,
        "userVaults",
        user.uid,
        "coins"
      )
    );

    const coins: Record<number, OpenedCoin> = {};

    coinsSnap.docs.forEach((coinDoc) => {
      const data = coinDoc.data();

      if (
        data.vault === "bronze" &&
        Number.isInteger(Number(data.coinNumber))
      ) {
        const coinNumber = Number(data.coinNumber);

        coins[coinNumber] = {
          coinNumber,
          rewardType: String(
            data.rewardType ?? ""
          ),
          rewardValue:
            data.rewardValue ?? 0,
          rewardLabel: String(
            data.rewardLabel ?? "Reward"
          ),
          rewardIcon: String(
            data.rewardIcon ?? "🎁"
          ),
        };
      }
    });

    setOpenedCoins(coins);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function initialiseVault() {
      try {
        await loadBronzeVault();
      } catch (error) {
        console.error(
          "Unable to load Bronze Vault:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    initialiseVault();
  }, [user, loadBronzeVault]);

  async function flipCoin(coinNumber: number) {
    if (
      openedCoins[coinNumber] ||
      openingCoin !== null ||
      availableKeys < 1
    ) {
      return;
    }

    setOpeningCoin(coinNumber);

    try {
      const openBronzeVaultCoin = httpsCallable<
        { coinNumber: number },
        {
          success: boolean;
          coin: CoinResult;
        }
      >(
        functions,
        "openBronzeVaultCoin"
      );

      const response =
        await openBronzeVaultCoin({
          coinNumber,
        });

      const result = response.data.coin;

      setOpenedCoins((current) => ({
        ...current,
        [coinNumber]: {
          coinNumber: result.coinNumber,
          rewardType: result.rewardType,
          rewardValue: result.rewardValue,
          rewardLabel: result.rewardLabel,
          rewardIcon: result.rewardIcon,
        },
      }));

      setAvailableKeys(result.availableKeys);
      setRevealedCoin(result);
    } catch (error: any) {
      console.error(
        "Unable to open Bronze Vault coin:",
        error
      );

      alert(
        error?.message ||
          "Unable to open this mystery coin."
      );
    } finally {
      setOpeningCoin(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6">
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber-600" />

          <p className="mt-4 font-semibold text-gray-700">
            Loading Bronze Vault...
          </p>
        </div>
      </main>
    );
  }

  const openedCount =
    Object.keys(openedCoins).length;

  const progress = Math.min(
    100,
    (openedCount / 50) * 100
  );

    return (
    <main className="min-h-screen bg-[#eef1f4] text-[#111827]">
      <div className="mx-auto max-w-md pb-14">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/profile/rewards")}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-xl text-slate-600"
              aria-label="Back to Player Vault"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#9a6a3a]">
                TEEZ Player Vault
              </p>

              <h1 className="mt-1 text-lg font-black tracking-tight">
                BRONZE VAULT
              </h1>
            </div>

            <div className="h-9 w-9" />
          </div>
        </header>

        <div className="space-y-7 px-4 pt-5">

          {/* HERO */}

          <section className="overflow-hidden border border-[#81562f] bg-[#18130f] shadow-[0_8px_22px_rgba(15,23,42,0.16)]">

            <div className="flex items-start gap-4 border-b border-white/10 p-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#a9794d] bg-[#2a1d14]">
                <span className="text-sm font-black tracking-[0.08em] text-[#c99662]">
                  BRZ
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b8895d]">
                  Vault Series 01
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
                  Mystery Coin Board
                </h2>

                <p className="mt-2 text-sm leading-5 text-slate-300">
                  Select any unopened coin. One Vault Key
                  is required for each reveal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/10">
              <VaultHeroStat
                label="KEYS"
                value={availableKeys}
              />

              <VaultHeroStat
                label="OPENED"
                value={openedCount}
              />

              <VaultHeroStat
                label="REMAINING"
                value={50 - openedCount}
              />
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Bronze Progress
                </p>

                <p className="text-xs font-black text-[#c99662]">
                  {openedCount} / 50
                </p>
              </div>

              <div className="mt-3 h-2 bg-white/10">
                <div
                  className="h-full bg-[#a96f3d]"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* NEW KEY STATUS */}

          {availableKeys > 0 ? (
            <section className="border border-[#b8c7bd] bg-[#f3f7f4] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#0f5132]">
                    Vault Access Available
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#111827]">
                    {availableKeys}{" "}
                    {availableKeys === 1 ? "key" : "keys"} available
                  </p>
                </div>

                <div className="flex h-10 min-w-10 items-center justify-center border border-[#0f5132] px-2">
                  <span className="text-xs font-black text-[#0f5132]">
                    {availableKeys}
                  </span>
                </div>
              </div>
            </section>
          ) : (
            <section className="border border-slate-200 bg-white px-5 py-4">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                Vault Access
              </p>

              <p className="mt-1 text-sm font-black text-[#111827]">
                No Vault Keys Available
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Continue your career and complete milestones
                to earn additional Vault Keys.
              </p>
            </section>
          )}

          {/* COIN BOARD */}

          <section>
            <SectionHeading
              eyebrow="BRONZE SERIES · COINS 01–50"
              title="Select a Mystery Coin"
              description="Opened coins remain permanently revealed on your personal board"
            />

            <div className="border border-[#b9926c] bg-[#f8f4ef] p-4 shadow-sm">

              <div className="mb-4 flex items-center justify-between border-b border-[#e4d7ca] pb-3">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#81562f]">
                  Official Coin Board
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  50 Positions
                </p>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {Array.from(
                  { length: 50 },
                  (_, index) => index + 1
                ).map((coinNumber) => (
                  <MysteryCoin
                    key={coinNumber}
                    coinNumber={coinNumber}
                    openedCoin={openedCoins[coinNumber]}
                    opening={openingCoin === coinNumber}
                    disabled={
                      availableKeys < 1 ||
                      openingCoin !== null
                    }
                    onOpen={() => flipCoin(coinNumber)}
                  />
                ))}
              </div>

              <div className="mt-4 border-t border-[#e4d7ca] pt-3">
                <div className="flex items-center justify-between">
                  <BoardLegend
                    marker="01"
                    text="Available"
                  />

                  <BoardLegend
                    marker="✓"
                    text="Opened"
                  />

                  <BoardLegend
                    marker="—"
                    text="Locked"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* COMPLETION */}

          {openedCount >= 50 && (
            <section className="overflow-hidden border border-[#c9b37a] bg-white shadow-sm">
              <div className="p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#9a7531]">
                  Vault Completed
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Bronze Series Complete
                </h2>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  All 50 Bronze mystery coins have been opened.
                  Your next Vault tier is now available.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/profile/rewards")}
                className="w-full border-t border-[#c9b37a] bg-[#0d1821] py-4 text-xs font-black uppercase tracking-[0.14em] text-white"
              >
                Continue to Silver Vault
              </button>
            </section>
          )}

        </div>
      </div>

      {revealedCoin && (
        <CoinRevealModal
          coin={revealedCoin}
          onClose={() => setRevealedCoin(null)}
        />
      )}
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
      <div className="mb-2 h-[2px] w-8 bg-[#9a6a3a]" />

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a6a3a]">
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

function VaultHeroStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="px-2 py-4 text-center">
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

function BoardLegend({
  marker,
  text,
}: {
  marker: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex h-5 min-w-5 items-center justify-center border border-[#b9926c] bg-white px-1 text-[7px] font-black text-[#81562f]">
        {marker}
      </span>

      <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {text}
      </span>
    </div>
  );
}

function MysteryCoin({
  coinNumber,
  openedCoin,
  opening,
  disabled,
  onOpen,
}: {
  coinNumber: number;
  openedCoin?: OpenedCoin;
  opening: boolean;
  disabled: boolean;
  onOpen: () => void;
}) {
  const opened = Boolean(openedCoin);

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={opened || opening || disabled}
      title={
        opened
          ? openedCoin?.rewardLabel
          : `Mystery Coin ${coinNumber}`
      }
      className={`relative aspect-square rounded-full border text-[9px] font-black ${
        opened
          ? "border-[#6d927c] bg-[#eaf2ed] text-[#0f5132]"
          : opening
            ? "animate-[spin_0.7s_linear_infinite] border-[#c99662] bg-[#d5a26e] text-white"
            : disabled
              ? "cursor-not-allowed border-slate-300 bg-slate-200 text-slate-400"
              : "border-[#81562f] bg-[#a96f3d] text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.14),0_2px_4px_rgba(60,35,20,0.18)] active:scale-95"
      }`}
    >
      {opened ? (
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-sm leading-none">
            {openedCoin?.rewardIcon}
          </span>

          <span className="mt-1 text-[7px]">
            {coinNumber}
          </span>
        </div>
      ) : opening ? (
        <span className="text-[8px] uppercase tracking-wide">
          OPEN
        </span>
      ) : (
        <>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] text-[11px] font-black">
            T
          </span>

          <span className="absolute bottom-[4px] left-0 right-0 text-[7px] font-bold">
            {String(coinNumber).padStart(2, "0")}
          </span>
        </>
      )}
    </button>
  );
}

function CoinRevealModal({
  coin,
  onClose,
}: {
  coin: CoinResult;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07100c]/90 px-6 backdrop-blur-sm">

      <div className="w-full max-w-sm overflow-hidden border border-[#b9926c] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.4)]">

        <div className="bg-[#18130f] px-6 py-5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#c99662]">
            Bronze Vault · Coin {String(coin.coinNumber).padStart(2, "0")}
          </p>

          <h2 className="mt-1 text-xl font-black text-white">
            Reward Revealed
          </h2>
        </div>

        <div className="px-6 py-7 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#9a6a3a] bg-[#f8f4ef] shadow-[inset_0_0_0_5px_#ffffff]">
            <span className="text-4xl">
              {coin.rewardIcon}
            </span>
          </div>

          <p className="mt-6 text-[9px] font-black uppercase tracking-[0.18em] text-[#0f5132]">
            Player Reward
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-tight text-[#111827]">
            {coin.rewardLabel}
          </h3>

          <p className="mt-3 text-sm leading-5 text-slate-500">
            This reward has been applied to your player account.
          </p>

          <div className="mt-6 grid grid-cols-2 border border-slate-200">
            <div className="border-r border-slate-200 px-3 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Keys Remaining
              </p>

              <p className="mt-1 text-lg font-black">
                {coin.availableKeys}
              </p>
            </div>

            <div className="px-3 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Bronze Opened
              </p>

              <p className="mt-1 text-lg font-black">
                {coin.bronzeCoinsOpened} / 50
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full border border-[#0f5132] bg-[#0f5132] py-3 text-xs font-black uppercase tracking-[0.14em] text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}