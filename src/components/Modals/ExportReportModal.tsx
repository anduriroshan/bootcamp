import React from 'react';
import { DayTelemetry } from '../../types/telemetry';
import { soundEngine } from '../../utils/sound';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayTelemetry;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  day,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundEngine.playClick(900);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#171c23] border border-surface-variant/80 rounded-xl max-w-lg w-full tactile-pod p-6 relative shadow-2xl">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">print</span>
            <h3 className="font-headline-md tracking-wider text-on-surface text-base">
              TACTILE TELEMETRY REPORT SLIP
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick(400);
              onClose();
            }}
            className="metal-actuator w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Physical Paper Document Simulation */}
        <div className="bg-[#f7f4eb] text-[#1e232a] p-5 rounded font-metric-display text-xs border border-white/20 shadow-inner space-y-3">
          <div className="text-center border-b border-[#1e232a]/30 pb-2">
            <div className="font-bold text-sm tracking-widest">
              CHRONO•NUTRITION TELEMETRY LAB
            </div>
            <div className="text-[10px] text-[#555]">
              SOL {day.sol} • {day.solDate} • FIRMWARE V4.92
            </div>
            <div className="text-[9px] text-[#777] mt-0.5">
              DOC-ID: #CN-8842-MK4-ALPHA
            </div>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between font-bold">
              <span>ACCUMULATED INTAKE:</span>
              <span>{totalCalories} KCAL / {day.calorieTarget} KCAL</span>
            </div>
            <div className="flex justify-between text-[#444]">
              <span>NET DEFICIT / BALANCE:</span>
              <span>
                {day.calorieTarget - totalCalories >= 0
                  ? `-${day.calorieTarget - totalCalories} KCAL (DEFICIT)`
                  : `+${Math.abs(day.calorieTarget - totalCalories)} KCAL (SURPLUS)`}
              </span>
            </div>
            <div className="flex justify-between text-[#444]">
              <span>BASAL METABOLIC BURN:</span>
              <span>{day.basalBurn} KCAL</span>
            </div>
            <div className="flex justify-between text-[#444]">
              <span>HYDRATION ACCUMULATION:</span>
              <span>{day.waterIntakeMl} ML / {day.waterQuotaMl} ML</span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#1e232a]/40 pt-2">
            <div className="font-bold mb-1">MACRONUTRIENT BALANCE:</div>
            <div className="grid grid-cols-3 text-center text-[10px]">
              <div className="border-r border-[#1e232a]/20">
                <span className="block text-[#666]">PROTEIN</span>
                <span className="font-bold">{totalProtein}g</span>
              </div>
              <div className="border-r border-[#1e232a]/20">
                <span className="block text-[#666]">CARBS</span>
                <span className="font-bold">{totalCarbs}g</span>
              </div>
              <div>
                <span className="block text-[#666]">LIPIDS</span>
                <span className="font-bold">{totalFat}g</span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-[#1e232a]/40 pt-2">
            <div className="font-bold mb-1">RECORDED SESSIONS ({day.meals.length}):</div>
            <div className="space-y-1 text-[10px]">
              {day.meals.map((m, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate max-w-[200px]">{m.title}</span>
                  <span>{m.calories} kcal ({m.status})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Physical Barcode */}
          <div className="pt-2 border-t border-[#1e232a]/30 flex flex-col items-center">
            <div className="h-6 w-48 flex justify-between items-center opacity-70">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#1e232a] h-full"
                  style={{ width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '1px' : '2px' }}
                ></div>
              ))}
            </div>
            <span className="text-[9px] tracking-widest text-[#666] mt-1">
              * CN-CERT-VERIFIED-SOL{day.sol} *
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-surface-variant/40 mt-4">
          <button
            onClick={onClose}
            className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-on-surface-variant"
          >
            Dismiss
          </button>
          <button
            onClick={handlePrint}
            className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-primary font-bold flex items-center justify-center gap-1.5 border-t border-primary/30"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Telemetry Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
