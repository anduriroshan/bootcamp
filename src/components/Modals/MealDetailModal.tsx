import React from 'react';
import { Meal } from '../../types/telemetry';
import { soundEngine } from '../../utils/sound';

interface MealDetailModalProps {
  meal: Meal | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  meal,
  onClose,
  onDelete,
  onToggleStatus,
}) => {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-low border border-surface-variant/80 rounded-xl max-w-lg w-full tactile-pod p-5 relative shadow-2xl">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
            <h3 className="font-headline-md tracking-wider text-on-surface text-base">
              CHRONO-SPECIMEN ANALYSIS
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

        <div className="space-y-4">
          {meal.imageUrl && (
            <div className="w-full h-44 rounded-lg overflow-hidden border border-surface-variant/60 relative">
              <img
                src={meal.imageUrl}
                alt={meal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {meal.isAiScan && (
                <div className="absolute top-2 right-2 bg-primary text-on-primary-container text-[10px] font-metric-display px-2 py-0.5 rounded font-bold">
                  SPECTRO-VERIFIED
                </div>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-label-meter text-primary font-bold">
                {meal.time} // {meal.type}
              </span>
              <span
                onClick={() => {
                  soundEngine.playClick(700);
                  onToggleStatus(meal.id);
                }}
                className="text-xs font-label-subtle px-2 py-0.5 rounded cursor-pointer bg-primary/10 text-primary border border-primary/30"
              >
                STATUS: {meal.status}
              </span>
            </div>
            <h2 className="text-lg font-headline-md font-bold text-on-surface mt-1">
              {meal.title}
            </h2>
            <p className="text-sm font-body-sm text-on-surface-variant mt-0.5">
              {meal.description}
            </p>
          </div>

          {/* Macro breakdown */}
          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-surface-variant/40 grid grid-cols-4 gap-2 text-center font-metric-display">
            <div>
              <span className="text-[10px] block text-on-surface-variant">ENERGY</span>
              <span className="text-base text-primary font-bold">{meal.calories} kcal</span>
            </div>
            <div>
              <span className="text-[10px] block text-on-surface-variant">PROTEIN</span>
              <span className="text-base text-primary font-bold">{meal.protein}g</span>
            </div>
            <div>
              <span className="text-[10px] block text-on-surface-variant">CARBS</span>
              <span className="text-base text-secondary font-bold">{meal.carbs}g</span>
            </div>
            <div>
              <span className="text-[10px] block text-on-surface-variant">LIPIDS</span>
              <span className="text-base text-tertiary font-bold">{meal.fat}g</span>
            </div>
          </div>

          {/* Spectral decomposition list */}
          {meal.spectralComposition && meal.spectralComposition.length > 0 && (
            <div className="paper-card p-3 rounded-lg border border-surface-variant/30">
              <span className="text-[11px] font-label-meter text-primary block mb-2">
                SPECTRAL INGREDIENT COMPOSITION:
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {meal.spectralComposition.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs text-on-surface">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item.name}
                    </span>
                    <span className="font-metric-display text-on-surface-variant">
                      {item.grams}g // {item.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t border-surface-variant/40">
            <button
              onClick={() => {
                soundEngine.playClick(300);
                onDelete(meal.id);
                onClose();
              }}
              className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-error hover:text-white flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              <span>Remove Specimen</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick(600);
                onClose();
              }}
              className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-primary font-bold"
            >
              Close Slate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
