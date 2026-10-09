import React from 'react';
import { soundEngine } from '../utils/sound';

interface TachometerGaugeProps {
  intakeCalories: number;
  targetCalories: number;
  basalBurn: number;
  activeExpenditure: number;
  onQuickAdd: (amount: number) => void;
  onResetQuick: () => void;
}

export const TachometerGauge: React.FC<TachometerGaugeProps> = ({
  intakeCalories,
  targetCalories,
  basalBurn,
  activeExpenditure,
  onQuickAdd,
  onResetQuick,
}) => {
  const percentage = Math.min(Math.max((intakeCalories / targetCalories) * 100, 0), 125);
  const remaining = targetCalories - intakeCalories;
  
  // Circumference for r=50 circle is 2 * PI * 50 = ~314.159
  const circumference = 314.16;
  // Offset calculated from 0 to 100% (or clamped)
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  // Determine status label & color
  let statusText = 'STATUS: OPTIMAL DEFICIT';
  let statusColorClass = 'text-primary bg-primary/10 border-primary/30';
  if (remaining < 0) {
    statusText = 'STATUS: SURPLUS ACCUMULATION';
    statusColorClass = 'text-tertiary bg-tertiary/10 border-tertiary/30';
  } else if (remaining <= 200) {
    statusText = 'STATUS: TARGET REACHED';
    statusColorClass = 'text-secondary bg-secondary/10 border-secondary/30';
  } else if (percentage < 40) {
    statusText = 'STATUS: ACTIVE DEFICIT';
    statusColorClass = 'text-primary bg-primary/10 border-primary/30';
  }

  // Calculate needle angle (-135deg to +135deg)
  const needleAngle = -135 + (Math.min(percentage, 110) / 100) * 270;

  return (
    <div className="bg-surface-container-low rounded-xl tactile-pod p-4 sm:p-space-lg relative overflow-hidden flex flex-col justify-between">
      {/* Mechanical Bezel Corners with Screws */}
      <div className="brass-screw absolute top-3 left-3"></div>
      <div className="brass-screw absolute top-3 right-3"></div>
      <div className="brass-screw absolute bottom-3 left-3"></div>
      <div className="brass-screw absolute bottom-3 right-3"></div>

      {/* Section Plate Label */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-surface-variant/40 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            speed
          </span>
          <h2 className="text-sm sm:text-headline-md font-headline-md tracking-wider text-on-surface">
            CALORIC FLUX TACHOMETER
          </h2>
        </div>
        <span className={`text-[10px] sm:text-label-meter font-label-meter px-2.5 py-0.5 rounded border ${statusColorClass}`}>
          {statusText}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Gauges Mechanical Core (Radial Dial) */}
        <div className="md:col-span-7 flex flex-col items-center justify-center relative py-2">
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-surface-container-lowest recessed-cavity relative p-3 flex items-center justify-center border-4 border-surface-variant/80 shadow-[0_12px_32px_rgba(0,0,0,0.9)]">
            {/* Dial Knurled Tick Marks (CSS Conic Ring) */}
            <div
              className="absolute inset-2 rounded-full border border-white/5 opacity-80 pointer-events-none"
              style={{
                background:
                  'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.4) 0deg 1deg, transparent 1deg 15deg)',
              }}
            ></div>

            {/* Progress Track Arc with Glow */}
            <svg className="w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                fill="transparent"
                r="50"
                stroke="#1f262f"
                strokeDasharray="314"
                strokeDashoffset="0"
                strokeWidth="8"
              ></circle>
              <circle
                className="transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(78,222,163,0.8)]"
                cx="60"
                cy="60"
                fill="transparent"
                r="50"
                stroke={remaining < 0 ? '#ffb95f' : '#4edea3'}
                strokeDasharray="314"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="8"
              ></circle>
            </svg>

            {/* Inner Bezel Dial Face */}
            <div className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-surface-container border border-white/10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center p-2 select-none">
              <span className="text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant uppercase tracking-widest mb-0.5">
                Energy Reservoir
              </span>
              <span className="text-2xl sm:text-metric-display font-metric-display text-primary drop-shadow-[0_2px_8px_rgba(78,222,163,0.6)] leading-none">
                {intakeCalories.toLocaleString()}
              </span>
              <div className="h-0.5 w-14 sm:w-16 bg-surface-variant my-1.5"></div>
              <span className="text-[10px] sm:text-label-meter font-label-meter text-on-surface-variant tracking-wider">
                TARGET: {targetCalories.toLocaleString()} KCAL
              </span>
              <span
                className={`text-[10px] sm:text-label-subtle font-label-subtle font-bold mt-1 ${
                  remaining < 0 ? 'text-tertiary' : 'text-primary'
                }`}
              >
                {remaining >= 0 ? `${remaining.toLocaleString()} KCAL REMAINING` : `${Math.abs(remaining).toLocaleString()} KCAL OVER BUDGET`}
              </span>
            </div>

            {/* Mechanical Pointer Needle (Rotatable) */}
            <div
              className="absolute w-full h-full pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-primary to-white rounded-full shadow-[0_0_6px_#4edea3]"></div>
            </div>

            {/* Needle Pivot Center Screw */}
            <div className="absolute w-7 h-7 rounded-full bg-gradient-to-b from-[#4A5565] to-[#1E232A] border border-white/30 shadow-[0_2px_6px_rgba(0,0,0,0.8)] flex items-center justify-center pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-primary led-glow-primary"></div>
            </div>
          </div>
          <span className="text-label-subtle font-label-subtle text-on-surface-variant mt-3 tracking-widest text-center text-xs">
            ANALOG CHRONOMETER • {percentage.toFixed(1)}% EXPENDED
          </span>
        </div>

        {/* Gauge Metrics Breakdown Slate */}
        <div className="md:col-span-5 space-y-3">
          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/30">
            <div className="flex justify-between text-label-subtle font-label-subtle text-on-surface-variant text-xs">
              <span>INTAKE ACCUMULATION</span>
              <span className="text-primary font-metric-display">{intakeCalories.toLocaleString()} KCAL</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full mt-1.5 overflow-hidden p-0.5">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  boxShadow: '0 0 6px rgba(78,222,163,0.8)',
                }}
              ></div>
            </div>
          </div>

          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/30">
            <div className="flex justify-between text-label-subtle font-label-subtle text-on-surface-variant text-xs">
              <span>BASAL METABOLIC BURN</span>
              <span className="text-secondary font-metric-display">{basalBurn.toLocaleString()} KCAL</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full mt-1.5 overflow-hidden p-0.5">
              <div
                className="bg-secondary h-full rounded-full"
                style={{
                  width: '86%',
                  boxShadow: '0 0 6px rgba(137,206,255,0.8)',
                }}
              ></div>
            </div>
          </div>

          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/30">
            <div className="flex justify-between text-label-subtle font-label-subtle text-on-surface-variant text-xs">
              <span>ACTIVE EXPENDITURE</span>
              <span className="text-tertiary font-metric-display">{activeExpenditure.toLocaleString()} KCAL</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full mt-1.5 overflow-hidden p-0.5">
              <div
                className="bg-tertiary h-full rounded-full"
                style={{
                  width: `${Math.min((activeExpenditure / 700) * 100, 100)}%`,
                  boxShadow: '0 0 6px rgba(255,185,95,0.8)',
                }}
              ></div>
            </div>
          </div>

          {/* Quick Calibration Actuators */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                soundEngine.playClick(600);
                onQuickAdd(50);
              }}
              className="metal-actuator flex-1 py-1.5 px-2 rounded text-[11px] font-label-subtle text-on-surface tracking-wider uppercase flex items-center justify-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-xs">add</span> 50 KCAL
            </button>
            <button
              onClick={() => {
                soundEngine.playClick(750);
                onQuickAdd(200);
              }}
              className="metal-actuator flex-1 py-1.5 px-2 rounded text-[11px] font-label-subtle text-on-surface tracking-wider uppercase flex items-center justify-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-xs">add</span> 200 KCAL
            </button>
            <button
              onClick={() => {
                soundEngine.playClick(400);
                onResetQuick();
              }}
              className="metal-actuator py-1.5 px-2.5 rounded text-[11px] font-label-subtle text-error hover:text-white flex items-center justify-center active:scale-95"
              title="Reset Quick Offsets"
            >
              <span className="material-symbols-outlined text-xs">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
