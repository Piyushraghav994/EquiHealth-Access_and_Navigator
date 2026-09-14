import { 
  UserProfile, 
  SatelliteHospital, 
  HospitalScoreBreakdown, 
  BarrierSolution, 
  CostBreakdownResult, 
  PersonalizedHealthcarePlan, 
  GovernmentPolicyScheme 
} from '../types';
import { SATELLITE_HOSPITALS, SCCDSC_SERVICES, GOVERNMENT_SCHEMES } from '../data/mockData';

/**
 * Calculates the overall Accessibility Score (0 - 100).
 * Lower score = higher vulnerability / more severe barriers.
 */
export function calculateAccessibilityScore(user: UserProfile): number {
  let score = 100;

  // Barrier impact deduction
  score -= user.identifiedBarriers.length * 7;

  // Financial impact
  if (user.annualIncomeTier === 'Low') score -= 14;
  else if (user.annualIncomeTier === 'Medium') score -= 5;

  if (user.healthInsurance === 'No insurance') score -= 12;
  if (user.employmentStatus === 'Informal/Daily wages') score -= 8;

  // Transport impact
  if (user.transportAvailability === 'Rare (once a week or less)') score -= 12;
  else if (user.transportAvailability === 'Moderate (available 2-3 times/week)') score -= 6;

  if (user.hospitalDistanceKm > 25) score -= 12;
  else if (user.hospitalDistanceKm > 10) score -= 6;

  // Digital Literacy impact
  if (user.digitalLiteracy === 'Low') score -= 10;
  if (user.deviceAvailable === 'Basic phone only') score -= 6;

  // Language factor
  if (user.preferredLanguage !== 'English' && user.preferredLanguage !== 'Hindi') score -= 4;

  // Keep score within bounds
  return Math.max(18, Math.min(98, score));
}

/**
 * Barrier-to-Solution Engine: transforms barriers into actionable, localized steps.
 */
export function generateBarrierSolutions(user: UserProfile): BarrierSolution[] {
  const solutions: BarrierSolution[] = [];

  user.identifiedBarriers.forEach((barrier) => {
    switch (barrier) {
      case 'Cost':
        solutions.push({
          barrier: 'Cost',
          severity: user.annualIncomeTier === 'Low' ? 'High' : 'Medium',
          problemSummary: 'High out-of-pocket medical and diagnostics expenses without private insurance coverage.',
          actionableSolution: 'Access 100% subsidized diagnostics via NHM-FDSI and AB PM-JAY on-site verification. Pick generic prescriptions from the internal Jan Aushadhi generic counter (up to 85% cheaper).',
          supportResources: [
            'AB PM-JAY Empaneled Desk at SCCDSC Gate 1',
            'Jan Aushadhi Generic Pharmacy (in hospital lobby)',
            'National Health Mission Free BP & Sugar testing'
          ],
          facilityContactAction: 'Visit Ayushman Mitra counter before consulting doctor'
        });
        break;

      case 'Transportation':
        solutions.push({
          barrier: 'Transportation',
          severity: user.transportAvailability === 'Rare (once a week or less)' ? 'High' : 'Medium',
          problemSummary: `Infrequent public transit options; user relies on public bus/auto with ${user.travelTimeMinutes} mins travel time.`,
          actionableSolution: 'Take Route 14 Bus (Jaipur-Ram Nagar) running every 45 mins. Alternatively, request Gram Panchayat community shared health vehicle operating Tuesday & Thursday mornings.',
          supportResources: [
            'Route 14 Bus schedule: 7:30 AM, 8:15 AM, 9:00 AM, 11:30 AM, 3:00 PM',
            'Local Gramin shared auto pool at Ram Nagar crossroads',
            'Subsidized ambulance voucher for elderly/pregnant visitors'
          ],
          facilityContactAction: 'Call Satellite Hospital Helpline (1800-180-6001) for bus arrival alerts'
        });
        break;

      case 'Digital access':
        solutions.push({
          barrier: 'Digital access',
          severity: user.digitalLiteracy === 'Low' ? 'High' : 'Medium',
          problemSummary: `Low digital literacy & basic feature phone without mobile internet browser capability.`,
          actionableSolution: 'No internet or smartphone required! Walk into SCCDSC Rural Satellite Hospital offline registration desk. Physical tokens issued instantly. SMS confirmation sent to basic feature phone.',
          supportResources: [
            'Offline walk-in registration counter #1 (Open 8:00 AM - 8:00 PM)',
            'Nearby Gram Panchayat e-Mitra / CyberCafe in Ram Nagar village',
            'Toll-free IVR automated phone appointment booking (1800-180-6001)'
          ],
          facilityContactAction: 'Direct walk-in allowed without pre-booking'
        });
        break;

      case 'Language':
        solutions.push({
          barrier: 'Language',
          severity: 'Medium',
          problemSummary: `Prefers ${user.preferredLanguage} language communication over English medical jargon.`,
          actionableSolution: `Clinical consultation and registration are fully provided in ${user.preferredLanguage} and local dialect. Pictographic medicine intake cards and Hindi prescription explanations provided by nursing staff.`,
          supportResources: [
            'Dedicated bilingual ASHA health counselors',
            'Prescription labels printed in Devanagari Hindi with color dose codes',
            'Audio narration of patient care plan available'
          ],
          facilityContactAction: 'Ask for Hindi/Regional language ASHA facilitator at reception'
        });
        break;

      case 'Childcare':
        solutions.push({
          barrier: 'Childcare',
          severity: 'Medium',
          problemSummary: 'Sole caregiver for children; unable to leave children unattended during hospital visits.',
          actionableSolution: 'SCCDSC Rural Satellite Hospital has a supervised children play and waiting corner in the central reception. Children can safely accompany mother during routine checkup.',
          supportResources: [
            'Creche / waiting room with ASHA volunteer supervision',
            'Fast-track mother-and-child token lane',
            'Drinking water and clean washrooms on ground floor'
          ],
          facilityContactAction: 'Request family token at reception desk'
        });
        break;

      case 'Work schedule':
        solutions.push({
          barrier: 'Work schedule',
          severity: user.employmentStatus === 'Informal/Daily wages' ? 'High' : 'Medium',
          problemSummary: 'Risk of losing daily wages if forced to queue during morning peak working hours.',
          actionableSolution: 'Take advantage of extended operating hours: Evening clinic opens till 8:00 PM (Mon-Sat), or attend the Sunday morning shift (10:00 AM - 6:00 PM). Average wait time in evening is under 20 minutes.',
          supportResources: [
            'Twilight shift: 5:00 PM - 8:00 PM (Doctor on duty)',
            'Sunday weekend clinic: 10:00 AM - 2:00 PM (No wage loss)',
            'Fast-track token for daily wage workers with employment ID'
          ],
          facilityContactAction: 'Book or walk in after 5:30 PM shift'
        });
        break;

      case 'Distance':
        solutions.push({
          barrier: 'Distance',
          severity: user.hospitalDistanceKm > 20 ? 'High' : 'Medium',
          problemSummary: `Patient resides ${user.hospitalDistanceKm} km from advanced tertiary facilities.`,
          actionableSolution: 'Route directly to the nearest Rural Satellite Hospital (10-12 km) for initial screening and basic blood lab rather than travelling 38 km to City Center.',
          supportResources: [
            'Rural satellite outpost handles 80% of primary care needs',
            'Free sample collection transport to Central lab if advanced test needed',
            'Tele-medicine link with Central specialists on site'
          ],
          facilityContactAction: 'Start at rural outpost to save commute cost'
        });
        break;
    }
  });

  return solutions;
}

/**
 * Hospital Scoring Engine: Evaluates facilities based on the exact weights from PDF Page 6:
 * - Requirement Match: 30%
 * - Distance: 20%
 * - Cost / Subsidies: 20%
 * - Accessibility & Facility Support: 15%
 * - Operational Hours: 15%
 */
export function evaluateHospitalScoring(user: UserProfile): HospitalScoreBreakdown[] {
  return SATELLITE_HOSPITALS.map((hospital) => {
    // 1. Requirement Match Score (0 - 100, weight: 30%)
    let reqScore = 75;
    const needLower = user.primaryNeedToday.toLowerCase();
    
    if (hospital.locationType === 'Rural') {
      // Rural is great for checkups, BP, diabetes basic, consultation
      if (needLower.includes('checkup') || needLower.includes('bp') || needLower.includes('diabetes') || needLower.includes('consultation')) {
        reqScore = 95;
      } else if (needLower.includes('advanced') || needLower.includes('ultrasound') || needLower.includes('icu')) {
        reqScore = 60;
      }
    } else if (hospital.locationType === 'East') {
      reqScore = 90;
    } else if (hospital.locationType === 'Central') {
      reqScore = 100; // Has everything
    }

    // 2. Distance Score (0 - 100, weight: 20%)
    let distScore = 100;
    const effectiveDistance = hospital.locationType === 'Rural' ? user.hospitalDistanceKm : (hospital.locationType === 'East' ? user.hospitalDistanceKm + 12 : user.hospitalDistanceKm + 26);
    if (effectiveDistance <= 12) {
      distScore = 95;
    } else if (effectiveDistance <= 25) {
      distScore = 72;
    } else if (effectiveDistance <= 40) {
      distScore = 48;
    } else {
      distScore = 25;
    }

    // 3. Cost Score (0 - 100, weight: 20%)
    let costScore = 80;
    if (hospital.locationType === 'Rural') {
      costScore = 98; // Highest subsidy rate & lowest baseline costs
    } else if (hospital.locationType === 'East') {
      costScore = 78;
    } else {
      costScore = 55; // Higher registration & private consult brackets
    }

    // 4. Accessibility & Facility Support Score (0 - 100, weight: 15%)
    let accessScore = 80;
    if (user.digitalLiteracy === 'Low' || user.deviceAvailable === 'Basic phone only') {
      if (hospital.bookingMode === 'Offline desk only') {
        accessScore = 100; // Perfect for offline patients
      } else if (hospital.bookingMode === 'Mixed online/offline') {
        accessScore = 82;
      } else {
        accessScore = 45; // Requires online booking which is hostile to low literacy
      }
    } else {
      accessScore = 90;
    }

    // 5. Operational Hours Score (0 - 100, weight: 15%)
    let hoursScore = 88;
    if (hospital.locationType === 'Central') {
      hoursScore = 95; // 24/7 ICU & trauma
    } else if (hospital.locationType === 'East') {
      hoursScore = 90;
    } else {
      hoursScore = 85; // Mon-Sat 8AM-8PM, Sun 10AM-6PM, 24/7 basic emergency
    }

    // Total Weighted Score: (Req*0.30) + (Dist*0.20) + (Cost*0.20) + (Access*0.15) + (Hours*0.15)
    const totalScore = Math.round(
      (reqScore * 0.30) +
      (distScore * 0.20) +
      (costScore * 0.20) +
      (accessScore * 0.15) +
      (hoursScore * 0.15)
    );

    let recommendationReason = '';
    const advantages: string[] = [];
    const drawbacks: string[] = [];

    if (hospital.locationType === 'Rural') {
      recommendationReason = 'Optimal match for low-barrier community care: closest distance, on-site offline registration, zero smartphone barrier, and direct PM-JAY/BPL subsidy processing.';
      advantages.push('Closest distance (~10 km) minimizing transit fare & travel fatigue');
      advantages.push('Walk-in offline registration desk with local language ASHA guide');
      advantages.push('Subsidized Jan Aushadhi generic dispensary on site');
      advantages.push('Dedicated children play & waiting area for caregiving mothers');
      drawbacks.push('Advanced radiologic imaging (CT/MRI) requires referral to Central branch');
    } else if (hospital.locationType === 'East') {
      recommendationReason = 'Equipped suburban facility suitable if specialized blood profiling or ultrasound is required and patient can travel ~24 km.';
      advantages.push('Modern diagnostic lab including digital ECG and ultrasound');
      advantages.push('Evening clinic slots open till 8:00 PM for working adults');
      advantages.push('Mixed token kiosk & walk-in desk');
      drawbacks.push('Higher public transit fare (₹40-₹60) and 45 mins commute');
    } else {
      recommendationReason = 'Advanced tertiary medical center with full specialist departments and 24/7 trauma care, but highest travel distance and online booking requirement.';
      advantages.push('Specialist physician consultations and comprehensive diagnostics');
      advantages.push('24/7 comprehensive emergency, trauma, and ICU infrastructure');
      drawbacks.push('Strict online booking portal can be challenging for low digital literacy users');
      drawbacks.push('Longest travel distance (~38 km) and higher out-of-pocket costs');
    }

    return {
      hospital,
      totalScore,
      requirementMatchScore: reqScore,
      distanceScore: distScore,
      costScore: costScore,
      accessibilityScore: accessScore,
      operationalHoursScore: hoursScore,
      recommendationReason,
      comparativeAdvantages: advantages,
      potentialDrawbacks: drawbacks
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
}

/**
 * Calculates financial breakdown and government subsidy (Page 10, 12):
 * Standard Cost (₹X) - Gov Benefit (₹Y) = Estimated Net Payable (₹Z)
 */
export function calculateCostBreakdown(user: UserProfile, recommendedHospital: SatelliteHospital): CostBreakdownResult {
  let normalCost = 650;
  let serviceName = 'General Consultation & Routine Diagnostics';

  const need = user.primaryNeedToday.toLowerCase();
  if (need.includes('diabetes')) {
    serviceName = 'Doctor Consultation + Fasting Glucose + HbA1c + BP Screening';
    normalCost = 750; // Doctor (₹250) + Diabetes screening (₹500)
  } else if (need.includes('checkup') || need.includes('full')) {
    serviceName = 'General Health Checkup & Basic Diagnostics Package';
    normalCost = 600;
  } else if (need.includes('bp') || need.includes('hypertension')) {
    serviceName = 'Blood Pressure Monitoring & Physician Review';
    normalCost = 350;
  }

  // Determine government subsidy
  let subsidy = 0;
  let appliedScheme = 'None';
  let notes = 'Standard fee structure applicable.';

  if (user.annualIncomeTier === 'Low' || user.employmentStatus === 'Informal/Daily wages' || user.healthInsurance === 'PM-JAY (Ayushman Bharat)') {
    if (recommendedHospital.locationType === 'Rural') {
      // Near 100% subsidy under NHM and PM-JAY
      subsidy = Math.round(normalCost * 0.90);
      appliedScheme = 'AB PM-JAY & NHM Free Diagnostic Initiative';
      notes = 'Doctor consultation and essential tests 100% waived; nominal token fee of ₹0 - ₹50 at registration.';
    } else {
      subsidy = Math.round(normalCost * 0.70);
      appliedScheme = 'State Arogya Health Subsidy';
      notes = 'Partial subsidy verified through Jan Aadhaar / BPL card.';
    }
  } else if (user.annualIncomeTier === 'Medium') {
    subsidy = Math.round(normalCost * 0.45);
    appliedScheme = 'Jan Aushadhi & Public Diagnostic Concession';
    notes = 'Discounted diagnostics and generic medicine pricing applied.';
  }

  const netEstimatedPayable = Math.max(0, normalCost - subsidy);

  return {
    serviceName,
    normalCost,
    governmentBenefitSubsidized: subsidy,
    netEstimatedPayable,
    appliedSchemeName: appliedScheme,
    notes
  };
}

/**
 * Emergency Safety Layer: Checks for urgent warning symptoms.
 */
export function evaluateEmergencySafety(user: UserProfile): { isEmergency: boolean; urgencyLevel: 'None' | 'Moderate' | 'Critical'; message: string; actionRequired: string } {
  const urgentKeywords = ['chest pain', 'severe breath', 'unconscious', 'paralysis', 'stroke', 'bleeding', 'high fever with confusion', 'severe'];
  const concerns = user.healthConcerns.join(' ').toLowerCase();
  const feeling = user.currentFeeling.toLowerCase();

  if (feeling.includes('severe') || urgentKeywords.some(kw => concerns.includes(kw))) {
    return {
      isEmergency: true,
      urgencyLevel: 'Critical',
      message: 'Urgent red-flag symptoms detected. Do not wait for standard outpatient routine appointment.',
      actionRequired: 'Immediately call National Emergency Ambulance 108 or proceed to 24/7 Emergency Casualty at SCCDSC Satellite Hospital.'
    };
  }

  if (feeling.includes('moderate')) {
    return {
      isEmergency: false,
      urgencyLevel: 'Moderate',
      message: 'Active symptoms present. Recommended to visit clinic within the next 24-48 hours.',
      actionRequired: 'Follow the generated navigation plan to attend the nearest morning or twilight outpatient slot.'
    };
  }

  return {
    isEmergency: false,
    urgencyLevel: 'None',
    message: 'Routine health screening & preventive checkup pathway.',
    actionRequired: 'Proceed with scheduled visit during standard operating hours.'
  };
}

/**
 * Generates the Complete Personalized Healthcare Access Plan.
 */
export function generateHealthcarePlan(user: UserProfile): PersonalizedHealthcarePlan {
  const scoredHospitals = evaluateHospitalScoring(user);
  const recommendedBreakdown = scoredHospitals[0];
  const recommendedHospital = recommendedBreakdown.hospital;
  const accessibilityScore = calculateAccessibilityScore(user);
  const detectedBarriers = generateBarrierSolutions(user);
  const costBreakdown = calculateCostBreakdown(user, recommendedHospital);
  const emergencyWarning = evaluateEmergencySafety(user);

  // Match official schemes
  const matchedSchemes = GOVERNMENT_SCHEMES.filter(scheme => {
    return scheme.eligibilityCriteria.maxIncomeTier.includes(user.annualIncomeTier) &&
      scheme.eligibilityCriteria.allowedAreas.includes(user.residentialArea);
  });

  // Transit guidance
  let recommendedMode = user.modeOfTravel;
  let estimatedFare = '₹15 - ₹30 (One way)';
  let transitTime = `${user.travelTimeMinutes} - ${user.travelTimeMinutes + 10} minutes`;
  const stepByStepRoute = [
    `Start from your home in ${user.cityOrVillage || 'village location'}, ${user.district || 'Jaipur'}.`,
    `Proceed to the nearest local bus stop or shared auto stand (approx 5-10 mins walk).`,
    `Board Route 14 Bus (or shared tempo #3B heading towards ${recommendedHospital.name.replace('SCCDSC Satellite Hospital - ', '')}).`,
    `Disembark at "${recommendedHospital.address.split(',')[0]}". The hospital entrance is 50 meters ahead on the left.`,
    `Enter through Gate 1 and proceed straight to the Offline Registration Desk.`
  ];

  if (user.modeOfTravel.includes('Walking')) {
    estimatedFare = '₹0 (Free)';
    transitTime = `${user.travelTimeMinutes} minutes`;
  } else if (user.modeOfTravel.includes('Two-wheeler')) {
    estimatedFare = '₹40 - ₹60 (Fuel)';
    transitTime = `${Math.round(user.travelTimeMinutes * 0.7)} minutes`;
  }

  // Required documents (PDF Page 11)
  const requiredDocuments = [
    {
      docName: 'Government Photo ID Proof (Aadhaar Card or Voter ID)',
      purpose: 'Identity verification & hospital registration record',
      mandatory: true
    },
    {
      docName: 'Address Proof (Ration Card, Electricity bill or Jan Aadhaar)',
      purpose: 'Verification of rural/suburban residential tier for local government concessions',
      mandatory: true
    },
    {
      docName: 'Income Certificate / BPL Ration Card / NFSA Card',
      purpose: 'Waiving doctor consultation and diagnostic testing charges under NHM/PM-JAY',
      mandatory: user.annualIncomeTier === 'Low'
    },
    {
      docName: 'Previous Prescriptions or Medicine Strips (if any)',
      purpose: 'Allows attending doctor to review current medications and adjust dosage safely',
      mandatory: false
    }
  ];

  // Action plan instructions (PDF Page 12)
  const stepByStepInstructions = [
    'Step 1: Collect your documents (Aadhaar Card, BPL/Ration Card, and any previous health papers) in a small bag.',
    `Step 2: Visit ${recommendedHospital.name} during open hours (Mon-Sat 8:00 AM - 8:00 PM or Sun 10:00 AM - 6:00 PM).`,
    'Step 3: Proceed directly to Gate 1 Offline Registration Counter. Show this access plan or mention your name.',
    'Step 4: Request the primary checkup at the counter and state: "I need regular diabetes and health screening under NHM/Government scheme".',
    'Step 5: Verify scheme benefits at the Ayushman Mitra desk to ensure your consultation and test fees are waived.',
    'Step 6: Visit the on-site Jan Aushadhi generic pharmacy before leaving if any medicines are prescribed to receive subsidized rates.'
  ];

  return {
    planId: `EQH-${Date.now().toString(36).toUpperCase()}`,
    generatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    user,
    recommendedHospital,
    scoringBreakdown: recommendedBreakdown,
    accessibilityScore,
    detectedBarriers,
    matchedSchemes,
    costBreakdown,
    transportGuidance: {
      recommendedMode,
      estimatedFare,
      transitTime,
      stepByStepRoute
    },
    requiredDocuments,
    stepByStepInstructions,
    emergencyWarning
  };
}
