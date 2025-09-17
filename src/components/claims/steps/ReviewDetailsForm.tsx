import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { CheckboxField, TextareaField } from '@/components/ui';
import { reviewDetailsSchema, type ReviewDetailsFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface ReviewDetailsFormProps {
  onSubmit: (data: ReviewDetailsFormData) => void;
  onPrevious: () => void;
  onFinalSubmit: () => void;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export default function ReviewDetailsForm({
  onSubmit,
  onPrevious,
  onFinalSubmit,
  canGoPrevious,
  isSubmitting = false,
}: ReviewDetailsFormProps) {
  const { setFormData, getStepData, getAllFormData } = useClaimsFormStore();
  const reviewDetailsData = getStepData('review-details');

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<ReviewDetailsFormData>({
    resolver: zodResolver(reviewDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      confirmAccuracy: reviewDetailsData.confirmAccuracy || false,
      termsAccepted: reviewDetailsData.termsAccepted || false,
      additionalComments: reviewDetailsData.additionalComments || '',
    },
  });

  // Update store when form data changes
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData('review-details', value);
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const handleFormSubmit = (data: ReviewDetailsFormData) => {
    setFormData('review-details', data);
    onSubmit(data);
    onFinalSubmit(); // Trigger final submission
  };

  const formData = getAllFormData();

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Review & Submit</h2>
        <p className='mt-2 text-gray-600'>Please review all information before submitting your claim.</p>
      </div>

      {/* Summary of all form data */}
      <div className='space-y-6'>
        {/* Claim Type Summary */}
        <div className='rounded-lg border border-gray-200 p-4'>
          <h3 className='text-lg font-medium text-gray-900'>Claim Type</h3>
          <div className='mt-2 space-y-2 text-sm text-gray-600'>
            <p>
              <span className='font-medium'>Type:</span> {formData.claimType.claimType || 'Not specified'}
            </p>
            {formData.claimType.subType && (
              <p>
                <span className='font-medium'>Sub Type:</span> {formData.claimType.subType}
              </p>
            )}
            <p>
              <span className='font-medium'>Description:</span> {formData.claimType.description || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Policy Details Summary */}
        <div className='rounded-lg border border-gray-200 p-4'>
          <h3 className='text-lg font-medium text-gray-900'>Policy Details</h3>
          <div className='mt-2 grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2'>
            <p>
              <span className='font-medium'>Policy Number:</span>{' '}
              {formData.policyDetails.policyNumber || 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Policy Holder:</span>{' '}
              {formData.policyDetails.policyHolderName || 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Product Type:</span> {formData.policyDetails.productType || 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Coverage Amount:</span> $
              {formData.policyDetails.coverageAmount || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Claimant Details Summary */}
        <div className='rounded-lg border border-gray-200 p-4'>
          <h3 className='text-lg font-medium text-gray-900'>Claimant Details</h3>
          <div className='mt-2 grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2'>
            <p>
              <span className='font-medium'>Name:</span>{' '}
              {formData.claimantDetails.firstName && formData.claimantDetails.lastName
                ? `${formData.claimantDetails.firstName} ${formData.claimantDetails.lastName}`
                : 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Email:</span> {formData.claimantDetails.email || 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Phone:</span> {formData.claimantDetails.phoneNumber || 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Date of Birth:</span>{' '}
              {formData.claimantDetails.dateOfBirth || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Incident Details Summary */}
        <div className='rounded-lg border border-gray-200 p-4'>
          <h3 className='text-lg font-medium text-gray-900'>Incident Details</h3>
          <div className='mt-2 space-y-2 text-sm text-gray-600'>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
              <p>
                <span className='font-medium'>Date:</span> {formData.incidentDetails.incidentDate || 'Not provided'}
              </p>
              <p>
                <span className='font-medium'>Time:</span> {formData.incidentDetails.incidentTime || 'Not provided'}
              </p>
            </div>
            <p>
              <span className='font-medium'>Location:</span>{' '}
              {formData.incidentDetails.incidentLocation || 'Not provided'}
            </p>
            <p>
              <span className='font-medium'>Estimated Loss:</span> $
              {formData.incidentDetails.estimatedLoss || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='space-y-4'>
          <CheckboxField
            control={control}
            label='I confirm that all the information provided above is accurate and complete to the best of my knowledge.'
            name='confirmAccuracy'
          />

          <CheckboxField
            control={control}
            label='I accept the terms and conditions and understand that providing false information may result in claim denial.'
            name='termsAccepted'
          />
        </div>

        <TextareaField
          {...register('additionalComments')}
          error={errors.additionalComments}
          label='Additional Comments (Optional)'
          minRows={3}
          placeholder='Any additional information you would like to provide...'
        />

        {/* Navigation buttons integrated into form */}
        <StepNavigation
          canGoNext={true}
          canGoPrevious={canGoPrevious}
          isCurrentStepValid={isValid}
          isLastStep={true}
          isSubmitting={isSubmitting}
          onFinalSubmit={() => handleSubmit(handleFormSubmit)()}
          onNext={() => {}} // Not used for last step
          onPrevious={onPrevious}
        />
      </form>
    </div>
  );
}
