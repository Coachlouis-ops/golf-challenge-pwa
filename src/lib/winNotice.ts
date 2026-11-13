export type WinNotice = {
  id: string;
  challengeId: string;
  challengeTitle: string;
  amount: number;
  currency: "ZAR";
  message?: string;
  dismissed?: boolean;
};

export function formatWinAmount(amount: number): string {
  const value = Number.isFinite(amount) ? Math.round(amount * 100) / 100 : 0;
  if (Number.isInteger(value)) {
    return `R${value.toLocaleString("en-ZA")}`;
  }
  return `R${value.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function winNoticeHeadline(amount: number): string {
  return `YOU WON ${formatWinAmount(amount)}`;
}

export function dismissedWinNoticeKey(uid: string, noticeId: string): string {
  return `teezDismissedWinNotice:${uid}:${noticeId}`;
}

export function readWinNotice(value: unknown): WinNotice | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const amount = Number(data.amount);
  const id = typeof data.id === "string" ? data.id.trim() : "";
  if (!id || !Number.isFinite(amount) || amount <= 0) return null;

  return {
    id,
    challengeId: typeof data.challengeId === "string" ? data.challengeId : "",
    challengeTitle: typeof data.challengeTitle === "string" ? data.challengeTitle : "",
    amount,
    currency: "ZAR",
    message: typeof data.message === "string" ? data.message : undefined,
    dismissed: data.dismissed === true,
  };
}
