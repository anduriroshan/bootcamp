import React, { useState } from 'react';
import { Meal, MealType } from '../../types/telemetry';
import { soundEngine } from '../../utils/sound';

interface ChronologViewProps {
  meals: Meal[];
  onOpenAddMeal: () => void;
  onSelectMeal: (meal: Meal) => void;
  onToggleStatus: (mealId: string) => void;
  onDeleteMeal: (mealId: string) => void;
}

export const ChronologView: React.FC<ChronologViewProps> = ({
  meals,
  onOpenAddMeal,
  onSelectMeal,
  onToggleStatus,
  onDeleteMeal,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeals = meals.filter((meal) => {
    const matchesFilter = filterType === 'ALL' || meal.type === filterType;
    const matchesSearch =
      meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbs = meals.reduce((acc, m) => acc + m.carbs, 0);
  const totalFat = meals.reduce((acc, m) => acc + m.fat, 0);

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
                menu_book
              </span>
              <h2 className="text-xl font-headline-md tracking-wider text-on-surface font-bold">
                CHRONOLOG // FIELD DIETARY REGISTER
              </h2>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant mt-1">
              Continuous chronological biometric feeding records, spectral analysis, and glycemic profiles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick(600);
                onOpenAddMeal();
              }}
              className="metal-actuator px-4 py-2 rounded-lg text-primary font-headline-md font-bold text-xs tracking-wider flex items-center gap-2 border-t border-primary/30"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Register Intake</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-metric-display">
          <div className="bg-surface-container-lowest p-3 rounded-lg recessed-cavity border border-surface-variant/30">
            <span className="text-[10px] text-on-surface-variant font-label-subtle block">TOTAL ENERGY</span>
            <span className="text-xl text-primary font-bold">{totalCalories} kcal</span>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg recessed-cavity border border-surface-variant/30">
            <span className="text-[10px] text-on-surface-variant font-label-subtle block">PROTEIN ACCUMULATION</span>
            <span className="text-xl text-primary font-bold">{totalProtein}g</span>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg recessed-cavity border border-surface-variant/30">
            <span className="text-[10px] text-on-surface-variant font-label-subtle block">COMPLEX CARBS</span>
            <span className="text-xl text-secondary font-bold">{totalCarbs}g</span>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg recessed-cavity border border-surface-variant/30">
            <span className="text-[10px] text-on-surface-variant font-label-subtle block">ESSENTIAL LIPIDS</span>
            <span className="text-xl text-tertiary font-bold">{totalFat}g</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-low rounded-xl p-3 tactile-pod">
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'BREAKFAST', 'LUNCH', 'MID-DAY REFUEL', 'DINNER', 'SNACK'].map((type) => (
            <button
              key={type}
              onClick={() => {
                soundEngine.playClick(700);
                setFilterType(type);
              }}
              className={`text-xs px-2.5 py-1 rounded font-label-subtle transition-all ${
                filterType === type
                  ? 'metal-actuator text-primary font-bold border-t border-primary/30'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-base">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specimen..."
            className="w-full bg-surface-container-lowest recessed-cavity pl-8 pr-3 py-1.5 rounded text-xs text-on-surface border border-surface-variant/40 outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Chronological Stream */}
      <div className="space-y-3">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => {
              soundEngine.playClick(650);
              onSelectMeal(meal);
            }}
            className="bg-surface-container-low rounded-xl tactile-pod p-4 hover:border-primary/40 transition-all cursor-pointer relative flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              {meal.imageUrl ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-surface-variant shrink-0">
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-surface-container-lowest border border-surface-variant shrink-0 flex items-center justify-center text-primary font-metric-display text-lg font-bold">
                  {meal.calories}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-label-meter text-primary bg-primary/10 px-2 py-0.5 rounded font-bold">
                    {meal.time}
                  </span>
                  <span className="text-[10px] font-label-subtle text-on-surface-variant">
                    {meal.type}
                  </span>
                  {meal.isAiScan && (
                    <span className="text-[9px] font-metric-display bg-primary text-black px-1.5 py-0.2 rounded font-bold">
                      AI SPECTRO
                    </span>
                  )}
                </div>
                <h3 className="font-headline-md font-bold text-on-surface text-base">
                  {meal.title}
                </h3>
                <p className="text-xs font-body-sm text-on-surface-variant max-w-xl">
                  {meal.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-5 pt-2 md:pt-0 border-t md:border-t-0 border-surface-variant/30">
              <div className="text-right">
                <span className="text-lg font-metric-display text-primary font-bold block">
                  {meal.calories} KCAL
                </span>
                <div className="flex gap-2 text-[11px] font-metric-display text-on-surface-variant">
                  <span className="text-primary">{meal.protein}g P</span>
                  <span className="text-secondary">{meal.carbs}g C</span>
                  <span className="text-tertiary">{meal.fat}g F</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick(750);
                    onToggleStatus(meal.id);
                  }}
                  className={`text-xs font-label-subtle px-2 py-1 rounded font-bold ${
                    meal.status === 'VERIFIED'
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : meal.status === 'PENDING'
                      ? 'bg-surface-container text-outline border border-surface-variant'
                      : 'bg-surface-container text-primary'
                  }`}
                >
                  {meal.status}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick(300);
                    onDeleteMeal(meal.id);
                  }}
                  className="text-on-surface-variant hover:text-error p-1.5 rounded transition-colors"
                  title="Delete Record"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
