import React from 'react';
import { HospitalRecommendation } from '../../types/hospital';
import { CheckCircle2, Award, Sparkles } from 'lucide-react';

interface RecommendationReasonsProps {
  recommendation?: HospitalRecommendation;
}

export const RecommendationReasons: React.FC<RecommendationReasonsProps> = ({
  recommendation
}) => {
  const reasons = recommendation?.reasons || [];

  if (reasons.length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-5 text-center text-slate-500 text-sm border border-slate-200">
        Recommendation criteria not available.
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-teal-50/60 to-emerald-50/40 rounded-2xl border border-teal-200/80 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-900 font-bold text-sm sm:text-base">
          <Sparkles className="w-5 h-5 text-teal-700" />
          <span>Why This Hospital Was Recommended For You:</span>
        </div>

        {recommendation?.matchScore && (
          <span className="px-2.5 py-1 rounded-full bg-teal-800 text-white font-black text-xs">
            {recommendation.matchScore}% Match
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-teal-100 shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-slate-800 font-medium">
              {reason}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
