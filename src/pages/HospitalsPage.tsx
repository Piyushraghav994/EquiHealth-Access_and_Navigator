import React, { useState, useEffect } from 'react';
import { Hospital, HospitalFilterOptions } from '../types/hospital';
import { hospitalService } from '../services/hospitalService';
import { HospitalCard } from '../components/hospitals/HospitalCard';
import { HospitalDetails } from '../components/hospitals/HospitalDetails';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Building2, 
  MapPin, 
  Accessibility, 
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface HospitalsPageProps {
  onSelectHospitalId?: (id: string) => void;
  selectedHospitalId?: string | null;
  onClearSelectedHospital?: () => void;
  onOpenPdfModal?: () => void;
}

export const HospitalsPage: React.FC<HospitalsPageProps> = ({
  onSelectHospitalId,
  selectedHospitalId,
  onClearSelectedHospital,
  onOpenPdfModal
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHospital, setActiveHospital] = useState<Hospital | null>(null);

  // Dynamic filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedService, setSelectedService] = useState('All');
  const [registrationType, setRegistrationType] = useState<'any' | 'online' | 'offline'>('any');
  const [wheelchairOnly, setWheelchairOnly] = useState(false);
  const [governmentOnly, setGovernmentOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Dynamically populated filter options from dataset
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);

  // Load initial hospitals & filter criteria
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [allHospitals, types, districts, services] = await Promise.all([
          hospitalService.getHospitals(),
          hospitalService.getAvailableTypes(),
          hospitalService.getAvailableDistricts(),
          hospitalService.getAvailableServices()
        ]);

        setHospitals(allHospitals);
        setFilteredHospitals(allHospitals);
        setAvailableTypes(types);
        setAvailableDistricts(districts);
        setAvailableServices(services);
      } catch (err) {
        console.error('Failed to load hospitals:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Synchronize when selectedHospitalId changes externally or internally
  useEffect(() => {
    if (selectedHospitalId) {
      hospitalService.getHospitalById(selectedHospitalId).then(h => {
        if (h) setActiveHospital(h);
      });
    } else {
      setActiveHospital(null);
    }
  }, [selectedHospitalId]);

  // Apply filters dynamically whenever criteria change
  useEffect(() => {
    async function applyFilters() {
      const options: HospitalFilterOptions = {
        searchQuery,
        type: selectedType !== 'All' ? selectedType : undefined,
        city: selectedDistrict !== 'All' ? selectedDistrict : undefined,
        service: selectedService !== 'All' ? selectedService : undefined,
        registrationType,
        wheelchairOnly,
        governmentOnly
      };

      const result = await hospitalService.filterHospitals(options);
      setFilteredHospitals(result);
    }

    applyFilters();
  }, [searchQuery, selectedType, selectedDistrict, selectedService, registrationType, wheelchairOnly, governmentOnly, hospitals]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedDistrict('All');
    setSelectedService('All');
    setRegistrationType('any');
    setWheelchairOnly(false);
    setGovernmentOnly(false);
  };

  const handleSelectHospital = (id: string) => {
    if (onSelectHospitalId) {
      onSelectHospitalId(id);
    } else {
      const found = hospitals.find(h => h.id === id);
      if (found) setActiveHospital(found);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    if (onClearSelectedHospital) {
      onClearSelectedHospital();
    }
    setActiveHospital(null);
  };

  const handleViewOnMap = (hospital: Hospital) => {
    handleSelectHospital(hospital.id);
    setTimeout(() => {
      const mapEl = document.getElementById('details-map-view');
      if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // If viewing details of a specific hospital
  if (activeHospital) {
    return (
      <HospitalDetails
        hospital={activeHospital}
        onBack={handleBackToList}
        onOpenPdfModal={onOpenPdfModal}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-700" />
            <span>Healthcare Facilities Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven network of empanelled government, community, and charitable hospitals
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              showFilters
                ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{showFilters ? 'Hide Filters' : 'Filter Hospitals'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Search & Filter Bar */}
      <div className="space-y-3 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hospital name, district, city, or medical service (e.g., Diabetes, Blood Test)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Collapsible / Responsive Filter Criteria */}
        {(showFilters || searchQuery) && (
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Dynamic Type Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Hospital Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-700 cursor-pointer"
                >
                  <option value="All">All Facility Types</option>
                  {availableTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic District Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  District / City
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-700 cursor-pointer"
                >
                  <option value="All">All Districts</option>
                  {availableDistricts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Service Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Required Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-700 cursor-pointer"
                >
                  <option value="All">All Services</option>
                  {availableServices.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Checkbox / Toggle Filter Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                
                {/* Wheelchair filter */}
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={wheelchairOnly}
                    onChange={(e) => setWheelchairOnly(e.target.checked)}
                    className="rounded text-teal-800 focus:ring-teal-700 w-4 h-4 cursor-pointer"
                  />
                  <span>Wheelchair Accessible</span>
                </label>

                {/* Government only */}
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={governmentOnly}
                    onChange={(e) => setGovernmentOnly(e.target.checked)}
                    className="rounded text-teal-800 focus:ring-teal-700 w-4 h-4 cursor-pointer"
                  />
                  <span>Govt Hospitals Only</span>
                </label>

                {/* Offline registration */}
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={registrationType === 'offline'}
                    onChange={(e) => setRegistrationType(e.target.checked ? 'offline' : 'any')}
                    className="rounded text-teal-800 focus:ring-teal-700 w-4 h-4 cursor-pointer"
                  />
                  <span>Offline Helpdesk Counter</span>
                </label>

              </div>

              {/* Reset Filters button */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-teal-800 font-semibold cursor-pointer underline ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Hospital Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Showing <strong>{filteredHospitals.length}</strong> of <strong>{hospitals.length}</strong> verified healthcare facilities
        </span>
      </div>

      {/* Hospital Cards List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 space-y-2">
          <div className="w-8 h-8 border-3 border-teal-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs">Loading hospital facilities...</p>
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Hospitals Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No healthcare facility matched your filter criteria. Try adjusting your search query or reset the filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredHospitals.map(hospital => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onSelectHospital={handleSelectHospital}
              onViewOnMap={handleViewOnMap}
            />
          ))}
        </div>
      )}

    </div>
  );
};
