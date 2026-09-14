import React, { useState } from 'react';
import { Building2, Image as ImageIcon } from 'lucide-react';

interface HospitalImageGalleryProps {
  images?: string[];
  hospitalName: string;
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80';

export const HospitalImageGallery: React.FC<HospitalImageGalleryProps> = ({
  images = [],
  hospitalName
}) => {
  const validImages = images.length > 0 ? images : [DEFAULT_FALLBACK_IMAGE];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrorMap(prev => ({ ...prev, [index]: true }));
  };

  const currentSrc = imageErrorMap[activeImageIndex]
    ? DEFAULT_FALLBACK_IMAGE
    : validImages[activeImageIndex] || DEFAULT_FALLBACK_IMAGE;

  return (
    <div className="space-y-3">
      {/* Primary Display Image */}
      <div className="relative aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs">
        <img
          src={currentSrc}
          alt={`${hospitalName} - Photo ${activeImageIndex + 1}`}
          onError={() => handleImageError(activeImageIndex)}
          className="w-full h-full object-cover transition-all duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Fallback watermark/icon if all images fail */}
        {imageErrorMap[activeImageIndex] && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Healthcare Facility View</span>
          </div>
        )}

        {/* Multiple image count indicator */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{activeImageIndex + 1} / {validImages.length}</span>
          </div>
        )}
      </div>

      {/* Thumbnail Bar for Multiple Images */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-teal-700 ring-2 ring-teal-700/20 shadow-xs'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              title={`View photo ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${hospitalName} thumbnail ${idx + 1}`}
                onError={() => handleImageError(idx)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
