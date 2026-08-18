import React from 'react';
import { Card, CardColor } from '../types';

interface UnoCardProps {
  card?: Card | null;
  isBack?: boolean;
  isPlayable?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'mini';
  className?: string;
  showChosenColorGlow?: boolean;
  style?: React.CSSProperties;
}

export const UnoCard: React.FC<UnoCardProps> = ({
  card,
  isBack = false,
  isPlayable = false,
  onClick,
  size = 'md',
  className = '',
  showChosenColorGlow = false,
  style,
}) => {
  if (isBack || !card) {
    // Back of UNO Card - Artistic classic style
    const sizeClasses = {
      mini: 'w-6 h-9 rounded text-[8px]',
      sm: 'w-11 h-16 sm:w-13 sm:h-19 rounded-xl text-xs',
      md: 'w-18 h-28 sm:w-22 sm:h-34 rounded-2xl text-sm',
      lg: 'w-28 h-44 sm:w-34 sm:h-52 rounded-2xl text-base',
    }[size];

    return (
      <div
        id="uno-card-back"
        onClick={onClick}
        style={style}
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 border border-white/20 sm:border-2 sm:border-white/25 shadow-xl select-none transition-all duration-200 ${sizeClasses} ${
          onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
        } ${className}`}
      >
        <div className="w-9 h-14 sm:w-12 sm:h-18 rounded-full border border-white/20 flex items-center justify-center rotate-12">
          <div className="font-black italic tracking-tighter text-amber-400 select-none text-base sm:text-xl drop-shadow">
            UNO
          </div>
        </div>
      </div>
    );
  }

  // Sizing definitions
  const dimensions = {
    mini: 'w-7 h-10 rounded text-[9px] p-0.5 border',
    sm: 'w-11 h-16 sm:w-13 sm:h-19 rounded-xl text-xs p-1 border border-white/20',
    md: 'w-18 h-28 sm:w-22 sm:h-34 rounded-2xl text-sm p-1.5 sm:p-2 border border-white/25 sm:border-2 sm:border-white/30',
    lg: 'w-28 h-44 sm:w-34 sm:h-52 rounded-2xl text-base p-3 sm:p-4 border-2 sm:border-4 border-white/35',
  }[size];

  const getColorBg = (color: CardColor) => {
    switch (color) {
      case 'red':
        return 'bg-gradient-to-b from-[#dc2626] to-[#991b1b] text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)]';
      case 'yellow':
        return 'bg-gradient-to-b from-[#f59e0b] to-[#b45309] text-white shadow-[0_4px_20px_rgba(245,158,11,0.4)]';
      case 'green':
        return 'bg-gradient-to-b from-[#16a34a] to-[#14532d] text-white shadow-[0_4px_20px_rgba(22,163,74,0.4)]';
      case 'blue':
        return 'bg-gradient-to-b from-[#0284c7] to-[#075985] text-white shadow-[0_4px_20px_rgba(2,132,199,0.4)]';
      case 'wild':
        return 'bg-gradient-to-b from-[#27272a] to-[#09090b] text-white shadow-[0_4px_20px_rgba(147,51,234,0.4)]';
    }
  };

  const renderValueDisplay = (val: string, isCenter = false) => {
    if (val === 'SKIP') {
      return (
        <span className={isCenter ? 'text-2xl sm:text-3xl font-black italic' : 'text-xs sm:text-sm font-black italic'}>
          ⊘
        </span>
      );
    }
    if (val === 'REV') {
      return (
        <span className={isCenter ? 'text-xl sm:text-2xl font-black italic' : 'text-xs sm:text-sm font-black italic'}>
          ⇄
        </span>
      );
    }
    if (val === '+2') {
      return (
        <span className={isCenter ? 'text-xl sm:text-3xl font-black italic tracking-tighter' : 'text-xs sm:text-sm font-black italic'}>
          +2
        </span>
      );
    }
    if (val === '+4') {
      return (
        <span className={isCenter ? 'text-xl sm:text-3xl font-black italic tracking-tighter' : 'text-xs sm:text-sm font-black italic'}>
          +4
        </span>
      );
    }
    if (val === 'WILD') {
      if (isCenter) {
        return (
          <div className="grid grid-cols-2 grid-rows-2 w-6 h-6 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-inner border border-white/60">
            <div className="bg-red-500" />
            <div className="bg-blue-500" />
            <div className="bg-yellow-400" />
            <div className="bg-green-500" />
          </div>
        );
      }
      return <span className="text-[10px] font-black italic">W</span>;
    }
    return (
      <span className={isCenter ? 'text-3xl sm:text-5xl font-black italic font-sans' : 'text-xs sm:text-base font-bold font-sans'}>
        {val}
      </span>
    );
  };

  // Color glow for active wild selection
  const glowBorder = showChosenColorGlow && card.selectedColor
    ? {
        red: 'ring-4 ring-red-500 ring-offset-2 ring-offset-[#0A0F1E]',
        yellow: 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-[#0A0F1E]',
        green: 'ring-4 ring-green-500 ring-offset-2 ring-offset-[#0A0F1E]',
        blue: 'ring-4 ring-blue-500 ring-offset-2 ring-offset-[#0A0F1E]',
        wild: '',
      }[card.selectedColor]
    : '';

  return (
    <div
      id={`uno-card-${card.id}`}
      onClick={isPlayable || onClick ? onClick : undefined}
      style={style}
      className={`relative flex flex-col justify-between select-none transition-all duration-200 flex-shrink-0 cursor-pointer ${dimensions} ${getColorBg(
        card.color
      )} ${
        isPlayable
          ? 'hover:-translate-y-6 hover:shadow-2xl ring-3 sm:ring-4 ring-yellow-400 ring-offset-2 ring-offset-slate-900 scale-105 z-30'
          : onClick
          ? 'hover:-translate-y-3 hover:shadow-xl'
          : 'opacity-95'
      } ${glowBorder} ${className}`}
    >
      {/* Corner Top-Right (as in reference image) */}
      <div className="absolute top-1 right-1.5 sm:top-1.5 sm:right-2 font-bold select-none leading-none opacity-90">
        {renderValueDisplay(card.value, false)}
      </div>

      {/* Center Oval badge (as in reference image) */}
      <div className="relative flex items-center justify-center my-auto w-full">
        <div className="w-10 h-16 sm:w-13 sm:h-21 rounded-full border border-white/40 sm:border-2 sm:border-white/40 flex items-center justify-center shadow-inner">
          {renderValueDisplay(card.value, true)}
        </div>
      </div>

      {/* Corner Bottom-Left (upside down as in reference image) */}
      <div className="absolute bottom-1 left-1.5 sm:bottom-1.5 sm:left-2 font-bold select-none leading-none rotate-180 opacity-90">
        {renderValueDisplay(card.value, false)}
      </div>

      {/* Wild color active badge indicator */}
      {card.selectedColor && (
        <div
          className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center"
          style={{
            backgroundColor:
              card.selectedColor === 'red'
                ? '#ef4444'
                : card.selectedColor === 'yellow'
                ? '#facc15'
                : card.selectedColor === 'green'
                ? '#22c55e'
                : '#3b82f6',
          }}
          title={`Màu: ${card.selectedColor.toUpperCase()}`}
        >
          <span className="text-[9px] font-black text-white drop-shadow">●</span>
        </div>
      )}
    </div>
  );
};
