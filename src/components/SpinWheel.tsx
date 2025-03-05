"use client";

import { useEffect, useRef, useState } from "react";
import { useWheelStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
];

export default function SpinningWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { entries, isSpinning, setSpinning, addResult } = useWheelStore();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    drawWheel();
  }, [entries, rotation]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || entries.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    // Draw outer circle with gradient
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#f0f0f0");

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#2C3E50";
    ctx.lineWidth = 3;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();

    const sliceAngle = (2 * Math.PI) / entries.length;

    // Draw slices with enhanced shadow and gradient
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";

    entries.forEach((entry, index) => {
      const startAngle = index * sliceAngle + rotation;
      const endAngle = startAngle + sliceAngle;

      // Create gradient for each slice
      const sliceGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      const baseColor = COLORS[index % COLORS.length];
      sliceGradient.addColorStop(0, lightenColor(baseColor, 20));
      sliceGradient.addColorStop(1, baseColor);

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sliceGradient;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text with shadow
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.font = "bold 16px Inter";
      ctx.fillText(entry, radius - 40, 5);
      ctx.restore();
    });

    // Draw center circle with enhanced metallic effect
    const centerGradient = ctx.createRadialGradient(
      centerX - 5,
      centerY - 5,
      0,
      centerX,
      centerY,
      25
    );
    centerGradient.addColorStop(0, "#ffffff");
    centerGradient.addColorStop(0.5, "#2C3E50");
    centerGradient.addColorStop(1, "#1a2634");

    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw inverted arrow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX - radius - 25, centerY);
    ctx.lineTo(centerX - radius + 15, centerY - 15);
    ctx.lineTo(centerX - radius + 15, centerY + 15);
    ctx.closePath();

    // Arrow gradient
    const arrowGradient = ctx.createLinearGradient(
      centerX - radius - 25,
      centerY,
      centerX - radius + 15,
      centerY
    );
    arrowGradient.addColorStop(0, "#e74c3c");
    arrowGradient.addColorStop(1, "#c0392b");

    ctx.fillStyle = arrowGradient;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  const celebrateWinner = (winner: string) => {
    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#9B59B6"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#9B59B6"],
      });
    }, 250);

    // Show toast with animation
    toast.custom(
      (t) => (
        <div
          className={`${
            //@ts-ignore
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-2xl p-6`}
        >
          <div className="flex items-center gap-4">
            <Sparkles className="h-8 w-8 animate-pulse text-yellow-300" />
            <div>
              <h3 className="font-bold text-xl mb-1">We have a winner! 🎉</h3>
              <p className="text-lg">{winner}</p>
            </div>
          </div>
        </div>
      ),
      {
        duration: 4000,
      }
    );
  };

  const spinWheel = () => {
    if (isSpinning || entries.length === 0) return;

    setSpinning(true);
    const spinDuration = 6000;
    const startTime = Date.now();
    const startRotation = rotation;
    const totalRotation = 360 * 10 + Math.random() * 360;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      const easeOut = (t: number) => {
        const t1 = 1 - t;
        return 1 - t1 * t1 * t1 * t1;
      };

      const currentRotation = startRotation + totalRotation * easeOut(progress);
      setRotation(currentRotation * (Math.PI / 180));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const bounceAnimation = (bounceProgress: number) => {
          if (bounceProgress <= 1) {
            const bounce = Math.sin(bounceProgress * Math.PI) * 2;
            setRotation((currentRotation + bounce) * (Math.PI / 180));
            requestAnimationFrame(() => bounceAnimation(bounceProgress + 0.1));
          } else {
            const winningIndex = Math.floor(
              (entries.length -
                (currentRotation % 360) / (360 / entries.length)) %
                entries.length
            );
            const winner = entries[winningIndex];
            addResult(winner);
            celebrateWinner(winner);
          }
        };
        bounceAnimation(0);
      }
    };

    animate();
  };

  // Utility function to lighten colors
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={`relative cursor-pointer transition-transform duration-300 ${
            isSpinning ? "cursor-not-allowed" : "hover:scale-105"
          }`}
          onClick={spinWheel}
        />
        {entries.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-full backdrop-blur-sm">
            <p className="text-lg text-white font-medium">
              Add entries to start spinning!
            </p>
          </div>
        )}
      </div>
      <Button
        onClick={spinWheel}
        disabled={isSpinning || entries.length === 0}
        className="w-40 h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Spinning...
          </>
        ) : (
          "Spin!"
        )}
      </Button>
    </div>
  );
}
