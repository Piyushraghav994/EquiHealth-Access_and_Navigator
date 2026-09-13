import React, { useEffect, useState } from 'react';
import { Hospital } from '../types/hospital';
import { hospitalService } from '../services/hospitalService';
import { HospitalDetails } from '../components/hospitals/HospitalDetails';
import { Building2 } from 'lucide-react';

interface HospitalDetailsPageProps {
  hospitalId: string;
  onBack?: () => void;
  onOpenPdfModal?: () => void;
}

export const HospitalDetailsPage: React.FC<HospitalDetailsPageProps> = ({
  hospitalId,
  onBack,
  onOpenPdfModal
}) => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    hospitalService.getHospitalById(hospitalId)
      .then(found => {
        if (isMounted) {
          setHospital(found);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching hospital details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [hospitalId]);

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-500 space-y-3">
        <div className="w-8 h-8 border-3 border-teal-800 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium">Loading hospital records...</p>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="max-w-md mx-auto p-10 text-center bg-white rounded-2xl border border-slate-200 space-y-4 my-8 shadow-xs">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Hospital Not Found</h3>
        <p className="text-xs text-slate-500">
          The requested healthcare facility identifier [{hospitalId}] could not be located in the current verified hospital database.
        </p>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900 transition-colors cursor-pointer"
          >
            Return to Facilities Directory
          </button>
        )}
      </div>
    );
  }

  return (
    <HospitalDetails
      hospital={hospital}
      onBack={onBack}
      onOpenPdfModal={onOpenPdfModal}
    />
  );
};
