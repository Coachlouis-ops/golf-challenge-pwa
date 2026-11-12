import { redirectToBookmakerPolicy } from "@/app/bookmaker/redirect";

export default function RefundPolicyRedirectPage() {
  redirectToBookmakerPolicy("/bookmaker/deposits-withdrawals");
}
