import { 
  Hospital, 
  HospitalFilterOptions, 
  HospitalServiceItem,
  HospitalAddress,
  HospitalCoordinates,
  HospitalRegistration,
  HospitalAppointment,
  HospitalTimings
} from '../types/hospital';
import rawHospitalsData from '../data/hospitals.json';
import { UserProfile } from '../types';

const HOSPITALS_API_ENDPOINT = '/api/hospitals';

/**
 * Validates a Hospital object ensuring all mandatory structural fields are present.
 * Does NOT crash the application if fields are missing; instead logs actionable warnings
 * and helps identify dataset defects.
 */
export function validateHospitalData(hospital: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!hospital) {
    errors.push('Hospital record is null or undefined');
    return { valid: false, errors };
  }

  if (!hospital.id || typeof hospital.id !== 'string') {
    errors.push(`Missing or invalid 'id' field in hospital`);
  }

  if (!hospital.name || typeof hospital.name !== 'string') {
    errors.push(`Hospital [${hospital.id || 'unknown'}] is missing a valid 'name'`);
  }

  if (!hospital.type || typeof hospital.type !== 'string') {
    errors.push(`Hospital [${hospital.id || 'unknown'}] is missing a valid 'type'`);
  }

  if (!hospital.address || typeof hospital.address !== 'object') {
    errors.push(`Hospital [${hospital.id || 'unknown'}] is missing valid 'address' object`);
  }

  if (!Array.isArray(hospital.images)) {
    errors.push(`Hospital [${hospital.id || 'unknown'}] 'images' must be an array`);
  }

  if (!hospital.location || typeof hospital.location.latitude !== 'number' || typeof hospital.location.longitude !== 'number') {
    errors.push(`Hospital [${hospital.id || 'unknown'}] 'location' must have numeric latitude and longitude`);
  }

  if (!Array.isArray(hospital.services)) {
    errors.push(`Hospital [${hospital.id || 'unknown'}] 'services' must be an array`);
  }

  if (!hospital.registration || typeof hospital.registration !== 'object') {
    errors.push(`Hospital [${hospital.id || 'unknown'}] missing 'registration' object`);
  }

  if (!hospital.timings || typeof hospital.timings !== 'object') {
    errors.push(`Hospital [${hospital.id || 'unknown'}] missing 'timings' object`);
  }

  if (errors.length > 0) {
    console.warn(`[EquiHealth Hospital Validator] Warnings for hospital [${hospital?.id || '?'}]`, errors);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Normalization function that converts external / imported data (JSON, CSV row, Excel parsed record)
 * into the internal standard Hospital schema.
 * 
 * Flow:
 * CSV / Excel / Raw JSON
 *        ↓
 * normalizeHospitalData()
 *        ↓
 * Standard Hospital Object
 *        ↓
 * React UI Components
 */
export function normalizeHospitalData(raw: any): Hospital {
  if (!raw) {
    throw new Error('Cannot normalize null or undefined hospital data');
  }

  // Safe parsing of address
  let address: HospitalAddress;
  if (typeof raw.address === 'string') {
    address = {
      addressLine: raw.address,
      city: raw.city || 'Unknown City',
      district: raw.district || 'Unknown District',
      state: raw.state || 'Rajasthan'
    };
  } else if (raw.address && typeof raw.address === 'object') {
    address = {
      addressLine: raw.address.addressLine || raw.address.line || '',
      village: raw.address.village || raw.village || '',
      city: raw.address.city || raw.city || 'Unknown City',
      district: raw.address.district || raw.district || 'Unknown District',
      state: raw.address.state || raw.state || 'Rajasthan',
      pincode: raw.address.pincode || raw.pincode || ''
    };
  } else {
    address = {
      city: raw.city || 'Unknown City',
      district: raw.district || 'Unknown District',
      state: raw.state || 'Rajasthan'
    };
  }

  // Safe parsing of coordinates
  const location: HospitalCoordinates = {
    latitude: Number(raw.location?.latitude || raw.latitude || raw.lat || 26.9124),
    longitude: Number(raw.location?.longitude || raw.longitude || raw.lng || raw.long || 75.7873)
  };

  // Safe parsing of distance
  const distance = {
    value: Number(raw.distance?.value ?? raw.distanceValue ?? (typeof raw.distance === 'number' ? raw.distance : 10)),
    unit: raw.distance?.unit || raw.distanceUnit || 'km'
  };

  // Safe parsing of travel
  const travel = {
    estimatedTime: raw.travel?.estimatedTime || raw.travelTime || raw.estimatedTime || '20–30 minutes',
    mode: raw.travel?.mode || raw.travelMode || 'Public Transport'
  };

  // Safe parsing of services
  let services: HospitalServiceItem[] = [];
  if (Array.isArray(raw.services)) {
    services = raw.services.map((s: any) => {
      if (typeof s === 'string') {
        return { name: s, available: true, status: 'Available' };
      }
      return {
        name: s.name || 'General Healthcare',
        available: s.available !== false,
        status: s.status || (s.available !== false ? 'Available' : 'Unavailable'),
        department: s.department,
        description: s.description
      };
    });
  } else if (typeof raw.services === 'string') {
    services = raw.services.split(',').map((name: string) => ({
      name: name.trim(),
      available: true,
      status: 'Available'
    }));
  }

  // Safe parsing of registration
  const registration: HospitalRegistration = {
    online: Boolean(raw.registration?.online ?? raw.onlineRegistration ?? false),
    offline: Boolean(raw.registration?.offline ?? raw.offlineRegistration ?? true),
    offlineRegistration: raw.registration?.offlineRegistration || (raw.offlineRegistration ? {
      location: raw.offlineRegistration.location || 'Main Counter',
      timings: raw.offlineRegistration.timings || '8:00 AM – 4:00 PM',
      fee: raw.offlineRegistration.fee || 'Free',
      steps: Array.isArray(raw.offlineRegistration.steps) ? raw.offlineRegistration.steps : ['Visit registration counter']
    } : undefined)
  };

  // Safe parsing of appointment
  const appointment: HospitalAppointment = {
    onlineAvailable: Boolean(raw.appointment?.onlineAvailable ?? raw.onlineAppointment ?? false),
    offlineAvailable: Boolean(raw.appointment?.offlineAvailable ?? raw.offlineAppointment ?? true),
    onlineProcess: Array.isArray(raw.appointment?.onlineProcess) ? raw.appointment.onlineProcess : [],
    offlineProcess: Array.isArray(raw.appointment?.offlineProcess) ? raw.appointment.offlineProcess : ['Walk-in registration at counter']
  };

  // Safe parsing of timings
  const timings: HospitalTimings = raw.timings || {
    monday: raw.mondayTimings || '8:00 AM – 8:00 PM',
    tuesday: raw.tuesdayTimings || '8:00 AM – 8:00 PM',
    wednesday: raw.wednesdayTimings || '8:00 AM – 8:00 PM',
    thursday: raw.thursdayTimings || '8:00 AM – 8:00 PM',
    friday: raw.fridayTimings || '8:00 AM – 8:00 PM',
    saturday: raw.saturdayTimings || '8:00 AM – 8:00 PM',
    sunday: raw.sundayTimings || '10:00 AM – 2:00 PM',
    emergency: raw.emergencyTimings || '24/7'
  };

  // Images array with validation
  const images = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images
    : ['https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80'];

  return {
    id: String(raw.id || `HOSP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`),
    name: String(raw.name || 'Healthcare Facility'),
    type: String(raw.type || 'Government Hospital'),
    category: String(raw.category || 'Healthcare'),
    description: String(raw.description || 'Healthcare service center.'),
    images,
    address,
    location,
    distance,
    travel,
    services,
    registration,
    appointment,
    timings,
    costs: Array.isArray(raw.costs) ? raw.costs : [],
    documents: Array.isArray(raw.documents) ? raw.documents : [],
    accessibility: raw.accessibility || {
      wheelchairAccessible: true,
      accessibleEntrance: true,
      accessibleToilet: false,
      signLanguageSupport: false,
      assistanceDesk: true,
      elderlyAssistance: true,
      disabilitySupport: true,
      languageSupport: ['Hindi', 'English']
    },
    contact: raw.contact || { phone: '+91-XXXXXXXXXX' },
    facilities: Array.isArray(raw.facilities) ? raw.facilities : ['OPD', 'Pharmacy'],
    governmentBenefits: Array.isArray(raw.governmentBenefits) ? raw.governmentBenefits : [],
    recommendation: raw.recommendation || {
      isBestMatch: false,
      reasons: ['Healthcare services available at this facility']
    },
    accessPlan: raw.accessPlan || {
      steps: ['Prepare required documents', 'Visit hospital registration counter', 'Consult medical practitioner']
    },
    status: raw.status || {
      active: true,
      verified: true,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
  };
}

/**
 * Cache of parsed and normalized hospitals loaded from hospitals.json
 */
let cachedHospitals: Hospital[] | null = null;

function loadHospitalsFromDataset(): Hospital[] {
  if (cachedHospitals) return cachedHospitals;

  try {
    const rawList = rawHospitalsData as any[];
    cachedHospitals = rawList.map(item => {
      validateHospitalData(item);
      return normalizeHospitalData(item);
    });
    return cachedHospitals;
  } catch (err) {
    console.error('Failed to parse hospitals.json dataset:', err);
    return [];
  }
}

/**
 * Hospital Service Layer
 * 
 * Provides clean, asynchronous abstraction over hospital data.
 * Currently uses normalized src/data/hospitals.json.
 * Ready for future Spring Boot REST API integration:
 * GET /api/hospitals
 * GET /api/hospitals/{id}
 * GET /api/hospitals/search
 * GET /api/hospitals/recommended
 */
export const hospitalService = {
  /**
   * Retrieves all verified active hospitals
   */
  async getHospitals(): Promise<Hospital[]> {
    try {
      // Future Spring Boot REST API hook
      if (typeof window !== 'undefined' && (window as any).__USE_SPRING_BOOT_HOSPITALS__) {
        const res = await fetch(HOSPITALS_API_ENDPOINT);
        if (res.ok) {
          const raw = await res.json();
          return Array.isArray(raw) ? raw.map(normalizeHospitalData) : [];
        }
      }
    } catch (e) {
      console.info('Spring Boot endpoint unavailable, falling back to local dataset.', e);
    }

    return loadHospitalsFromDataset();
  },

  /**
   * Retrieves a single hospital by ID
   */
  async getHospitalById(id: string): Promise<Hospital | null> {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();

    try {
      if (typeof window !== 'undefined' && (window as any).__USE_SPRING_BOOT_HOSPITALS__) {
        const res = await fetch(`${HOSPITALS_API_ENDPOINT}/${encodeURIComponent(cleanId)}`);
        if (res.ok) {
          const raw = await res.json();
          return normalizeHospitalData(raw);
        }
      }
    } catch (e) {
      // fallback
    }

    const all = await this.getHospitals();
    const found = all.find(h => h.id.toUpperCase() === cleanId);
    return found || null;
  },

  /**
   * Retrieves hospitals that provide a specific service
   */
  async getHospitalsByService(serviceName: string): Promise<Hospital[]> {
    if (!serviceName) return this.getHospitals();
    const cleanQuery = serviceName.toLowerCase().trim();

    const all = await this.getHospitals();
    return all.filter(h => 
      h.services.some(s => s.available && s.name.toLowerCase().includes(cleanQuery))
    );
  },

  /**
   * Retrieves hospitals in a given location (city, district, or state)
   */
  async getHospitalsByLocation(location: string): Promise<Hospital[]> {
    if (!location) return this.getHospitals();
    const cleanLoc = location.toLowerCase().trim();

    const all = await this.getHospitals();
    return all.filter(h => 
      h.address.city.toLowerCase().includes(cleanLoc) ||
      h.address.district.toLowerCase().includes(cleanLoc) ||
      h.address.state.toLowerCase().includes(cleanLoc) ||
      (h.address.village && h.address.village.toLowerCase().includes(cleanLoc))
    );
  },

  /**
   * Recommends hospitals tailored to user profile, accessibility needs, and location
   */
  async getRecommendedHospitals(userProfile?: UserProfile): Promise<Hospital[]> {
    const all = await this.getHospitals();
    if (!all.length) return [];

    if (!userProfile) {
      // Default: best match first
      return [...all].sort((a, b) => (b.recommendation.isBestMatch ? 1 : 0) - (a.recommendation.isBestMatch ? 1 : 0));
    }

    // Dynamic scoring based on patient profile
    const scored = all.map(h => {
      let score = h.recommendation.matchScore || (h.recommendation.isBestMatch ? 90 : 60);

      // Match district / city
      if (userProfile.district && h.address.district.toLowerCase() === userProfile.district.toLowerCase()) {
        score += 15;
      }
      if (userProfile.residentialArea === 'Rural' && h.category.toLowerCase().includes('rural')) {
        score += 10;
      }

      // Match accessibility requirements
      if (userProfile.disabilities && userProfile.disabilities !== 'None') {
        if (h.accessibility.disabilitySupport || h.accessibility.wheelchairAccessible) {
          score += 10;
        }
      }

      // Match preferred language
      if (userProfile.preferredLanguage && h.accessibility.languageSupport.some(l => l.toLowerCase() === userProfile.preferredLanguage?.toLowerCase())) {
        score += 5;
      }

      return {
        hospital: {
          ...h,
          recommendation: {
            ...h.recommendation,
            isBestMatch: score >= 85
          }
        },
        score
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.hospital);
  },

  /**
   * Multi-criteria filter engine for dynamic search & discovery
   */
  async filterHospitals(options: HospitalFilterOptions): Promise<Hospital[]> {
    let list = await this.getHospitals();

    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.toLowerCase().trim();
      list = list.filter(h => 
        h.name.toLowerCase().includes(q) ||
        h.type.toLowerCase().includes(q) ||
        h.address.city.toLowerCase().includes(q) ||
        h.address.district.toLowerCase().includes(q) ||
        h.services.some(s => s.name.toLowerCase().includes(q))
      );
    }

    if (options.type && options.type !== 'All') {
      list = list.filter(h => h.type.toLowerCase() === options.type!.toLowerCase());
    }

    if (options.city && options.city !== 'All') {
      list = list.filter(h => h.address.city.toLowerCase() === options.city!.toLowerCase() || h.address.district.toLowerCase() === options.city!.toLowerCase());
    }

    if (options.service && options.service !== 'All') {
      list = list.filter(h => h.services.some(s => s.available && s.name.toLowerCase().includes(options.service!.toLowerCase())));
    }

    if (options.registrationType && options.registrationType !== 'any') {
      if (options.registrationType === 'online') {
        list = list.filter(h => h.registration.online);
      } else if (options.registrationType === 'offline') {
        list = list.filter(h => h.registration.offline);
      }
    }

    if (options.wheelchairOnly) {
      list = list.filter(h => h.accessibility.wheelchairAccessible);
    }

    if (options.governmentOnly) {
      list = list.filter(h => h.type.toLowerCase().includes('government'));
    }

    if (options.maxDistanceKm && options.maxDistanceKm > 0) {
      list = list.filter(h => h.distance.value <= options.maxDistanceKm!);
    }

    return list;
  },

  /**
   * Helper to extract all unique hospital types dynamically from dataset
   */
  async getAvailableTypes(): Promise<string[]> {
    const all = await this.getHospitals();
    const types = new Set<string>(all.map(h => h.type).filter(Boolean));
    return Array.from(types);
  },

  /**
   * Helper to extract all unique services dynamically from dataset
   */
  async getAvailableServices(): Promise<string[]> {
    const all = await this.getHospitals();
    const serviceSet = new Set<string>();
    all.forEach(h => {
      h.services.forEach(s => {
        if (s.name) serviceSet.add(s.name);
      });
    });
    return Array.from(serviceSet);
  },

  /**
   * Helper to extract all unique cities / districts dynamically
   */
  async getAvailableDistricts(): Promise<string[]> {
    const all = await this.getHospitals();
    const distSet = new Set<string>(all.map(h => h.address.district).filter(Boolean));
    return Array.from(distSet);
  }
};
