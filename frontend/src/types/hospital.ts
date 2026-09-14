/**
 * Standard Hospital Schema & Types for EquiHealth Navigator
 * Completely separate from React UI components to support easy dataset updates,
 * CSV/Excel imports, and future Spring Boot REST API integration.
 */

export interface HospitalAddress {
  addressLine?: string;
  village?: string;
  city: string;
  district: string;
  state: string;
  pincode?: string;
}

export interface HospitalCoordinates {
  latitude: number;
  longitude: number;
}

export interface HospitalDistance {
  value: number;
  unit: 'km' | 'miles' | string;
}

export interface HospitalTravel {
  estimatedTime: string;
  mode: string;
}

export interface HospitalServiceItem {
  name: string;
  available: boolean;
  status?: string;
  department?: string;
  description?: string;
}

export interface OfflineRegistrationDetails {
  location: string;
  timings: string;
  fee: string;
  steps: string[];
  estimatedWaitTime?: string;
  requiredDocumentsNotice?: string;
}

export interface HospitalRegistration {
  online: boolean;
  offline: boolean;
  offlineRegistration?: OfflineRegistrationDetails;
  onlinePortalUrl?: string;
}

export interface HospitalAppointment {
  onlineAvailable: boolean;
  offlineAvailable: boolean;
  onlineProcess?: string[];
  offlineProcess?: string[];
  portalUrl?: string;
  bookingHelpline?: string;
}

export interface HospitalTimings {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  emergency?: string;
  opdTimings?: string;
  [key: string]: string | undefined;
}

export interface HospitalCostItem {
  service: string;
  min: number;
  max: number;
  currency: 'INR' | string;
  notes?: string;
}

export interface HospitalDocument {
  name: string;
  requiredFor: string;
  required: boolean;
  description?: string;
}

export interface HospitalAccessibility {
  wheelchairAccessible: boolean;
  accessibleEntrance: boolean;
  accessibleToilet?: boolean;
  signLanguageSupport?: boolean;
  assistanceDesk: boolean;
  elderlyAssistance: boolean;
  disabilitySupport: boolean;
  languageSupport: string[];
  brailleSignage?: boolean;
  rampsAvailable?: boolean;
}

export interface HospitalContact {
  phone: string;
  emergencyPhone?: string;
  helpDesk?: string;
  website?: string;
  email?: string;
}

export interface HospitalGovernmentBenefit {
  schemeId: string;
  schemeName: string;
  available: boolean;
  description: string;
  discountPercentage?: number;
  freeServices?: string[];
}

export interface HospitalRecommendation {
  isBestMatch: boolean;
  matchScore?: number;
  reasons: string[];
}

export interface HospitalAccessPlan {
  steps: string[];
  notes?: string;
}

export interface HospitalStatus {
  active: boolean;
  verified: boolean;
  lastUpdated: string;
}

/**
 * The Master Hospital Schema
 */
export interface Hospital {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  images: string[];
  address: HospitalAddress;
  location: HospitalCoordinates;
  distance: HospitalDistance;
  travel: HospitalTravel;
  services: HospitalServiceItem[];
  registration: HospitalRegistration;
  appointment: HospitalAppointment;
  timings: HospitalTimings;
  costs: HospitalCostItem[];
  documents: HospitalDocument[];
  accessibility: HospitalAccessibility;
  contact: HospitalContact;
  facilities: string[];
  governmentBenefits: HospitalGovernmentBenefit[];
  recommendation: HospitalRecommendation;
  accessPlan: HospitalAccessPlan;
  status: HospitalStatus;
}

export interface HospitalFilterOptions {
  searchQuery?: string;
  type?: string;
  category?: string;
  city?: string;
  service?: string;
  registrationType?: 'online' | 'offline' | 'any';
  appointmentType?: 'online' | 'offline' | 'any';
  maxDistanceKm?: number;
  wheelchairOnly?: boolean;
  governmentOnly?: boolean;
}
