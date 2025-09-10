import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { FormField, SelectField } from '@/components/ui';
import { claimantDetailsFormSchema, type ClaimantDetailsFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface ClaimantDetailsFormProps {
  onSubmit: (data: ClaimantDetailsFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

const genderOptions = [
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
  { key: 'other', label: 'Other' },
];

const relationshipOptions = [
  { key: 'self', label: 'Self' },
  { key: 'spouse', label: 'Spouse' },
  { key: 'child', label: 'Child' },
  { key: 'parent', label: 'Parent' },
  { key: 'sibling', label: 'Sibling' },
  { key: 'other', label: 'Other' },
];

const countryOptions = [
  { key: 'sg', label: 'Singapore' },
  { key: 'my', label: 'Malaysia' },
  { key: 'th', label: 'Thailand' },
  { key: 'id', label: 'Indonesia' },
  { key: 'ph', label: 'Philippines' },
];

export default function ClaimantDetailsForm({
  onSubmit,
  onNext: _onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: ClaimantDetailsFormProps) {
  const { setFormData, getStepData } = useClaimsFormStore();
  const claimantDetailsData = getStepData('claimant-details');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ClaimantDetailsFormData>({
    resolver: zodResolver(claimantDetailsFormSchema),
    mode: 'onChange',
    defaultValues: {
      isPolicyHolder: claimantDetailsData.isPolicyHolder || '',
      firstName: claimantDetailsData.firstName || '',
      lastName: claimantDetailsData.lastName || '',
      email: claimantDetailsData.email || '',
      phoneNumber: claimantDetailsData.phoneNumber || '',
      dateOfBirth: claimantDetailsData.dateOfBirth || '',
      gender: claimantDetailsData.gender || '',
      relationship: claimantDetailsData.relationship || '',
      address: {
        line1: claimantDetailsData.address?.line1 || '',
        line2: claimantDetailsData.address?.line2 || '',
        city: claimantDetailsData.address?.city || '',
        postalCode: claimantDetailsData.address?.postalCode || '',
        country: claimantDetailsData.address?.country || '',
      },
    },
  });

  const watchedIsPolicyHolder = watch('isPolicyHolder');

  // Update store when form data changes
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData('claimant-details', value);
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const handleFormSubmit = (data: ClaimantDetailsFormData) => {
    setFormData('claimant-details', data);
    onSubmit(data);
    // onNext is called inside onSubmit via handleStepSubmit
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Claimant Details</h2>
        <p className='mt-2 text-gray-600'>Provide details about the person making this claim.</p>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <SelectField
          {...register('isPolicyHolder')}
          error={errors.isPolicyHolder}
          label='Are you the policy holder?'
          options={[
            { key: 'yes', label: 'Yes' },
            { key: 'no', label: 'No' },
          ]}
          placeholder='Select option'
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            {...register('firstName')}
            error={errors.firstName}
            label='First Name'
            placeholder='Enter first name'
          />

          <FormField
            {...register('lastName')}
            error={errors.lastName}
            label='Last Name'
            placeholder='Enter last name'
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField {...register('email')} error={errors.email} label='Email' placeholder='Enter email address' />

          <FormField
            {...register('phoneNumber')}
            error={errors.phoneNumber}
            label='Phone Number'
            placeholder='Enter phone number'
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField {...register('dateOfBirth')} error={errors.dateOfBirth} label='Date of Birth' type='date' />

          <SelectField
            {...register('gender')}
            error={errors.gender}
            label='Gender'
            options={genderOptions}
            placeholder='Select gender'
          />
        </div>

        {watchedIsPolicyHolder === 'no' && (
          <SelectField
            {...register('relationship')}
            error={errors.relationship}
            label='Relationship to Policy Holder'
            options={relationshipOptions}
            placeholder='Select relationship'
          />
        )}

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900'>Address Information</h3>

          <FormField
            {...register('address.line1')}
            error={errors.address?.line1}
            label='Address Line 1'
            placeholder='Enter address line 1'
          />

          <FormField
            {...register('address.line2')}
            error={errors.address?.line2}
            label='Address Line 2 (Optional)'
            placeholder='Enter address line 2'
          />

          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <FormField
              {...register('address.city')}
              error={errors.address?.city}
              label='City'
              placeholder='Enter city'
            />

            <FormField
              {...register('address.postalCode')}
              error={errors.address?.postalCode}
              label='Postal Code'
              placeholder='Enter postal code'
            />

            <SelectField
              {...register('address.country')}
              error={errors.address?.country}
              label='Country'
              options={countryOptions}
              placeholder='Select country'
            />
          </div>
        </div>

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
