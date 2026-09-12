export interface BasicInformation {
  fullName: string;
  age: string;
  gender: string;
  phone: string;
}

export interface GeographicalInformation {
  residentialArea: string;
  state: string;
  district: string;
  cityVillage: string;
}

export interface FinancialInformation {
  annualIncome: string;
  healthInsurance: string;
  employmentStatus: string;
}

export interface AccessibilityInformation {
  digitalLiteracy: string;
  preferredLanguage: string;
  otherLanguage?: string;
  accessibilityRequirement: string;
}

export interface UserRegistrationData {
  basicInformation: BasicInformation;
  geographicalInformation: GeographicalInformation;
  financialInformation: FinancialInformation;
  accessibilityInformation: AccessibilityInformation;
}

export type RegistrationStepId = 
  | 'basic'
  | 'location'
  | 'financial'
  | 'accessibility'
  | 'review';

export interface RegistrationStepConfig {
  id: RegistrationStepId;
  stepNumber: number;
  title: string;
  subtitle: string;
}

export interface RegistrationValidationErrors {
  [key: string]: string | undefined;
}

export interface EquiHealthUserRecord extends UserRegistrationData {
  equiHealthId: string;
  fullName?: string;
  pin?: string;
  registeredAt?: string;
}

export interface RegistrationResponse {
  success: boolean;
  userId: string;
  equiHealthId: string;
  message: string;
  registeredAt: string;
  data: UserRegistrationData;
}
