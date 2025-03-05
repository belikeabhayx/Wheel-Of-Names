
import React from 'react';
import { cn } from '@/lib/utils';

interface WheelSectionProps {
  name: string;
  angle: number;
  color: string;
  total: number;
}

const WheelSection: React.FC<WheelSectionProps> = ({ name, angle, color, total }) => {
  const transform = `rotate(${angle}deg)`;
  
  // Get background color based on color index
  const getBackgroundColor = () => {
    const colors = {
      "1": "#FF0000", // Red
      "2": "#3366FF", // Blue
      "3": "#00CC00", // Green
      "4": "#FFCC00", // Yellow
      "5": "#FF6600", // Orange
      "6": "#9933CC", // Purple
      "7": "#FF3399", // Pink
      "8": "#00CCCC", // Teal
    };
    return colors[color] || colors["1"];
  };
  
  // Calculate font size based on number of entries and name length
  const getFontSize = () => {
    const baseSize = total <= 5 ? 18 : total <= 8 ? 16 : 14;
    const lengthAdjustment = name.length > 10 ? 0.8 : 1;
    return baseSize * lengthAdjustment;
  };
  
  return (
    <div 
      className="wheel-section"
      style={{ transform }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: getBackgroundColor() }}
      />
      <div 
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ 
          transform: `rotate(${90 + 360/(total*2)}deg)`,
        }}
      >
        <div 
          className="absolute w-full text-center"
          style={{
            transform: 'translateY(-50%)',
            top: '45%',
          }}
        >
          <div 
            className="bg-white/20 backdrop-blur-sm py-1 mx-auto w-4/5 rounded-sm shimmer"
            style={{
              transform: 'skewY(-5deg)',
              boxShadow: '0 0 10px rgba(255,255,255,0.3)'
            }}
          >
            <span 
              className="font-bold text-white px-2 text-center block"
              style={{ 
                fontSize: `${getFontSize()}px`,
                textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
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

export default WheelSection;
