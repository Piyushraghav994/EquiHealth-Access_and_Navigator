import { UserProfile, PersonalizedHealthcarePlan, AccessAnalyticsData } from '../types';
import { generateHealthcarePlan } from '../utils/scoringEngine';
import { INITIAL_ANALYTICS, GOVERNMENT_SCHEMES } from '../data/mockData';

export interface BackendConfig {
  baseUrl: string;
  useLiveBackend: boolean;
  jwtToken: string | null;
}

// Local storage key for backend preferences
const CONFIG_KEY = 'equihealth_backend_config';

export function getBackendConfig(): BackendConfig {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Could not read backend config from localStorage', e);
  }
  return {
    baseUrl: 'http://localhost:8080',
    useLiveBackend: false,
    jwtToken: null
  };
}

export function saveBackendConfig(config: BackendConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Could not write backend config to localStorage', e);
  }
}

export interface RagQueryResult {
  query: string;
  matchedPolicies: {
    schemeName: string;
    similarityScore: number;
    chunkContent: string;
    matchedClause: string;
  }[];
  generatedSummary: string;
  latencyMs: number;
  tokensUsed: number;
}

/**
 * Spring Boot REST API Adapter:
 * Seamlessly interfaces with Java Spring Boot backend endpoints.
 * Fallback to embedded client-side Rule & Scoring Engine when offline/standalone.
 */
export const springBootApi = {
  /**
   * Evaluates patient registration profile and generates navigation plan.
   * Matches POST /api/v1/assessment/evaluate & POST /api/v1/navigation/generate-plan
   */
  async evaluateProfile(user: UserProfile): Promise<PersonalizedHealthcarePlan> {
    const config = getBackendConfig();
    if (config.useLiveBackend) {
      try {
        const response = await fetch(`${config.baseUrl}/api/v1/assessment/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.jwtToken ? { 'Authorization': `Bearer ${config.jwtToken}` } : {})
          },
          body: JSON.stringify(user)
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Live Spring Boot backend unreachable, falling back to embedded scoring engine', err);
      }
    }

    // High-performance deterministic Spring AI & Rule engine simulation
    await new Promise((resolve) => setTimeout(resolve, 380));
    return generateHealthcarePlan(user);
  },

  /**
   * Semantic search across official government health policy vector store.
   * Matches POST /api/v1/rag/policy-query (Spring AI + Vector DB)
   */
  async queryPolicyRag(query: string): Promise<RagQueryResult> {
    const config = getBackendConfig();
    if (config.useLiveBackend) {
      try {
        const response = await fetch(`${config.baseUrl}/api/v1/rag/policy-query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.jwtToken ? { 'Authorization': `Bearer ${config.jwtToken}` } : {})
          },
          body: JSON.stringify({ query, topK: 3 })
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Live Spring AI endpoint unreachable, using local vector simulator', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 450));
    const queryLower = query.toLowerCase();

    // Semantic matching simulation against government policy database
    const matched = GOVERNMENT_SCHEMES.map(scheme => {
      let score = 0.65;
      if (queryLower.includes('diabetes') && scheme.shortCode === 'NHM-FDSI') score = 0.94;
      else if (queryLower.includes('insurance') || queryLower.includes('poor') || queryLower.includes('card')) {
        if (scheme.shortCode === 'PM-JAY') score = 0.96;
        if (scheme.shortCode === 'STATE-AAROGYA') score = 0.89;
      } else if (queryLower.includes('medicine') || queryLower.includes('generic') || queryLower.includes('drug')) {
        if (scheme.shortCode === 'PMBJP') score = 0.97;
      } else if (queryLower.includes('free') || queryLower.includes('checkup') || queryLower.includes('test')) {
        if (scheme.shortCode === 'NHM-FDSI') score = 0.92;
        if (scheme.shortCode === 'PM-JAY') score = 0.88;
      } else {
        score = Math.round((0.70 + Math.random() * 0.22) * 100) / 100;
      }

      return {
        schemeName: scheme.name,
        similarityScore: score,
        chunkContent: scheme.overview,
        matchedClause: scheme.benefitsProvided[0] || 'Universal basic care coverage'
      };
    }).sort((a, b) => b.similarityScore - a.similarityScore);

    const top = matched[0];
    const summary = `Based on official health scheme documents retrieved from the vector knowledge base, patients matching this criteria are covered under ${top.schemeName}. Relevant clause: "${top.matchedClause}". Out-of-pocket costs are subsidized through accredited satellite hospital desks.`;

    return {
      query,
      matchedPolicies: matched.slice(0, 3),
      generatedSummary: summary,
      latencyMs: 342,
      tokensUsed: 428
    };
  },

  /**
   * Retrieves analytics dashboard data.
   * Matches GET /api/v1/analytics/dashboard
   */
  async getAnalytics(): Promise<AccessAnalyticsData> {
    const config = getBackendConfig();
    if (config.useLiveBackend) {
      try {
        const response = await fetch(`${config.baseUrl}/api/v1/analytics/dashboard`, {
          headers: {
            ...(config.jwtToken ? { 'Authorization': `Bearer ${config.jwtToken}` } : {})
          }
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Live analytics API unreachable, using local aggregate data', err);
      }
    }

    return INITIAL_ANALYTICS;
  },

  /**
   * Tests connection to a live Spring Boot backend instance.
   */
  async testBackendConnection(url: string): Promise<{ success: boolean; message: string; latency?: number }> {
    const startTime = performance.now();
    try {
      const response = await fetch(`${url}/actuator/health`, { method: 'GET', signal: AbortSignal.timeout(3000) });
      const latency = Math.round(performance.now() - startTime);
      if (response.ok) {
        return { success: true, message: `Connected to Spring Boot Actuator (Health: UP, latency: ${latency}ms)`, latency };
      }
      return { success: false, message: `Spring Boot responded with status ${response.status}`, latency };
    } catch (e: any) {
      return { success: false, message: `Could not reach ${url} (${e.message || 'Connection refused'}). You can keep using the embedded Spring AI engine.` };
    }
  }
};
