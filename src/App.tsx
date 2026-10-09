import React, { useState } from 'react';
import { Header } from './components/Header';
import { TachometerGauge } from './components/TachometerGauge';
import { MacroGalvanometers } from './components/MacroGalvanometers';
import { SpectroScannerBay } from './components/SpectroScannerBay';
import { HydrationBay } from './components/HydrationBay';
import { TimelineLog } from './components/TimelineLog';
import { WeeklyDiagnostics } from './components/WeeklyDiagnostics';

// Modals
import { CaptureMealModal } from './components/Modals/CaptureMealModal';
import { CalibrateModal } from './components/Modals/CalibrateModal';
import { AddMealModal } from './components/Modals/AddMealModal';
import { MealDetailModal } from './components/Modals/MealDetailModal';
import { ExportReportModal } from './components/Modals/ExportReportModal';
import { AlertsModal } from './components/Modals/AlertsModal';

// Dedicated Views
import { ChronologView } from './components/Screens/ChronologView';
import { HydrationView } from './components/Screens/HydrationView';
import { DiagnosticsView } from './components/Screens/DiagnosticsView';

// Initial Data
import {
  INITIAL_DAY_SOL283,
  INITIAL_DAY_SOL284,
  INITIAL_DAY_SOL285,
  INITIAL_WEEKLY_BARS,
} from './data/initialData';
import { DayTelemetry, Meal } from './types/telemetry';
import { soundEngine } from './utils/sound';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'telemetry' | 'chronolog' | 'hydration' | 'diagnostics'>('telemetry');
  const [solList, setSolList] = useState<DayTelemetry[]>([
    INITIAL_DAY_SOL283,
    INITIAL_DAY_SOL284,
    INITIAL_DAY_SOL285,
  ]);
  const [currentSolIndex, setCurrentSolIndex] = useState(1); // Default to Sol 284 (Today)
  const [quickCalorieOffset, setQuickCalorieOffset] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [isCalibrateOpen, setIsCalibrateOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [selectedMealForDetail, setSelectedMealForDetail] = useState<Meal | null>(null);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);

  const activeDay = solList[currentSolIndex];

  // Calculated Totals from activeDay meals
  const mealCalories = activeDay.meals.reduce((sum, m) => sum + (m.status !== 'PENDING' ? m.calories : 0), 0);
  const totalIntakeCalories = mealCalories + quickCalorieOffset;

  const totalProtein = activeDay.meals.reduce((sum, m) => sum + (m.status !== 'PENDING' ? m.protein : 0), 0);
  const totalCarbs = activeDay.meals.reduce((sum, m) => sum + (m.status !== 'PENDING' ? m.carbs : 0), 0);
  const totalFat = activeDay.meals.reduce((sum, m) => sum + (m.status !== 'PENDING' ? m.fat : 0), 0);

  // Sol navigation
  const handlePrevSol = () => {
    if (currentSolIndex > 0) {
      setCurrentSolIndex((prev) => prev - 1);
      setQuickCalorieOffset(0);
    }
  };

  const handleNextSol = () => {
    if (currentSolIndex < solList.length - 1) {
      setCurrentSolIndex((prev) => prev + 1);
      setQuickCalorieOffset(0);
    }
  };

  // Quick calorie adjustments
  const handleQuickAddCalories = (amount: number) => {
    setQuickCalorieOffset((prev) => prev + amount);
  };

  const handleResetQuickCalories = () => {
    setQuickCalorieOffset(0);
  };

  // Hydration adjustment
  const handleAddWater = (amount: number) => {
    setSolList((prev) => {
      const updated = [...prev];
      const target = { ...updated[currentSolIndex] };
      target.waterIntakeMl = Math.max(0, target.waterIntakeMl + amount);
      updated[currentSolIndex] = target;
      return updated;
    });
  };

  // Meal management
  const handleAddMeal = (meal: Meal) => {
    setSolList((prev) => {
      const updated = [...prev];
      const target = { ...updated[currentSolIndex] };
      target.meals = [meal, ...target.meals];
      updated[currentSolIndex] = target;
      return updated;
    });
  };

  const handleToggleMealStatus = (mealId: string) => {
    setSolList((prev) => {
      const updated = [...prev];
      const target = { ...updated[currentSolIndex] };
      target.meals = target.meals.map((m) => {
        if (m.id === mealId) {
          const nextStatus = m.status === 'LOGGED' ? 'VERIFIED' : m.status === 'VERIFIED' ? 'PENDING' : 'LOGGED';
          return { ...m, status: nextStatus };
        }
        return m;
      });
      updated[currentSolIndex] = target;
      return updated;
    });
  };

  const handleDeleteMeal = (mealId: string) => {
    setSolList((prev) => {
      const updated = [...prev];
      const target = { ...updated[currentSolIndex] };
      target.meals = target.meals.filter((m) => m.id !== mealId);
      updated[currentSolIndex] = target;
      return updated;
    });
    if (selectedMealForDetail?.id === mealId) {
      setSelectedMealForDetail(null);
    }
  };

  // Hardware Calibration save
  const handleSaveCalibration = (settings: {
    calorieTarget: number;
    basalBurn: number;
    activeExpenditure: number;
    waterQuotaMl: number;
    proteinTargetG: number;
    carbsTargetG: number;
    fatTargetG: number;
  }) => {
    setSolList((prev) => {
      const updated = [...prev];
      const target = { ...updated[currentSolIndex] };
      target.calorieTarget = settings.calorieTarget;
      target.basalBurn = settings.basalBurn;
      target.activeExpenditure = settings.activeExpenditure;
      target.waterQuotaMl = settings.waterQuotaMl;
      target.proteinTargetG = settings.proteinTargetG;
      target.carbsTargetG = settings.carbsTargetG;
      target.fatTargetG = settings.fatTargetG;
      updated[currentSolIndex] = target;
      return updated;
    });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
  };

  return (
    <div className="bg-[#0f141a] text-on-surface font-body-md tactile-chassis min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col justify-between">
      {/* 1. Cockpit Header Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        sol={activeDay.sol}
        solDate={activeDay.solDate}
        onPrevSol={handlePrevSol}
        onNextSol={handleNextSol}
        onOpenCapture={() => setIsCaptureOpen(true)}
        onOpenCalibrate={() => setIsCalibrateOpen(true)}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 2. Main Instrumentation Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 w-full flex-1">
        {currentTab === 'telemetry' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Row: Caloric Flux Tachometer & Macro Galvanometers Pod */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="telemetry">
              <div className="lg:col-span-7 flex flex-col">
                <TachometerGauge
                  intakeCalories={totalIntakeCalories}
                  targetCalories={activeDay.calorieTarget}
                  basalBurn={activeDay.basalBurn}
                  activeExpenditure={activeDay.activeExpenditure}
                  onQuickAdd={handleQuickAddCalories}
                  onResetQuick={handleResetQuickCalories}
                />
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <MacroGalvanometers
                  proteinG={totalProtein}
                  proteinTargetG={activeDay.proteinTargetG}
                  carbsG={totalCarbs}
                  carbsTargetG={activeDay.carbsTargetG}
                  fatG={totalFat}
                  fatTargetG={activeDay.fatTargetG}
                />
              </div>
            </section>

            {/* Middle Row: AI Food Scanner & Hydration Vessel */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 flex flex-col">
                <SpectroScannerBay onLogMeal={handleAddMeal} />
              </div>

              <div className="lg:col-span-4 flex flex-col">
                <HydrationBay
                  waterIntakeMl={activeDay.waterIntakeMl}
                  waterQuotaMl={activeDay.waterQuotaMl}
                  onAddWater={handleAddWater}
                />
              </div>
            </section>

            {/* Bottom Section 1: Today's Chrono-Timeline Log */}
            <TimelineLog
              meals={activeDay.meals}
              onOpenAddMeal={() => setIsAddMealOpen(true)}
              onSelectMeal={(meal) => setSelectedMealForDetail(meal)}
              onToggleStatus={handleToggleMealStatus}
              onDeleteMeal={handleDeleteMeal}
            />

            {/* Bottom Section 2: Weekly Diagnostics & Adherence */}
            <WeeklyDiagnostics
              bars={INITIAL_WEEKLY_BARS}
              onExportReport={() => setIsExportReportOpen(true)}
            />
          </div>
        )}

        {currentTab === 'chronolog' && (
          <div className="animate-in fade-in duration-300">
            <ChronologView
              meals={activeDay.meals}
              onOpenAddMeal={() => setIsAddMealOpen(true)}
              onSelectMeal={(meal) => setSelectedMealForDetail(meal)}
              onToggleStatus={handleToggleMealStatus}
              onDeleteMeal={handleDeleteMeal}
            />
          </div>
        )}

        {currentTab === 'hydration' && (
          <div className="animate-in fade-in duration-300">
            <HydrationView
              waterIntakeMl={activeDay.waterIntakeMl}
              waterQuotaMl={activeDay.waterQuotaMl}
              onAddWater={handleAddWater}
            />
          </div>
        )}

        {currentTab === 'diagnostics' && (
          <div className="animate-in fade-in duration-300">
            <DiagnosticsView
              bars={INITIAL_WEEKLY_BARS}
              onExportReport={() => setIsExportReportOpen(true)}
            />
          </div>
        )}
      </main>

      {/* 3. Footer Hardware Badge / Chassis Base */}
      <footer className="bg-surface-container-lowest border-t border-surface-variant/40 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between text-on-surface-variant text-body-sm font-body-sm gap-4">
          <div className="flex items-center gap-3">
            <div className="brass-screw"></div>
            <span className="text-xs font-label-meter text-primary font-bold">
              CHRONO•NUTRITION SPECIFICATION 8.1
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-xs hidden sm:inline">
              CALIBRATED FOR PRECISION SKEUOMORPHIC TELEMETRY
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-label-subtle">
            <span>SECURITY ENCLAVE: ENCRYPTED</span>
            <span>•</span>
            <span>FIRMWARE V4.92 ACTIVE</span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <CaptureMealModal
        isOpen={isCaptureOpen}
        onClose={() => setIsCaptureOpen(false)}
        onLogMeal={handleAddMeal}
      />

      <CalibrateModal
        isOpen={isCalibrateOpen}
        onClose={() => setIsCalibrateOpen(false)}
        targetCalories={activeDay.calorieTarget}
        basalBurn={activeDay.basalBurn}
        activeExpenditure={activeDay.activeExpenditure}
        waterQuotaMl={activeDay.waterQuotaMl}
        proteinTarget={activeDay.proteinTargetG}
        carbsTarget={activeDay.carbsTargetG}
        fatTarget={activeDay.fatTargetG}
        onSaveCalibration={handleSaveCalibration}
      />

      <AddMealModal
        isOpen={isAddMealOpen}
        onClose={() => setIsAddMealOpen(false)}
        onAddMeal={handleAddMeal}
      />

      <MealDetailModal
        meal={selectedMealForDetail}
        onClose={() => setSelectedMealForDetail(null)}
        onDelete={handleDeleteMeal}
        onToggleStatus={handleToggleMealStatus}
      />

      <ExportReportModal
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
        day={activeDay}
        totalCalories={totalIntakeCalories}
        totalProtein={totalProtein}
        totalCarbs={totalCarbs}
        totalFat={totalFat}
      />

      <AlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </div>
  );
}
