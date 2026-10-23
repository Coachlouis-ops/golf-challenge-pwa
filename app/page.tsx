import type { Metadata } from "next";
import { ZarbetLobby } from "@/src/components/pitch/ZarbetLobby";

export const metadata: Metadata = {
  title: "Lobby placeholder",
  description:
    "Style-preview placeholder lobby. Not ZARbet. No real money.",
};

export default function Page() {
  return <ZarbetLobby />;
}
