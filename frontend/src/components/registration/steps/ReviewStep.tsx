import React from 'react';
import { UserRegistrationData } from '../../../types/registration';
import { Edit2, User, MapPin, IndianRupee, Languages } from 'lucide-react';

interface ReviewStepProps {
  data: UserRegistrationData;
  onEditSection: (stepIndex: number) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  onEditSection,
}) => {
  const { basicInformation, geographicalInformation, financialInformation, accessibilityInformation } = data;

  // Language display: if 'Other' and specified, display "Other (Name)"
  const displayLanguage = accessibilityInformation.preferredLanguage === 'Other' && accessibilityInformation.otherLanguage
    ? `Other (${accessibilityInformation.otherLanguage})`
    : accessibilityInformation.preferredLanguage || '—';

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Review Information
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Please verify that the details entered below are correct before submitting your registration.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
                <User className="w-4 h-4" />
              </span>
              <span>1. Basic Information</span>
            </div>
            <button
              type="button"
              onClick={() => onEditSection(0)}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Full Name</span>
              <span className="font-semibold text-slate-900">{basicInformation.fullName || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Age</span>
              <span className="font-semibold text-slate-900">{basicInformation.age ? `${basicInformation.age} years` : '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Gender / Identity</span>
              <span className="font-semibold text-slate-900">{basicInformation.gender || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Phone Number</span>
              <span className="font-semibold text-slate-900">{basicInformation.phone || '—'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Geographical Background */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
                <MapPin className="w-4 h-4" />
              </span>
              <span>2. Geographical Background</span>
            </div>
            <button
              type="button"
              onClick={() => onEditSection(1)}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Residential Area</span>
              <span className="font-semibold text-slate-900">{geographicalInformation.residentialArea || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">State</span>
              <span className="font-semibold text-slate-900">{geographicalInformation.state || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">District</span>
              <span className="font-semibold text-slate-900">{geographicalInformation.district || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">City / Village</span>
              <span className="font-semibold text-slate-900">{geographicalInformation.cityVillage || '—'}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Financial Condition */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
                <IndianRupee className="w-4 h-4" />
              </span>
              <span>3. Financial Condition</span>
            </div>
            <button
              type="button"
              onClick={() => onEditSection(2)}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Annual Income</span>
              <span className="font-semibold text-slate-900">{financialInformation.annualIncome || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Health Insurance</span>
              <span className="font-semibold text-slate-900">{financialInformation.healthInsurance || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Employment Status</span>
              <span className="font-semibold text-slate-900">{financialInformation.employmentStatus || '—'}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Digital Literacy, Language & Accessibility */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
                <Languages className="w-4 h-4" />
              </span>
              <span>4. Accessibility & Language</span>
            </div>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Digital Literacy</span>
              <span className="font-semibold text-slate-900">{accessibilityInformation.digitalLiteracy || '—'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Preferred Language</span>
              <span className="font-semibold text-slate-900">{displayLanguage}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Accessibility Requirement</span>
              <span className="font-semibold text-slate-900">{accessibilityInformation.accessibilityRequirement || '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
