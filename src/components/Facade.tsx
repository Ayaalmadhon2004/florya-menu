/**
 * Hand-drawn restaurant front at night: arched windows, striped awning, lanterns.
 * Pure SVG, so it loads instantly and follows the theme. To use a real photo
 * instead, set `coverImage` in src/config/restaurant.ts.
 */
export default function Facade() {
  const windows = [58, 160, 262];
  return (
    <svg viewBox="0 0 400 270" className="h-full w-full" preserveAspectRatio="xMidYMax slice" role="img" aria-label="">
      <defs>
        <linearGradient id="fa-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B0B0E" />
          <stop offset="1" stopColor="#4A1D25" />
        </linearGradient>
        <linearGradient id="fa-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9DCC3" />
          <stop offset="1" stopColor="#C9B58F" />
        </linearGradient>
        <linearGradient id="fa-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE3A1" />
          <stop offset="1" stopColor="#F2A944" />
        </linearGradient>
        <radialGradient id="fa-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFD98A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
        </radialGradient>
        <pattern id="fa-awning" width="24" height="26" patternUnits="userSpaceOnUse">
          <rect width="12" height="26" fill="#722F37" />
          <rect x="12" width="12" height="26" fill="#F3EAD8" />
        </pattern>
      </defs>

      <rect width="400" height="270" fill="url(#fa-sky)" />
      {[[30, 24], [92, 52], [150, 18], [230, 40], [300, 20], [352, 58], [372, 14], [200, 66]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1} fill="#FFF3D1" opacity={0.75} />
      ))}
      <circle cx="338" cy="44" r="14" fill="#F7E7B8" opacity="0.92" />

      {/* building */}
      <rect x="20" y="78" width="360" height="192" fill="url(#fa-wall)" />
      <rect x="14" y="70" width="372" height="12" fill="#B08D3C" />
      <rect x="14" y="82" width="372" height="3" fill="#8A6C2A" />
      {[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x) => (
        <rect key={x} x={x} y="62" width="10" height="9" fill="#B08D3C" />
      ))}

      {/* upper arched windows */}
      {windows.map((x) => (
        <g key={x}>
          <path d={`M${x} 150 V112 a32 32 0 0 1 64 0 V150 Z`} fill="url(#fa-glow)" stroke="#8A6C2A" strokeWidth="3" />
          <path d={`M${x + 32} 80 V150 M${x} 118 H${x + 64}`} stroke="#8A6C2A" strokeWidth="2" />
        </g>
      ))}

      {/* awning */}
      <path d="M20 168 H380 L392 196 H8 Z" fill="url(#fa-awning)" />
      <path d="M8 196 H392 v6 a6 6 0 0 1 -12 0 a6 6 0 0 1 -12 0 a6 6 0 0 1 -12 0 H8 Z" fill="#722F37" opacity="0" />
      <rect x="8" y="194" width="384" height="4" fill="#4A1D25" />

      {/* door and ground-floor windows */}
      <path d="M168 270 V226 a32 32 0 0 1 64 0 V270 Z" fill="#3A1218" stroke="#B08D3C" strokeWidth="3" />
      <path d="M176 270 V228 a24 24 0 0 1 48 0 V270 Z" fill="url(#fa-glow)" opacity="0.9" />
      <path d="M200 205 V270" stroke="#8A6C2A" strokeWidth="2" />
      {[44, 276].map((x) => (
        <g key={x}>
          <path d={`M${x} 262 V226 a40 24 0 0 1 80 0 V262 Z`} fill="url(#fa-glow)" stroke="#8A6C2A" strokeWidth="3" />
          <path d={`M${x + 40} 202 V262`} stroke="#8A6C2A" strokeWidth="2" />
        </g>
      ))}

      {/* lanterns */}
      {[148, 252].map((x) => (
        <g key={x}>
          <circle cx={x} cy="222" r="26" fill="url(#fa-lamp)" />
          <rect x={x - 4} y="212" width="8" height="14" rx="2" fill="#FFE3A1" stroke="#8A6C2A" strokeWidth="1.5" />
          <path d={`M${x} 200 V212`} stroke="#8A6C2A" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="0" y="266" width="400" height="4" fill="#2A1215" />
    </svg>
  );
}
