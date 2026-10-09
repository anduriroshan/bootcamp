import React, { useState } from 'react';
import { soundEngine } from '../../utils/sound';

interface CalibrateModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCalories: number;
  basalBurn: number;
  activeExpenditure: number;
  waterQuotaMl: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  onSaveCalibration: (settings: {
    calorieTarget: number;
    basalBurn: number;
    activeExpenditure: number;
    waterQuotaMl: number;
    proteinTargetG: number;
    carbsTargetG: number;
    fatTargetG: number;
  }) => void;
}

export const CalibrateModal: React.FC<CalibrateModalProps> = ({
  isOpen,
  onClose,
  targetCalories,
  basalBurn,
  activeExpenditure,
  waterQuotaMl,
  proteinTarget,
  carbsTarget,
  fatTarget,
  onSaveCalibration,
}) => {
  const [calTarget, setCalTarget] = useState(targetCalories);
  const [bmr, setBmr] = useState(basalBurn);
  const [exp, setExp] = useState(activeExpenditure);
  const [water, setWater] = useState(waterQuotaMl);
  const [prot, setProt] = useState(proteinTarget);
  const [carbs, setCarbs] = useState(carbsTarget);
  const [fat, setFat] = useState(fatTarget);

  if (!isOpen) return null;

  const handleApplyPreset = (type: 'deficit' | 'maintenance' | 'bulk') => {
    soundEngine.playSwitch();
    if (type === 'deficit') {
      setCalTarget(2200);
      setProt(140);
      setCarbs(210);
      setFat(65);
    } else if (type === 'maintenance') {
      setCalTarget(2550);
      setProt(160);
      setCarbs(260);
      setFat(75);
    } else {
      setCalTarget(2950);
      setProt(180);
      setCarbs(330);
      setFat(90);
    }
  };

  const handleSave = () => {
    soundEngine.playConfirm();
    onSaveCalibration({
      calorieTarget: calTarget,
      basalBurn: bmr,
      activeExpenditure: exp,
      waterQuotaMl: water,
      proteinTargetG: prot,
      carbsTargetG: carbs,
      fatTargetG: fat,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-low border border-surface-variant/80 rounded-xl max-w-lg w-full tactile-pod p-5 relative shadow-2xl">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">tune</span>
            <h3 className="font-headline-md tracking-wider text-on-surface text-base">
              HARDWARE TELEMETRY CALIBRATION
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

        {/* Calibration Presets */}
        <div className="mb-4">
          <span className="text-[11px] font-label-meter text-on-surface-variant block mb-1.5">
            CALIBRATION PROTOCOL PRESETS:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleApplyPreset('deficit')}
              className={`metal-actuator py-1.5 px-2 rounded text-xs font-label-subtle ${
                calTarget === 2200 ? 'text-primary font-bold border-t border-primary/40' : 'text-on-surface-variant'
              }`}
            >
              Deficit (2.2k)
            </button>
            <button
              onClick={() => handleApplyPreset('maintenance')}
              className={`metal-actuator py-1.5 px-2 rounded text-xs font-label-subtle ${
                calTarget === 2550 ? 'text-secondary font-bold border-t border-secondary/40' : 'text-on-surface-variant'
              }`}
            >
              Maintain (2.55k)
            </button>
            <button
              onClick={() => handleApplyPreset('bulk')}
              className={`metal-actuator py-1.5 px-2 rounded text-xs font-label-subtle ${
                calTarget === 2950 ? 'text-tertiary font-bold border-t border-tertiary/40' : 'text-on-surface-variant'
              }`}
            >
              Replenish (2.95k)
            </button>
          </div>
        </div>

        {/* Sliders & Numerical Inputs */}
        <div className="space-y-3.5">
          <div className="bg-surface-container-lowest p-2.5 rounded-lg recessed-cavity border border-surface-variant/30">
            <div className="flex justify-between text-xs font-label-meter mb-1">
              <span className="text-on-surface">CALORIE BENCHMARK TARGET:</span>
              <span className="text-primary font-bold font-metric-display">{calTarget} KCAL</span>
            </div>
            <input
              type="range"
              min="1500"
              max="4000"
              step="50"
              value={calTarget}
              onChange={(e) => {
                soundEngine.playClick(600);
                setCalTarget(Number(e.target.value));
              }}
              className="w-full accent-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-lowest p-2.5 rounded-lg recessed-cavity border border-surface-variant/30">
              <div className="flex justify-between text-xs font-label-meter mb-1">
                <span className="text-on-surface">BASAL (BMR):</span>
                <span className="text-secondary font-bold font-metric-display">{bmr}</span>
              </div>
              <input
                type="range"
                min="1200"
                max="2500"
                step="25"
                value={bmr}
                onChange={(e) => setBmr(Number(e.target.value))}
                className="w-full accent-secondary"
              />
            </div>
            <div className="bg-surface-container-lowest p-2.5 rounded-lg recessed-cavity border border-surface-variant/30">
              <div className="flex justify-between text-xs font-label-meter mb-1">
                <span className="text-on-surface">WATER QUOTA:</span>
                <span className="text-secondary font-bold font-metric-display">{water} ML</span>
              </div>
              <input
                type="range"
                min="1500"
                max="5000"
                step="100"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
                className="w-full accent-secondary"
              />
            </div>
          </div>

          {/* Macro Targets */}
          <div className="bg-surface-container-lowest p-2.5 rounded-lg recessed-cavity border border-surface-variant/30">
            <span className="text-[11px] font-label-meter text-on-surface-variant block mb-2">
              TARGET MACRONUTRIENT MATRICES:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] font-label-subtle text-primary block">PROTEIN</span>
                <input
                  type="number"
                  value={prot}
                  onChange={(e) => setProt(Number(e.target.value))}
                  className="w-full text-center bg-surface-container py-1 rounded text-primary font-metric-display text-sm border border-surface-variant/40"
                />
              </div>
              <div>
                <span className="text-[10px] font-label-subtle text-secondary block">CARBS</span>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  className="w-full text-center bg-surface-container py-1 rounded text-secondary font-metric-display text-sm border border-surface-variant/40"
                />
              </div>
              <div>
                <span className="text-[10px] font-label-subtle text-tertiary block">LIPIDS</span>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(Number(e.target.value))}
                  className="w-full text-center bg-surface-container py-1 rounded text-tertiary font-metric-display text-sm border border-surface-variant/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-surface-variant/40 mt-4">
          <button
            onClick={onClose}
            className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-on-surface-variant"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-primary font-bold border-t border-primary/30"
          >
            Lock Telemetry Calibration
          </button>
        </div>
      </div>
    </div>
  );
};
