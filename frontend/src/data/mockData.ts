import { 
  SatelliteHospital, 
  HospitalService, 
  GovernmentPolicyScheme, 
  UserProfile, 
  AccessAnalyticsData,
  SpringBootEndpoint,
  PathlabServiceItem,
  ChemistFacility
} from '../types';

export const SCCDSC_SERVICES: HospitalService[] = [
  {
    id: 'srv-bp',
    name: 'BP Monitoring & Hypertension Check',
    category: 'Monitoring',
    description: 'Regular checkups, blood pressure monitoring, hypertension screening, vitals recording.',
    normalCostMin: 0,
    normalCostMax: 100,
    isAvailableOnline: false,
    isAvailableOffline: true
  },
  {
    id: 'srv-blood-tests',
    name: 'Basic Blood Tests (CBC, Cholesterol, Liver/Kidney)',
    category: 'Diagnostics',
    description: 'Complete blood count (CBC), lipid profile, cholesterol, liver and renal function panels.',
    normalCostMin: 300,
    normalCostMax: 500,
    isAvailableOnline: false,
    isAvailableOffline: true
  },
  {
    id: 'srv-diabetes',
    name: 'Diabetes Management & Screening',
    category: 'Monitoring',
    description: 'Fasting glucose, postprandial glucose, HbA1c test, clinical counseling and insulin guidance.',
    normalCostMin: 400,
    normalCostMax: 600,
    isAvailableOnline: false,
    isAvailableOffline: true
  },
  {
    id: 'srv-consultation',
    name: 'General Physician Consultation',
    category: 'Consultation',
    description: 'In-person outpatient consultation or tele-consultation with registered Medical Officers.',
    normalCostMin: 200,
    normalCostMax: 500,
    isAvailableOnline: true,
    isAvailableOffline: true
  },
  {
    id: 'srv-support',
    name: 'Nursing Support & Vital Signs',
    category: 'Monitoring',
    description: 'Trained community nurses, sterile sample collection, wound dressing, vital signs track.',
    normalCostMin: 50,
    normalCostMax: 150,
    isAvailableOnline: false,
    isAvailableOffline: true
  },
  {
    id: 'srv-diagnostics',
    name: 'Advanced Diagnostics (ECG, Ultrasound)',
    category: 'Diagnostics',
    description: 'Electrocardiogram (ECG), point-of-care ultrasound, digital radiologic report generation.',
    normalCostMin: 500,
    normalCostMax: 1200,
    isAvailableOnline: false,
    isAvailableOffline: true
  },
  {
    id: 'srv-preventive',
    name: 'Preventive Care & Health Education',
    category: 'Preventive Care',
    description: 'First aid training, chronic lifestyle disease mitigation, seasonal outbreak warnings.',
    normalCostMin: 0,
    normalCostMax: 100,
    isAvailableOnline: true,
    isAvailableOffline: true
  },
  {
    id: 'srv-counseling',
    name: 'Nutrition & Basic Mental Health Support',
    category: 'Counseling',
    description: 'Dietary planning for anemia and diabetes, basic emotional stress counseling.',
    normalCostMin: 150,
    normalCostMax: 350,
    isAvailableOnline: true,
    isAvailableOffline: true
  },
  {
    id: 'srv-pharmacy',
    name: 'Pharmacy & Medicine Dispensing',
    category: 'Pharmacy',
    description: 'Affordable generic medicines, Jan Aushadhi generic counter, prescription fulfillment.',
    normalCostMin: 50,
    normalCostMax: 300,
    isAvailableOnline: false,
    isAvailableOffline: true
  },
  {
    id: 'srv-full-checkup',
    name: 'Full Comprehensive Health Checkup Package',
    category: 'Diagnostics',
    description: 'Doctor consultation + CBC + Glucose + ECG + BP + Kidney profile bundled screening.',
    normalCostMin: 1500,
    normalCostMax: 2500,
    isAvailableOnline: true,
    isAvailableOffline: true
  }
];

export const SATELLITE_HOSPITALS: SatelliteHospital[] = [
  {
    id: 'hosp-rural',
    name: 'SCCDSC Satellite Hospital - Rural Branch',
    locationType: 'Rural',
    tagline: 'Primary Community Outpost for Village & Peri-Urban Families',
    address: 'Near Ram Nagar Gram Panchayat Bhawan, Jaipur District, Rajasthan',
    distanceKmFromUser: 10,
    equipmentLevel: 'Basic',
    bookingMode: 'Offline desk only',
    openingHours: {
      monSat: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
      emergency: '24/7 (Basic emergency & stabilization)'
    },
    contactPhone: '+91-141-2890123',
    helplinePhone: '1800-180-6001 (Toll Free)',
    busRoutesAvailable: ['Route 14 (Jaipur to Ram Nagar bus stop - every 45 mins)', 'Gramin Gram Bus #3B'],
    features: [
      'No smartphone needed — Full offline registration counter',
      'Hindi & local Rajasthani speaking ASHA health facilitators',
      'Direct PM-JAY & State BPL card verification on-site',
      'Subsidized Jan Aushadhi generic pharmacy on premises',
      'Childcare play & rest area for waiting mothers'
    ],
    serviceIds: ['srv-bp', 'srv-blood-tests', 'srv-diabetes', 'srv-consultation', 'srv-support', 'srv-preventive', 'srv-pharmacy']
  },
  {
    id: 'hosp-east',
    name: 'SCCDSC Satellite Hospital - East Suburban Branch',
    locationType: 'East',
    tagline: 'Mid-Range Facility with Mixed Digital and Walk-in Support',
    address: 'Sector 8, Malviya East Extension, Near Ring Road, Jaipur',
    distanceKmFromUser: 24,
    equipmentLevel: 'Moderate',
    bookingMode: 'Mixed online/offline',
    openingHours: {
      monSat: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
      emergency: '24/7 (Emergency care & ambulance transfer)'
    },
    contactPhone: '+91-141-2556789',
    helplinePhone: '1800-180-6002 (Toll Free)',
    busRoutesAvailable: ['City Bus Route 7A', 'Low-floor AC Bus 28', 'Shared Auto Stand #4'],
    features: [
      'Token kiosk + Walk-in offline support',
      'Equipped for ECG, ultrasound diagnostics & diabetes blood lab',
      'Digital prescription sent via SMS to basic phone',
      'Evening clinic slots open till 8 PM for daily wage workers'
    ],
    serviceIds: ['srv-bp', 'srv-blood-tests', 'srv-diabetes', 'srv-consultation', 'srv-support', 'srv-diagnostics', 'srv-preventive', 'srv-counseling', 'srv-pharmacy', 'srv-full-checkup']
  },
  {
    id: 'hosp-central',
    name: 'SCCDSC Satellite Hospital - Central City Center',
    locationType: 'Central',
    tagline: 'Tertiary-Linked Center with Advanced Diagnostics & Specialist Roster',
    address: 'Medical Enclave, Central Avenue, Station Road, Jaipur',
    distanceKmFromUser: 38,
    equipmentLevel: 'High',
    bookingMode: 'Online booking',
    openingHours: {
      monSat: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
      emergency: '24/7 (Comprehensive ICU & Trauma Center)'
    },
    contactPhone: '+91-141-2223344',
    helplinePhone: '1800-180-6003 (Toll Free)',
    busRoutesAvailable: ['Direct Central Metro (Station 4)', 'Rapid Transit Route 1', 'Inter-city Bus Terminal'],
    features: [
      'Advanced digital appointment and laboratory tracking portal',
      'Complete ultrasound, echocardiogram & pathology automation',
      'Specialist MD physicians & diabetic endocrinology consultations',
      'Requires pre-booking or smartphone token'
    ],
    serviceIds: ['srv-bp', 'srv-blood-tests', 'srv-diabetes', 'srv-consultation', 'srv-support', 'srv-diagnostics', 'srv-preventive', 'srv-counseling', 'srv-pharmacy', 'srv-full-checkup']
  }
];

export const GOVERNMENT_SCHEMES: GovernmentPolicyScheme[] = [
  {
    id: 'scheme-pmjay',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)',
    shortCode: 'PM-JAY',
    overview: 'World’s largest government-funded health assurance scheme providing cashless coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    targetBeneficiaries: 'Bottom 40% vulnerable and poor families identified by SECC database or State BPL/ration records.',
    eligibilityCriteria: {
      maxIncomeTier: ['Low'],
      allowedAreas: ['Urban', 'Semi-urban', 'Rural'],
      employmentTypes: ['Informal/Daily wages', 'Unemployed', 'Homemaker'],
      requiresCard: false // Can be verified on spot with Aadhaar + Ration card
    },
    benefitsProvided: [
      '100% Free diagnostics and inpatient care at empaneled hospitals',
      'Pre-existing conditions covered from day one',
      'No out-of-pocket cost for doctor consultations and essential medicine during checkup visits'
    ],
    coverageEstimatePercent: 100,
    requiredDocuments: [
      'Aadhaar Card (or Voter ID / Ration Card)',
      'Ration Card / BPL Card proof (or SECC family listing)',
      'Active mobile number for OTP confirmation'
    ],
    officialRegistrationUrl: 'https://mera.pmjay.gov.in',
    applicationDeskNotes: 'SCCDSC Rural Satellite Hospital has a dedicated Ayushman Mitra desk at Gate 1 for instant fingerprint verification.'
  },
  {
    id: 'scheme-nhm-free-diag',
    name: 'National Health Mission (NHM) Free Diagnostic Service Initiative',
    shortCode: 'NHM-FDSI',
    overview: 'Ensures provision of a minimum package of essential diagnostic tests free of cost in public health facilities and accredited satellite centers.',
    targetBeneficiaries: 'All rural citizens, informal daily wage laborers, women, and seniors accessing public satellite centers.',
    eligibilityCriteria: {
      maxIncomeTier: ['Low', 'Medium'],
      allowedAreas: ['Rural', 'Semi-urban'],
      employmentTypes: ['Informal/Daily wages', 'Self-employed', 'Homemaker', 'Unemployed'],
      requiresCard: false
    },
    benefitsProvided: [
      'Free BP checks, hypertension screening, and vital signs measurement',
      'Free or highly subsidized random/fasting blood sugar tests',
      'Basic urine and hemoglobin tests at zero cost'
    ],
    coverageEstimatePercent: 90,
    requiredDocuments: [
      'Any valid Photo ID (Aadhaar, Voter ID, MGNREGA Job Card)',
      'Local residential address proof'
    ],
    officialRegistrationUrl: 'https://nhm.gov.in',
    applicationDeskNotes: 'Available to all walk-in patients at SCCDSC Rural Satellite Hospital without pre-registration.'
  },
  {
    id: 'scheme-state-aarogya',
    name: 'Mukhyamantri Chiranjeevi Swasthya Yojana (State Health Benefit)',
    shortCode: 'STATE-AAROGYA',
    overview: 'State universal health coverage program offering comprehensive cashless medical treatment and preventive screening for resident families.',
    targetBeneficiaries: 'NFSA card holders, small and marginal farmers, contract workers, and registered domestic workers.',
    eligibilityCriteria: {
      maxIncomeTier: ['Low', 'Medium'],
      allowedAreas: ['Urban', 'Semi-urban', 'Rural'],
      employmentTypes: ['Informal/Daily wages', 'Self-employed', 'Homemaker'],
      requiresCard: true
    },
    benefitsProvided: [
      'Free Outpatient Consultation at accredited satellite hospitals',
      'Free routine blood panels including CBC, renal profile, and diabetes screening',
      'Zero co-pay for follow-up medications'
    ],
    coverageEstimatePercent: 85,
    requiredDocuments: [
      'Jan Aadhaar Card / State Resident ID',
      'Aadhaar of the patient',
      'Income Self-Declaration / BPL Ration Card'
    ],
    officialRegistrationUrl: 'https://chiranjeevi.rajasthan.gov.in',
    applicationDeskNotes: 'Verification takes 5 minutes at the SCCDSC registration counter with Jan Aadhaar number.'
  },
  {
    id: 'scheme-janaushadhi',
    name: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
    shortCode: 'PMBJP',
    overview: 'Provides high quality generic medicines and surgical consumables at 50% to 90% cheaper prices than branded market equivalents.',
    targetBeneficiaries: 'Open to all citizens, especially targeted towards chronic diabetes and hypertension maintenance.',
    eligibilityCriteria: {
      maxIncomeTier: ['Low', 'Medium', 'High'],
      allowedAreas: ['Urban', 'Semi-urban', 'Rural'],
      employmentTypes: ['Informal/Daily wages', 'Self-employed', 'Salaried', 'Unemployed', 'Homemaker'],
      requiresCard: false
    },
    benefitsProvided: [
      'Metformin, Glimepiride, Amlodipine, and Paracetamol available at ₹5 - ₹25 per strip',
      'No income proof required — valid doctor prescription is the only requirement'
    ],
    coverageEstimatePercent: 75,
    requiredDocuments: [
      'Doctor Prescription (from SCCDSC Satellite Hospital or registered clinic)'
    ],
    officialRegistrationUrl: 'https://janaushadhi.gov.in',
    applicationDeskNotes: 'Generic medicine counter located directly inside SCCDSC Rural and East hospital lobbies.'
  }
];

// Preset Personas matching the PDF Case Study
export const PRESET_PERSONAS: { name: string; tag: string; description: string; data: UserProfile }[] = [
  {
    name: 'Priya Sharma (PDF Case Study)',
    tag: 'Primary Use Case: Chronic Diabetes Checkup',
    description: '45-year-old rural domestic worker, widow with 2 children, low income, no insurance, basic phone, Hindi preferred, transit barriers.',
    data: {
      fullName: 'Priya Sharma',
      age: 45,
      gender: 'Woman',
      phone: '+91-9876543210',
      email: 'priya@email.com',
      residentialArea: 'Rural',
      state: 'Rajasthan',
      district: 'Jaipur',
      cityOrVillage: 'Ram Nagar',
      hospitalDistanceKm: 12,
      annualIncomeTier: 'Low',
      annualIncomeAmount: 200000,
      healthInsurance: 'No insurance',
      employmentStatus: 'Informal/Daily wages',
      modeOfTravel: 'Public transport (bus/auto)',
      transportAvailability: 'Moderate (available 2-3 times/week)',
      travelTimeMinutes: 25,
      disabilities: 'None',
      currentFeeling: 'Good (no major issues)',
      healthConcerns: ['Regular health checkup needed', 'Family history of diabetes', 'Fatigue in afternoons'],
      symptomOnset: 'Recent weeks',
      digitalLiteracy: 'Low',
      deviceAvailable: 'Basic phone only',
      languages: ['Hindi', 'English'],
      preferredLanguage: 'Hindi',
      identifiedBarriers: ['Cost', 'Transportation', 'Digital access', 'Language', 'Childcare', 'Work schedule'],
      nearbyCyberCafeAvailable: true,
      primaryNeedToday: 'General health checkup & Diabetes screening',
      previousVisit: false,
      preferredHospitalId: 'hosp-rural',
      additionalInfo: 'Widow, 2 school-going children, works morning domestic cleaning shifts. Needs morning or late afternoon slot to avoid losing daily wages.',
      emergencyContact: '+91-9876543211',
      emergencyContactRelation: 'Sister (Sunita)'
    }
  },
  {
    name: 'Ram Lal',
    tag: 'Elderly Farmer with Hypertension',
    description: '62-year-old rural farmer, knee joint mobility issue, infrequent transport, relies on Hindi voice instructions, BPL category.',
    data: {
      fullName: 'Ram Lal Gurjar',
      age: 62,
      gender: 'Man',
      phone: '+91-9812345678',
      email: 'ramlal.village@demo.org',
      residentialArea: 'Rural',
      state: 'Rajasthan',
      district: 'Jaipur',
      cityOrVillage: 'Bassi Rural',
      hospitalDistanceKm: 14,
      annualIncomeTier: 'Low',
      annualIncomeAmount: 140000,
      healthInsurance: 'PM-JAY (Ayushman Bharat)',
      employmentStatus: 'Informal/Daily wages',
      modeOfTravel: 'Public transport (bus/auto)',
      transportAvailability: 'Rare (once a week or less)',
      travelTimeMinutes: 45,
      disabilities: 'Mild osteoarthritis (knee mobility challenge)',
      currentFeeling: 'Mild discomfort',
      healthConcerns: ['Dizziness when standing', 'High blood pressure follow-up', 'Medication refill'],
      symptomOnset: 'Months ago / Chronic',
      digitalLiteracy: 'Low',
      deviceAvailable: 'Basic phone only',
      languages: ['Hindi', 'Rajasthani'],
      preferredLanguage: 'Hindi',
      identifiedBarriers: ['Transportation', 'Distance', 'Cost', 'Digital access'],
      nearbyCyberCafeAvailable: false,
      primaryNeedToday: 'BP Monitoring & Medication Refill',
      previousVisit: true,
      preferredHospitalId: 'hosp-rural',
      additionalInfo: 'Prefers ground floor offline registration desk. Needs ASHA worker escort support.',
      emergencyContact: '+91-9812345600',
      emergencyContactRelation: 'Son (Mukesh)'
    }
  },
  {
    name: 'Sunita Devi',
    tag: 'Semi-Urban Factory Worker & Mother',
    description: '34-year-old semi-urban garment worker, smartphone user, tight work hours, seeking prenatal & anemia blood diagnostics.',
    data: {
      fullName: 'Sunita Devi',
      age: 34,
      gender: 'Woman',
      phone: '+91-9723456789',
      email: 'sunita.d@demo.org',
      residentialArea: 'Semi-urban',
      state: 'Rajasthan',
      district: 'Jaipur',
      cityOrVillage: 'Sanganer Industrial Ward',
      hospitalDistanceKm: 8,
      annualIncomeTier: 'Low',
      annualIncomeAmount: 220000,
      healthInsurance: 'State Government Scheme',
      employmentStatus: 'Informal/Daily wages',
      modeOfTravel: 'Walking / Bicycle',
      transportAvailability: 'Frequent (daily)',
      travelTimeMinutes: 20,
      disabilities: 'None',
      currentFeeling: 'Mild discomfort',
      healthConcerns: ['Fatigue and low iron', 'CBC Blood Test', 'Child nutrition counseling'],
      symptomOnset: 'Recent weeks',
      digitalLiteracy: 'Medium',
      deviceAvailable: 'Smartphone with mobile data',
      languages: ['Hindi', 'English'],
      preferredLanguage: 'Hindi',
      identifiedBarriers: ['Childcare', 'Work schedule', 'Cost'],
      nearbyCyberCafeAvailable: true,
      primaryNeedToday: 'Basic Blood Tests & Consultation',
      previousVisit: false,
      preferredHospitalId: 'hosp-east',
      additionalInfo: 'Works 9 AM to 6 PM. Needs Saturday late afternoon clinic or Sunday morning visit slot.',
      emergencyContact: '+91-9723456700',
      emergencyContactRelation: 'Husband (Dharmendra)'
    }
  }
];

export const INITIAL_ANALYTICS: AccessAnalyticsData = {
  mostCommonBarriers: [
    { barrier: 'Transportation & Frequency', count: 482, percentage: 78 },
    { barrier: 'Direct Cost & Diagnostics Fee', count: 435, percentage: 71 },
    { barrier: 'Digital Access / App Literacy', count: 390, percentage: 63 },
    { barrier: 'Work Schedule / Daily Wage Loss', count: 320, percentage: 52 },
    { barrier: 'Childcare Responsibilities', count: 215, percentage: 35 },
    { barrier: 'Language & Form Comprehension', count: 184, percentage: 30 }
  ],
  serviceDemandByArea: [
    { area: 'Ram Nagar (Rural)', generalCare: 145, diabetes: 110, diagnostics: 85, bpCheck: 160 },
    { area: 'Bassi Cluster (Rural)', generalCare: 120, diabetes: 95, diagnostics: 70, bpCheck: 135 },
    { area: 'Malviya East (Suburban)', generalCare: 190, diabetes: 160, diagnostics: 140, bpCheck: 175 },
    { area: 'Sanganer (Semi-Urban)', generalCare: 165, diabetes: 130, diagnostics: 115, bpCheck: 150 },
    { area: 'Central Ward (Urban)', generalCare: 210, diabetes: 180, diagnostics: 195, bpCheck: 190 }
  ],
  hospitalUtilization: [
    { hospital: 'SCCDSC Rural Satellite Hospital', totalPatients: 642, capacityPercent: 88 },
    { hospital: 'SCCDSC East Suburban Hospital', totalPatients: 815, capacityPercent: 74 },
    { hospital: 'SCCDSC Central City Center', totalPatients: 1120, capacityPercent: 92 }
  ],
  subsidyUtilizationRate: 84.6,
  averageAccessibilityScore: 68.4
};

// Spring Boot REST APIs Specification (for interactive API Explorer)
export const SPRING_BOOT_ENDPOINTS: SpringBootEndpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    description: 'Spring Security JWT token exchange for patients, ASHA workers, and clinic admins.',
    controller: 'AuthController.java',
    requestDto: '{ "phone": "+91-9876543210", "otp": "459201" }',
    responseDto: '{ "token": "eyJhbGciOi...", "role": "ROLE_PATIENT", "expiresIn": 86400 }'
  },
  {
    method: 'POST',
    path: '/api/v1/patients/register',
    description: 'Persists user profile (9 sections) into PostgreSQL with JPA entity validation.',
    controller: 'PatientProfileController.java',
    requestDto: 'PatientRegistrationDto.java',
    responseDto: '{ "patientId": "pt-94821", "status": "ACTIVE", "registeredAt": "2026-09-10T..." }'
  },
  {
    method: 'POST',
    path: '/api/v1/assessment/evaluate',
    description: 'Rule Engine evaluation: barrier detection, accessibility score, and subsidy mapping.',
    controller: 'AssessmentRuleEngineController.java',
    requestDto: 'AssessmentRequestDto.java',
    responseDto: 'AssessmentResultDto.java (AccessibilityScore, DetectedBarriers, Solutions)'
  },
  {
    method: 'GET',
    path: '/api/v1/hospitals/match',
    description: 'Hospital Scoring Engine: multi-factor weighted matching (30% Req, 20% Dist, 20% Cost, 15% Support, 15% Hours).',
    controller: 'HospitalScoringController.java',
    requestDto: 'QueryParams: patientLat, patientLng, needId, incomeTier',
    responseDto: 'List<HospitalScoreDto> sorted by weighted total score'
  },
  {
    method: 'POST',
    path: '/api/v1/rag/policy-query',
    description: 'Spring AI + Vector DB similarity search over government health policies and schemes.',
    controller: 'SpringAiRagController.java',
    requestDto: '{ "query": "Free diabetes test for rural widow without insurance", "topK": 3 }',
    responseDto: '{ "retrievedSchemes": ["PM-JAY", "NHM-FDSI"], "aiSynthesis": "...", "confidence": 0.94 }'
  },
  {
    method: 'POST',
    path: '/api/v1/navigation/generate-plan',
    description: 'Spring AI orchestrated personalized healthcare access plan generation with transit & registration directions.',
    controller: 'PersonalizedPlanController.java',
    requestDto: '{ "patientId": "pt-94821", "hospitalId": "hosp-rural" }',
    responseDto: 'PersonalizedHealthcarePlanDto.java'
  },
  {
    method: 'GET',
    path: '/api/v1/analytics/dashboard',
    description: 'Aggregated analytics for health authorities: barriers, service demand, and subsidy metrics.',
    controller: 'AnalyticsDashboardController.java',
    requestDto: 'QueryParams: dateFrom, dateTo, districtId',
    responseDto: 'AccessAnalyticsResponseDto.java'
  }
];

export const PATHLAB_SERVICES: PathlabServiceItem[] = [
  {
    id: 'path-bp',
    title: 'BP Monitoring',
    category: 'BP Monitoring',
    description: 'Regular checkups, hypertension screening.',
    costRange: 'Free - Rs 100',
    normalCostMin: 0,
    normalCostMax: 100,
    turnAroundTime: 'Instant (5 mins)',
    sampleType: 'Non-invasive Digital Oscillometric Cuff',
    isHomeSampleAvailable: true,
    isOnlineAvailable: false,
    isOfflineWalkIn: true,
    preparationNotes: 'Rest seated for 5 minutes prior to measurement. Avoid caffeine 30 mins before.'
  },
  {
    id: 'path-blood',
    title: 'Blood Tests',
    category: 'Blood Tests',
    description: 'CBC, Diabetes screening, Cholesterol, Liver/Kidney function, COVID testing.',
    costRange: 'Rs 300 - 500',
    normalCostMin: 300,
    normalCostMax: 500,
    turnAroundTime: '2 - 4 Hours',
    sampleType: 'Sterile Venous Whole Blood (EDTA & Serum)',
    isHomeSampleAvailable: true,
    isOnlineAvailable: true,
    isOfflineWalkIn: true,
    preparationNotes: '8-10 hours fasting recommended for Lipid Profile and Glucose test.'
  },
  {
    id: 'path-diabetes',
    title: 'Diabetes Management',
    category: 'Diabetes Management',
    description: 'Fasting glucose, HbA1c, Counseling.',
    costRange: 'Rs 400 - 600',
    normalCostMin: 400,
    normalCostMax: 600,
    turnAroundTime: '3 Hours / Same Day',
    sampleType: 'Blood (Fasting & Post-Prandial) + Diet counseling',
    isHomeSampleAvailable: true,
    isOnlineAvailable: true,
    isOfflineWalkIn: true,
    preparationNotes: 'Requires overnight 8-12 hours fasting for fasting sugar. HbA1c requires no fasting.'
  },
  {
    id: 'path-consultation',
    title: 'Consultation',
    category: 'Consultation',
    description: 'General physicians (Online/Offline).',
    costRange: 'Rs 200 - 500',
    normalCostMin: 200,
    normalCostMax: 500,
    turnAroundTime: 'Same Day Appointment',
    sampleType: 'Clinical Evaluation / Telehealth Call',
    isHomeSampleAvailable: false,
    isOnlineAvailable: true,
    isOfflineWalkIn: true,
    preparationNotes: 'Bring prior prescriptions, lab reports, and government health ID.'
  },
  {
    id: 'path-support',
    title: 'Support',
    category: 'Support',
    description: 'Nurses, Sample collection, Vital signs monitoring.',
    costRange: 'Rs 50 - 150',
    normalCostMin: 50,
    normalCostMax: 150,
    turnAroundTime: 'Immediate Assistance',
    sampleType: 'Trained Phlebotomist & Nurse care',
    isHomeSampleAvailable: true,
    isOnlineAvailable: false,
    isOfflineWalkIn: true,
    preparationNotes: 'Doorstep phlebotomist home visits available for elderly and rural patients.'
  },
  {
    id: 'path-diagnostics',
    title: 'Diagnostics',
    category: 'Diagnostics',
    description: 'Lab testing, ECG, Ultrasound, Digital reports.',
    costRange: 'Rs 500 - 1200',
    normalCostMin: 500,
    normalCostMax: 1200,
    turnAroundTime: 'Same Day (Digital SMS & Print)',
    sampleType: 'Electrophysiological & Sonography Equipment',
    isHomeSampleAvailable: false,
    isOnlineAvailable: true,
    isOfflineWalkIn: true,
    preparationNotes: 'Ultrasound requires drinking water and holding urine; ECG requires no prior fasting.'
  },
  {
    id: 'path-preventive',
    title: 'Preventive Care',
    category: 'Preventive Care',
    description: 'Health education, First aid, Chronic disease management.',
    costRange: 'Free - Rs 100',
    normalCostMin: 0,
    normalCostMax: 100,
    turnAroundTime: 'Drop-in / Weekly Community Workshop',
    sampleType: 'Educational guidance & preventive kit',
    isHomeSampleAvailable: true,
    isOnlineAvailable: true,
    isOfflineWalkIn: true,
    preparationNotes: 'Free group workshops held on Saturday mornings across satellite branches.'
  },
  {
    id: 'path-full-checkup',
    title: 'Full Health Checkup',
    category: 'Checkup',
    description: 'Complete health checkup: CBC + Glucose + ECG + BP + Kidney profile + Physician review.',
    costRange: 'Rs 1500 - 2500',
    normalCostMin: 1500,
    normalCostMax: 2500,
    turnAroundTime: 'Within 24 Hours',
    sampleType: 'Comprehensive Multi-panel Testing',
    isHomeSampleAvailable: true,
    isOnlineAvailable: true,
    isOfflineWalkIn: true,
    preparationNotes: 'Requires 10-12 hours fasting. Includes full comprehensive medical report booklet.'
  }
];

export const CHEMIST_FACILITIES: ChemistFacility[] = [
  {
    id: 'chem-rural',
    name: 'Jan Aushadhi Kendra - Rural Satellite Counter',
    branchType: 'Rural',
    tagline: 'Government PMBJP Subsidized Generic Pharmacy (50% - 85% Discount)',
    address: 'Gate 1, Near Gram Panchayat Bhawan, Ram Nagar Village, Jaipur District',
    openingHours: {
      monSat: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
      emergency: '24/7 (Emergency & Essential Antibiotic Supply)'
    },
    contactPhone: '+91-141-2890124',
    helplinePhone: '1800-180-6001 (Toll Free)',
    subsidyDiscountText: '50% to 85% off branded MRP. Free essential drugs under PM-JAY & State BPL.',
    features: [
      'Jan Aushadhi Generic Medicines at factory price',
      'Zero smartphone required — Offline prescription counter',
      'Free blood sugar test strip & BP check with medicine purchase',
      'Direct billing under Ayushman Bharat (PM-JAY)',
      'Local vernacular ASHA chemist assistant available'
    ],
    bookingMode: 'Walk-in & Offline Token'
  },
  {
    id: 'chem-east',
    name: 'Jan Aushadhi & Wellness Chemist - East Suburban Branch',
    branchType: 'East',
    tagline: 'Suburban Generic Dispensary with Mixed Phone & Walk-in Refills',
    address: 'Ground Floor, Sector 8 Malviya East Extension, Near Ring Road, Jaipur',
    openingHours: {
      monSat: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
      emergency: '24/7 (Ambulance Medicine Depository)'
    },
    contactPhone: '+91-141-2556790',
    helplinePhone: '1800-180-6002 (Toll Free)',
    subsidyDiscountText: 'Up to 80% discount on cardiovascular, hypertension & insulin generics.',
    features: [
      'Prescription reservation via SMS / WhatsApp / Phone call',
      'Monthly chronic medicine refill reminders',
      'Full stock of Metformin, Glimepiride, Amlodipine & Telmisartan',
      'Home delivery available within 5 km radius'
    ],
    bookingMode: 'Mixed Phone / Walk-in'
  },
  {
    id: 'chem-central',
    name: 'Central Enclave Government 24/7 Chemist & Drug Bank',
    branchType: 'Central',
    tagline: 'Tertiary-Grade Comprehensive 24-Hour Medical Store',
    address: 'Medical Enclave, Central Avenue, Station Road, Jaipur',
    openingHours: {
      monSat: '8:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
      emergency: '24/7 (Full round-the-clock emergency pharmacy)'
    },
    contactPhone: '+91-141-2223345',
    helplinePhone: '1800-180-6003 (Toll Free)',
    subsidyDiscountText: 'Official Central Government CGHS & PM-JAY rate contracts applied.',
    features: [
      'Digital e-prescription instant fulfillment',
      'Cold-chain storage for Insulin, Vaccines, and Biologics',
      'Online appointment order & express pickup counter',
      'Dedicated counseling desk for elderly medication compliance'
    ],
    bookingMode: 'Online & 24/7 Counter'
  }
];
