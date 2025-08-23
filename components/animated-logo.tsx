import React from 'react'

export default function AnimatedLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="120" height="24" rx="4" fill="url(#g1)" opacity="0.06" />
      <g transform="translate(6,4)">
        <g>
          <circle cx="6" cy="6" r="6" fill="#7c3aed">
            <animate attributeName="r" values="6;7;6" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="18" y="10" fontFamily="Inter, Arial" fontSize="10" fontWeight="700" fill="#111827">
            <tspan> Ait</tspan>
            <tspan fill="#7c3aed">Bondie</tspan>
          </text>
        </g>
      </g>
    </svg>
  )
}
