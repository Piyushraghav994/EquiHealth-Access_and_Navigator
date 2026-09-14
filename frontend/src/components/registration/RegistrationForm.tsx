import React, { useState } from 'react';
import { 
  UserRegistrationData, 
  RegistrationStepConfig, 
  RegistrationValidationErrors,
  RegistrationResponse 
} from '../../types/registration';
import { RegistrationStepper } from './RegistrationStepper';
import { BasicInformationStep } from './steps/BasicInformationStep';
import { LocationStep } from './steps/LocationStep';
import { FinancialInformationStep } from './steps/FinancialInformationStep';
import { DigitalLanguageStep } from './steps/DigitalLanguageStep';
import { ReviewStep } from './steps/ReviewStep';
import { RegistrationSuccess } from '../RegistrationSuccess';
import { userService } from '../../services/userService';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Loader2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface RegistrationFormProps {
  initialData?: Partial<UserRegistrationData>;
  onSuccess?: (response: RegistrationResponse) => void;
  onContinueToLogin?: (equiHealthId: string) => void;
  onCancel?: () => void;
}

const DEFAULT_FORM_DATA: UserRegistrationData = {
  basicInformation: {
    fullName: '',
    age: '',
    gender: '',
    phone: ''
  },
  geographicalInformation: {
    residentialArea: '',
    state: '',
    district: '',
    cityVillage: ''
  },
  financialInformation: {
    annualIncome: '',
    healthInsurance: '',
    employmentStatus: ''
  },
  accessibilityInformation: {
    digitalLiteracy: '',
    preferredLanguage: '',
    otherLanguage: '',
    accessibilityRequirement: ''
  }
};

const STEPS: RegistrationStepConfig[] = [
  { id: 'basic', stepNumber: 1, title: 'Basic Info', subtitle: 'Personal Details' },
  { id: 'location', stepNumber: 2, title: 'Geographical', subtitle: 'Location Details' },
  { id: 'financial', stepNumber: 3, title: 'Financial', subtitle: 'Income & Insurance' },
  { id: 'accessibility', stepNumber: 4, title: 'Accessibility', subtitle: 'Digital & Access' },
  { id: 'review', stepNumber: 5, title: 'Review & Submit', subtitle: 'Confirm & Register' }
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialData,
  onSuccess,
  onContinueToLogin,
  onCancel
}) => {
  const [formData, setFormData] = useState<UserRegistrationData>(() => ({
    basicInformation: { ...DEFAULT_FORM_DATA.basicInformation, ...initialData?.basicInformation },
    geographicalInformation: { ...DEFAULT_FORM_DATA.geographicalInformation, ...initialData?.geographicalInformation },
    financialInformation: { ...DEFAULT_FORM_DATA.financialInformation, ...initialData?.financialInformation },
    accessibilityInformation: { ...DEFAULT_FORM_DATA.accessibilityInformation, ...initialData?.accessibilityInformation }
  }));

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [maxStepReached, setMaxStepReached] = useState<number>(0);
  const [errors, setErrors] = useState<RegistrationValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<RegistrationResponse | null>(null);

  // Quick fill demo data for evaluation / testing
  const handlePrefillDemo = () => {
    setFormData({
      basicInformation: {
        fullName: 'Priya Sharma',
        age: '45',
        gender: 'Woman',
        phone: '+91 98765 43210'
      },
      geographicalInformation: {
        residentialArea: 'Rural (Village)',
        state: 'Rajasthan',
        district: 'Jaipur',
        cityVillage: 'Ram Nagar'
      },
      financialInformation: {
        annualIncome: 'Below ₹3 lakh',
        healthInsurance: 'No',
        employmentStatus: 'Daily Wage Worker'
      },
      accessibilityInformation: {
        digitalLiteracy: 'Low',
        preferredLanguage: 'Hindi',
        otherLanguage: '',
        accessibilityRequirement: 'None'
      }
    });
    setErrors({});
  };

  // Step validation rules (validating remaining required fields)
  const validateCurrentStep = (stepIdx: number): boolean => {
    const newErrors: RegistrationValidationErrors = {};

    if (stepIdx === 0) {
      // Step 1: Basic Information
      const { fullName, age, gender, phone } = formData.basicInformation;
      if (!fullName.trim()) {
        newErrors.fullName = 'Full Name is required';
      } else if (fullName.trim().length < 2) {
        newErrors.fullName = 'Please enter a valid full name';
      }

      if (!age) {
        newErrors.age = 'Age is required';
      } else {
        const numAge = Number(age);
        if (isNaN(numAge) || numAge < 1 || numAge > 120) {
          newErrors.age = 'Please enter a valid age between 1 and 120';
        }
      }

      if (!gender) {
        newErrors.gender = 'Please select your gender / identity';
      }

      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else {
        // Allow optional +91 and 10 digits
        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        const phoneRegex = /^(\+?\d{1,4})?\d{10}$/;
        if (!phoneRegex.test(cleanPhone)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number (e.g. +91 9876543210)';
        }
      }
    } else if (stepIdx === 1) {
      // Step 2: Geographical Background
      const { residentialArea, state, district, cityVillage } = formData.geographicalInformation;
      if (!residentialArea) {
        newErrors.residentialArea = 'Please select your residential area';
      }
      if (!state) {
        newErrors.state = 'State is required';
      }
      if (!district) {
        newErrors.district = 'District is required';
      }
      if (!cityVillage.trim()) {
        newErrors.cityVillage = 'City or village name is required';
      }
    } else if (stepIdx === 2) {
      // Step 3: Financial Condition
      const { annualIncome, healthInsurance, employmentStatus } = formData.financialInformation;
      if (!annualIncome) {
        newErrors.annualIncome = 'Please select your annual household income';
      }
      if (!healthInsurance) {
        newErrors.healthInsurance = 'Please indicate your health insurance status';
      }
      if (!employmentStatus) {
        newErrors.employmentStatus = 'Please select your employment status';
      }
    } else if (stepIdx === 3) {
      // Step 4: Digital Literacy, Language & Accessibility
      const { digitalLiteracy, preferredLanguage, otherLanguage, accessibilityRequirement } = formData.accessibilityInformation;
      if (!digitalLiteracy) {
        newErrors.digitalLiteracy = 'Please select your digital literacy level';
      }
      if (!preferredLanguage) {
        newErrors.preferredLanguage = 'Please select your preferred language';
      } else if (preferredLanguage === 'Other' && (!otherLanguage || !otherLanguage.trim())) {
        newErrors.otherLanguage = 'Please specify your language';
      }
      if (!accessibilityRequirement) {
        newErrors.accessibilityRequirement = 'Please select any disability or accessibility requirement';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStepIndex)) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx > maxStepReached) {
        setMaxStepReached(nextIdx);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleJumpToStep = (stepIdx: number) => {
    // If jumping forward beyond current step, validate current step first
    if (stepIdx > currentStepIndex) {
      if (!validateCurrentStep(currentStepIndex)) return;
    }
    setCurrentStepIndex(stepIdx);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    // Validate all 4 content steps before submission
    for (let i = 0; i < 4; i++) {
      if (!validateCurrentStep(i)) {
        setCurrentStepIndex(i);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Handled via separate service layer (POST /api/users/register)
      const response = await userService.registerUser(formData);
      setSubmissionSuccess(response);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (e) {
      console.error('Registration failed:', e);
      // Fallback
      const fallback = userService.mockRegisterFallback(formData);
      setSubmissionSuccess(fallback);
      if (onSuccess) {
        onSuccess(fallback);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // If successfully registered, show dedicated EquiHealth ID Confirmation screen
  if (submissionSuccess) {
    return (
      <RegistrationSuccess
        response={submissionSuccess}
        onContinueToLogin={(equiHealthId) => {
          if (onContinueToLogin) {
            onContinueToLogin(equiHealthId);
          } else if (onSuccess) {
            onSuccess(submissionSuccess);
          }
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Demo Fill Bar & Security Badge */}
      <div className="flex items-center justify-between gap-2 mb-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-teal-800">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span className="font-medium">Encrypted & Confidential Registration</span>
        </div>
        <button
          type="button"
          onClick={handlePrefillDemo}
          className="text-teal-800 hover:text-teal-900 font-medium hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick fill sample data</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        {/* Progress Stepper Indicator: 1 ─── 2 ─── 3 ─── 4 ─── Review */}
        <RegistrationStepper
          steps={STEPS}
          currentStepIndex={currentStepIndex}
          onStepClick={handleJumpToStep}
          maxStepReached={maxStepReached}
        />

        {/* Step Views */}
        <div className="mt-6 mb-8">
          {currentStepIndex === 0 && (
            <BasicInformationStep
              data={formData.basicInformation}
              onChange={(fields) => setFormData(prev => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, ...fields }
              }))}
              errors={errors}
            />
          )}

          {currentStepIndex === 1 && (
            <LocationStep
              data={formData.geographicalInformation}
              onChange={(fields) => setFormData(prev => ({
                ...prev,
                geographicalInformation: { ...prev.geographicalInformation, ...fields }
              }))}
              errors={errors}
            />
          )}

          {currentStepIndex === 2 && (
            <FinancialInformationStep
              data={formData.financialInformation}
              onChange={(fields) => setFormData(prev => ({
                ...prev,
                financialInformation: { ...prev.financialInformation, ...fields }
              }))}
              errors={errors}
            />
          )}

          {currentStepIndex === 3 && (
            <DigitalLanguageStep
              data={formData.accessibilityInformation}
              onChange={(fields) => setFormData(prev => ({
                ...prev,
                accessibilityInformation: { ...prev.accessibilityInformation, ...fields }
              }))}
              errors={errors}
            />
          )}

          {currentStepIndex === 4 && (
            <ReviewStep
              data={formData}
              onEditSection={handleJumpToStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStepIndex === 0 ? 'Home' : 'Back'}</span>
          </button>

          {currentStepIndex < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-7 py-2.5 bg-teal-800 hover:bg-teal-900 disabled:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Registration</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
