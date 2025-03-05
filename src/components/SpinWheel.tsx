
import React, { useState, useRef } from 'react';
import { useStore } from '@/store/useStore';
import WheelSection from './WheelSection';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const SpinWheel: React.FC = () => {
  const { entries, addResult, isSpinning, setIsSpinning } = useStore();
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const handleSpin = () => {
    if (entries.length < 2) {
      toast.error("Add at least 2 entries to spin the wheel", {
        position: "top-center"
      });
      return;
    }
    
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    setWinner(null);
    
    const spinDegree = 360 * (5 + Math.floor(Math.random() * 5)) + Math.floor(Math.random() * 360);
    const newRotation = rotation + spinDegree;
    
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-degree', `${spinDegree}deg`);
      wheelRef.current.classList.remove('animate-spin-wheel');
      void wheelRef.current.offsetWidth;
      wheelRef.current.classList.add('animate-spin-wheel');
    }
    
    setRotation(newRotation);
    
    setTimeout(() => {
      const degreesPerSection = 360 / entries.length;
      const normalizedDegree = newRotation % 360;
      const winnerIndex = Math.floor(normalizedDegree / degreesPerSection);
      const adjustedIndex = entries.length - 1 - winnerIndex;
      const winnerName = entries[adjustedIndex % entries.length].name;
      
      setWinner(winnerName);
      addResult(winnerName);
      setIsSpinning(false);
      
      toast.success(`${winnerName} wins!`, {
        position: "top-center"
      });
    }, 5000);
  };
  
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-xl font-medium text-white animate-pulse">
          Add entries to get started
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative wheel-container flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        <div 
          ref={wheelRef}
          onClick={handleSpin}
          className={cn(
            "wheel w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 relative rounded-full border-8 border-white shadow-xl overflow-hidden",
            "transition-transform duration-300 cursor-pointer hover:scale-105",
            isSpinning ? "cursor-not-allowed" : "hover:shadow-2xl"
          )}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            animation: isSpinning ? "spin-wheel 5s cubic-bezier(0.1, 0.7, 0.1, 1) forwards" : "none"
          }}
        >
          {entries.map((entry, index) => {
            const angle = (360 / entries.length) * index;
            const colorIndex = (index % 8) + 1;
            return (
              <WheelSection
                key={entry.id}
                name={entry.name}
                angle={angle}
                color={colorIndex.toString()}
                total={entries.length}
              />
            );
          })}
        </div>
        
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 bg-white rounded-full shadow-lg z-10 border-4 border-gray-200 animate-pulse" />
        
        <div className="absolute top-0 left-1/2 -ml-6 -mt-4 z-20">
          <div className="w-12 h-12 bg-white shadow-xl transform rotate-45 origin-center border-2 border-gray-100" />
        </div>
      </div>
      
      <button
        onClick={handleSpin}
        disabled={isSpinning || entries.length < 2}
        className={cn(
          "px-8 py-3 rounded-full font-bold tracking-wide transition-all transform active:scale-95",
          "shadow-lg hover:shadow-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white",
          "relative overflow-hidden group animate-bounce-in",
          isSpinning ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"
        )}
      >
        <span className="relative z-10">
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </span>
        <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-100" />
      </button>
      
      {winner && !isSpinning && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 animate-fade-in">
          <div className="bg-white px-6 py-3 rounded-full shadow-lg text-center min-w-[200px]">
            <span className="text-sm text-gray-500">Winner</span>
            <p className="font-bold text-xl text-purple-600">{winner}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
