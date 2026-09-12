import React, { useMemo } from 'react';
import { GeographicalInformation, RegistrationValidationErrors } from '../../../types/registration';
import { RadioGroup } from '../RadioGroup';
import { SelectField } from '../SelectField';
import { FormField } from '../FormField';
import { INDIAN_STATES, getDistrictsForState } from '../../../data/indiaLocations';

interface LocationStepProps {
  data: GeographicalInformation;
  onChange: (fields: Partial<GeographicalInformation>) => void;
  errors: RegistrationValidationErrors;
}

const RESIDENTIAL_AREA_OPTIONS = [
  { value: 'Urban', label: 'Urban', description: 'Metropolitan city or municipality area' },
  { value: 'Semi-urban', label: 'Semi-urban', description: 'Town, peri-urban, or sub-district headquarters' },
  { value: 'Rural (Village)', label: 'Rural (Village)', description: 'Gram panchayat, village, or rural settlement' }
];

export const LocationStep: React.FC<LocationStepProps> = ({
  data,
  onChange,
  errors
}) => {
  // States list for searchable dropdown
  const stateOptions = useMemo(() => {
    return INDIAN_STATES.map(s => ({ value: s.name, label: s.name }));
  }, []);

  // Districts based on selected state
  const districtOptions = useMemo(() => {
    if (!data.state) return [];
    const districts = getDistrictsForState(data.state);
    if (districts.length === 0) {
      return [{ value: 'Main District', label: 'Main District' }, { value: 'Other', label: 'Other District' }];
    }
    return districts.map(d => ({ value: d, label: d }));
  }, [data.state]);

  const handleStateChange = (selectedState: string) => {
    onChange({
      state: selectedState,
      district: '' // Reset district when state changes
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Geographical Background
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell us about your residential area so we can identify public health facilities in your zone.
        </p>
      </div>

      <div className="space-y-5">
        {/* 6. Residential Area */}
        <RadioGroup
          id="residentialArea"
          label="Residential Area"
          options={RESIDENTIAL_AREA_OPTIONS}
          value={data.residentialArea}
          onChange={(val) => onChange({ residentialArea: val })}
          required
          error={errors.residentialArea}
          layout="grid3"
        />

        {/* 7. Location Details */}
        <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="border-b border-slate-200/60 pb-2">
            <h3 className="text-sm font-bold text-slate-900">
              Location Details
            </h3>
            <p className="text-xs text-slate-500">
              Select your administrative region. (Automatic GPS detection is disabled for your privacy)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* State */}
            <SelectField
              id="state"
              label="State"
              options={stateOptions}
              value={data.state}
              onChange={handleStateChange}
              placeholder="Search or select state"
              searchable
              required
              error={errors.state}
            />

            {/* District */}
            <SelectField
              id="district"
              label="District"
              options={districtOptions}
              value={data.district}
              onChange={(val) => onChange({ district: val })}
              placeholder={data.state ? 'Search or select district' : 'Please select state first'}
              searchable
              disabled={!data.state}
              required
              error={errors.district}
            />
          </div>

          {/* City / Village */}
          <FormField
            id="cityVillage"
            label="City / Village"
            type="text"
            value={data.cityVillage}
            onChange={(e) => onChange({ cityVillage: e.target.value })}
            placeholder="e.g. Ram Nagar / Village Kotputli"
            required
            error={errors.cityVillage}
            helperText="Enter your specific town, village, or colony name"
          />
        </div>
      </div>
    </div>
  );
};
