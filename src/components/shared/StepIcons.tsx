import React from "react";

export function ExploreStepIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="exploreBg" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08241b" />
          <stop offset="1" stopColor="#11442f" />
        </linearGradient>
        <linearGradient id="exploreGold" x1="30" y1="25" x2="60" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e9cf" />
          <stop offset="0.5" stopColor="#cfab55" />
          <stop offset="1" stopColor="#a37c2c" />
        </linearGradient>
        <filter id="exploreShadow" x="12" y="14" width="56" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#08241b" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background Rounded Shield */}
      <rect x="6" y="6" width="68" height="68" rx="20" fill="url(#exploreBg)" />
      
      {/* Decorative Accent Glow Lines */}
      <circle cx="20" cy="20" r="1.5" fill="#cfab55" opacity="0.6" />
      <circle cx="60" cy="22" r="2" fill="#cfab55" opacity="0.4" />
      <circle cx="64" cy="58" r="1.5" fill="#cfab55" opacity="0.5" />

      {/* Screen / Media Player Frame */}
      <g filter="url(#exploreShadow)">
        <rect x="18" y="20" width="44" height="34" rx="8" fill="#0c3326" stroke="#cfab55" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Top Header Dots on Screen */}
        <circle cx="24" cy="26" r="1.5" fill="#cfab55" opacity="0.8" />
        <circle cx="29" cy="26" r="1.5" fill="#cfab55" opacity="0.5" />
        <circle cx="34" cy="26" r="1.5" fill="#cfab55" opacity="0.3" />
        
        {/* Video Play Orb */}
        <circle cx="40" cy="38" r="9" fill="url(#exploreGold)" />
        <polygon points="38,34 45,38 38,42" fill="#08241b" />
      </g>

      {/* Search Discovery Lens Accent */}
      <g transform="translate(42, 38)">
        <circle cx="15" cy="15" r="7.5" fill="#08241b" stroke="url(#exploreGold)" strokeWidth="2.5" />
        <line x1="20.5" y1="20.5" x2="27" y2="27" stroke="url(#exploreGold)" strokeWidth="3" strokeLinecap="round" />
        {/* Sparkle inside lens */}
        <path d="M15 11.5L15.8 14.2L18.5 15L15.8 15.8L15 18.5L14.2 15.8L11.5 15L14.2 14.2Z" fill="#f3e9cf" />
      </g>
    </svg>
  );
}

export function ProgramStepIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="progBg" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08241b" />
          <stop offset="1" stopColor="#11442f" />
        </linearGradient>
        <linearGradient id="progGold" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e9cf" />
          <stop offset="0.5" stopColor="#cfab55" />
          <stop offset="1" stopColor="#a37c2c" />
        </linearGradient>
      </defs>

      {/* Background Rounded Shield */}
      <rect x="6" y="6" width="68" height="68" rx="20" fill="url(#progBg)" />

      {/* Star Accents */}
      <circle cx="18" cy="24" r="1.5" fill="#cfab55" opacity="0.6" />
      <circle cx="62" cy="18" r="2" fill="#cfab55" opacity="0.5" />

      {/* Stacked Program Modules/Cards */}
      {/* Bottom Track Card */}
      <rect x="20" y="44" width="40" height="15" rx="5" fill="#0c3326" stroke="#cfab55" strokeWidth="1" strokeOpacity="0.3" />
      
      {/* Middle Track Card */}
      <rect x="23" y="34" width="34" height="15" rx="5" fill="#185a3f" stroke="#cfab55" strokeWidth="1" strokeOpacity="0.4" />

      {/* Top Open Quran/Book of Knowledge */}
      <g transform="translate(18, 16)">
        <path
          d="M22 6C17 2 6 2 4 4V24C6 22 17 22 22 26C27 22 38 22 40 24V4C38 2 27 2 22 6Z"
          fill="#0c3326"
          stroke="url(#progGold)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Book spine & page dividers */}
        <line x1="22" y1="6" x2="22" y2="26" stroke="#cfab55" strokeWidth="1.5" />
        <path d="M9 10H17M9 14H15M27 10H35M29 14H35" stroke="#f3e9cf" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        {/* Gold Ribbon Bookmark */}
        <path d="M22 6V16L24.5 14L27 16V6" fill="url(#progGold)" />
      </g>
    </svg>
  );
}

export function ScheduleStepIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="schedBg" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08241b" />
          <stop offset="1" stopColor="#11442f" />
        </linearGradient>
        <linearGradient id="schedGold" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e9cf" />
          <stop offset="0.5" stopColor="#cfab55" />
          <stop offset="1" stopColor="#a37c2c" />
        </linearGradient>
      </defs>

      {/* Background Rounded Shield */}
      <rect x="6" y="6" width="68" height="68" rx="20" fill="url(#schedBg)" />
      <circle cx="62" cy="22" r="1.5" fill="#cfab55" opacity="0.6" />

      {/* Calendar Frame */}
      <rect x="18" y="19" width="36" height="36" rx="7" fill="#0c3326" stroke="#cfab55" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Calendar Top Header */}
      <path d="M18 26C18 22.6863 20.6863 20 24 20H48C51.3137 20 54 22.6863 54 26V28H18V26Z" fill="#185a3f" />
      {/* Ring Binders */}
      <rect x="25" y="16" width="3" height="6" rx="1.5" fill="url(#schedGold)" />
      <rect x="44" y="16" width="3" height="6" rx="1.5" fill="url(#schedGold)" />

      {/* Calendar Day Grid Marks */}
      <circle cx="26" cy="34" r="1.5" fill="#f3e9cf" opacity="0.7" />
      <circle cx="36" cy="34" r="1.5" fill="#f3e9cf" opacity="0.7" />
      <circle cx="46" cy="34" r="1.5" fill="#f3e9cf" opacity="0.7" />
      <circle cx="26" cy="42" r="1.5" fill="#f3e9cf" opacity="0.7" />
      <circle cx="36" cy="42" r="2.5" fill="url(#schedGold)" />

      {/* Clock & Certified Tutor Badge */}
      <g transform="translate(38, 36)">
        <circle cx="17" cy="17" r="13" fill="#08241b" stroke="url(#schedGold)" strokeWidth="2" />
        {/* Clock Hands */}
        <circle cx="17" cy="17" r="1.5" fill="#cfab55" />
        <line x1="17" y1="17" x2="17" y2="10" stroke="#f3e9cf" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="17" y1="17" x2="22" y2="17" stroke="url(#schedGold)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Verified check badge badge at corner */}
        <circle cx="25" cy="8" r="4.5" fill="#217352" stroke="#08241b" strokeWidth="1.5" />
        <path d="M23 8L24.5 9.5L27.5 6.5" stroke="#f3e9cf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function LearningStepIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="learnBg" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08241b" />
          <stop offset="1" stopColor="#11442f" />
        </linearGradient>
        <linearGradient id="learnGold" x1="20" y1="20" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3e9cf" />
          <stop offset="0.5" stopColor="#cfab55" />
          <stop offset="1" stopColor="#a37c2c" />
        </linearGradient>
      </defs>

      {/* Background Rounded Shield */}
      <rect x="6" y="6" width="68" height="68" rx="20" fill="url(#learnBg)" />

      {/* Subtle Star Particles */}
      <circle cx="18" cy="20" r="1.5" fill="#cfab55" opacity="0.6" />
      <circle cx="64" cy="56" r="1.5" fill="#cfab55" opacity="0.5" />

      {/* Graduation Cap (Symbol of Sacred Knowledge & Excellence) */}
      <g transform="translate(18, 16)">
        {/* Cap Diamond Top */}
        <polygon points="22,6 42,15 22,23 2,15" fill="#0c3326" stroke="url(#learnGold)" strokeWidth="1.75" strokeLinejoin="round" />
        {/* Skull Cap Base */}
        <path d="M10 18.5V25C10 28.5 15.3726 31 22 31C28.6274 31 34 28.5 34 25V18.5" fill="#0c3326" stroke="url(#learnGold)" strokeWidth="1.5" />
        {/* Tassel */}
        <path d="M36 17.5V27L38 29V32" stroke="#f3e9cf" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="17.5" r="1.5" fill="url(#learnGold)" />
      </g>

      {/* Radiant Knowledge Star / Progress Achievement */}
      <g transform="translate(24, 46)">
        {/* Star Badge */}
        <circle cx="16" cy="10" r="8" fill="#185a3f" stroke="url(#learnGold)" strokeWidth="1.5" />
        {/* 8-point Islamic Star inside */}
        <path
          d="M16 5.5L17.2 8.8L20.5 10L17.2 11.2L16 14.5L14.8 11.2L11.5 10L14.8 8.8Z"
          fill="url(#learnGold)"
        />
        {/* Live Audio / Interactive Pulse Waves */}
        <path d="M6 10C6 7.5 7.5 5.5 9 4M23 4C24.5 5.5 26 7.5 26 10" stroke="#cfab55" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}
