import React from 'react';
import { cn } from '@/lib/utils';

interface WheelSectionProps {
  name: string;
  angle: number;
  color: string;
  total: number;
}

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEEAD',
  '#D4A5A5',
  '#9B59B6',
  '#3498DB',
];

const SpinWheel: React.FC<WheelSectionProps> = ({ name, angle, color, total }) => {
  const transform = `rotate(${angle}deg)`;
  
  // Get background color based on color index
  const getBackgroundColor = () => {
    return COLORS[parseInt(color) - 1] || COLORS[0];
  };
  
  // Calculate font size based on number of entries and name length
  const getFontSize = () => {
    const baseSize = total <= 5 ? 18 : total <= 8 ? 16 : 14;
    const lengthAdjustment = name.length > 10 ? 0.8 : 1;
    return baseSize * lengthAdjustment;
  };
  
  return (
    <div 
      className="wheel-section absolute top-0 left-0 w-full h-full"
      style={{ 
        transform,
        willChange: "transform"
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          background: `linear-gradient(45deg, ${getBackgroundColor()}, ${lightenColor(getBackgroundColor(), 20)})`,
          clipPath: `polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 50%)`,
          transformOrigin: "center center",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
        }}
      />
      <div 
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ 
          transform: `rotate(${90 + 360/(total*2)}deg)`,
          transformOrigin: "center center",
          willChange: "transform"
        }}
      >
        <div 
          className="absolute w-full text-center"
          style={{
            transform: 'translateY(-50%)',
            top: '45%',
            willChange: "transform"
          }}
        >
          <div 
            className="bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-sm py-1.5 mx-auto w-4/5 rounded-sm"
            style={{
              transform: 'skewY(-5deg)',
              boxShadow: '0 0 15px rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
              transformOrigin: "center center"
            }}
          >
            <span 
              className="font-bold text-white px-2 text-center block tracking-wide"
              style={{ 
                fontSize: `${getFontSize()}px`,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
                transform: 'translateZ(0)'
              }}
            >
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to lighten colors
const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
};

export default SpinWheel;
