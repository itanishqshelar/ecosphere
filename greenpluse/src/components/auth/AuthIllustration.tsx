export function AuthIllustration() {
  return (
    <svg viewBox="0 0 520 640" fill="none" className="w-full h-full">
      {/* Background gradient */}
      <rect width="520" height="640" rx="24" fill="url(#auth-bg)" />

      {/* Grid pattern */}
      <g opacity="0.06">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={60 + i * 50} x2="520" y2={60 + i * 50} stroke="white" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 52} y1="0" x2={40 + i * 52} y2="640" stroke="white" strokeWidth="0.5" />
        ))}
      </g>

      {/* Dashboard mockup card */}
      <rect x="80" y="100" width="360" height="240" rx="16" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.2" />

      {/* Top bar dots */}
      <circle cx="100" cy="118" r="4" fill="#ef4444" />
      <circle cx="114" cy="118" r="4" fill="#f59e0b" />
      <circle cx="128" cy="118" r="4" fill="#22c55e" />

      {/* ESG Score ring */}
      <circle cx="180" cy="200" r="48" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
      <circle cx="180" cy="200" r="48" stroke="url(#score-grad)" strokeWidth="6" fill="none" strokeDasharray="226" strokeDashoffset="68" strokeLinecap="round" transform="rotate(-90 180 200)" />
      <text x="180" y="204" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="Inter">87</text>
      <text x="180" y="218" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="500" fontFamily="Inter">ESG Score</text>

      {/* Mini bars */}
      <rect x="260" y="160" width="140" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="260" y="160" width="105" height="8" rx="4" fill="#22c55e" />
      <text x="408" y="167" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter" fontWeight="600">76%</text>

      <rect x="260" y="180" width="140" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="260" y="180" width="115" height="8" rx="4" fill="#3b82f6" />
      <text x="408" y="187" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter" fontWeight="600">82%</text>

      <rect x="260" y="200" width="140" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="260" y="200" width="127" height="8" rx="4" fill="#a855f7" />
      <text x="408" y="207" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter" fontWeight="600">91%</text>

      {/* Bottom KPI cards */}
      <rect x="100" y="280" width="80" height="40" rx="8" fill="rgba(255,255,255,0.08)" />
      <text x="140" y="300" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter">1.2K</text>
      <text x="140" y="312" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter">tCO₂</text>

      <rect x="190" y="280" width="80" height="40" rx="8" fill="rgba(255,255,255,0.08)" />
      <text x="230" y="300" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter">74%</text>
      <text x="230" y="312" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter">CSR</text>

      <rect x="280" y="280" width="80" height="40" rx="8" fill="rgba(255,255,255,0.08)" />
      <text x="320" y="300" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter">48K</text>
      <text x="320" y="312" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter">XP</text>

      {/* Bottom cards */}
      <rect x="80" y="380" width="170" height="120" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.08" />
      <text x="100" y="408" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter" fontWeight="600">Carbon Trend</text>
      {[45, 38, 52, 48, 62, 55, 70].map((h, i) => (
        <rect key={i} x={100 + i * 19} y={460 - h * 0.5} width="12" height={h * 0.5} rx="3" fill="#22c55e" fillOpacity="0.7" />
      ))}

      <rect x="270" y="380" width="170" height="120" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.08" />
      <text x="290" y="408" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter" fontWeight="600">Department</text>
      <text x="290" y="428" fill="white" fontSize="28" fontWeight="700" fontFamily="Inter">3</text>
      <text x="290" y="442" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter" fontWeight="500">Active Challenges</text>
      <text x="290" y="462" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter" fontWeight="500">42 Participants</text>

      {/* Bottom text */}
      <text x="260" y="560" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="Inter" fontWeight="500">Enterprise ESG Operating System</text>

      <defs>
        <linearGradient id="auth-bg" x1="0" y1="0" x2="520" y2="640">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#166534" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}
