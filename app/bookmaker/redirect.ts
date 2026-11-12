import { permanentRedirect } from "next/navigation";

export function redirectToBookmakerPolicy(href: string): never {
  permanentRedirect(href);
}
