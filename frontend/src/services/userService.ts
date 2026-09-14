import { UserRegistrationData, RegistrationResponse, EquiHealthUserRecord } from '../types/registration';
import { UserProfile, ResidentialArea, IncomeTier, EmploymentStatus, DigitalLiteracyLevel, Language } from '../types';
import { generateEquiHealthId, getExistingEquiHealthIds } from '../utils/equiHealthIdGenerator';

const REGISTRATION_ENDPOINT = '/api/users/register';
const STORAGE_USERS_KEY = 'equihealth_users';
const STORAGE_LAST_REGISTERED_KEY = 'equihealth_registered_user';

// Initial seed user so reviewers can test immediately with the example ID
const SEED_USER: EquiHealthUserRecord = {
  equiHealthId: 'EQH-7K42-91M8',
  fullName: 'Priya Sharma',
  pin: '1234',
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
  },
  registeredAt: new Date().toISOString()
};

/**
 * User Service - Handles user registration, storage, and retrieval for EquiHealth Navigator.
 * Integrates unique EquiHealth ID generation (EQH-XXXX-XXXX) with localStorage prototype
 * and prepares for Spring Boot REST API integration (POST /api/users/register).
 */
export const userService = {
  /**
   * Get all registered users from localStorage
   */
  getAllUsers(): EquiHealthUserRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      if (!data) {
        // Seed default record if empty
        const initial = [SEED_USER];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return [SEED_USER];
    } catch (e) {
      console.warn('Could not read users from localStorage', e);
      return [SEED_USER];
    }
  },

  /**
   * Save a single user record into the users collection
   */
  saveUserRecord(record: EquiHealthUserRecord): void {
    try {
      const allUsers = this.getAllUsers();
      // Check if user with same EquiHealth ID already exists
      const existingIdx = allUsers.findIndex(
        u => u.equiHealthId.toUpperCase() === record.equiHealthId.toUpperCase()
      );
      if (existingIdx >= 0) {
        allUsers[existingIdx] = record;
      } else {
        allUsers.push(record);
      }
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(allUsers));
      localStorage.setItem(STORAGE_LAST_REGISTERED_KEY, JSON.stringify(record));
    } catch (e) {
      console.warn('Could not save user record to localStorage', e);
    }
  },

  /**
   * Find a user by EquiHealth ID (case-insensitive)
   */
  getUserByEquiHealthId(equiHealthId: string): EquiHealthUserRecord | null {
    if (!equiHealthId) return null;
    const cleanId = equiHealthId.trim().toUpperCase();
    const allUsers = this.getAllUsers();
    const found = allUsers.find(u => u.equiHealthId.toUpperCase() === cleanId);
    return found || null;
  },

  /**
   * Find a user by registered phone number (normalized digits)
   */
  getUserByPhone(phone: string): EquiHealthUserRecord | null {
    if (!phone) return null;
    const cleanDigits = phone.replace(/\D/g, '');
    const last10Digits = cleanDigits.slice(-10);
    if (!last10Digits) return null;

    const allUsers = this.getAllUsers();
    const found = allUsers.find(u => {
      const userDigits = (u.basicInformation.phone || '').replace(/\D/g, '');
      return userDigits.slice(-10) === last10Digits;
    });
    return found || null;
  },

  /**
   * Submit registration data.
   * Generates a unique EquiHealth ID (EQH-XXXX-XXXX), checks uniqueness in localStorage,
   * stores user record, and attempts live call to Spring Boot if available.
   */
  async registerUser(data: UserRegistrationData, pin: string = '1234'): Promise<RegistrationResponse> {
    // 1. Generate unique EquiHealth ID
    const existingIds = getExistingEquiHealthIds();
    const newEquiHealthId = generateEquiHealthId(existingIds);

    // 2. Prepare user record
    const userRecord: EquiHealthUserRecord = {
      equiHealthId: newEquiHealthId,
      fullName: data.basicInformation.fullName,
      pin,
      basicInformation: { ...data.basicInformation },
      geographicalInformation: { ...data.geographicalInformation },
      financialInformation: { ...data.financialInformation },
      accessibilityInformation: { ...data.accessibilityInformation },
      registeredAt: new Date().toISOString()
    };

    try {
      // Attempt live call to Spring Boot backend if endpoint is ready
      const response = await fetch(REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...data, equiHealthId: newEquiHealthId, pin })
      });

      if (response.ok) {
        const result = (await response.json()) as RegistrationResponse;
        this.saveUserRecord(userRecord);
        return {
          ...result,
          equiHealthId: result.equiHealthId || newEquiHealthId
        };
      } else {
        console.warn(`Backend responded with status ${response.status}. Using frontend storage.`);
        return this.mockRegisterFallback(userRecord);
      }
    } catch (networkError) {
      console.info('Spring Boot server currently offline. Storing in frontend localStorage prototype.', networkError);
      return this.mockRegisterFallback(userRecord);
    }
  },

  /**
   * Mock fallback generator when backend is not actively responding
   */
  mockRegisterFallback(userRecord: EquiHealthUserRecord): RegistrationResponse {
    this.saveUserRecord(userRecord);

    return {
      success: true,
      userId: userRecord.equiHealthId,
      equiHealthId: userRecord.equiHealthId,
      message: 'User registration successfully recorded.',
      registeredAt: userRecord.registeredAt || new Date().toISOString(),
      data: {
        basicInformation: userRecord.basicInformation,
        geographicalInformation: userRecord.geographicalInformation,
        financialInformation: userRecord.financialInformation,
        accessibilityInformation: userRecord.accessibilityInformation
      }
    };
  },

  /**
   * Helper to project registered onboarding data into core UserProfile model
   */
  mapRegistrationToUserProfile(data: UserRegistrationData, existingUser?: UserProfile, equiHealthId?: string): UserProfile {
    const resArea: ResidentialArea = data.geographicalInformation.residentialArea.includes('Rural')
      ? 'Rural'
      : data.geographicalInformation.residentialArea.includes('Semi')
      ? 'Semi-urban'
      : 'Urban';

    let incomeTier: IncomeTier = 'Low';
    if (data.financialInformation.annualIncome.includes('₹3–5')) incomeTier = 'Medium';
    else if (data.financialInformation.annualIncome.includes('₹5–10') || data.financialInformation.annualIncome.includes('Above')) incomeTier = 'High';

    let insurance: UserProfile['healthInsurance'] = 'No insurance';
    if (data.financialInformation.healthInsurance === 'Yes') insurance = 'State Government Scheme';

    const literacy: DigitalLiteracyLevel = (data.accessibilityInformation.digitalLiteracy as DigitalLiteracyLevel) || 'Medium';
    const lang: Language = (data.accessibilityInformation.preferredLanguage as Language) || 'Hindi';

    return {
      ...(existingUser || {}),
      id: existingUser?.id || 'usr-' + Date.now(),
      equiHealthId: equiHealthId || (data as any).equiHealthId || existingUser?.equiHealthId || 'EQH-7K42-91M8',
      fullName: data.basicInformation.fullName || existingUser?.fullName || 'User',
      age: Number(data.basicInformation.age) || existingUser?.age || 35,
      gender: data.basicInformation.gender || existingUser?.gender || 'Woman',
      phone: data.basicInformation.phone || existingUser?.phone || '',
      email: existingUser?.email || '',

      residentialArea: resArea,
      state: data.geographicalInformation.state || 'Rajasthan',
      district: data.geographicalInformation.district || 'Jaipur',
      cityOrVillage: data.geographicalInformation.cityVillage || 'Ram Nagar',
      hospitalDistanceKm: existingUser?.hospitalDistanceKm || (resArea === 'Rural' ? 10 : 3),

      annualIncomeTier: incomeTier,
      annualIncomeAmount: incomeTier === 'Low' ? 180000 : incomeTier === 'Medium' ? 420000 : 750000,
      healthInsurance: insurance,
      employmentStatus: (data.financialInformation.employmentStatus as EmploymentStatus) || 'Informal/Daily wages',

      modeOfTravel: existingUser?.modeOfTravel || 'Public transport (bus/auto)',
      transportAvailability: existingUser?.transportAvailability || 'Moderate (available 2-3 times/week)',
      travelTimeMinutes: existingUser?.travelTimeMinutes || 25,
      disabilities: data.accessibilityInformation.accessibilityRequirement !== 'None' ? data.accessibilityInformation.accessibilityRequirement : 'None',

      currentFeeling: existingUser?.currentFeeling || 'Mild discomfort',
      healthConcerns: existingUser?.healthConcerns || ['Preventive Consultation'],
      symptomOnset: existingUser?.symptomOnset || 'Recent weeks',

      digitalLiteracy: literacy,
      deviceAvailable: existingUser?.deviceAvailable || 'Smartphone with mobile data',
      languages: existingUser?.languages || [lang],
      preferredLanguage: lang,

      identifiedBarriers: existingUser?.identifiedBarriers || ['Cost', 'Transportation'],
      nearbyCyberCafeAvailable: existingUser?.nearbyCyberCafeAvailable ?? true,

      primaryNeedToday: existingUser?.primaryNeedToday || 'General Checkup',
      previousVisit: existingUser?.previousVisit ?? false,
      preferredHospitalId: existingUser?.preferredHospitalId || 'hosp-rural-satellite',

      additionalInfo: existingUser?.additionalInfo || '',
      emergencyContact: existingUser?.emergencyContact || '',
      emergencyContactRelation: existingUser?.emergencyContactRelation || ''
    };
  }
};
