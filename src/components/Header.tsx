import React from 'react';
import { AVATAR_URL } from '../data/initialData';
import { soundEngine } from '../utils/sound';

interface HeaderProps {
  currentTab: 'telemetry' | 'chronolog' | 'hydration' | 'diagnostics';
  setCurrentTab: (tab: 'telemetry' | 'chronolog' | 'hydration' | 'diagnostics') => void;
  sol: number;
  solDate: string;
  onPrevSol: () => void;
  onNextSol: () => void;
  onOpenCapture: () => void;
  onOpenCalibrate: () => void;
  onOpenAlerts: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  sol,
  solDate,
  onPrevSol,
  onNextSol,
  onOpenCapture,
  onOpenCalibrate,
  onOpenAlerts,
  soundEnabled,
  onToggleSound,
}) => {
  const handleTabClick = (tab: 'telemetry' | 'chronolog' | 'hydration' | 'diagnostics') => {
    soundEngine.playSwitch();
    setCurrentTab(tab);
  };

  return (
    <header className="bg-surface-container-low dark:bg-surface-container-lowest border-b border-surface-variant dark:border-surface-variant shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.4)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 w-full">
        {/* Brand & Cockpit Chassis Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-surface-container-high border-t border-white/15 border-b border-black/80 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_4px_8px_rgba(0,0,0,0.6)] relative group cursor-pointer"
            onClick={() => {
              soundEngine.playClick(900);
              setCurrentTab('telemetry');
            }}
          >
            <div className="brass-screw absolute -top-1 -left-1"></div>
            <div className="brass-screw absolute -bottom-1 -right-1"></div>
            <span className="material-symbols-outlined text-primary text-2xl font-bold transition-transform duration-300 group-hover:rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
              vital_signs
            </span>
          </div>

          <div className="flex flex-col">
            <div className="text-base sm:text-headline-md font-headline-md tracking-widest text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex items-center gap-2">
              <span>CHRONO•NUTRITION</span>
              <span className="inline-block w-2 h-2 rounded-full bg-primary led-glow-primary"></span>
            </div>
            <span className="text-[10px] sm:text-label-meter font-label-meter text-on-surface-variant tracking-wider truncate max-w-[210px] sm:max-w-none">
              TACTILE HEALTH &amp; CALORIE TELEMETRY // MK-IV
            </span>
          </div>
        </div>

        {/* Navigation Links Cluster */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button
            onClick={() => handleTabClick('telemetry')}
            className={`font-headline-md transition-all duration-150 ease-out flex items-center gap-1.5 pb-1 ${
              currentTab === 'telemetry'
                ? 'border-b-2 border-primary text-primary font-bold drop-shadow-[0_0_8px_rgba(78,222,163,0.4)]'
                : 'text-on-surface-variant hover:text-primary-fixed hover:bg-surface-variant/40 px-2 py-1 rounded'
            }`}
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            Telemetry Console
          </button>

          <button
            onClick={() => handleTabClick('chronolog')}
            className={`font-headline-md transition-all duration-150 ease-out flex items-center gap-1.5 pb-1 ${
              currentTab === 'chronolog'
                ? 'border-b-2 border-primary text-primary font-bold drop-shadow-[0_0_8px_rgba(78,222,163,0.4)]'
                : 'text-on-surface-variant hover:text-primary-fixed hover:bg-surface-variant/40 px-2 py-1 rounded'
            }`}
          >
            <span className="material-symbols-outlined text-sm">calendar_view_day</span>
            Chronolog
          </button>

          <button
            onClick={() => handleTabClick('hydration')}
            className={`font-headline-md transition-all duration-150 ease-out flex items-center gap-1.5 pb-1 ${
              currentTab === 'hydration'
                ? 'border-b-2 border-primary text-primary font-bold drop-shadow-[0_0_8px_rgba(78,222,163,0.4)]'
                : 'text-on-surface-variant hover:text-primary-fixed hover:bg-surface-variant/40 px-2 py-1 rounded'
            }`}
          >
            <span className="material-symbols-outlined text-sm">water_drop</span>
            Hydration Bay
          </button>

          <button
            onClick={() => handleTabClick('diagnostics')}
            className={`font-headline-md transition-all duration-150 ease-out flex items-center gap-1.5 pb-1 ${
              currentTab === 'diagnostics'
                ? 'border-b-2 border-primary text-primary font-bold drop-shadow-[0_0_8px_rgba(78,222,163,0.4)]'
                : 'text-on-surface-variant hover:text-primary-fixed hover:bg-surface-variant/40 px-2 py-1 rounded'
            }`}
          >
            <span className="material-symbols-outlined text-sm">analytics</span>
            Weekly Diagnostics
          </button>
        </nav>

        {/* Date Switcher & Trailing Cockpit Actuators */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Date Selector Mechanism */}
          <div className="hidden lg:flex items-center bg-surface-container-lowest recessed-cavity px-3 py-1.5 rounded-lg border border-surface-variant/40">
            <button
              onClick={() => {
                soundEngine.playClick(600);
                onPrevSol();
              }}
              className="metal-actuator w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-primary"
              title="Previous Sol"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <div className="px-3 flex flex-col items-center select-none min-w-[140px]">
              <span className="text-label-meter font-label-meter text-primary font-bold tracking-widest text-[11px]">
                SOL {sol} // {sol === 284 ? 'TODAY' : sol === 283 ? 'YESTERDAY' : 'SCHEDULED'}
              </span>
              <span className="text-label-subtle font-label-subtle text-on-surface-variant text-[10px]">
                {solDate}
              </span>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick(750);
                onNextSol();
              }}
              className="metal-actuator w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-primary"
              title="Next Sol"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundEngine.playClick(500);
            }}
            className={`metal-actuator p-2 rounded-lg ${
              soundEnabled ? 'text-primary' : 'text-on-surface-variant/50'
            }`}
            title={soundEnabled ? 'Tactile Audio Mute' : 'Tactile Audio Active'}
          >
            <span className="material-symbols-outlined text-lg">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Trailing Primary Action: Capture Meal */}
          <button
            onClick={() => {
              soundEngine.playScan();
              onOpenCapture();
            }}
            className="metal-actuator px-3 sm:px-4 py-2 rounded-lg text-primary font-headline-md font-bold text-xs sm:text-sm tracking-wider flex items-center gap-2 border-t border-primary/30 group"
          >
            <span className="w-2 h-2 rounded-full bg-primary group-hover:led-glow-primary"></span>
            <span className="whitespace-nowrap">Capture Meal</span>
          </button>

          {/* Trailing Secondary Calibrate Button */}
          <button
            onClick={() => {
              soundEngine.playClick(650);
              onOpenCalibrate();
            }}
            className="hidden sm:flex metal-actuator px-3 py-2 rounded-lg text-on-surface-variant font-headline-md text-xs sm:text-sm tracking-wider hover:text-on-surface items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Calibrate</span>
          </button>

          {/* Profile & Status Capsule */}
          <div className="flex items-center pl-1 sm:pl-2 border-l border-surface-variant/60 gap-2 sm:gap-3">
            <button
              onClick={() => {
                soundEngine.playClick(850);
                onOpenAlerts();
              }}
              className="metal-actuator p-2 rounded-lg text-on-surface-variant hover:text-primary relative"
              title="System Telemetry Alerts"
            >
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-tertiary rounded-full led-glow-amber"></span>
            </button>

            <div
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary/50 p-0.5 shadow-[0_2px_6px_rgba(0,0,0,0.8)] bg-surface-container cursor-pointer"
              title="Chief Biometrics Officer - Active MK-IV Console"
              onClick={() => {
                soundEngine.playClick();
                onOpenCalibrate();
              }}
            >
              <img
                src={AVATAR_URL}
                alt="Chief Biometrics Officer Avatar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border border-black led-glow-primary"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-surface-variant/30 py-2 px-2 bg-surface-container-lowest/80 text-xs">
        <button
          onClick={() => handleTabClick('telemetry')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded ${
            currentTab === 'telemetry' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-base">speed</span>
          <span className="text-[10px]">Console</span>
        </button>
        <button
          onClick={() => handleTabClick('chronolog')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded ${
            currentTab === 'chronolog' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-base">calendar_view_day</span>
          <span className="text-[10px]">Chronolog</span>
        </button>
        <button
          onClick={() => handleTabClick('hydration')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded ${
            currentTab === 'hydration' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-base">water_drop</span>
          <span className="text-[10px]">Hydration</span>
        </button>
        <button
          onClick={() => handleTabClick('diagnostics')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded ${
            currentTab === 'diagnostics' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-base">analytics</span>
          <span className="text-[10px]">Weekly</span>
        </button>
      </div>
    </header>
  );
};
