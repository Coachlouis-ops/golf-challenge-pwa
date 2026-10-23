import type { ReactNode } from "react";

export function PitchFrame({ children }: { children: ReactNode }) {
  return (
    <div className="pitch-root" data-pitch-theme="stadium">
      <div className="pitch-main">{children}</div>
    </div>
  );
}
