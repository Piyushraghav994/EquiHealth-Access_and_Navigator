import React from 'react';
import { AccessibilityInformation, RegistrationValidationErrors } from '../../../types/registration';
import { RadioGroup } from '../RadioGroup';
import { SelectField } from '../SelectField';
import { FormField } from '../FormField';

interface DigitalLanguageStepProps {
  data: AccessibilityInformation;
  onChange: (fields: Partial<AccessibilityInformation>) => void;
  errors: RegistrationValidationErrors;
}

const DIGITAL_LITERACY_OPTIONS = [
  { 
    value: 'High', 
    label: 'High', 
    description: 'Comfortable using websites and apps' 
  },
  { 
    value: 'Medium', 
    label: 'Medium', 
    description: 'Can use basic digital services' 
  },
  { 
    value: 'Low', 
    label: 'Low', 
    description: 'Prefers offline or phone assistance' 
  }
];

const LANGUAGE_OPTIONS = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Other', label: 'Other' }
];

const ACCESSIBILITY_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'Mobility assistance', label: 'Mobility assistance (Wheelchair / Ramp)' },
  { value: 'Visual assistance', label: 'Visual assistance (Audio / Braille / Guide)' },
  { value: 'Hearing assistance', label: 'Hearing assistance (Sign / Written cues)' },
  { value: 'Other accessibility requirement', label: 'Other accessibility requirement' },
  { value: 'Prefer not to say', label: 'Prefer not to say' }
];

export const DigitalLanguageStep: React.FC<DigitalLanguageStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Digital Literacy, Language & Accessibility
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell us your communication preferences and any accessibility accommodations needed.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Digital Literacy */}
        <RadioGroup
          id="digitalLiteracy"
          label="Digital Literacy"
          options={DIGITAL_LITERACY_OPTIONS}
          value={data.digitalLiteracy}
          onChange={(val) => onChange({ digitalLiteracy: val })}
          required
          error={errors.digitalLiteracy}
          layout="stacked"
        />

        {/* 2. Preferred Language */}
        <div className="space-y-3">
          <SelectField
            id="preferredLanguage"
            label="Preferred Communication Language"
            options={LANGUAGE_OPTIONS}
            value={data.preferredLanguage}
            onChange={(val) => {
              onChange({ 
                preferredLanguage: val,
                otherLanguage: val === 'Other' ? (data.otherLanguage || '') : '' 
              });
            }}
            placeholder="Select preferred language"
            required
            error={errors.preferredLanguage}
          />

          {/* Conditional "Please specify language" input if "Other" is selected */}
          {data.preferredLanguage === 'Other' && (
            <div className="pt-2 pl-3 border-l-2 border-teal-600 animate-in fade-in-50 duration-150">
              <FormField
                id="otherLanguage"
                label="Please specify language"
                type="text"
                value={data.otherLanguage || ''}
                onChange={(e) => onChange({ otherLanguage: e.target.value })}
                placeholder="e.g. Rajasthani, Bengali, Tamil, Gujarati, etc."
                required
                error={errors.otherLanguage}
                helperText="We support localized community translators and vernacular brochures."
              />
            </div>
          )}
        </div>

        {/* 3. Disability / Accessibility Requirement */}
        <SelectField
          id="accessibilityRequirement"
          label="Disability / Accessibility Requirement"
          options={ACCESSIBILITY_OPTIONS}
          value={data.accessibilityRequirement}
          onChange={(val) => onChange({ accessibilityRequirement: val })}
          placeholder="Select any accessibility requirement"
          required
          error={errors.accessibilityRequirement}
          helperText="Ensures recommended clinics and navigation routes provide suitable physical access."
        />
      </div>
    </div>
  );
};
