import React from 'react';
import { soundEngine } from '../utils/sound';

interface HydrationBayProps {
  waterIntakeMl: number;
  waterQuotaMl: number;
  onAddWater: (amount: number) => void;
}

export const HydrationBay: React.FC<HydrationBayProps> = ({
  waterIntakeMl,
  waterQuotaMl,
  onAddWater,
}) => {
  const percentage = Math.min(Math.max((waterIntakeMl / waterQuotaMl) * 100, 0), 100);
  const surplusNeeded = Math.max(waterQuotaMl - waterIntakeMl, 0);
  const cyclesLeft = Math.ceil(surplusNeeded / 300);

  const handleDose = (amount: number) => {
    soundEngine.playWater();
    onAddWater(amount);
  };

  return (
    <div className="bg-surface-container-low rounded-xl tactile-pod p-4 sm:p-space-lg relative flex flex-col justify-between" id="hydration">
      <div className="brass-screw absolute top-3 left-3"></div>
      <div className="brass-screw absolute top-3 right-3"></div>
      <div className="brass-screw absolute bottom-3 left-3"></div>
      <div className="brass-screw absolute bottom-3 right-3"></div>

      <div>
        {/* Chamber Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              water_drop
            </span>
            <h2 className="text-sm sm:text-headline-md font-headline-md tracking-wider text-on-surface">
              HYDRATION BAY
            </h2>
          </div>
          <span className="text-xs sm:text-label-meter font-label-meter text-secondary font-bold">
            {waterIntakeMl.toLocaleString()} / {waterQuotaMl.toLocaleString()} ML
          </span>
        </div>

        {/* Laboratory Beveled Water Vessel */}
        <div className="flex gap-4 items-center my-2">
          {/* Glass Cylinder Reservoir Tube */}
          <div className="w-20 sm:w-24 h-60 sm:h-64 rounded-2xl bg-surface-container-lowest recessed-cavity relative p-1.5 border-2 border-surface-variant/80 shadow-[0_12px_24px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-end shrink-0">
            {/* Glass Specular Reflection Layer */}
            <div className="absolute inset-0 glass-reservoir-gradient pointer-events-none z-20 rounded-2xl"></div>

            {/* Water Liquid Column */}
            <div
              className="w-full bg-gradient-to-t from-secondary-container via-secondary to-[#c9e6ff] rounded-b-xl relative z-10 transition-all duration-700 ease-out"
              style={{
                height: `${percentage}%`,
                boxShadow: '0 0 15px rgba(0, 162, 230, 0.6), inset 0 2px 4px rgba(255,255,255,0.7)',
              }}
            >
              {/* Animated Meniscus Curve on Liquid Top */}
              <div className="absolute -top-1.5 inset-x-0 h-3 rounded-full bg-[#c9e6ff] opacity-90 border-t border-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"></div>

              {/* Micro Bubbles in Fluid */}
              <div className="absolute bottom-6 left-3 w-1 h-1 rounded-full bg-white/70 animate-ping"></div>
              <div className="absolute bottom-16 right-3 w-1.5 h-1.5 rounded-full bg-white/50"></div>
              <div className="absolute bottom-28 left-4 w-1 h-1 rounded-full bg-white/60"></div>
            </div>

            {/* Crystal Measurement Tick Marks */}
            <div className="absolute inset-y-4 right-2 flex flex-col justify-between text-[9px] font-metric-display text-white/70 z-20 pointer-events-none select-none">
              <span className="flex items-center gap-1">3000 <span className="w-2 h-0.5 bg-white/60 inline-block"></span></span>
              <span className="flex items-center gap-1">2500 <span className="w-1.5 h-0.5 bg-white/40 inline-block"></span></span>
              <span className="flex items-center gap-1">2000 <span className="w-2 h-0.5 bg-white/60 inline-block"></span></span>
              <span className="flex items-center gap-1">1500 <span className="w-1.5 h-0.5 bg-white/40 inline-block"></span></span>
              <span className="flex items-center gap-1">1000 <span className="w-2 h-0.5 bg-white/60 inline-block"></span></span>
              <span className="flex items-center gap-1">500 <span className="w-1.5 h-0.5 bg-white/40 inline-block"></span></span>
            </div>
          </div>

          {/* Hydration Metric Dashboard & Fluid Actuators */}
          <div className="flex-1 space-y-2.5">
            <div className="recessed-cavity p-2.5 rounded-lg bg-surface-container-lowest border border-surface-variant/30">
              <span className="text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant block">
                SURPLUS NEEDED
              </span>
              <span className="text-xl sm:text-headline-md font-metric-display text-secondary leading-tight">
                {surplusNeeded} ml
              </span>
              <span className="text-[10px] sm:text-label-subtle font-label-subtle text-primary block mt-0.5">
                {cyclesLeft > 0 ? `${cyclesLeft} GLYCO-CYCLES LEFT` : 'QUOTA SATISFIED'}
              </span>
            </div>

            {/* Push Buttons / Volumetric Dosing Actuators */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleDose(250)}
                  className="metal-actuator p-2 rounded text-[11px] font-label-subtle text-secondary font-bold flex items-center justify-center gap-1 border-t border-secondary/20 active:scale-95"
                >
                  <span className="material-symbols-outlined text-xs">local_drink</span> +250 ml
                </button>
                <button
                  onClick={() => handleDose(500)}
                  className="metal-actuator p-2 rounded text-[11px] font-label-subtle text-secondary font-bold flex items-center justify-center gap-1 border-t border-secondary/20 active:scale-95"
                >
                  <span className="material-symbols-outlined text-xs">water_bottle</span> +500 ml
                </button>
              </div>
              <button
                onClick={() => handleDose(-100)}
                className="metal-actuator w-full p-1.5 rounded text-[11px] font-label-subtle text-on-surface-variant hover:text-error flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-xs">remove</span> Subtract 100 ml
              </button>
            </div>

            {/* Workday Hydration Cadence Timeline */}
            <div className="pt-2 border-t border-surface-variant/30">
              <span className="text-[10px] font-label-subtle text-on-surface-variant block mb-1">
                CADENCE TIMELINE:
              </span>
              <div className="flex items-center justify-between text-[10px] font-metric-display">
                <span className="text-primary flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block led-glow-primary"></span>09:00
                </span>
                <span className="text-primary flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block led-glow-primary"></span>12:00
                </span>
                <span className="text-secondary flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block led-glow-blue"></span>14:30
                </span>
                <span className="text-on-surface-variant opacity-50">17:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant bg-surface-container-lowest/60 p-2 rounded border border-surface-variant/20 flex items-center justify-between mt-2">
        <span>Osmotic Balance: Optimum</span>
        <span className="text-secondary font-metric-display text-xs">
          {percentage.toFixed(1)}% Quota
        </span>
      </div>
    </div>
  );
};
