import { DayTelemetry, Meal, WeeklyDaySummary } from '../types/telemetry';

export const AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgz-Ef76Nnkl0V2Yykjf3QHpbp6m7THE008xzMg7I8GdCjREkgBruDgKM2qUf4hm551h9wJFHES-zGkR5aj0_QHL2CAwa8dq15Ne3Kd06SUaxurVFT1bCCxCOONvA4JtKPEdCdiU3Suspkn10ngd_DYa_rjcaZu2LTfpZFAedM09ucrhRybP7B3aPoVCHhY_AQ4psWnjYPYR7KsBz8u0kH1udftQ0vehS7W-6QdWrW-glB-kEcCp45';

export const AVOCADO_TOAST_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaJCdiV1gMSAPjfn6KiHpMkJOK_4Isa4jsoz8lm89MmCJZbU8kWbjmwnqT3i3lwfymUrVJlhJ3_InmCL7vkdHLwJdYuPeuAmDqVULHsnj09KmrQManYfSb0PHaj666GjxVqj7pzAKWFdFImJijzXaTZ5YdtGm3uUOZj0Vq9CM4FvEuutlvvXZ6vp9J0cJjz5GCNPJz4kmNlhtzOsNQ2-7Tywn7YojSq-1qAkePnmdmEroIrxUgIY5J';

export const INITIAL_MEALS_SOL284: Meal[] = [
  {
    id: 'meal-01',
    time: '08:15 LOCAL',
    type: 'BREAKFAST',
    title: 'Greek Yogurt Parfait',
    description: '200g Greek yogurt, chia seeds, fresh blueberries, and raw honey glaze.',
    calories: 480,
    protein: 28,
    carbs: 52,
    fat: 14,
    status: 'LOGGED',
    spectralComposition: [
      { name: 'Organic Greek Yogurt (2% Milkfat)', grams: 200, calories: 260 },
      { name: 'Chia Seeds & Ground Flax', grams: 20, calories: 98 },
      { name: 'Wild Blueberries', grams: 75, calories: 42 },
      { name: 'Raw Clover Honey Glaze', grams: 25, calories: 80 }
    ],
    glycemicIndex: 34,
    confidence: 99.1,
    stamp: 'CBO-VERIFIED'
  },
  {
    id: 'meal-02',
    time: '12:42 LOCAL',
    type: 'LUNCH',
    title: 'Poached Egg Avocado Sourdough',
    description: 'Sourdough bread, two organic eggs, smashed avocado, and sea-salt microgreens.',
    calories: 540,
    protein: 24,
    carbs: 38,
    fat: 28,
    status: 'VERIFIED',
    isAiScan: true,
    imageUrl: AVOCADO_TOAST_IMAGE,
    spectralComposition: [
      { name: 'Sourdough Country Loaf (2 Slices)', grams: 160, calories: 220 },
      { name: 'Hass Avocado (Cold Crushed)', grams: 80, calories: 130 },
      { name: 'Pasture Poached Hen Eggs (2 units)', grams: 100, calories: 144 },
      { name: 'Microgreen Salad & Cold Olive Oil', grams: 25, calories: 46 }
    ],
    glycemicIndex: 48,
    confidence: 98.4,
    stamp: 'CBO-VERIFIED'
  },
  {
    id: 'meal-03',
    time: '15:20 LOCAL',
    type: 'MID-DAY REFUEL',
    title: 'Roasted Almonds & Green Apple',
    description: 'Raw unpasteurized almonds (35g) paired with a crisp Granny Smith apple.',
    calories: 210,
    protein: 6,
    carbs: 26,
    fat: 11,
    status: 'LOGGED',
    spectralComposition: [
      { name: 'Roasted California Almonds', grams: 35, calories: 135 },
      { name: 'Granny Smith Green Apple (1 medium)', grams: 140, calories: 75 }
    ],
    glycemicIndex: 28,
    confidence: 97.9,
    stamp: 'CBO-VERIFIED'
  },
  {
    id: 'meal-04',
    time: '19:30 ESTIMATED',
    type: 'DINNER',
    title: 'Seared Salmon & Quinoa Bowl',
    description: 'Pre-planned biometric target. Wild Atlantic salmon with steamed broccolini.',
    calories: 410,
    protein: 34,
    carbs: 22,
    fat: 14,
    status: 'PENDING',
    spectralComposition: [
      { name: 'Pan-Seared Wild Atlantic Salmon', grams: 170, calories: 245 },
      { name: 'Tri-Color Steamed Quinoa', grams: 110, calories: 120 },
      { name: 'Garlic Steamed Broccolini', grams: 85, calories: 45 }
    ],
    glycemicIndex: 32,
    confidence: 96.5,
    stamp: 'TARGET-PRESET'
  }
];

export const INITIAL_DAY_SOL284: DayTelemetry = {
  sol: 284,
  solDate: 'THURSDAY, 24 OCT',
  dayName: 'TODAY',
  calorieTarget: 2200,
  basalBurn: 1890,
  activeExpenditure: 420,
  waterIntakeMl: 2150,
  waterQuotaMl: 3000,
  proteinTargetG: 140,
  carbsTargetG: 210,
  fatTargetG: 65,
  meals: INITIAL_MEALS_SOL284,
  status: 'OPTIMAL DEFICIT'
};

export const INITIAL_DAY_SOL283: DayTelemetry = {
  sol: 283,
  solDate: 'WEDNESDAY, 23 OCT',
  dayName: 'YESTERDAY',
  calorieTarget: 2200,
  basalBurn: 1890,
  activeExpenditure: 850,
  waterIntakeMl: 2850,
  waterQuotaMl: 3000,
  proteinTargetG: 140,
  carbsTargetG: 210,
  fatTargetG: 65,
  meals: [
    {
      id: 'm-283-1',
      time: '07:45 LOCAL',
      type: 'BREAKFAST',
      title: 'Steel Cut Oatmeal & Walnuts',
      description: 'Slow cooked oats with cinnamon, walnuts, and splash of oat milk.',
      calories: 520,
      protein: 18,
      carbs: 68,
      fat: 20,
      status: 'VERIFIED'
    },
    {
      id: 'm-283-2',
      time: '12:30 LOCAL',
      type: 'LUNCH',
      title: 'Grilled Free-Range Chicken Bowl',
      description: 'Charred chicken breast with roasted sweet potato & massaged kale.',
      calories: 680,
      protein: 52,
      carbs: 58,
      fat: 22,
      status: 'VERIFIED'
    },
    {
      id: 'm-283-3',
      time: '16:00 LOCAL',
      type: 'SNACK',
      title: 'Whey Isolate Shake & Banana',
      description: 'Cold-pressed whey protein with organic potassium boost.',
      calories: 340,
      protein: 36,
      carbs: 34,
      fat: 4,
      status: 'VERIFIED'
    },
    {
      id: 'm-283-4',
      time: '19:45 LOCAL',
      type: 'DINNER',
      title: 'Grass-Fed Sirloin & Asparagus',
      description: 'Prime cut with roasted rosemary baby fingerling potatoes.',
      calories: 780,
      protein: 58,
      carbs: 38,
      fat: 36,
      status: 'VERIFIED'
    }
  ],
  status: 'HIGH EXPENDITURE'
};

export const INITIAL_DAY_SOL285: DayTelemetry = {
  sol: 285,
  solDate: 'FRIDAY, 25 OCT',
  dayName: 'TOMORROW',
  calorieTarget: 2200,
  basalBurn: 1890,
  activeExpenditure: 400,
  waterIntakeMl: 500,
  waterQuotaMl: 3000,
  proteinTargetG: 140,
  carbsTargetG: 210,
  fatTargetG: 65,
  meals: [
    {
      id: 'm-285-1',
      time: '08:00 ESTIMATED',
      type: 'BREAKFAST',
      title: 'Poached Eggs & Rye Toast',
      description: 'Planned early replenishment cycle.',
      calories: 420,
      protein: 24,
      carbs: 36,
      fat: 16,
      status: 'PENDING'
    }
  ],
  status: 'SCHEDULED CYCLE'
};

export const INITIAL_WEEKLY_BARS: WeeklyDaySummary[] = [
  { dayKey: 'MON', label: 'MON', calories: 2180, hydrationMl: 2900, expenditure: 2150 },
  { dayKey: 'TUE', label: 'TUE', calories: 2050, hydrationMl: 2800, expenditure: 2200 },
  { dayKey: 'WED', label: 'WED', calories: 2320, hydrationMl: 3200, expenditure: 2740 },
  { dayKey: 'TODAY', label: 'TODAY', calories: 1640, hydrationMl: 2150, expenditure: 2310, isCurrent: true },
  { dayKey: 'FRI', label: 'FRI', calories: null, hydrationMl: null, expenditure: null },
  { dayKey: 'SAT', label: 'SAT', calories: null, hydrationMl: null, expenditure: null },
  { dayKey: 'SUN', label: 'SUN', calories: null, hydrationMl: null, expenditure: null }
];

// Presets for the Spectro-Scanner Bay
export interface SpectroPreset {
  id: string;
  name: string;
  ticketNumber: string;
  timestamp: string;
  imageUrl: string;
  items: Array<{ name: string; grams: number; calories: number }>;
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  glycemicIndex: number;
  glycemicLabel: string;
  confidence: number;
  stamp: string;
}

export const SCANNER_PRESETS: SpectroPreset[] = [
  {
    id: 'preset-avocado',
    name: 'Poached Egg Avocado Sourdough',
    ticketNumber: '#4092',
    timestamp: '12:42:18 LOCAL',
    imageUrl: AVOCADO_TOAST_IMAGE,
    items: [
      { name: 'Sourdough Country Loaf (2 Slices)', grams: 160, calories: 220 },
      { name: 'Hass Avocado (Cold Crushed)', grams: 80, calories: 130 },
      { name: 'Pasture Poached Hen Eggs (2 units)', grams: 100, calories: 144 },
      { name: 'Microgreen Salad & Cold Olive Oil', grams: 25, calories: 46 }
    ],
    totalCalories: 540,
    protein: 24,
    carbs: 38,
    fat: 28,
    glycemicIndex: 48,
    glycemicLabel: 'MODERATE',
    confidence: 98.4,
    stamp: 'CBO-VERIFIED'
  },
  {
    id: 'preset-salmon',
    name: 'Wild Salmon Quinoa & Broccolini Bowl',
    ticketNumber: '#4095',
    timestamp: '19:15:04 LOCAL',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    items: [
      { name: 'Pacific Sockeye Salmon Fillet', grams: 180, calories: 260 },
      { name: 'Steamed Heritage Quinoa', grams: 120, calories: 140 },
      { name: 'Tenderstem Broccolini with Sesame', grams: 90, calories: 50 },
      { name: 'Avocado Tahini Dressing', grams: 30, calories: 85 }
    ],
    totalCalories: 535,
    protein: 38,
    carbs: 32,
    fat: 22,
    glycemicIndex: 32,
    glycemicLabel: 'LOW',
    confidence: 99.2,
    stamp: 'CBO-VERIFIED'
  },
  {
    id: 'preset-parfait',
    name: 'Greek Yogurt & Honey Berry Compote',
    ticketNumber: '#4088',
    timestamp: '08:14:32 LOCAL',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    items: [
      { name: 'Strained Icelandic Skyr Yogurt', grams: 220, calories: 240 },
      { name: 'Organic Mountain Blueberries', grams: 80, calories: 45 },
      { name: 'Chia & Hemp Heart Matrix', grams: 25, calories: 110 },
      { name: 'Acacia Raw Honey Infusion', grams: 20, calories: 65 }
    ],
    totalCalories: 460,
    protein: 29,
    carbs: 48,
    fat: 12,
    glycemicIndex: 35,
    glycemicLabel: 'LOW',
    confidence: 97.8,
    stamp: 'CBO-VERIFIED'
  }
];
