import React from 'react';
import { Meal } from '../types/telemetry';
import { soundEngine } from '../utils/sound';

interface TimelineLogProps {
  meals: Meal[];
  onOpenAddMeal: () => void;
  onSelectMeal: (meal: Meal) => void;
  onToggleStatus: (mealId: string) => void;
  onDeleteMeal: (mealId: string) => void;
}

export const TimelineLog: React.FC<TimelineLogProps> = ({
  meals,
  onOpenAddMeal,
  onSelectMeal,
  onToggleStatus,
  onDeleteMeal,
}) => {
  return (
    <section className="bg-surface-container-low rounded-xl tactile-pod p-4 sm:p-space-lg relative" id="chronolog">
      <div className="brass-screw absolute top-3 left-3"></div>
      <div className="brass-screw absolute top-3 right-3"></div>
      <div className="brass-screw absolute bottom-3 left-3"></div>
      <div className="brass-screw absolute bottom-3 right-3"></div>

      {/* Section Title & Filter Toggle */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-surface-variant/40 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            calendar_view_day
          </span>
          <h2 className="text-sm sm:text-headline-md font-headline-md tracking-wider text-on-surface">
            TODAY'S CHRONO-TIMELINE LOG
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-label-subtle font-label-subtle text-on-surface-variant">
            {meals.length} DIETARY SESSIONS
          </span>
          <button
            onClick={() => {
              soundEngine.playClick(650);
              onOpenAddMeal();
            }}
            className="metal-actuator text-xs px-3 py-1.5 rounded text-primary font-headline-md font-bold flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            <span>Add Custom Intake</span>
          </button>
        </div>
      </div>

      {/* Horizontal Cards Rail (Bento Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {meals.map((meal) => {
          const isPending = meal.status === 'PENDING';
          const isVerified = meal.status === 'VERIFIED';

          let borderAccent = 'border-t-primary';
          if (meal.type === 'LUNCH') borderAccent = 'border-t-primary-container';
          if (meal.type === 'MID-DAY REFUEL' || meal.type === 'SNACK') borderAccent = 'border-t-secondary';
          if (isPending) borderAccent = 'border-t-outline border-dashed';

          return (
            <div
              key={meal.id}
              className={`paper-card rounded-lg p-3.5 flex flex-col justify-between border-t-2 ${borderAccent} relative group cursor-pointer hover:brightness-105 transition-all ${
                isPending ? 'opacity-85' : ''
              }`}
              onClick={() => {
                soundEngine.playClick(700);
                onSelectMeal(meal);
              }}
            >
              {meal.isAiScan && (
                <div className="absolute -top-2.5 right-3 bg-primary text-on-primary-container text-[9px] font-metric-display px-2 py-0.5 rounded-full font-bold shadow-md">
                  AI OPTICAL SCAN
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-label-meter text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
                    {meal.time}
                  </span>
                  <span className="text-[10px] font-label-subtle text-on-surface-variant uppercase">
                    {meal.type}
                  </span>
                </div>

                <h3 className="text-sm sm:text-body-md font-body-md font-bold text-on-surface group-hover:text-primary transition-colors">
                  {meal.title}
                </h3>
                <p className="text-xs font-body-sm text-on-surface-variant mt-1 line-clamp-2">
                  {meal.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-variant/40">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-metric-display text-base text-primary font-bold">
                    {isPending ? `~${meal.calories}` : meal.calories} KCAL
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClick(800);
                      onToggleStatus(meal.id);
                    }}
                    className={`text-[10px] font-label-subtle px-1.5 py-0.5 rounded font-bold transition-transform active:scale-95 ${
                      isVerified
                        ? 'text-primary bg-primary/20'
                        : isPending
                        ? 'text-outline bg-surface-container'
                        : 'text-primary bg-surface-container'
                    }`}
                    title="Click to toggle status"
                  >
                    {meal.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 text-[11px] font-metric-display">
                    <span className="bg-surface-container px-1.5 py-0.5 rounded text-primary">
                      {meal.protein}g P
                    </span>
                    <span className="bg-surface-container px-1.5 py-0.5 rounded text-secondary">
                      {meal.carbs}g C
                    </span>
                    <span className="bg-surface-container px-1.5 py-0.5 rounded text-tertiary">
                      {meal.fat}g F
                    </span>
                  </div>

                  {/* Quick delete icon on hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClick(350);
                      onDeleteMeal(meal.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-opacity p-0.5"
                    title="Remove Meal"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
