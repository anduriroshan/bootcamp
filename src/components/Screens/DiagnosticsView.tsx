import React from 'react';
import { WeeklyDaySummary } from '../../types/telemetry';
import { soundEngine } from '../../utils/sound';

interface DiagnosticsViewProps {
  bars: WeeklyDaySummary[];
  onExportReport: () => void;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({
  bars,
  onExportReport,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner Pod */}
      <div className="bg-surface-container-low rounded-xl tactile-pod p-5 relative">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-variant/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                analytics
              </span>
              <h2 className="text-xl font-headline-md tracking-wider text-on-surface font-bold">
                WEEKLY DIAGNOSTICS // BIOMETRIC ADHERENCE
              </h2>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant mt-1">
              Multi-cycle metabolic burn deconvolution, caloric deficit consistency, and biometric adherence logs.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick(900);
              onExportReport();
            }}
            className="metal-actuator px-4 py-2 rounded-lg text-primary font-headline-md font-bold text-xs tracking-wider flex items-center gap-2 border-t border-primary/30"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>Export Physical Telemetry</span>
          </button>
        </div>

        {/* 7-Day Performance Metric Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          <div className="paper-card p-4 rounded-lg border-l-4 border-l-primary">
            <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase">
              7-DAY CALORIE CONFORMANCE
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-2xl font-metric-display text-primary font-bold">94.2%</span>
              <span className="text-xs font-label-meter text-primary bg-primary/10 px-2 py-0.5 rounded">
                OPTIMAL
              </span>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant mt-2">
              Average daily deviation from 2,200 kcal deficit benchmark is within ±65 kcal tolerance.
            </p>
          </div>

          <div className="paper-card p-4 rounded-lg border-l-4 border-l-secondary">
            <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase">
              HYDRATION RETENTION INDEX
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-2xl font-metric-display text-secondary font-bold">2.84 L</span>
              <span className="text-xs font-label-meter text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                EXCELLENT
              </span>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant mt-2">
              Mean daily fluid intake meets 94.6% of cellular osmolarity requirements.
            </p>
          </div>

          <div className="paper-card p-4 rounded-lg border-l-4 border-l-tertiary">
            <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase">
              PEAK METABOLIC FLUX
            </span>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-2xl font-metric-display text-tertiary font-bold">2,740 KCAL</span>
              <span className="text-xs font-label-meter text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                SOL 283
              </span>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant mt-2">
              Wednesday achieved high active expenditure with compensatory macronutrient partitioning.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Sol Log Table */}
      <div className="bg-surface-container-low rounded-xl tactile-pod p-5 relative">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <h3 className="text-sm font-headline-md tracking-wider text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">table_chart</span>
          HISTORICAL CHRONO-TELEMETRY LOGBOOK
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-metric-display text-xs">
            <thead>
              <tr className="border-b border-surface-variant text-on-surface-variant text-[11px]">
                <th className="py-2.5 px-3">SOL INTERVAL</th>
                <th className="py-2.5 px-3">CALORIC INTAKE</th>
                <th className="py-2.5 px-3">BENCHMARK DELTA</th>
                <th className="py-2.5 px-3">HYDRATION</th>
                <th className="py-2.5 px-3">EXPENDITURE</th>
                <th className="py-2.5 px-3">TELEMETRY STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/40">
              {bars.map((b, i) => (
                <tr key={i} className={`hover:bg-surface-container ${b.isCurrent ? 'bg-primary/5' : ''}`}>
                  <td className="py-2.5 px-3 font-bold text-on-surface flex items-center gap-2">
                    {b.isCurrent && <span className="w-2 h-2 rounded-full bg-primary led-glow-primary"></span>}
                    {b.label}
                  </td>
                  <td className="py-2.5 px-3 text-primary">
                    {b.calories ? `${b.calories} kcal` : '--'}
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">
                    {b.calories ? (b.calories - 2200 > 0 ? `+${b.calories - 2200} kcal` : `${b.calories - 2200} kcal`) : '--'}
                  </td>
                  <td className="py-2.5 px-3 text-secondary">
                    {b.hydrationMl ? `${b.hydrationMl} ml` : '--'}
                  </td>
                  <td className="py-2.5 px-3 text-tertiary">
                    {b.expenditure ? `${b.expenditure} kcal` : '--'}
                  </td>
                  <td className="py-2.5 px-3">
                    {b.calories ? (
                      <span className="text-[10px] font-label-subtle text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded">
                        VERIFIED
                      </span>
                    ) : (
                      <span className="text-[10px] font-label-subtle text-outline">
                        SCHEDULED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
