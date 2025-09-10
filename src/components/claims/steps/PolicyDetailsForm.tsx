import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { FormField, SelectField } from '@/components/ui';
import { policyDetailsSchema, type PolicyDetailsFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface PolicyDetailsFormProps {
  onSubmit: (data: PolicyDetailsFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

const productTypeOptions = [
  { key: 'health', label: 'Health Insurance' },
  { key: 'travel', label: 'Travel Insurance' },
  { key: 'auto', label: 'Auto Insurance' },
  { key: 'property', label: 'Property Insurance' },
  { key: 'life', label: 'Life Insurance' },
];

export default function PolicyDetailsForm({
  onSubmit,
  onNext: _onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: PolicyDetailsFormProps) {
  const { setFormData, getStepData } = useClaimsFormStore();
  const policyDetailsData = getStepData('policy-details');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PolicyDetailsFormData>({
    resolver: zodResolver(policyDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      policyNumber: policyDetailsData.policyNumber || '',
      policyHolderName: policyDetailsData.policyHolderName || '',
      productType: policyDetailsData.productType || '',
      policyStartDate: policyDetailsData.policyStartDate || '',
      policyEndDate: policyDetailsData.policyEndDate || '',
      coverageAmount: policyDetailsData.coverageAmount || '',
    },
  });

  // Update store when form data changes
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData('policy-details', value);
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const handleFormSubmit = (data: PolicyDetailsFormData) => {
    setFormData('policy-details', data);
    onSubmit(data);
    // onNext is called inside onSubmit via handleStepSubmit
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Policy Details</h2>
        <p className='mt-2 text-gray-600'>Enter your policy information for claim verification.</p>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            {...register('policyNumber')}
            error={errors.policyNumber}
            label='Policy Number'
            placeholder='Enter your policy number'
          />

          <FormField
            {...register('policyHolderName')}
            error={errors.policyHolderName}
            label='Policy Holder Name'
            placeholder='Enter policy holder name'
          />
        </div>

        <SelectField
          {...register('productType')}
          error={errors.productType}
          label='Product Type'
          options={productTypeOptions}
          placeholder='Select product type'
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            {...register('policyStartDate')}
            error={errors.policyStartDate}
            label='Policy Start Date'
            type='date'
          />

          <FormField {...register('policyEndDate')} error={errors.policyEndDate} label='Policy End Date' type='date' />
        </div>

        <FormField
          {...register('coverageAmount')}
          error={errors.coverageAmount}
          label='Coverage Amount'
          placeholder='Enter coverage amount'
          startContent={<span className='text-gray-500'>$</span>}
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
