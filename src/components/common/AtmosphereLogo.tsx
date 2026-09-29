import React from 'react';

interface AtmosphereLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}

export const AtmosphereLogo: React.FC<AtmosphereLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const sizeMap = {
    xs: { dim: 32, font: 9, badgeClass: 'w-8 h-8' },
    sm: { dim: 42, font: 12, badgeClass: 'w-10 h-10' },
    md: { dim: 54, font: 15, badgeClass: 'w-13 h-13 sm:w-14 sm:h-14' },
    lg: { dim: 76, font: 21, badgeClass: 'w-18 h-18 sm:w-20 sm:h-20' },
    xl: { dim: 96, font: 27, badgeClass: 'w-24 h-24' },
    hero: { dim: 140, font: 39, badgeClass: 'w-32 h-32 sm:w-36 sm:h-36' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Authentic Circular Chartreuse Logo Badge */}
      <div className={`relative ${currentSize.badgeClass} shrink-0 select-none shadow-sm hover:scale-105 transition-transform duration-300`}>
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Official Chartreuse / Olive Circle */}
          <circle cx="250" cy="250" r="240" fill="#9BBA1A" />
          
          {/* Cursive script text exactly matching the brand mark */}
          <text
            x="250"
            y="262"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#111111"
            style={{
              fontFamily: "'Parisienne', 'Alex Brush', cursive",
              fontSize: '112px',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Atmosphère
          </text>
        </svg>
      </div>

      {showSubtitle && (
        <div className="flex flex-col text-left">
          <span className="text-xs uppercase tracking-[0.28em] text-[#1E1B18] font-semibold">
            Atmosphère
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#736B5F] font-mono">
            Décoration · Dakar
          </span>
        </div>
      )}
    </div>
  );
};
