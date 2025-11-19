export default function Logo({ size = 40, className = '' }) {
  const stroke = '#60A5FA' // blue-400
  const glow = 'drop-shadow(0 0 12px rgba(96,165,250,0.55))'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Study Forge Logo"
    >
      <defs>
        <linearGradient id="sf-grad" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Hex base */}
      <path
        d="M32 4l20 12v24L32 52 12 40V16L32 4z"
        fill="#0b0b0b"
        stroke="url(#sf-grad)"
        strokeWidth="2.5"
        style={{ filter: glow }}
      />
      {/* Stylized S */}
      <path
        d="M44 22c0-4.418-4.477-8-10-8-4.418 0-8 2.015-9.5 4.8m0 0L26 22m0 0c1.2-2 3.9-3 8-3 3.866 0 6 1.254 6 3 0 5-14 3-14 10 0 3.314 3.582 6 8 6 3.49 0 6.47-1.372 7.9-3.4M42 34l-1.5-1.4"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: glow }}
      />
      {/* Spark */}
      <circle cx="48" cy="18" r="2" fill="url(#sf-grad)" style={{ filter: glow }} />
    </svg>
  )
}
