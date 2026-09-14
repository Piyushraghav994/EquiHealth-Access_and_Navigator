import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, ChevronDown, Search, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: SelectOption[] | string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  searchable?: boolean;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  required = false,
  error,
  helperText,
  searchable = false,
  disabled = false
}) => {
  const normalizedOptions: SelectOption[] = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = searchable && searchQuery.trim() !== ''
    ? normalizedOptions.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : normalizedOptions;

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  // If searchable, render accessible custom dropdown with filter input
  if (searchable) {
    return (
      <div className="space-y-1.5 w-full relative" ref={dropdownRef}>
        <label 
          htmlFor={id} 
          className="block text-sm font-semibold text-slate-800"
        >
          {label}
          {required && <span className="text-red-500 ml-1 font-bold" aria-hidden="true">*</span>}
        </label>

        <button
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-left flex items-center justify-between transition-all bg-white cursor-pointer
            ${error 
              ? 'border-red-400 bg-red-50/20 text-slate-900 focus:ring-2 focus:ring-red-400' 
              : 'border-slate-300 text-slate-900 focus:ring-2 focus:ring-teal-600 hover:border-slate-400'
            }
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}
          `}
        >
          <span className={selectedOption ? 'text-slate-900 font-medium' : 'text-slate-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-700' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in-50 duration-100">
            <div className="p-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <ul 
              className="max-h-56 overflow-y-auto py-1 text-sm divide-y divide-slate-50"
              role="listbox"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isCurrent = opt.value === value;
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isCurrent}
                      onClick={() => {
                        onChange(opt.value);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className={`px-3.5 py-2 cursor-pointer flex items-center justify-between hover:bg-teal-50 transition-colors ${
                        isCurrent ? 'bg-teal-50/80 font-semibold text-teal-900' : 'text-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isCurrent && <Check className="w-4 h-4 text-teal-700" />}
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-3 text-xs text-slate-400 text-center">
                  No matching options found
                </li>
              )}
            </ul>
          </div>
        )}

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
  }

  // Native accessible select
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
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-white cursor-pointer pr-10
            ${error 
              ? 'border-red-400 bg-red-50/20 text-slate-900 focus:ring-2 focus:ring-red-400' 
              : 'border-slate-300 text-slate-900 focus:ring-2 focus:ring-teal-600 hover:border-slate-400'
            }
            ${!value ? 'text-slate-400' : 'text-slate-900'}
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}
          `}
        >
          <option value="" disabled className="text-slate-400">
            {placeholder}
          </option>
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
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
