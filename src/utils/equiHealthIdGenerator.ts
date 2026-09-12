/**
 * EquiHealth ID Generator
 * Generates unique, non-sequential alphanumeric IDs in the format EQH-XXXX-XXXX
 * for the EquiHealth Navigator frontend prototype.
 */

const STORAGE_USERS_KEY = 'equihealth_users';
const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Generate a random 4-character alphanumeric segment
 */
function generateSegment(length: number = 4): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    result += CHARACTERS[randomIndex];
  }
  return result;
}

/**
 * Retrieves all currently saved EquiHealth IDs from localStorage
 */
export function getExistingEquiHealthIds(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_USERS_KEY);
    if (!data) return [];
    const users = JSON.parse(data);
    if (Array.isArray(users)) {
      return users.map((u: any) => u.equiHealthId).filter(Boolean);
    }
  } catch (err) {
    console.warn('Could not read existing EquiHealth IDs from localStorage', err);
  }
  return [];
}

/**
 * Generates a unique EquiHealth ID with uniqueness check against localStorage.
 * Format: EQH-XXXX-XXXX (e.g. EQH-7K42-91M8)
 * 
 * @param existingIds Optional array of existing IDs to check against
 * @returns Unique EquiHealth ID string
 */
export function generateEquiHealthId(existingIds?: string[]): string {
  const idsToCheck = existingIds || getExistingEquiHealthIds();
  const existingSet = new Set(idsToCheck.map(id => id.toUpperCase()));

  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    attempts++;
    const seg1 = generateSegment(4);
    const seg2 = generateSegment(4);
    const candidateId = `EQH-${seg1}-${seg2}`;

    if (!existingSet.has(candidateId)) {
      return candidateId;
    }
  }

  // Fallback with timestamp salt in case of high density
  const timestampSuffix = Date.now().toString(36).slice(-4).toUpperCase();
  return `EQH-${generateSegment(4)}-${timestampSuffix}`;
}
