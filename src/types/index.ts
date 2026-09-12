// Core Types for EquiHealth Navigator

export * from './registration';

export type ResidentialArea = 'Urban' | 'Semi-urban' | 'Rural';
export type IncomeTier = 'Low' | 'Medium' | 'High';
export type EmploymentStatus = 'Informal/Daily wages' | 'Self-employed' | 'Salaried' | 'Unemployed' | 'Homemaker';
export type TravelMode = 'Public transport (bus/auto)' | 'Walking / Bicycle' | 'Two-wheeler' | 'Hired cab / Shared jeep' | 'Train / Metro';
export type TransportAvailability = 'Frequent (daily)' | 'Moderate (available 2-3 times/week)' | 'Rare (once a week or less)';
export type DigitalLiteracyLevel = 'Low' | 'Medium' | 'High';
export type DeviceType = 'Basic phone only' | 'Smartphone with mobile data' | 'Family shared phone' | 'No phone';
export type Language = 'Hindi' | 'English' | 'Rajasthani' | 'Bengali' | 'Tamil' | 'Telugu' | 'Marathi' | 'Gujarati' | 'Urdu';

export type BarrierType = 
  | 'Cost'
  | 'Transportation'
  | 'Digital access'
  | 'Language'
  | 'Childcare'
  | 'Work schedule'
  | 'Distance';

export interface UserProfile {
  id?: string;
  equiHealthId?: string;
  // Section 1: Basic Information
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;

  // Section 2: Geographical Background
  residentialArea: ResidentialArea;
  state: string;
  district: string;
  cityOrVillage: string;
  hospitalDistanceKm: number;

  // Section 3: Financial Condition
  annualIncomeTier: IncomeTier;
  annualIncomeAmount: number;
  healthInsurance: 'No insurance' | 'PM-JAY (Ayushman Bharat)' | 'State Government Scheme' | 'Private Insurance';
  employmentStatus: EmploymentStatus;

  // Section 4: Transport & Accessibility
  modeOfTravel: TravelMode;
  transportAvailability: TransportAvailability;
  travelTimeMinutes: number;
  disabilities: string;

  // Section 5: Current Health Status
  currentFeeling: 'Good (no major issues)' | 'Mild discomfort' | 'Moderate illness / Chronic' | 'Severe / Urgent pain';
  healthConcerns: string[];
  symptomOnset: 'Recent days' | 'Recent weeks' | 'Months ago / Chronic';

  // Section 6: Digital Literacy & Language
  digitalLiteracy: DigitalLiteracyLevel;
  deviceAvailable: DeviceType;
  languages: Language[];
  preferredLanguage: Language;

  // Section 7: Accessibility Barriers
  identifiedBarriers: BarrierType[];
  nearbyCyberCafeAvailable: boolean;

  // Section 8: Specific Healthcare Needs
  primaryNeedToday: string;
  previousVisit: boolean;
  preferredHospitalId: string;

  // Section 9: Special Notes & Emergency
  additionalInfo: string;
  emergencyContact: string;
  emergencyContactRelation: string;
}

export interface HospitalService {
  id: string;
  name: string;
  category: 'Monitoring' | 'Diagnostics' | 'Consultation' | 'Preventive Care' | 'Counseling' | 'Pharmacy';
  description: string;
  normalCostMin: number;
  normalCostMax: number;
  isAvailableOnline: boolean;
  isAvailableOffline: boolean;
}

export interface SatelliteHospital {
  id: string;
  name: string;
  locationType: 'Central' | 'East' | 'Rural';
  tagline: string;
  address: string;
  distanceKmFromUser: number;
  equipmentLevel: 'High' | 'Moderate' | 'Basic';
  bookingMode: 'Online booking' | 'Mixed online/offline' | 'Offline desk only';
  openingHours: {
    monSat: string;
    sunday: string;
    emergency: string;
  };
  contactPhone: string;
  helplinePhone: string;
  busRoutesAvailable: string[];
  features: string[];
  serviceIds: string[];
}

export interface GovernmentPolicyScheme {
  id: string;
  name: string;
  shortCode: string;
  overview: string;
  targetBeneficiaries: string;
  eligibilityCriteria: {
    maxIncomeTier: IncomeTier[];
    allowedAreas: ResidentialArea[];
    employmentTypes: EmploymentStatus[];
    requiresCard: boolean;
  };
  benefitsProvided: string[];
  coverageEstimatePercent: number; // e.g. 80-100%
  requiredDocuments: string[];
  officialRegistrationUrl: string;
  applicationDeskNotes: string;
}

export interface BarrierSolution {
  barrier: BarrierType;
  severity: 'High' | 'Medium' | 'Low';
  problemSummary: string;
  actionableSolution: string;
  supportResources: string[];
  facilityContactAction?: string;
}

export interface HospitalScoreBreakdown {
  hospital: SatelliteHospital;
  totalScore: number; // 0 - 100
  requirementMatchScore: number; // 30% weight
  distanceScore: number; // 20% weight
  costScore: number; // 20% weight
  accessibilityScore: number; // 15% weight
  operationalHoursScore: number; // 15% weight
  recommendationReason: string;
  comparativeAdvantages: string[];
  potentialDrawbacks: string[];
}

export interface CostBreakdownResult {
  serviceName: string;
  normalCost: number;
  governmentBenefitSubsidized: number;
  netEstimatedPayable: number;
  appliedSchemeName: string;
  notes: string;
}

export interface PersonalizedHealthcarePlan {
  planId: string;
  generatedAt: string;
  user: UserProfile;
  recommendedHospital: SatelliteHospital;
  scoringBreakdown: HospitalScoreBreakdown;
  accessibilityScore: number;
  detectedBarriers: BarrierSolution[];
  matchedSchemes: GovernmentPolicyScheme[];
  costBreakdown: CostBreakdownResult;
  transportGuidance: {
    recommendedMode: string;
    estimatedFare: string;
    transitTime: string;
    stepByStepRoute: string[];
  };
  requiredDocuments: {
    docName: string;
    purpose: string;
    mandatory: boolean;
  }[];
  stepByStepInstructions: string[];
  emergencyWarning?: {
    isEmergency: boolean;
    urgencyLevel: 'None' | 'Moderate' | 'Critical';
    message: string;
    actionRequired: string;
  };
}

export interface AccessAnalyticsData {
  mostCommonBarriers: { barrier: string; count: number; percentage: number }[];
  serviceDemandByArea: { area: string; generalCare: number; diabetes: number; diagnostics: number; bpCheck: number }[];
  hospitalUtilization: { hospital: string; totalPatients: number; capacityPercent: number }[];
  subsidyUtilizationRate: number;
  averageAccessibilityScore: number;
}

export interface SpringBootEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  controller: string;
  requestDto?: string;
  responseDto?: string;
}

export type FacilityCategory = 'govt-hospitals' | 'pathlab' | 'chemist';

export interface PathlabServiceItem {
  id: string;
  title: string;
  category: 'BP Monitoring' | 'Blood Tests' | 'Diabetes Management' | 'Consultation' | 'Support' | 'Diagnostics' | 'Preventive Care' | 'Checkup';
  description: string;
  costRange: string;
  normalCostMin: number;
  normalCostMax: number;
  turnAroundTime: string;
  sampleType: string;
  isHomeSampleAvailable: boolean;
  isOnlineAvailable: boolean;
  isOfflineWalkIn: boolean;
  preparationNotes: string;
}

export interface ChemistFacility {
  id: string;
  name: string;
  branchType: 'Central' | 'East' | 'Rural';
  tagline: string;
  address: string;
  openingHours: {
    monSat: string;
    sunday: string;
    emergency: string;
  };
  contactPhone: string;
  helplinePhone: string;
  subsidyDiscountText: string;
  features: string[];
  bookingMode: string;
}

export interface BookingRecord {
  id: string;
  tokenNumber: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  facilityCategory: FacilityCategory;
  facilityName: string;
  serviceTitle: string;
  appointmentDate: string;
  timeSlot: string;
  bookingType: 'Online Tele-Consult' | 'In-Person Hospital Visit' | 'Pathlab Walk-In' | 'Home Sample Collection' | 'Chemist Pickup';
  originalCost: number;
  subsidizedAmount: number;
  netPayableCost: number;
  appliedScheme: string;
  status: 'Confirmed' | 'Pending Desk Verification';
  createdAt: string;
  notes: string;
}
