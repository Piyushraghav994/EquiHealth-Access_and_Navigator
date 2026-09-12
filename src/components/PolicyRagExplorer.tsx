import React, { useState } from 'react';
import { GOVERNMENT_SCHEMES } from '../data/mockData';
import { springBootApi, RagQueryResult } from '../services/springBootApi';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Database, 
  Layers, 
  FileText, 
  CheckCircle, 
  ExternalLink, 
  Cpu, 
  ArrowRight,
  Clock,
  Zap
} from 'lucide-react';

interface PolicyRagExplorerProps {
  language: 'en' | 'hi';
}

export const PolicyRagExplorer: React.FC<PolicyRagExplorerProps> = ({ language }) => {
  const [query, setQuery] = useState('Free diabetes screening and BP monitoring for rural domestic worker without health insurance');
  const [isLoading, setIsLoading] = useState(false);
  const [ragResult, setRagResult] = useState<RagQueryResult | null>(null);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('scheme-pmjay');

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const res = await springBootApi.queryPolicyRag(searchQuery);
      setRagResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQueries = [
    'Free diabetes screening for rural widow without health insurance',
    'How can daily wage laborers get subsidized blood tests and medicines?',
    'What documents required for Ayushman Bharat on-site verification?',
    'Jan Aushadhi generic medicine cost difference vs market brands'
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                {language === 'hi' ? '5. सरकारी योजना RAG नॉलेज बेस' : '5. Government Policy RAG Architecture'}
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200 rounded">
                Spring AI + Vector DB
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'hi'
                ? 'आधिकारिक सरकारी नीतियों और योजनाओं का वेक्टर डेटाबेस और रिट्रीवल संवर्धित जेनरेशन'
                : 'Retrieval-Augmented Generation pipeline over official public health guidelines, subsidies, and eligibility rules.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Database className="w-3.5 h-3.5 text-teal-600" />
          <span>Vector Store: <strong>pgvector / Hibernate Search</strong></span>
        </div>
      </div>

      {/* RAG Architecture Flow Visualization (From PDF Page 7) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            End-to-End Spring AI RAG Pipeline (PDF Section 5)
          </span>
          <span className="text-[11px] text-slate-400">
            Zero Retraining Needed When Policies Update
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">Step 1</span>
            <FileText className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="font-semibold text-slate-200 block text-[11px]">Govt Policies</span>
            <span className="text-[9px] text-slate-400">PDF & Gazettes</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">Step 2</span>
            <Cpu className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="font-semibold text-slate-200 block text-[11px]">Text Extraction</span>
            <span className="text-[9px] text-slate-400">Tika / PDFBox</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">Step 3</span>
            <Layers className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="font-semibold text-slate-200 block text-[11px]">Chunking</span>
            <span className="text-[9px] text-slate-400">512 Tokens Overlap</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">Step 4</span>
            <Zap className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="font-semibold text-slate-200 block text-[11px]">Embeddings</span>
            <span className="text-[9px] text-slate-400">OpenAI / Gemini Embed</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">Step 5</span>
            <Database className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="font-semibold text-slate-200 block text-[11px]">Vector Database</span>
            <span className="text-[9px] text-slate-400">Cosine Similarity</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">Step 6</span>
            <Search className="w-5 h-5 mx-auto mb-1 text-slate-300" />
            <span className="font-semibold text-slate-200 block text-[11px]">RAG Retrieval</span>
            <span className="text-[9px] text-slate-400">Spring AI Top-K</span>
          </div>

          <div className="p-2.5 rounded-xl bg-teal-900/60 border border-teal-600 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-teal-300 font-bold block mb-1">Step 7</span>
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-teal-300" />
            <span className="font-semibold text-teal-100 block text-[11px]">AI Synthesis</span>
            <span className="text-[9px] text-teal-200">Personalized Plan</span>
          </div>
        </div>
      </div>

      {/* Interactive Semantic Search Console */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-teal-600" />
            Semantic Search Across Health Policies
          </h3>
          <span className="text-xs text-slate-400">Simulates Spring AI Vector Store Query</span>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about health schemes, eligibility, free tests..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-9"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <button
            onClick={() => handleSearch(query)}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            {isLoading ? <Clock className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Query RAG</span>
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px]">Try asking:</span>
          {sampleQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(sq);
                handleSearch(sq);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-[11px] text-slate-600 border border-slate-200 transition-colors"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* RAG Query Output */}
        {ragResult && (
          <div className="mt-4 p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-teal-900 border-b border-teal-200/80 pb-2">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Spring AI Synthesis
              </span>
              <span className="text-[11px] text-teal-700">
                Latency: {ragResult.latencyMs}ms | Tokens: {ragResult.tokensUsed}
              </span>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {ragResult.generatedSummary}
            </p>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Top Retrieved Vector Chunks:
              </span>
              <div className="space-y-2">
                {ragResult.matchedPolicies.map((chunk, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-lg bg-white border border-teal-200/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-teal-900">{chunk.schemeName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Cosine Similarity: {(chunk.similarityScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-normal">{chunk.chunkContent}</p>
                    <p className="text-teal-800 text-[11px] mt-1 font-medium">
                      Matched Benefit: {chunk.matchedClause}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Health Scheme Catalog (Vector Knowledge Base) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Pre-Loaded Government Health Schemes Knowledge Base
          </h3>
          <p className="text-xs text-slate-500">
            Embedded into Spring AI Vector Database for zero out-of-pocket navigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNMENT_SCHEMES.map(scheme => (
            <div key={scheme.id} className="p-4 rounded-xl border border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-teal-100 text-teal-800 rounded">
                    {scheme.shortCode}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700">
                    Up to {scheme.coverageEstimatePercent}% Subsidy
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{scheme.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{scheme.overview}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Eligible Beneficiaries:</span>
                  <p className="text-[11px] text-slate-700">{scheme.targetBeneficiaries}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Required Documents:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {scheme.requiredDocuments.map((doc, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900">
                  <strong>Desk Guidance: </strong>{scheme.applicationDeskNotes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
