import React from 'react';
import { Check } from 'lucide-react';
import { RegistrationStepConfig } from '../../types/registration';

interface RegistrationStepperProps {
  steps: RegistrationStepConfig[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  maxStepReached: number;
}

export const RegistrationStepper: React.FC<RegistrationStepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  maxStepReached
}) => {
  return (
    <div className="w-full">
      {/* Top horizontal progress indicator: 1 ─── 2 ─── 3 ─── 4 ─── 5 ─── 6 */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between w-full relative z-10">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            const isReachable = idx <= maxStepReached;

            return (
              <React.Fragment key={step.id}>
                {/* Step Circle Button */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    disabled={!isReachable}
                    onClick={() => isReachable && onStepClick?.(idx)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all relative ${
                      isCurrent
                        ? 'bg-teal-800 text-white ring-4 ring-teal-100 shadow-sm scale-105'
                        : isCompleted
                        ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700'
                        : isReachable
                        ? 'bg-slate-200 text-slate-700 cursor-pointer hover:bg-slate-300'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                    aria-label={`Step ${step.stepNumber}: ${step.title}`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
                    ) : (
                      <span>{step.stepNumber}</span>
                    )}
                  </button>

                  {/* Step label below circle (hidden on very small screens for compact layout, visible on sm+) */}
                  <div className="hidden sm:flex flex-col items-center mt-2 text-center max-w-[80px]">
                    <span 
                      className={`text-xs font-semibold leading-tight line-clamp-1 ${
                        isCurrent ? 'text-teal-900 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                {/* Connecting line between steps */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-1.5 sm:mx-2 relative -mt-6 sm:-mt-8">
                    <div className="absolute inset-0 bg-slate-200 rounded-full" />
                    <div 
                      className={`absolute inset-0 bg-emerald-600 rounded-full transition-all duration-300 ${
                        idx < currentStepIndex ? 'w-full' : 'w-0'
                      }`} 
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Current Step Banner */}
      <div className="sm:hidden bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 mb-6 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <p className="text-sm font-bold text-slate-900">
            {steps[currentStepIndex]?.title}
          </p>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {steps[currentStepIndex]?.subtitle}
        </span>
      </div>
    </div>
  );
};
