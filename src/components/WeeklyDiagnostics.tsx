import React, { useState } from 'react';
import { WeeklyDaySummary } from '../types/telemetry';
import { soundEngine } from '../utils/sound';

interface WeeklyDiagnosticsProps {
  bars: WeeklyDaySummary[];
  onExportReport: () => void;
}

export const WeeklyDiagnostics: React.FC<WeeklyDiagnosticsProps> = ({
  bars,
  onExportReport,
}) => {
  const [activeMode, setActiveMode] = useState<'calories' | 'hydration' | 'macros'>('calories');

  const handleModeChange = (mode: 'calories' | 'hydration' | 'macros') => {
    soundEngine.playSwitch(mode === 'calories');
    setActiveMode(mode);
  };

  return (
    <section className="bg-surface-container-low rounded-xl tactile-pod p-4 sm:p-space-lg relative" id="diagnostics">
      <div className="brass-screw absolute top-3 left-3"></div>
      <div className="brass-screw absolute top-3 right-3"></div>
      <div className="brass-screw absolute bottom-3 left-3"></div>
      <div className="brass-screw absolute bottom-3 right-3"></div>

      {/* Header & Analytical Mode Toggle Switch */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-surface-variant/40 mb-5 gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            analytics
          </span>
          <h2 className="text-sm sm:text-headline-md font-headline-md tracking-wider text-on-surface">
            WEEKLY CHRONO-DIAGNOSTICS &amp; ADHERENCE
          </h2>
        </div>

        {/* Skeuomorphic Physical Rocker Switch */}
        <div className="recessed-cavity p-1 rounded-lg bg-surface-container-lowest flex items-center border border-surface-variant">
          <button
            onClick={() => handleModeChange('calories')}
            className={`text-xs px-3 py-1.5 rounded font-bold transition-all ${
              activeMode === 'calories'
                ? 'metal-actuator text-primary shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Calorie Deficit
          </button>
          <button
            onClick={() => handleModeChange('hydration')}
            className={`text-xs px-3 py-1.5 rounded font-bold transition-all ${
              activeMode === 'hydration'
                ? 'metal-actuator text-secondary shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Hydration Volume
          </button>
          <button
            onClick={() => handleModeChange('macros')}
            className={`text-xs px-3 py-1.5 rounded font-bold transition-all ${
              activeMode === 'macros'
                ? 'metal-actuator text-tertiary shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Macro Balance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 7-Day Mechanical Bar Meters Chamber (8 Cols) */}
        <div className="lg:col-span-8 bg-surface-container rounded-lg p-4 recessed-cavity border border-surface-variant/50">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <span className="text-[11px] sm:text-label-meter font-label-meter text-on-surface-variant">
              7-DAY TELEMETRY COLUMN BARS (MON - SUN)
            </span>
            <span className="text-[11px] sm:text-label-subtle font-label-subtle text-primary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary led-glow-primary"></span>
              {activeMode === 'calories'
                ? 'CALORIE BENCHMARK: 2,200 KCAL'
                : activeMode === 'hydration'
                ? 'HYDRATION BENCHMARK: 3,000 ML'
                : 'MACRO BALANCED SYNC: 95%'}
            </span>
          </div>

          {/* Vertical Bar Meters with Metallic Caps */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 h-52 sm:h-56 items-end pb-2 border-b border-surface-variant">
            {bars.map((bar) => {
              let valueDisplay = '--';
              let heightPct = 15;
              let barColor = 'from-primary/70 to-primary';
              let ringClass = '';

              if (activeMode === 'calories') {
                if (bar.calories !== null) {
                  valueDisplay = `${bar.calories.toLocaleString()}${bar.isCurrent ? '*' : ''}`;
                  heightPct = Math.min((bar.calories / 2500) * 100, 100);
                  if (bar.calories > 2250) {
                    barColor = 'from-tertiary/70 to-tertiary';
                  }
                  if (bar.isCurrent) {
                    ringClass = 'ring-1 ring-primary/50';
                  }
                }
              } else if (activeMode === 'hydration') {
                if (bar.hydrationMl !== null) {
                  valueDisplay = `${bar.hydrationMl}`;
                  heightPct = Math.min((bar.hydrationMl / 3500) * 100, 100);
                  barColor = 'from-secondary/70 to-secondary';
                  if (bar.isCurrent) {
                    ringClass = 'ring-1 ring-secondary/50';
                  }
                }
              } else {
                if (bar.calories !== null) {
                  valueDisplay = bar.dayKey === 'WED' ? '92%' : '98%';
                  heightPct = bar.dayKey === 'WED' ? 82 : 92;
                  barColor = 'from-primary/70 to-tertiary';
                }
              }

              return (
                <div key={bar.dayKey} className={`flex flex-col items-center h-full justify-end group ${bar.calories === null ? 'opacity-40' : ''}`}>
                  <span className={`text-[9px] sm:text-[10px] font-metric-display mb-1 truncate ${bar.calories && bar.calories > 2250 ? 'text-tertiary' : 'text-primary'}`}>
                    {valueDisplay}
                  </span>
                  <div className={`w-full bg-surface-container-lowest recessed-cavity rounded-t-md p-1 h-[88%] flex flex-col justify-end relative ${ringClass}`}>
                    {bar.calories !== null ? (
                      <div
                        className={`w-full bg-gradient-to-t ${barColor} rounded-t-sm relative transition-all duration-700`}
                        style={{
                          height: `${heightPct}%`,
                          boxShadow: bar.isCurrent ? '0 0 10px rgba(78,222,163,0.7)' : undefined,
                        }}
                      >
                        <div className="absolute -top-1 inset-x-0 h-1.5 bg-white/80 rounded-full shadow-[0_0_6px_#fff]"></div>
                      </div>
                    ) : (
                      <div className="w-full bg-surface-variant/40 rounded-t-sm h-[18%]"></div>
                    )}
                  </div>
                  <span className={`text-[10px] sm:text-label-meter font-label-meter mt-2 ${bar.isCurrent ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant pt-2">
            <span>* Active Telemetry Cycle in Progress</span>
            <span className="text-primary font-metric-display">WEEKLY HIT RATE: 94.2%</span>
          </div>
        </div>

        {/* Weekly Biometric Summary Slate (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="paper-card p-3.5 rounded-lg border-l-4 border-l-primary">
            <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase tracking-wider block">
              MEAN CALORIE INTAKE
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-xl sm:text-headline-md font-metric-display text-on-surface">
                2,045 <span className="text-xs font-normal text-on-surface-variant">Kcal/day</span>
              </span>
              <span className="text-[10px] sm:text-label-meter font-label-meter text-primary bg-primary/10 px-2 py-0.5 rounded">
                94% TARGET
              </span>
            </div>
          </div>

          <div className="paper-card p-3.5 rounded-lg border-l-4 border-l-secondary">
            <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase tracking-wider block">
              HYDRATION VOLUME AVERAGE
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-xl sm:text-headline-md font-metric-display text-secondary">
                2.4 <span className="text-xs font-normal text-on-surface-variant">Liters/day</span>
              </span>
              <span className="text-[10px] sm:text-label-meter font-label-meter text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                STABLE
              </span>
            </div>
          </div>

          <div className="paper-card p-3.5 rounded-lg border-l-4 border-l-tertiary">
            <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase tracking-wider block">
              PEAK CALORIC EXPENDITURE
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-xl sm:text-headline-md font-metric-display text-tertiary">
                WEDNESDAY
              </span>
              <span className="text-[10px] sm:text-label-meter font-label-meter text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                2,740 EXP
              </span>
            </div>
          </div>

          {/* Physical Export Actuator Button */}
          <button
            onClick={() => {
              soundEngine.playClick(850);
              onExportReport();
            }}
            className="metal-actuator w-full py-2.5 px-3 rounded-lg text-on-surface font-headline-md text-xs tracking-wider flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>EXPORT PHYSICAL TELEMETRY REPORT</span>
          </button>
        </div>
      </div>
    </section>
  );
};
