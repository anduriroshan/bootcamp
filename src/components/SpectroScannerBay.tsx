import React, { useState } from 'react';
import { Meal } from '../types/telemetry';
import { SCANNER_PRESETS, SpectroPreset } from '../data/initialData';
import { soundEngine } from '../utils/sound';
import confetti from 'canvas-confetti';

interface SpectroScannerBayProps {
  onLogMeal: (meal: Meal) => void;
}

export const SpectroScannerBay: React.FC<SpectroScannerBayProps> = ({ onLogMeal }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [calorieAdjustment, setCalorieAdjustment] = useState<number>(0);
  const [showRecalibrate, setShowRecalibrate] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const currentPreset: SpectroPreset = SCANNER_PRESETS[selectedPresetIndex];
  const activeCalories = currentPreset.totalCalories + calorieAdjustment;

  const handleNextPreset = () => {
    soundEngine.playClick(600);
    setIsLogged(false);
    setCalorieAdjustment(0);
    setSelectedPresetIndex((prev) => (prev + 1) % SCANNER_PRESETS.length);
    triggerScanAnimation();
  };

  const handlePrevPreset = () => {
    soundEngine.playClick(500);
    setIsLogged(false);
    setCalorieAdjustment(0);
    setSelectedPresetIndex((prev) => (prev - 1 + SCANNER_PRESETS.length) % SCANNER_PRESETS.length);
    triggerScanAnimation();
  };

  const triggerScanAnimation = () => {
    setIsScanning(true);
    soundEngine.playScan();
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          triggerScanAnimation();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmLog = () => {
    soundEngine.playConfirm();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#4edea3', '#89ceff', '#ffb95f'],
    });

    const newMeal: Meal = {
      id: `meal-scan-${Date.now()}`,
      time: '12:42 LOCAL',
      type: 'LUNCH',
      title: currentPreset.name,
      description: currentPreset.items.map((i) => i.name).join(', '),
      calories: activeCalories,
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
    setIsLogged(true);
  };

  return (
    <div className="bg-surface-container-low rounded-xl tactile-pod p-4 sm:p-space-lg relative">
      <div className="brass-screw absolute top-3 left-3"></div>
      <div className="brass-screw absolute top-3 right-3"></div>
      <div className="brass-screw absolute bottom-3 left-3"></div>
      <div className="brass-screw absolute bottom-3 right-3"></div>

      {/* Scanner Chamber Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-surface-variant/40 mb-4 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-primary led-glow-primary"></span>
          <h2 className="text-sm sm:text-headline-md font-headline-md tracking-wider text-on-surface">
            OPTICAL SPECTRO-SCANNER BAY
          </h2>
          <span className="text-label-meter font-label-meter text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded text-[10px]">
            CHAMBER 01
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-label-subtle font-label-subtle text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/30">
            NEURAL ENGINE ACTIVE
          </span>
          <span className="text-[10px] sm:text-label-meter font-label-meter text-on-surface-variant">
            MODEL v4.92
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Beveled Camera Lens Window */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div className="recessed-cavity rounded-lg p-2 bg-surface-container-lowest border border-surface-variant relative overflow-hidden group">
            {/* Glass Edge Specular Highlight */}
            <div className="absolute inset-0 pointer-events-none z-20 border border-white/10 rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.15)]"></div>

            {/* Scan Reticle Overlays & Animated Scanline */}
            <div className="relative w-full h-60 sm:h-64 rounded bg-black overflow-hidden flex items-center justify-center">
              {/* Food Sample Image */}
              <img
                src={customImage || currentPreset.imageUrl}
                alt={currentPreset.name}
                className={`w-full h-full object-cover filter brightness-95 contrast-105 transition-transform duration-700 ${
                  isScanning ? 'scale-105 filter blur-[0.5px]' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Animated Green Scan Line */}
              <div
                className={`absolute inset-x-0 h-16 reticle-scanline pointer-events-none z-10 ${
                  isScanning ? 'opacity-100' : 'opacity-75'
                }`}
              ></div>

              {/* Scanning status banner */}
              {isScanning && (
                <div className="absolute inset-0 z-20 bg-primary/15 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-primary font-metric-display text-xs tracking-widest bg-black/80 px-3 py-1 rounded border border-primary animate-pulse">
                    ANALYZING SPECTRAL ABSORBANCE...
                  </span>
                </div>
              )}

              {/* Corner Crosshair Reticles */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary z-20"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary z-20"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary z-20"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary z-20"></div>

              {/* Centered Target Ring */}
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-primary/40 flex items-center justify-center pointer-events-none z-10">
                <div className="w-2 h-2 bg-primary rounded-full led-glow-primary"></div>
              </div>

              {/* Preset Selector Chevrons */}
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-auto z-20">
                <button
                  onClick={handlePrevPreset}
                  className="w-7 h-7 rounded-full bg-black/60 hover:bg-black text-primary border border-primary/40 flex items-center justify-center"
                  title="Previous Preset Specimen"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button
                  onClick={handleNextPreset}
                  className="w-7 h-7 rounded-full bg-black/60 hover:bg-black text-primary border border-primary/40 flex items-center justify-center"
                  title="Next Preset Specimen"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              {/* AI HUD Readout Overlay */}
              <div className="absolute bottom-2 left-2 z-20 bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded border border-primary/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary led-glow-primary"></span>
                <span className="text-[10px] font-label-meter text-primary">
                  SPECTRO-LOCK: CONFIRMED {currentPreset.confidence}%
                </span>
              </div>
            </div>
          </div>

          {/* Drag & Drop Brass Shutter Slot */}
          <div className="mt-3 p-2.5 rounded-lg bg-surface-container recessed-cavity border border-surface-variant/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-base">cloud_upload</span>
              <span className="text-[11px] sm:text-label-subtle font-label-subtle text-on-surface truncate max-w-[200px] sm:max-w-none">
                Drop plate imagery or tap to capture
              </span>
            </div>
            <label className="metal-actuator text-xs px-2.5 py-1 rounded text-primary font-headline-md font-semibold cursor-pointer shrink-0">
              BROWSE
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {/* Stamped Receipt / Lab Ticket Readout Card */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div className="paper-card p-3.5 sm:p-4 rounded-lg relative overflow-hidden">
            {/* Physical Pin Hole Texture */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-surface-container-lowest shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-white/5"></div>

            <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-variant">
              <span className="text-xs font-label-meter text-primary font-bold">
                TELEMETRY ANALYSIS TICKET {currentPreset.ticketNumber}
              </span>
              <span className="text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant">
                {currentPreset.timestamp}
              </span>
            </div>

            {/* Detected Biomass Breakdown */}
            <div className="space-y-1.5 mb-3">
              <div className="text-[10px] font-label-subtle text-on-surface-variant uppercase tracking-wider">
                SPECTRAL COMPOSITION:
              </div>
              <ul className="text-xs font-body-sm text-on-surface space-y-1 pl-1">
                {currentPreset.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 truncate max-w-[180px] sm:max-w-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="font-metric-display text-[11px] text-on-surface-variant shrink-0">
                      {item.grams}g // {item.calories} kcal
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grand Total Physical Stamped Ribbon */}
            <div className="recessed-cavity p-2.5 rounded bg-surface-container-lowest border border-primary/20 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-label-meter text-primary font-bold text-xs sm:text-sm">
                  ESTIMATED YIELD: {activeCalories} KCAL
                </span>
                <span className="font-label-meter text-primary bg-primary/20 px-1.5 py-0.5 rounded text-[10px]">
                  {currentPreset.confidence}% CONFIDENCE
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center font-metric-display text-xs pt-1 border-t border-surface-variant/30">
                <div className="bg-surface-container p-1 rounded">
                  <span className="text-[10px] block text-on-surface-variant">PROTEIN</span>
                  <span className="text-primary font-bold">{currentPreset.protein}g</span>
                </div>
                <div className="bg-surface-container p-1 rounded">
                  <span className="text-[10px] block text-on-surface-variant">CARBS</span>
                  <span className="text-secondary font-bold">{currentPreset.carbs}g</span>
                </div>
                <div className="bg-surface-container p-1 rounded">
                  <span className="text-[10px] block text-on-surface-variant">LIPIDS</span>
                  <span className="text-tertiary font-bold">{currentPreset.fat}g</span>
                </div>
              </div>
            </div>

            {/* Calibration Verification Stamped Badge */}
            <div className="flex items-center justify-between text-[10px] sm:text-label-subtle font-label-subtle text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                GLYCEMIC INDEX ESTIMATE: {currentPreset.glycemicIndex} ({currentPreset.glycemicLabel})
              </span>
              <span className="tracking-widest uppercase text-[10px] text-outline">
                STAMP: {currentPreset.stamp}
              </span>
            </div>

            {/* Recalibration Slider Tray (Expandable) */}
            {showRecalibrate && (
              <div className="mt-3 pt-2 border-t border-surface-variant/40 space-y-2 bg-surface-container/80 p-2 rounded">
                <div className="flex justify-between text-[11px] font-label-meter text-on-surface">
                  <span>PORTION YIELD OFFSET:</span>
                  <span className="text-primary">{calorieAdjustment >= 0 ? `+${calorieAdjustment}` : calorieAdjustment} KCAL</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="25"
                  value={calorieAdjustment}
                  onChange={(e) => {
                    soundEngine.playClick(600);
                    setCalorieAdjustment(Number(e.target.value));
                  }}
                  className="w-full accent-primary"
                />
              </div>
            )}
          </div>

          {/* Skeuomorphic Physical Action Buttons */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={handleConfirmLog}
              disabled={isLogged}
              className={`metal-actuator flex-1 py-2.5 px-3 rounded-lg text-primary font-headline-md font-bold tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 border-t border-primary/30 group ${
                isLogged ? 'opacity-80 text-primary-fixed-dim' : ''
              }`}
            >
              <span className="material-symbols-outlined text-base sm:text-lg group-hover:scale-110 transition-transform">
                {isLogged ? 'check_circle' : 'task_alt'}
              </span>
              <span>{isLogged ? '✓ Logged to Lunch' : 'Confirm & Log to Lunch'}</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick(700);
                setShowRecalibrate(!showRecalibrate);
              }}
              className="metal-actuator py-2.5 px-3 rounded-lg text-on-surface-variant hover:text-on-surface font-headline-md text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0"
              title="Recalibrate Portions & AI"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">tune</span>
              <span className="hidden sm:inline">Recalibrate AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
