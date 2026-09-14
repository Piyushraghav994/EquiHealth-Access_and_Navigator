import React from 'react';
import { BasicInformation, RegistrationValidationErrors } from '../../../types/registration';
import { FormField } from '../FormField';
import { SelectField } from '../SelectField';

interface BasicInformationStepProps {
  data: BasicInformation;
  onChange: (fields: Partial<BasicInformation>) => void;
  errors: RegistrationValidationErrors;
}

const GENDER_OPTIONS = [
  { value: 'Woman', label: 'Woman' },
  { value: 'Man', label: 'Man' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
  { value: 'Other', label: 'Other' }
];

export const BasicInformationStep: React.FC<BasicInformationStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Basic Information
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Please provide your personal contact information to create your secure profile.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <FormField
          id="fullName"
          label="Full Name"
          type="text"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="e.g. Priya Sharma"
          required
          error={errors.fullName}
          autoComplete="name"
        />

        {/* Age and Gender in 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="age"
            label="Age"
            type="number"
            value={data.age}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="e.g. 45"
            required
            min={1}
            max={120}
            error={errors.age}
            helperText="Enter a valid age (1–120)"
          />

          <SelectField
            id="gender"
            label="Gender / Identity"
            value={data.gender}
            onChange={(val) => onChange({ gender: val })}
            options={GENDER_OPTIONS}
            placeholder="Select gender / identity"
            required
            error={errors.gender}
          />
        </div>

        {/* Phone Number */}
        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="e.g. +91 9876543210"
          required
          error={errors.phone}
          helperText="Used for appointment confirmations and important health updates"
          autoComplete="tel"
        />
      </div>
    </div>
  );
};
