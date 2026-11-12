import { redirectToBookmakerPolicy } from "@/app/bookmaker/redirect";

export default function PaymentPolicyRedirectPage() {
  redirectToBookmakerPolicy("/bookmaker/deposits-withdrawals");
}
