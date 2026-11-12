export const bookmakerPolicies = [
  {
    href: "/bookmaker/terms",
    label: "ABC Bookmakers Terms & Conditions",
  },
  {
    href: "/bookmaker/privacy",
    label: "ABC Bookmakers Privacy Policy",
  },
  {
    href: "/bookmaker/responsible-gambling",
    label: "Responsible Gambling Policy",
  },
  {
    href: "/bookmaker/fica-aml",
    label: "FICA & Anti-Money Laundering Policy",
  },
  {
    href: "/bookmaker/betting-rules",
    label: "Betting Rules",
  },
  {
    href: "/bookmaker/deposits-withdrawals",
    label: "Deposits & Withdrawals Policy",
  },
  {
    href: "/bookmaker/cookies",
    label: "Cookie Policy",
  },
  {
    href: "/bookmaker/acceptable-use",
    label: "Acceptable Use Policy",
  },
  {
    href: "/bookmaker/community-rules",
    label: "Community & Competition Rules",
  },
] as const;

export function bookmakerPolicyAcceptanceList(): string {
  const labels = bookmakerPolicies.map((policy) => policy.label);
  if (labels.length < 2) {
    return labels.join("");
  }
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

export type BookmakerPolicy = (typeof bookmakerPolicies)[number];

export const bookmakerPolicyUpdated = "12 November 2026";
