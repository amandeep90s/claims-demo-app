import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import StepNavigation from '@/components/claims/StepNavigation';
import { DataGrid, ReviewSection, StatusIndicator } from '@/components/review';
import { CheckboxField, TextareaField } from '@/components/ui';
import { reviewDetailsSchema, type ReviewDetailsFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface ReviewPageProps {
  onSubmit: (data: ReviewDetailsFormData) => void;
  onPrevious: () => void;
  onFinalSubmit: () => void;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

const ReviewPage: React.FC<ReviewPageProps> = ({
  onSubmit,
  onPrevious,
  onFinalSubmit,
  canGoPrevious,
  isSubmitting = false,
}) => {
  // Form handling for review details
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

  // Get form data from store
  const allFormData = getAllFormData();
  const claimTypeData = allFormData.claimType;
  const policyData = allFormData.policyDetails;
  const claimantData = allFormData.claimantDetails;
  const incidentData = allFormData.incidentDetails;

  // Default values for demo
  const claimTypeInfo = [
    { label: 'Claim Type', value: claimTypeData.claimType || 'Medical Expenses', isHighlighted: true },
    { label: 'Sub Type', value: claimTypeData.subType || 'Emergency Treatment' },
    {
      label: 'Description',
      value: claimTypeData.description || 'Medical treatment required due to accident during travel',
    },
  ];

  const policyInfo = [
    { label: 'Policy Number', value: policyData.policyNumber || 'AW-SG-123456789', isHighlighted: true },
    { label: 'Policy Holder Name', value: policyData.policyHolderName || 'John Tan' },
    { label: 'Product Type', value: policyData.productType || 'Travel Insurance' },
    { label: 'Policy Start Date', value: policyData.policyStartDate || '01/01/2024' },
    { label: 'Policy End Date', value: policyData.policyEndDate || '31/12/2024' },
    { label: 'Coverage Amount', value: policyData.coverageAmount || 'SGD 100,000' },
    {
      label: 'Status',
      value: <StatusIndicator status='ACTIVE' type='active' />,
    },
  ];

  const claimantInfo = [
    { label: 'Are you the policy holder?', value: claimantData.isPolicyHolder || 'Yes' },
    { label: 'First Name', value: claimantData.firstName || 'John' },
    { label: 'Last Name', value: claimantData.lastName || 'Tan' },
    { label: 'Email', value: claimantData.email || 'john.tan@example.com' },
    { label: 'Phone Number', value: claimantData.phoneNumber || '+65 6785 6438' },
    { label: 'Date of Birth', value: claimantData.dateOfBirth || '15/03/1998' },
    { label: 'Gender', value: claimantData.gender || 'Male' },
    { label: 'Relationship', value: claimantData.relationship || 'Self' },
  ];

  const addressInfo = [
    { label: 'Address Line 1', value: claimantData.address?.line1 || '123 Orchard Road' },
    { label: 'Address Line 2', value: claimantData.address?.line2 || '#12-34 Orchard Towers' },
    { label: 'City', value: claimantData.address?.city || 'Singapore' },
    { label: 'Postal Code', value: claimantData.address?.postalCode || '238874' },
    { label: 'Country / Location', value: claimantData.address?.country || 'Singapore' },
  ];

  const incidentInfo = [
    { label: 'Incident Date', value: incidentData.incidentDate || '15/08/2024' },
    { label: 'Incident Time', value: incidentData.incidentTime || '14:30' },
    { label: 'Incident Location', value: incidentData.incidentLocation || 'Bangkok, Thailand' },
    { label: 'Estimated Loss', value: incidentData.estimatedLoss || 'SGD 2,500', isHighlighted: true },
    { label: 'Police Report Number', value: incidentData.policeReportNumber || 'PR-2024-08-001' },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-gray-900'>Review Your Claim</h2>
        <p className='mt-2 text-gray-600'>Please review all information before submitting your claim</p>
      </div>

      <div className='space-y-6'>
        {/* Claim Type Section */}
        <ReviewSection icon={<ClipboardDocumentListIcon className='h-6 w-6' />} title='Claim Type Information'>
          <DataGrid columns={2} data={claimTypeInfo} />
        </ReviewSection>

        {/* Policy Details Section */}
        <ReviewSection icon={<ShieldCheckIcon className='h-6 w-6' />} title='Policy Details'>
          <DataGrid columns={3} data={policyInfo} />
        </ReviewSection>

        {/* Claimant Details Section */}
        <ReviewSection icon={<UserIcon className='h-6 w-6' />} title='Claimant Information'>
          <DataGrid columns={3} data={claimantInfo} />

          <div className='mt-6 border-t pt-6'>
            <h4 className='mb-4 flex items-center gap-2 text-base font-semibold text-gray-900'>
              <MapPinIcon className='h-5 w-5 text-blue-600' />
              Address Information
            </h4>
            <DataGrid columns={3} data={addressInfo} />
          </div>
        </ReviewSection>

        {/* Incident Details Section */}
        <ReviewSection icon={<ExclamationTriangleIcon className='h-6 w-6' />} title='Incident Details'>
          <DataGrid columns={3} data={incidentInfo} />

          <div className='mt-6 border-t pt-6'>
            <h4 className='mb-3 flex items-center gap-2 text-base font-semibold text-gray-900'>
              <DocumentTextIcon className='h-5 w-5 text-blue-600' />
              Incident Description
            </h4>
            <div className='rounded-lg bg-gray-50 p-4'>
              <p className='text-sm text-gray-700'>
                {incidentData.incidentDescription ||
                  'I was walking down the stairs at my hotel when I slipped and fell due to wet floors. I hurt my ankle badly and had to seek immediate medical attention at the local hospital.'}
              </p>
            </div>
          </div>
        </ReviewSection>

        {/* Financial Summary */}
        <ReviewSection icon={<BanknotesIcon className='h-6 w-6' />} title='Financial Summary'>
          <div className='rounded-lg bg-blue-50 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-lg font-semibold text-blue-900'>Total Claim Amount</h4>
                <p className='text-sm text-blue-700'>Estimated loss amount requested</p>
              </div>
              <div className='text-right'>
                <p className='text-2xl font-bold text-blue-900'>{incidentData.estimatedLoss || 'SGD 2,500'}</p>
                <p className='text-sm text-blue-700'>Singapore Dollars</p>
              </div>
            </div>
          </div>
        </ReviewSection>

        {/* Important Notes */}
        <div className='rounded-lg border border-amber-200 bg-amber-50 p-6'>
          <div className='flex items-start gap-3'>
            <ExclamationTriangleIcon className='mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600' />
            <div>
              <h4 className='text-base font-semibold text-amber-900'>Important Notes</h4>
              <ul className='mt-2 space-y-1 text-sm text-amber-800'>
                <li>• Please ensure all information provided is accurate and complete</li>
                <li>• Any false or misleading information may result in claim rejection</li>
                <li>• Additional documentation may be requested during claim processing</li>
                <li>• Processing time typically takes 5-10 business days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Review Form */}
        <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>Final Confirmation</h3>

            <div className='space-y-4'>
              <CheckboxField
                required
                control={control}
                label='I confirm that all the information provided above is accurate and complete to the best of my knowledge.'
                name='confirmAccuracy'
              />

              <CheckboxField
                required
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
          </div>

          <StepNavigation
            canGoNext={true}
            canGoPrevious={canGoPrevious}
            isCurrentStepValid={isValid}
            isLastStep={true}
            isSubmitting={isSubmitting}
            onFinalSubmit={() => handleSubmit(handleFormSubmit)()}
            onNext={() => {}}
            onPrevious={onPrevious}
          />
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
