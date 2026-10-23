export function TeezWordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`teez-lockup ${className}`.trim()}>
      <svg
        className="teez-mark"
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <rect className="teez-wordmark-badge" width="52" height="52" rx="12" />
        <path
          className="teez-wordmark-mark"
          d="M15 40.5V11.5h3.1v8.2h16.6l-4.7 6.6 4.7 6.6H18.1v7.6H15z"
        />
        <circle className="teez-wordmark-mark" cx="36.5" cy="14.5" r="2.1" />
      </svg>
      <span className="teez-name">TEEZ</span>
    </div>
  );
}
