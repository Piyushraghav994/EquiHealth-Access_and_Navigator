import React, { useState } from 'react';
import { SPRING_BOOT_ENDPOINTS } from '../data/mockData';
import { getBackendConfig, saveBackendConfig, springBootApi, BackendConfig } from '../services/springBootApi';
import { 
  Server, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Box, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Code2, 
  Play, 
  RefreshCw,
  ExternalLink,
  Terminal
} from 'lucide-react';

interface SpringBootArchitectureModalProps {
  language: 'en' | 'hi';
}

export const SpringBootArchitectureModal: React.FC<SpringBootArchitectureModalProps> = ({ language }) => {
  const [config, setConfig] = useState<BackendConfig>(getBackendConfig());
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latency?: number } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(SPRING_BOOT_ENDPOINTS[1]);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await springBootApi.testBackendConnection(config.baseUrl);
      setTestResult(res);
    } catch (e: any) {
      setTestResult({ success: false, message: e.message || 'Connection failed' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    saveBackendConfig(config);
    alert('Backend configuration saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                {language === 'hi' ? 'स्प्रिंग बूट और माइक्रोसर्विसेज आर्किटेक्चर' : 'Java Spring Boot Backend Compatibility & Architecture'}
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                Spring Boot 3.3.x + Spring AI
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Full contract compatibility with Spring Security JWT, Spring Data JPA / Hibernate, Docker microservices, and pgvector.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">
            Mode: <strong className={config.useLiveBackend ? 'text-emerald-600' : 'text-teal-700'}>
              {config.useLiveBackend ? 'Live Spring Boot REST' : 'Embedded Spring AI Emulator'}
            </strong>
          </span>
        </div>
      </div>

      {/* Live Backend Connection Settings */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600" />
            Live Spring Boot Backend Endpoint Configuration
          </h3>
          <span className="text-[11px] text-slate-500">
            Toggle between standalone preview mode & live local Spring Boot container
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">
              Spring Boot API Base URL:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={config.baseUrl}
                onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                placeholder="http://localhost:8080"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Test /actuator/health</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Mode Selection:
            </label>
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.useLiveBackend}
                  onChange={(e) => {
                    const updated = { ...config, useLiveBackend: e.target.checked };
                    setConfig(updated);
                    saveBackendConfig(updated);
                  }}
                  className="accent-emerald-600"
                />
                <span className="font-semibold text-slate-800">Route calls to Live Backend</span>
              </label>
            </div>
          </div>
        </div>

        {testResult && (
          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            testResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
            <div>
              <p className="font-bold">{testResult.message}</p>
              {!testResult.success && (
                <p className="text-[11px] text-amber-700 mt-0.5">
                  The frontend is currently utilizing its deterministic Spring AI rule engine emulator, so all features (intake, scoring, barrier solutions, RAG) work seamlessly in preview!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backend Tech Stack Specifications (Matching User Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
            <Server className="w-4 h-4" />
            <span>Core Framework</span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">Java 21 & Spring Boot</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Spring Boot 3.3.x / REST APIs</li>
            <li>• Spring Security 6 (JWT & RBAC)</li>
            <li>• Spring Data JPA & Hibernate ORM</li>
            <li>• JUnit 5 & Mockito (Unit/Integration)</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase">
            <Database className="w-4 h-4" />
            <span>Persistence Tier</span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">Relational & Vector DB</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• PostgreSQL 16 (or MySQL 8.0)</li>
            <li>• <strong>pgvector</strong> extension for policy RAG</li>
            <li>• Flyway Database Migrations</li>
            <li>• Connection pooling via HikariCP</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase">
            <Cpu className="w-4 h-4" />
            <span>AI & Data Pipeline</span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">Spring AI & RAG</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Spring AI Vector Store API</li>
            <li>• OpenAI / Gemini / Ollama LLM</li>
            <li>• Document chunking (TokenTextSplitter)</li>
            <li>• Cosine similarity semantic search</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase">
            <Box className="w-4 h-4" />
            <span>Microservices & Ops</span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">Docker & Architecture</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• Multi-stage Dockerfile</li>
            <li>• Docker Compose (App + DB + Vector)</li>
            <li>• Actuator Health & Prometheus Metrics</li>
            <li>• CORS & Vite proxy configured</li>
          </ul>
        </div>
      </div>

      {/* Interactive REST API Contract Explorer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-600" />
            Spring Boot REST API Endpoints Specification
          </h3>
          <p className="text-xs text-slate-500">
            Click any endpoint to inspect Java Controller, Request DTO, and Response contract.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Endpoint List */}
          <div className="space-y-2">
            {SPRING_BOOT_ENDPOINTS.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEndpoint(ep)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  selectedEndpoint.path === ep.path
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded uppercase ${
                    ep.method === 'GET' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-[11px] text-slate-800 truncate">{ep.path}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{ep.description}</p>
              </button>
            ))}
          </div>

          {/* Endpoint Details & DTO Viewer */}
          <div className="lg:col-span-2 p-4 rounded-xl bg-slate-900 text-slate-200 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold">
                {selectedEndpoint.method} {selectedEndpoint.path}
              </span>
              <span className="text-slate-400 text-[11px]">
                {selectedEndpoint.controller}
              </span>
            </div>

            <p className="text-slate-300 font-sans text-xs">
              {selectedEndpoint.description}
            </p>

            <div>
              <span className="text-slate-500 text-[11px] block uppercase font-bold mb-1">Request Payload / Params:</span>
              <pre className="p-3 bg-slate-950 rounded-lg text-emerald-300 overflow-x-auto text-[11px]">
                {selectedEndpoint.requestDto || 'None'}
              </pre>
            </div>

            <div>
              <span className="text-slate-500 text-[11px] block uppercase font-bold mb-1">Response DTO:</span>
              <pre className="p-3 bg-slate-950 rounded-lg text-sky-300 overflow-x-auto text-[11px]">
                {selectedEndpoint.responseDto || 'None'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
