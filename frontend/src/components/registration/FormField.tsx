import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'number' | 'tel' | 'email';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  min?: number;
  max?: number;
  autoComplete?: string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  min,
  max,
  autoComplete,
  disabled = false
}) => {
  const hasError = Boolean(error);

  return (
    <div className="space-y-1.5 w-full">
      <label 
        htmlFor={id} 
        className="block text-sm font-semibold text-slate-800"
      >
        {label}
        {required && <span className="text-red-500 ml-1 font-bold" aria-hidden="true">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white
            ${hasError 
              ? 'border-red-400 bg-red-50/20 text-slate-900 focus:ring-2 focus:ring-red-400 focus:border-red-400' 
              : 'border-slate-300 text-slate-900 focus:ring-2 focus:ring-teal-600 focus:border-transparent hover:border-slate-400'
            }
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}
            placeholder:text-slate-400`}
        />

        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-500">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {hasError ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-slate-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
