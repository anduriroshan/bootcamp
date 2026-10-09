import React, { useState } from 'react';
import { Meal, MealType } from '../../types/telemetry';
import { soundEngine } from '../../utils/sound';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: Meal) => void;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({
  isOpen,
  onClose,
  onAddMeal,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState<MealType>('LUNCH');
  const [calories, setCalories] = useState<number>(450);
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(45);
  const [fat, setFat] = useState<number>(15);
  const [timeStr, setTimeStr] = useState('13:15 LOCAL');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playConfirm();

    const newMeal: Meal = {
      id: `meal-manual-${Date.now()}`,
      time: timeStr || '13:00 LOCAL',
      type: mealType,
      title: title || 'Custom Biometric Intake',
      description: description || 'Manually logged dietary biomass.',
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      status: 'LOGGED',
      spectralComposition: [
        { name: title || 'Primary Intake Element', grams: 250, calories: Number(calories) }
      ],
      stamp: 'CBO-LOGGED'
    };

    onAddMeal(newMeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-low border border-surface-variant/80 rounded-xl max-w-md w-full tactile-pod p-5 relative shadow-2xl">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">add_circle</span>
            <h3 className="font-headline-md tracking-wider text-on-surface text-base">
              REGISTER MANUAL INTAKE
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

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-[11px] font-label-meter text-on-surface-variant block mb-1">
              MEAL IDENTIFIER / FOOD TITLE
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grilled Chicken & Wild Rice"
              className="w-full bg-surface-container-lowest recessed-cavity px-3 py-2 rounded text-sm text-on-surface border border-surface-variant/40 focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-label-meter text-on-surface-variant block mb-1">
                SESSION CATEGORY
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="w-full bg-surface-container-lowest recessed-cavity px-3 py-2 rounded text-sm text-on-surface border border-surface-variant/40 focus:border-primary outline-none"
              >
                <option value="BREAKFAST">BREAKFAST</option>
                <option value="LUNCH">LUNCH</option>
                <option value="MID-DAY REFUEL">MID-DAY REFUEL</option>
                <option value="DINNER">DINNER</option>
                <option value="SNACK">SNACK</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-label-meter text-on-surface-variant block mb-1">
                TIME STAMP
              </label>
              <input
                type="text"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                className="w-full bg-surface-container-lowest recessed-cavity px-3 py-2 rounded text-sm text-on-surface border border-surface-variant/40 focus:border-primary outline-none font-metric-display"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-label-meter text-on-surface-variant block mb-1">
              SPECIMEN INGREDIENTS / PROSE
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description or macro breakdown..."
              className="w-full bg-surface-container-lowest recessed-cavity px-3 py-2 rounded text-sm text-on-surface border border-surface-variant/40 focus:border-primary outline-none"
            />
          </div>

          {/* Numerical macro steppers */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-surface-container-lowest p-2 rounded recessed-cavity border border-surface-variant/30">
              <span className="text-[10px] font-label-subtle text-primary block">KCAL</span>
              <input
                type="number"
                min="0"
                max="3000"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full text-center bg-transparent text-primary font-metric-display font-bold text-sm outline-none"
              />
            </div>
            <div className="bg-surface-container-lowest p-2 rounded recessed-cavity border border-surface-variant/30">
              <span className="text-[10px] font-label-subtle text-primary block">PROTEIN (g)</span>
              <input
                type="number"
                min="0"
                max="250"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full text-center bg-transparent text-primary font-metric-display font-bold text-sm outline-none"
              />
            </div>
            <div className="bg-surface-container-lowest p-2 rounded recessed-cavity border border-surface-variant/30">
              <span className="text-[10px] font-label-subtle text-secondary block">CARBS (g)</span>
              <input
                type="number"
                min="0"
                max="400"
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
                className="w-full text-center bg-transparent text-secondary font-metric-display font-bold text-sm outline-none"
              />
            </div>
            <div className="bg-surface-container-lowest p-2 rounded recessed-cavity border border-surface-variant/30">
              <span className="text-[10px] font-label-subtle text-tertiary block">FAT (g)</span>
              <input
                type="number"
                min="0"
                max="200"
                value={fat}
                onChange={(e) => setFat(Number(e.target.value))}
                className="w-full text-center bg-transparent text-tertiary font-metric-display font-bold text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-surface-variant/40">
            <button
              type="button"
              onClick={onClose}
              className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-on-surface-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="metal-actuator flex-1 py-2 rounded text-xs font-label-subtle text-primary font-bold border-t border-primary/30"
            >
              Commit to Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
