import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { SelectField, TextareaField } from '@/components/ui';
import { claimTypeSchema, type ClaimTypeFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface ClaimTypeFormProps {
  onSubmit: (data: ClaimTypeFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

const claimTypeOptions = [
  { key: 'health', label: 'Health Insurance' },
  { key: 'travel', label: 'Travel Insurance' },
  { key: 'auto', label: 'Auto Insurance' },
  { key: 'property', label: 'Property Insurance' },
  { key: 'life', label: 'Life Insurance' },
];

const subTypeOptions: Record<string, Array<{ key: string; label: string }>> = {
  health: [
    { key: 'medical', label: 'Medical Treatment' },
    { key: 'dental', label: 'Dental Treatment' },
    { key: 'vision', label: 'Vision Care' },
    { key: 'prescription', label: 'Prescription Drugs' },
  ],
  travel: [
    { key: 'trip-cancellation', label: 'Trip Cancellation' },
    { key: 'medical-emergency', label: 'Medical Emergency' },
    { key: 'lost-luggage', label: 'Lost Luggage' },
    { key: 'travel-delay', label: 'Travel Delay' },
  ],
  auto: [
    { key: 'collision', label: 'Collision' },
    { key: 'comprehensive', label: 'Comprehensive' },
    { key: 'liability', label: 'Liability' },
    { key: 'theft', label: 'Theft' },
  ],
  property: [
    { key: 'fire', label: 'Fire Damage' },
    { key: 'water', label: 'Water Damage' },
    { key: 'theft', label: 'Theft' },
    { key: 'vandalism', label: 'Vandalism' },
  ],
  life: [
    { key: 'death', label: 'Death Benefit' },
    { key: 'disability', label: 'Disability' },
    { key: 'critical-illness', label: 'Critical Illness' },
  ],
};

export default function ClaimTypeForm({
  onSubmit,
  onNext: _onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: ClaimTypeFormProps) {
  const { setFormData, getStepData } = useClaimsFormStore();
  const claimTypeData = getStepData('claim-type');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ClaimTypeFormData>({
    resolver: zodResolver(claimTypeSchema),
    mode: 'onChange',
    defaultValues: {
      claimType: claimTypeData.claimType || '',
      subType: claimTypeData.subType || '',
      description: claimTypeData.description || '',
    },
  });

  const watchedClaimType = watch('claimType');

  // Update store when form data changes
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData('claim-type', value);
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  // Reset subType when claimType changes
  useEffect(() => {
    if (watchedClaimType) {
      setValue('subType', '');
    }
  }, [watchedClaimType, setValue]);

  const handleFormSubmit = (data: ClaimTypeFormData) => {
    setFormData('claim-type', data);
    onSubmit(data);
    // onNext is called inside onSubmit via handleStepSubmit
  };

  const availableSubTypes = watchedClaimType ? subTypeOptions[watchedClaimType] || [] : [];

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Claim Type</h2>
        <p className='mt-2 text-gray-600'>Select the type of claim you would like to file.</p>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <SelectField
          {...register('claimType')}
          error={errors.claimType}
          label='Claim Type'
          options={claimTypeOptions}
          placeholder='Select claim type'
        />

        {availableSubTypes.length > 0 && (
          <SelectField
            {...register('subType')}
            error={errors.subType}
            label='Sub Type'
            options={availableSubTypes}
            placeholder='Select sub type'
          />
        )}

        <TextareaField
          {...register('description')}
          error={errors.description}
          label='Description'
          minRows={4}
          placeholder='Provide a detailed description of your claim...'
        />

        {/* Navigation buttons integrated into form */}
        <StepNavigation
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isCurrentStepValid={isValid}
          isLastStep={false}
          isSubmitting={isSubmitting}
          onNext={() => handleSubmit(handleFormSubmit)()}
          onPrevious={onPrevious}
        />
      </form>
    </div>
  );
}
