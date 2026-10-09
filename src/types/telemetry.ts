export type MealType = 'BREAKFAST' | 'LUNCH' | 'MID-DAY REFUEL' | 'DINNER' | 'SNACK';
export type MealStatus = 'LOGGED' | 'VERIFIED' | 'PENDING';

export interface SpectralItem {
  name: string;
  grams: number;
  calories: number;
}

export interface Meal {
  id: string;
  time: string;
  type: MealType;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  status: MealStatus;
  isAiScan?: boolean;
  spectralComposition?: SpectralItem[];
  confidence?: number;
  glycemicIndex?: number;
  stamp?: string;
  imageUrl?: string;
}

export interface DayTelemetry {
  sol: number;
  solDate: string;
  dayName: string;
  calorieTarget: number;
  basalBurn: number;
  activeExpenditure: number;
  waterIntakeMl: number;
  waterQuotaMl: number;
  proteinTargetG: number;
  carbsTargetG: number;
  fatTargetG: number;
  meals: Meal[];
  status: string;
}

export interface WeeklyDaySummary {
  dayKey: string;
  label: string;
  calories: number | null;
  hydrationMl: number | null;
  expenditure: number | null;
  isCurrent?: boolean;
}
