import Link from "next/link";
import { PitchFrame } from "./PitchFrame";
import { TeezWordmark } from "./TeezWordmark";

const CATEGORIES = ["Slots", "Sports", "Tables", "Crash", "Game Shows"];

const PLACEHOLDER_TILES = ["01", "02", "03", "04", "05", "06"];

export function ZarbetLobby() {
  return (
    <PitchFrame>
      <div className="pitch-lobby">
        <header className="pitch-topbar">
          <div>
            <p className="pitch-kicker">Placeholder operator</p>
            <p className="pitch-zarbet" aria-label="ZARbet placeholder wordmark">
              ZAR<span className="pitch-zarbet-accent">bet</span>
            </p>
            <p className="pitch-fine">
              Generic text wordmark. Not the operator logo or brand assets.
            </p>
          </div>

          <div className="pitch-wallet" aria-hidden="true">
            <span>Placeholder wallet</span>
            <strong>Demo</strong>
          </div>
        </header>

        <p className="pitch-banner">
          Demo placeholder · Not ZARbet · No real money
        </p>

        <div className="pitch-cats" aria-hidden="true">
          {CATEGORIES.map((category) => (
            <span key={category} className="pitch-cat">
              {category}
            </span>
          ))}
        </div>
        <p className="pitch-fine">Category chips are inert placeholders.</p>

        <div className="pitch-section-label">
          <span>Featured</span>
          <span>New</span>
        </div>

        <Link href="/home" className="pitch-featured">
          <div>
            <TeezWordmark />
            <p className="pitch-kicker pitch-gap">New · Player vs player</p>
            <h1>TEEZ Golf Challenges</h1>
            <p className="pitch-lede">
              Real golf. Real golfers. Real stakes.
            </p>
            <span className="pitch-cta">Play now</span>
          </div>
          <img
            src="/brand/teez-stadium-tile.png"
            alt="TEEZ honey badger"
            className="teez-badger"
          />
        </Link>
        <p className="pitch-mascot-note">TEEZ game icon</p>

        <div className="pitch-section-label">
          <span>Lobby tiles</span>
          <span>Placeholder</span>
        </div>

        <div className="pitch-placeholders" aria-hidden="true">
          {PLACEHOLDER_TILES.map((tile) => (
            <div key={tile} className="pitch-ph-tile">
              <span className="pitch-ph-index">{tile}</span>
              <strong>Placeholder</strong>
              <span>Not a game</span>
            </div>
          ))}
        </div>
        <p className="pitch-fine">
          Generic tiles are placeholders, not products.
        </p>
      </div>
    </PitchFrame>
  );
}
