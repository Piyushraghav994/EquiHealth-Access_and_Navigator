import React from 'react';
import { FinancialInformation, RegistrationValidationErrors } from '../../../types/registration';
import { RadioGroup } from '../RadioGroup';
import { SelectField } from '../SelectField';

interface FinancialInformationStepProps {
  data: FinancialInformation;
  onChange: (fields: Partial<FinancialInformation>) => void;
  errors: RegistrationValidationErrors;
}

const ANNUAL_INCOME_OPTIONS = [
  { value: 'Below ₹3 lakh', label: 'Below ₹3 lakh' },
  { value: '₹3–5 lakh', label: '₹3–5 lakh' },
  { value: '₹5–10 lakh', label: '₹5–10 lakh' },
  { value: 'Above ₹10 lakh', label: 'Above ₹10 lakh' },
  { value: 'Prefer not to say', label: 'Prefer not to say' }
];

const HEALTH_INSURANCE_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Not sure', label: 'Not sure' }
];

const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'Formal Employment', label: 'Formal Employment' },
  { value: 'Informal Employment', label: 'Informal Employment' },
  { value: 'Daily Wage Worker', label: 'Daily Wage Worker' },
  { value: 'Self-employed', label: 'Self-employed' },
  { value: 'Unemployed', label: 'Unemployed' },
  { value: 'Student', label: 'Student' },
  { value: 'Retired', label: 'Retired' },
  { value: 'Other', label: 'Other' }
];

export const FinancialInformationStep: React.FC<FinancialInformationStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Financial Condition
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          This data helps determine entitlement tiers and health insurance coverage without exposing sensitive banking records.
        </p>
      </div>

      <div className="space-y-6">
        {/* 8. Annual Income */}
        <RadioGroup
          id="annualIncome"
          label="Annual Household Income"
          options={ANNUAL_INCOME_OPTIONS}
          value={data.annualIncome}
          onChange={(val) => onChange({ annualIncome: val })}
          required
          error={errors.annualIncome}
          layout="grid2"
        />

        {/* 9. Health Insurance */}
        <RadioGroup
          id="healthInsurance"
          label="Do you currently have Health Insurance?"
          options={HEALTH_INSURANCE_OPTIONS}
          value={data.healthInsurance}
          onChange={(val) => onChange({ healthInsurance: val })}
          required
          error={errors.healthInsurance}
          layout="grid3"
          helperText="Includes government schemes, employer benefits, or private health policies"
        />

        {/* 10. Employment Status */}
        <SelectField
          id="employmentStatus"
          label="Employment Status"
          options={EMPLOYMENT_STATUS_OPTIONS}
          value={data.employmentStatus}
          onChange={(val) => onChange({ employmentStatus: val })}
          placeholder="Select your employment status"
          required
          error={errors.employmentStatus}
        />
      </div>
    </div>
  );
};
