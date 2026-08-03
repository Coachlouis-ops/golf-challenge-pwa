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
    <main className="min-h-screen bg-[#f4f6f8] text-gray-900">
      <div className="mx-auto max-w-md pb-12">
        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-5 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                router.push("/profile/rewards")
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-600 hover:bg-gray-100"
              aria-label="Back to Player Vault"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                Mystery Coin Board
              </p>

              <h1 className="text-xl font-black">
                Bronze Vault
              </h1>
            </div>

            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          {/* HERO */}

          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#74431f] via-[#3f2414] to-black p-6 text-white shadow-[0_14px_35px_rgba(120,53,15,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/30 bg-white/10 text-4xl">
                🥉
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Vault One
                </p>

                <h2 className="mt-1 text-3xl font-black">
                  Flip a Coin
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-amber-50/80">
              Use one Vault Key to flip any unopened
              mystery coin. The reward beneath it is
              selected securely when the coin opens.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <VaultStat
                label="Available Keys"
                value={availableKeys}
              />

              <VaultStat
                label="Coins Opened"
                value={`${openedCount} / 50`}
              />
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs font-bold text-amber-100">
                <span>Bronze progress</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* NO KEYS NOTICE */}

          {availableKeys < 1 && (
            <section className="rounded-[22px] border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="font-black text-gray-800">
                No Vault Keys available
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Complete more career milestones to earn
                another key.
              </p>
            </section>
          )}

          {/* COIN BOARD */}

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Choose a Mystery Coin
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Every unopened coin can hide a different
                career reward.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-3 rounded-[28px] border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-4 shadow-[0_10px_30px_rgba(120,53,15,0.10)]">
              {Array.from(
                { length: 50 },
                (_, index) => index + 1
              ).map((coinNumber) => (
                <MysteryCoin
                  key={coinNumber}
                  coinNumber={coinNumber}
                  openedCoin={
                    openedCoins[coinNumber]
                  }
                  opening={
                    openingCoin === coinNumber
                  }
                  disabled={
                    availableKeys < 1 ||
                    openingCoin !== null
                  }
                  onOpen={() =>
                    flipCoin(coinNumber)
                  }
                />
              ))}
            </div>
          </section>

          {openedCount >= 50 && (
            <button
              type="button"
              onClick={() =>
                router.push("/profile/rewards")
              }
              className="w-full rounded-2xl bg-gray-900 py-4 font-black text-white"
            >
              Bronze Complete — Unlock Silver
            </button>
          )}
        </div>
      </div>

      {revealedCoin && (
        <CoinRevealModal
          coin={revealedCoin}
          onClose={() =>
            setRevealedCoin(null)
          }
        />
      )}
    </main>
  );
}

function VaultStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-xs font-semibold text-amber-100/70">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
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
      disabled={
        opened ||
        opening ||
        disabled
      }
      title={
        opened
          ? openedCoin?.rewardLabel
          : `Mystery Coin ${coinNumber}`
      }
      className={`relative aspect-square rounded-full border-2 text-xs font-black shadow-md transition ${
        opened
          ? "border-green-400 bg-green-100 text-green-800"
          : opening
            ? "animate-[spin_0.7s_linear_infinite] border-amber-400 bg-amber-300 text-amber-900"
            : disabled
              ? "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400"
              : "border-amber-700 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 text-white hover:-translate-y-1 hover:scale-105 active:rotate-180"
      }`}
    >
      {opened ? (
        <span className="text-lg">
          {openedCoin?.rewardIcon}
        </span>
      ) : opening ? (
        <span className="text-base">🪙</span>
      ) : (
        <>
          <span className="block text-base">
            🪙
          </span>

          <span className="absolute bottom-1 left-0 right-0 text-[8px]">
            {coinNumber}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-[rewardReveal_0.5s_ease-out] rounded-[30px] border border-amber-300 bg-white p-7 text-center shadow-[0_0_70px_rgba(245,158,11,0.45)]">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-700">
          Coin {coin.coinNumber} Opened
        </p>

        <div className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-full border-4 border-amber-500 bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 text-6xl shadow-[0_0_35px_rgba(245,158,11,0.45)]">
          {coin.rewardIcon}
        </div>

        <h2 className="mt-6 text-2xl font-black">
          Reward Revealed
        </h2>

        <div className="mt-4 rounded-2xl bg-green-50 px-4 py-5 text-xl font-black text-green-700">
          {coin.rewardLabel}
        </div>

        <p className="mt-4 text-sm text-gray-500">
          The reward has been added to your player
          account.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-green-600 py-3 font-black text-white hover:bg-green-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
}