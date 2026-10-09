import React from 'react';
import { soundEngine } from '../../utils/sound';

interface HydrationViewProps {
  waterIntakeMl: number;
  waterQuotaMl: number;
  onAddWater: (amount: number) => void;
}

export const HydrationView: React.FC<HydrationViewProps> = ({
  waterIntakeMl,
  waterQuotaMl,
  onAddWater,
}) => {
  const percentage = Math.min((waterIntakeMl / waterQuotaMl) * 100, 100);
  const surplusNeeded = Math.max(waterQuotaMl - waterIntakeMl, 0);

  const beverages = [
    { name: 'Mountain Spring Water', volume: 250, icon: 'local_drink', color: 'text-secondary' },
    { name: 'Isotonic Electrolyte Matrix', volume: 500, icon: 'electric_bolt', color: 'text-primary' },
    { name: 'Herbal Mineral Infusion', volume: 300, icon: 'eco', color: 'text-tertiary' },
    { name: 'Nitrogen Cold Brew', volume: 200, icon: 'coffee', color: 'text-on-surface' },
    { name: 'Warm Bone Broth', volume: 350, icon: 'soup_kitchen', color: 'text-tertiary' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Pod */}
      <div className="bg-surface-container-low rounded-xl tactile-pod p-5 relative">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-variant/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
              <h2 className="text-xl font-headline-md tracking-wider text-on-surface font-bold">
                HYDRATION BAY // OSMOTIC FLUID CHAMBER
              </h2>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant mt-1">
              Real-time volumetric reservoir telemetry, hydration pacing cadences, and cellular electrolyte balance.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-label-meter text-secondary block">DAILY STATUS</span>
            <span className="text-2xl font-metric-display text-secondary font-bold">
              {waterIntakeMl.toLocaleString()} / {waterQuotaMl.toLocaleString()} ML
            </span>
          </div>
        </div>

        {/* Big Reservoir & Quick Fluid Dosing Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
          {/* Visual Cylinder Reservoir (Large) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-36 h-80 rounded-3xl bg-surface-container-lowest recessed-cavity relative p-2 border-4 border-surface-variant/80 shadow-[0_16px_36px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 glass-reservoir-gradient pointer-events-none z-20 rounded-3xl"></div>

              {/* Water Column */}
              <div
                className="w-full bg-gradient-to-t from-secondary-container via-secondary to-[#c9e6ff] rounded-b-2xl relative z-10 transition-all duration-700 ease-out"
                style={{
                  height: `${percentage}%`,
                  boxShadow: '0 0 20px rgba(0, 162, 230, 0.7), inset 0 2px 4px rgba(255,255,255,0.8)',
                }}
              >
                <div className="absolute -top-2 inset-x-0 h-4 rounded-full bg-[#c9e6ff] opacity-90 border-t border-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"></div>
                <div className="absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full bg-white/70 animate-ping"></div>
                <div className="absolute bottom-24 right-5 w-2 h-2 rounded-full bg-white/50"></div>
                <div className="absolute bottom-44 left-6 w-1.5 h-1.5 rounded-full bg-white/60"></div>
              </div>

              {/* Crystal Graduations */}
              <div className="absolute inset-y-6 right-3 flex flex-col justify-between text-[10px] font-metric-display text-white/80 z-20 pointer-events-none select-none">
                <span>3000 ml</span>
                <span>2500 ml</span>
                <span>2000 ml</span>
                <span>1500 ml</span>
                <span>1000 ml</span>
                <span>500 ml</span>
              </div>
            </div>
            <span className="text-xs font-label-meter text-on-surface-variant mt-3">
              CAPACITY QUOTA: {percentage.toFixed(1)}% ACHIEVED
            </span>
          </div>

          {/* Dosing Presets & Electrolyte Metrics */}
          <div className="lg:col-span-7 space-y-4">
            <div className="paper-card p-4 rounded-lg">
              <h3 className="text-xs font-label-meter text-secondary mb-3">
                VOLUMETRIC DOSING ACTUATORS (ONE-TAP LOG):
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {beverages.map((bev, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundEngine.playWater();
                      onAddWater(bev.volume);
                    }}
                    className="metal-actuator p-3 rounded-lg flex items-center justify-between text-left active:scale-95 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`material-symbols-outlined text-lg ${bev.color}`}>
                        {bev.icon}
                      </span>
                      <div>
                        <span className="text-xs font-headline-md font-bold text-on-surface block group-hover:text-primary">
                          {bev.name}
                        </span>
                        <span className="text-[10px] font-metric-display text-on-surface-variant">
                          +{bev.volume} ml dosage
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-label-meter text-secondary font-bold">
                      +{bev.volume}ml
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Electrolyte Matrix Gauges */}
            <div className="paper-card p-4 rounded-lg space-y-3">
              <h3 className="text-xs font-label-meter text-primary">
                MINERAL &amp; ELECTROLYTE OSMOLARITY BUFFER:
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] font-metric-display text-on-surface-variant mb-1">
                    <span>SODIUM (Na+) EQUILIBRIUM</span>
                    <span className="text-primary font-bold">2,400mg / 2,500mg (96%)</span>
                  </div>
                  <div className="h-2 rounded bg-surface-container-lowest recessed-cavity p-0.5">
                    <div className="h-full bg-primary rounded w-[96%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-metric-display text-on-surface-variant mb-1">
                    <span>POTASSIUM (K+) RETENTION</span>
                    <span className="text-secondary font-bold">3,850mg / 4,200mg (91%)</span>
                  </div>
                  <div className="h-2 rounded bg-surface-container-lowest recessed-cavity p-0.5">
                    <div className="h-full bg-secondary rounded w-[91%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-metric-display text-on-surface-variant mb-1">
                    <span>MAGNESIUM (Mg2+) INTRA-CELLULAR</span>
                    <span className="text-tertiary font-bold">380mg / 400mg (95%)</span>
                  </div>
                  <div className="h-2 rounded bg-surface-container-lowest recessed-cavity p-0.5">
                    <div className="h-full bg-tertiary rounded w-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
