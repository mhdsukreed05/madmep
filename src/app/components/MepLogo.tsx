interface MepLogoProps {
  size?: "sm" | "md" | "lg";
}

export function MepLogo({ size = "md" }: MepLogoProps) {
  const dims = {
    sm: { outer: 48, icon: 28, rx: 12 },
    md: { outer: 64, icon: 38, rx: 16 },
    lg: { outer: 96, icon: 56, rx: 24 },
  }[size];

  return (
    <div
      className="flex items-center justify-center shadow-lg"
      style={{
        width: dims.outer,
        height: dims.outer,
        borderRadius: dims.rx,
        background: "linear-gradient(145deg, #1E3A8A 0%, #2563EB 60%, #3B82F6 100%)",
        flexShrink: 0,
      }}
    >
      <svg
        width={dims.icon}
        height={dims.icon}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* M — Mechanical */}
        <rect x="2" y="4" width="34" height="7" rx="3.5" fill="#93C5FD" />
        {/* E — Electrical */}
        <rect x="2" y="15.5" width="34" height="7" rx="3.5" fill="#FCD34D" />
        {/* P — Plumbing */}
        <rect x="2" y="27" width="34" height="7" rx="3.5" fill="#6EE7B7" />
      </svg>
    </div>
  );
}
