export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <path d="M0 10 H40" />
      <path d="M80 10 H120" />
      <circle cx="60" cy="10" r="3.5" />
      <circle cx="60" cy="10" r="6.5" />
      <path d="M46 10 Q52 4 58 10 Q52 16 46 10 Z" />
      <path d="M74 10 Q68 4 62 10 Q68 16 74 10 Z" />
      <circle cx="42" cy="10" r="1" fill="currentColor" />
      <circle cx="78" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

export function Paisley({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M20 4 C 28 10 30 20 24 28 C 20 33 14 32 12 27 C 10 22 14 18 18 20 C 22 22 22 26 20 27" />
      <circle cx="20" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}
