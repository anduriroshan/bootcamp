import React, { useState } from 'react';
import { Meal } from '../../types/telemetry';
import { SCANNER_PRESETS, SpectroPreset } from '../../data/initialData';
import { soundEngine } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface CaptureMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogMeal: (meal: Meal) => void;
}

export const CaptureMealModal: React.FC<CaptureMealModalProps> = ({
  isOpen,
  onClose,
  onLogMeal,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mealType, setMealType] = useState<'BREAKFAST' | 'LUNCH' | 'MID-DAY REFUEL' | 'DINNER'>('LUNCH');

  if (!isOpen) return null;

  const currentPreset: SpectroPreset = SCANNER_PRESETS[selectedPresetIndex];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          runAnalysis();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    soundEngine.playScan();
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleConfirm = () => {
    soundEngine.playConfirm();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4edea3', '#89ceff', '#ffb95f'],
    });

    const newMeal: Meal = {
      id: `meal-capture-${Date.now()}`,
      time: '12:45 LOCAL',
      type: mealType,
      title: currentPreset.name,
      description: currentPreset.items.map((i) => i.name).join(', '),
      calories: currentPreset.totalCalories,
      protein: currentPreset.protein,
      carbs: currentPreset.carbs,
      fat: currentPreset.fat,
      status: 'VERIFIED',
      isAiScan: true,
      imageUrl: customImage || currentPreset.imageUrl,
      spectralComposition: currentPreset.items,
      glycemicIndex: currentPreset.glycemicIndex,
      confidence: currentPreset.confidence,
      stamp: currentPreset.stamp,
    };

    onLogMeal(newMeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-low border border-surface-variant/80 rounded-xl max-w-xl w-full tactile-pod p-5 relative shadow-2xl">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary led-glow-primary"></span>
            <h3 className="font-headline-md tracking-wider text-on-surface text-base">
              OPTICAL SPECTRO-CAPTURE APPARATUS
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Viewfinder window */}
          <div className="flex flex-col">
            <div className="recessed-cavity rounded-lg p-2 bg-surface-container-lowest border border-surface-variant relative overflow-hidden h-56 flex items-center justify-center">
              <img
                src={customImage || currentPreset.imageUrl}
                alt="Target Food Sample"
                className="w-full h-full object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 h-12 reticle-scanline pointer-events-none z-10"></div>
              {/* Corner crosshairs */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary z-20"></div>
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary z-20"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary z-20"></div>
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary z-20"></div>

              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                  <span className="text-xs font-metric-display text-primary animate-pulse tracking-widest bg-black px-3 py-1 rounded border border-primary">
                    SPECTRO-LOCKING...
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <label className="metal-actuator flex-1 py-1.5 px-2 rounded text-center text-xs font-headline-md text-primary font-bold cursor-pointer">
                Choose Image File
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
              <button
                onClick={() => {
                  soundEngine.playClick(600);
                  setSelectedPresetIndex((prev) => (prev + 1) % SCANNER_PRESETS.length);
                  runAnalysis();
                }}
                className="metal-actuator py-1.5 px-3 rounded text-xs text-on-surface font-headline-md"
                title="Switch Preset Sample"
              >
                Sample {selectedPresetIndex + 1}/{SCANNER_PRESETS.length}
              </button>
            </div>
          </div>

          {/* Deconvolution readout */}
          <div className="paper-card p-3 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] font-label-meter text-primary mb-1 border-b border-surface-variant/40 pb-1">
                <span>SPECTRAL TICKET #{Math.floor(Math.random() * 5000 + 4000)}</span>
                <span>{currentPreset.confidence}% CONFIDENCE</span>
              </div>
              <h4 className="font-bold text-sm text-on-surface mb-2">
                {currentPreset.name}
              </h4>

              <div className="space-y-1 mb-2 text-xs">
                {currentPreset.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between text-on-surface-variant">
                    <span className="truncate max-w-[140px]">{item.name}</span>
                    <span className="font-metric-display">{item.calories} kcal</span>
                  </div>
                ))}
              </div>

              <div className="recessed-cavity p-2 rounded bg-surface-container-lowest text-center font-metric-display text-xs border border-primary/20">
                <span className="text-[10px] text-on-surface-variant block">TOTAL ESTIMATE</span>
                <span className="text-lg text-primary font-bold">{currentPreset.totalCalories} KCAL</span>
                <div className="flex justify-around text-[10px] text-on-surface-variant pt-1 border-t border-surface-variant/30 mt-1">
                  <span>{currentPreset.protein}g P</span>
                  <span>{currentPreset.carbs}g C</span>
                  <span>{currentPreset.fat}g F</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="text-[10px] font-label-meter text-on-surface-variant block mb-1">
                ASSIGN TO MEAL SESSION:
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as 'BREAKFAST' | 'LUNCH' | 'MID-DAY REFUEL' | 'DINNER')}
                className="w-full bg-surface-container-lowest recessed-cavity px-2 py-1 rounded text-xs text-on-surface border border-surface-variant/40 mb-2"
              >
                <option value="BREAKFAST">BREAKFAST</option>
                <option value="LUNCH">LUNCH</option>
                <option value="MID-DAY REFUEL">MID-DAY REFUEL</option>
                <option value="DINNER">DINNER</option>
              </select>

              <button
                onClick={handleConfirm}
                className="metal-actuator w-full py-2 rounded-lg text-xs font-headline-md font-bold text-primary border-t border-primary/30 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">task_alt</span>
                <span>Confirm &amp; Log to Daily Cadence</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
