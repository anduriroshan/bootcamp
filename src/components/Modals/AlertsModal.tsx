import React from 'react';
import { soundEngine } from '../../utils/sound';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-low border border-surface-variant/80 rounded-xl max-w-md w-full tactile-pod p-5 relative shadow-2xl">
        <div className="brass-screw absolute top-3 left-3"></div>
        <div className="brass-screw absolute top-3 right-3"></div>
        <div className="brass-screw absolute bottom-3 left-3"></div>
        <div className="brass-screw absolute bottom-3 right-3"></div>

        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-xl">notifications_active</span>
            <h3 className="font-headline-md tracking-wider text-on-surface text-base">
              TELEMETRY LOGS &amp; ALERTS
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

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-primary/30">
            <div className="flex justify-between items-center text-[10px] font-label-meter text-primary mb-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary led-glow-primary"></span>
                METABOLIC DEFICIT VERIFIED
              </span>
              <span>12:45 LOCAL</span>
            </div>
            <p className="text-xs font-body-sm text-on-surface">
              Intake tracking in optimal zone (-560 kcal target reserve maintained).
            </p>
          </div>

          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-secondary/30">
            <div className="flex justify-between items-center text-[10px] font-label-meter text-secondary mb-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary led-glow-blue"></span>
                OSMOTIC HYDRATION CADENCE
              </span>
              <span>14:30 LOCAL</span>
            </div>
            <p className="text-xs font-body-sm text-on-surface">
              Scheduled fluid replenishment cycle approaching. 850 ml needed to satisfy quota.
            </p>
          </div>

          <div className="recessed-cavity p-3 rounded-lg bg-surface-container-lowest border border-tertiary/30">
            <div className="flex justify-between items-center text-[10px] font-label-meter text-tertiary mb-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary led-glow-amber"></span>
                DINNER TIMELINE PENDING
              </span>
              <span>19:30 ESTIMATED</span>
            </div>
            <p className="text-xs font-body-sm text-on-surface">
              Seared Salmon &amp; Quinoa Bowl awaiting confirmation and optical validation.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-surface-variant/40 mt-4">
          <button
            onClick={onClose}
            className="metal-actuator w-full py-2 rounded text-xs font-label-subtle text-primary font-bold"
          >
            Acknowledge Alerts
          </button>
        </div>
      </div>
    </div>
  );
};
