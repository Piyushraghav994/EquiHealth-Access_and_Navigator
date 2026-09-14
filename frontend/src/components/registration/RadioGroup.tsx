import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  id: string;
  label: string;
  options: RadioOption[] | string[];
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  layout?: 'stacked' | 'grid2' | 'grid3';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  helperText,
  layout = 'stacked'
}) => {
  const normalizedOptions: RadioOption[] = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const getGridClass = () => {
    switch (layout) {
      case 'grid2':
        return 'grid grid-cols-1 sm:grid-cols-2 gap-2.5';
      case 'grid3':
        return 'grid grid-cols-1 sm:grid-cols-3 gap-2.5';
      default:
        return 'space-y-2.5';
    }
  };

  return (
    <div className="space-y-2 w-full" role="radiogroup" aria-labelledby={`${id}-label`}>
      <div className="flex items-baseline justify-between">
        <span id={`${id}-label`} className="block text-sm font-semibold text-slate-800">
          {label}
          {required && <span className="text-red-500 ml-1 font-bold" aria-hidden="true">*</span>}
        </span>
      </div>

      <div className={getGridClass()}>
        {normalizedOptions.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={`${id}-${opt.value}`}
              className={`flex items-start gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                isSelected
                  ? 'border-teal-700 bg-teal-50/60 ring-1 ring-teal-700 text-teal-950 font-medium shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-slate-800'
              }`}
            >
              <div className="pt-0.5 shrink-0">
                <input
                  type="radio"
                  id={`${id}-${opt.value}`}
                  name={id}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange(opt.value)}
                  className="w-4 h-4 text-teal-800 border-slate-300 focus:ring-teal-700 cursor-pointer accent-teal-800"
                />
              </div>
              <div className="space-y-0.5">
                <span className="block text-sm leading-snug">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="block text-xs text-slate-500 leading-relaxed font-normal">
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
