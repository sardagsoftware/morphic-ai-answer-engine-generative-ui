import React from 'react'

export default function AnimatedLogo({
  className = 'h-8 w-auto'
}: {
  className?: string
}) {
  // The svg uses currentColor for text and shapes so the surrounding CSS (theme) controls color.
  return (
    <svg
      className={className}
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="24" rx="4" fill="currentColor" opacity="0.06" />
      <g transform="translate(6,4)">
        <g>
          <circle cx="6" cy="6" r="6" fill="currentColor">
            <animate attributeName="r" values="6;7;6" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text
            x="18"
            y="10"
            fontFamily="Inter, Arial"
            fontSize="10"
            fontWeight="700"
            fill="currentColor"
          >
            <tspan>Ait</tspan>
            <tspan style={{ fontWeight: 800 }}>Bondie</tspan>
          </text>
        </g>
      </g>
    </svg>
  )
}
