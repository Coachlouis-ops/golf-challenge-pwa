export const WALLET_DEPOSIT_AMOUNTS = [25, 50, 75, 100, 150, 200, 250] as const;

export type WalletDepositAmount = (typeof WALLET_DEPOSIT_AMOUNTS)[number];

export function isWalletDepositAmount(
  value: unknown
): value is WalletDepositAmount {
  const amount = typeof value === "number" ? value : Number(value);

  return (
    Number.isInteger(amount) &&
    (WALLET_DEPOSIT_AMOUNTS as readonly number[]).includes(amount)
  );
}

export function formatWalletRand(amount: number): string {
  const value = Number.isFinite(amount) ? amount : 0;

  return `R${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
