export type LiveBoardRow = {
  position?: number;
  displayName?: string;
  division?: string;
  total?: number | string | null;
  countOutPosition?: string;
};

function formatTotal(total: LiveBoardRow["total"]) {
  if (total == null || total === "") return "-";
  return String(total);
}

export function LiveBoard({
  title,
  meta,
  rows,
  emptyMessage,
  footnote,
  sampleBanner,
}: {
  title: string;
  meta: string;
  rows: LiveBoardRow[];
  emptyMessage: string;
  footnote: string;
  sampleBanner?: string;
}) {
  return (
    <section className="pitch-board">
      {sampleBanner ? (
        <p className="pitch-sample-banner">{sampleBanner}</p>
      ) : null}

      <div className="pitch-board-head">
        <div>
          <p className="pitch-kicker">Live scoreboard</p>
          <h1>{title}</h1>
          <p className="pitch-meta">{meta}</p>
        </div>

        <div>
          <div className="pitch-live-pill">
            <span className="pitch-live-dot" aria-hidden="true" />
            LIVE
          </div>
          <p className="pitch-updates">Updates automatically</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="pitch-empty">{emptyMessage}</div>
      ) : (
        <div className="pitch-table">
          <div className="pitch-row pitch-row-head">
            <span>POS</span>
            <span>PLAYER / TEAM</span>
            <span>DIVISION</span>
            <span>SCORE</span>
            <span>COUNT OUT</span>
          </div>

          {rows.map((row, index) => {
            const position = row.position || index + 1;
            const isLeader = position === 1;

            return (
              <div
                key={`${row.displayName || "row"}-${index}`}
                className={`pitch-row${isLeader ? " pitch-leader" : ""}`}
              >
                <span className="pitch-pos">{position}</span>
                <span className="pitch-player">
                  {row.displayName || "-"}
                </span>
                <span>{row.division || "-"}</span>
                <span className="pitch-score">{formatTotal(row.total)}</span>
                <span>{row.countOutPosition || "-"}</span>
              </div>
            );
          })}
        </div>
      )}

      <p className="pitch-footnote">{footnote}</p>
    </section>
  );
}
