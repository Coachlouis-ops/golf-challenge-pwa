"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PitchFrame } from "./PitchFrame";
import { TeezWordmark } from "./TeezWordmark";

const actions = [
  "PLAY A MATCH",
  "CREATE A CHALLENGE",
  "CREATE YOUR GROUP",
  "BUILD YOUR GOLFING CAREER",
  "CREATE PERSONALIZED LIVE GOLFDAY SCORING",
];

export function HomeScreen() {
  const router = useRouter();

  const enterApp = () => {
    router.push("/main");
  };

  return (
    <PitchFrame>
      <div className="pitch-home">
        <Link href="/" className="pitch-back">
          ← Lobby
        </Link>

        <img
          src="/brand/teez-stadium-tile.png"
          alt="TEEZ honey badger"
          className="teez-badger"
        />
        <TeezWordmark />

        <p className="pitch-kicker pitch-gap">TEEZ GOLF CHALLENGES</p>

        <h1>Real golf. Real stakes.</h1>

        <p className="pitch-lede">Real golfers. Verified scores.</p>

        <div className="pitch-actions">
          <button type="button" onClick={enterApp} className="pitch-cta">
            OPEN APP
          </button>

          {actions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={enterApp}
              className="pitch-chip"
            >
              {action}
            </button>
          ))}
        </div>

        <p className="pitch-company">A Honey Badger Technologies Platform</p>
      </div>
    </PitchFrame>
  );
}
