import React from 'react';

interface MacroGalvanometersProps {
  proteinG: number;
  proteinTargetG: number;
  carbsG: number;
  carbsTargetG: number;
  fatG: number;
  fatTargetG: number;
}

export const MacroGalvanometers: React.FC<MacroGalvanometersProps> = ({
  proteinG,
  proteinTargetG,
  carbsG,
  carbsTargetG,
  fatG,
  fatTargetG,
}) => {
  const proteinPct = Math.min((proteinG / proteinTargetG) * 100, 100);
  const carbsPct = Math.min((carbsG / carbsTargetG) * 100, 100);
  const fatPct = Math.min((fatG / fatTargetG) * 100, 100);

  const carbsRemaining = carbsTargetG - carbsG;

  // Macro ratio calculation
  const totalGrams = (proteinG * 4) + (carbsG * 4) + (fatG * 9);
  const pRatio = totalGrams > 0 ? Math.round(((proteinG * 4) / totalGrams) * 100) : 30;
  const cRatio = totalGrams > 0 ? Math.round(((carbsG * 4) / totalGrams) * 100) : 45;
  const fRatio = totalGrams > 0 ? Math.round(((fatG * 9) / totalGrams) * 100) : 25;

  // Sync index calculation
  const avgPct = (proteinPct + carbsPct + fatPct) / 3;
  const syncPct = Math.min(Math.round(avgPct * 1.15), 99.4);

  return (
    <div className="bg-surface-container-low rounded-xl tactile-pod p-4 sm:p-space-lg relative flex flex-col justify-between">
      {/* Brass Screws */}
      <div className="brass-screw absolute top-3 left-3"></div>
      <div className="brass-screw absolute top-3 right-3"></div>
      <div className="brass-screw absolute bottom-3 left-3"></div>
      <div className="brass-screw absolute bottom-3 right-3"></div>

      <div>
        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              multicooker
            </span>
            <h2 className="text-sm sm:text-headline-md font-headline-md tracking-wider text-on-surface">
              MACRO GALVANOMETERS
            </h2>
          </div>
          <span className="text-[10px] sm:text-label-meter font-label-meter text-on-surface-variant">
            VOLT-TRIPLET
          </span>
        </div>

        {/* Voltmeter 1: Protein */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs font-label-meter text-primary flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-primary inline-block led-glow-primary"></span>
              PROTEIN MATRIX
            </span>
            <span className="text-xs sm:text-sm font-metric-display text-on-surface font-bold">
              {proteinG}g <span className="text-on-surface-variant font-normal">/ {proteinTargetG}g</span>
            </span>
          </div>

          <div className="h-6 rounded bg-surface-container-lowest recessed-cavity p-1 relative flex items-center border border-white/5">
            <div
              className="h-full rounded bg-gradient-to-r from-primary/60 to-primary flex items-center justify-end pr-1.5 relative transition-all duration-700 ease-out"
              style={{
                width: `${proteinPct}%`,
                boxShadow: '0 0 10px rgba(78,222,163,0.5)',
              }}
            >
              <div className="w-1.5 h-full bg-white/80 rounded-sm shadow-[0_0_4px_#fff]"></div>
            </div>
            {/* Analog tick overlays */}
            <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none opacity-40">
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
            </div>
          </div>

          <div className="flex justify-between text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant mt-0.5 px-0.5">
            <span>0%</span>
            <span>TARGET TOLERANCE: {proteinPct.toFixed(0)}% REACHED</span>
            <span>100%</span>
          </div>
        </div>

        {/* Voltmeter 2: Carbs */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs font-label-meter text-secondary flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block led-glow-blue"></span>
              COMPLEX GLYCOGEN
            </span>
            <span className="text-xs sm:text-sm font-metric-display text-on-surface font-bold">
              {carbsG}g <span className="text-on-surface-variant font-normal">/ {carbsTargetG}g</span>
            </span>
          </div>

          <div className="h-6 rounded bg-surface-container-lowest recessed-cavity p-1 relative flex items-center border border-white/5">
            <div
              className="h-full rounded bg-gradient-to-r from-secondary/60 to-secondary flex items-center justify-end pr-1.5 relative transition-all duration-700 ease-out"
              style={{
                width: `${carbsPct}%`,
                boxShadow: '0 0 10px rgba(137,206,255,0.5)',
              }}
            >
              <div className="w-1.5 h-full bg-white/80 rounded-sm shadow-[0_0_4px_#fff]"></div>
            </div>
            <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none opacity-40">
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
            </div>
          </div>

          <div className="flex justify-between text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant mt-0.5 px-0.5">
            <span>0%</span>
            <span>{carbsRemaining >= 0 ? `DEPLETION BUFFER: ${carbsRemaining}g REMAINING` : `BUFFER EXCEEDED: ${Math.abs(carbsRemaining)}g`}</span>
            <span>100%</span>
          </div>
        </div>

        {/* Voltmeter 3: Lipids / Fats */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs font-label-meter text-tertiary flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-tertiary inline-block led-glow-amber"></span>
              ESSENTIAL LIPIDS
            </span>
            <span className="text-xs sm:text-sm font-metric-display text-on-surface font-bold">
              {fatG}g <span className="text-on-surface-variant font-normal">/ {fatTargetG}g</span>
            </span>
          </div>

          <div className="h-6 rounded bg-surface-container-lowest recessed-cavity p-1 relative flex items-center border border-white/5">
            <div
              className="h-full rounded bg-gradient-to-r from-tertiary/60 to-tertiary flex items-center justify-end pr-1.5 relative transition-all duration-700 ease-out"
              style={{
                width: `${fatPct}%`,
                boxShadow: '0 0 10px rgba(255,185,95,0.5)',
              }}
            >
              <div className="w-1.5 h-full bg-white/80 rounded-sm shadow-[0_0_4px_#fff]"></div>
            </div>
            <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none opacity-40">
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
              <span className="h-2 w-px bg-white"></span>
              <span className="h-3 w-px bg-white"></span>
            </div>
          </div>

          <div className="flex justify-between text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant mt-0.5 px-0.5">
            <span>0%</span>
            <span>KETOGENIC RATIO: OPTIMAL</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Macro Diagnostics Readout Bar */}
      <div className="mt-4 pt-3 border-t border-surface-variant/30 flex items-center justify-between bg-surface-container-lowest/60 p-2.5 rounded-lg border border-surface-variant/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">verified</span>
          <span className="text-[11px] sm:text-label-subtle font-label-subtle text-on-surface">
            Ratio {pRatio}P / {cRatio}C / {fRatio}F Balanced
          </span>
        </div>
        <span className="text-[11px] sm:text-label-meter font-label-meter text-primary font-bold">
          {syncPct.toFixed(1)}% SYNC
        </span>
      </div>
    </div>
  );
};
