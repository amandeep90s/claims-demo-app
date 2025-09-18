import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { FormField, RadioGroupField } from '@/components/ui';
import { incidentTypeSchema, type IncidentTypeFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface IncidentTypeFormProps {
  onSubmit: (data: IncidentTypeFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

const incidentTypeOptions = [
  {
    value: 'travel-delay',
    label: 'Travel Delay',
    description: 'Flight delays, train delays, or other transportation delays',
  },
  {
    value: 'travel-misconnection',
    label: 'Travel Misconnection',
    description: 'Missed connecting flights or transportation',
  },
  {
    value: 'trip-cancellation',
    label: 'Trip Cancellation',
    description: 'Trip cancelled due to unforeseen circumstances',
  },
  {
    value: 'medical-accident',
    label: 'Medical or Accident',
    description: 'Medical emergencies, accidents, or injuries during travel',
  },
  {
    value: 'lost-baggage',
    label: 'Lost Baggage',
    description: 'Lost, stolen, or damaged baggage and personal items',
  },
  {
    value: 'others',
    label: 'Others',
    description: 'Other types of incidents not listed above',
  },
];

export default function IncidentTypeForm({
  onSubmit,
  onNext: _onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: IncidentTypeFormProps) {
  const { setFormData, getStepData, clearIncidentDetailsDynamicFields } = useClaimsFormStore();
  const incidentTypeData = getStepData('incident-type');
  const previousIncidentTypeRef = useRef<string | undefined>(incidentTypeData.incidentType);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<IncidentTypeFormData>({
    resolver: zodResolver(incidentTypeSchema),
    mode: 'onChange',
    defaultValues: {
      incidentType: incidentTypeData.incidentType || undefined,
      otherDescription: incidentTypeData.otherDescription || '',
    },
  });

  const watchedIncidentType = watch('incidentType');

  // Update store when form data changes
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData('incident-type', value);
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  // Clear dynamic fields when incident type changes
  useEffect(() => {
    const currentIncidentType = watchedIncidentType;
    const previousIncidentType = previousIncidentTypeRef.current;

    // If incident type has changed and there was a previous type, clear dynamic fields
    if (currentIncidentType && previousIncidentType && currentIncidentType !== previousIncidentType) {
      clearIncidentDetailsDynamicFields();
    }

    // Update the ref with current value
    previousIncidentTypeRef.current = currentIncidentType;
  }, [watchedIncidentType, clearIncidentDetailsDynamicFields]);

  const handleFormSubmit = (data: IncidentTypeFormData) => {
    setFormData('incident-type', data);
    onSubmit(data);
    // onNext is called inside onSubmit via handleStepSubmit
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Incident Type</h2>
        <p className='mt-2 text-gray-600'>
          Please select the type of incident you are filing a claim for. This will help us customize the incident
          details form to gather the most relevant information.
        </p>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <RadioGroupField
          required
          control={control}
          label='What type of incident are you reporting?'
          name='incidentType'
          options={incidentTypeOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />

        {/* Show description field when "Others" is selected */}
        {watchedIncidentType === 'others' && (
          <div className='ml-6 space-y-4 rounded-lg border border-gray-200 p-4'>
            <FormField
              required
              {...register('otherDescription')}
              error={errors.otherDescription}
              label='Please describe the incident type'
              placeholder='Provide details about the type of incident...'
            />
          </div>
        )}

        {/* Information box about what happens next */}
        <div className='rounded-lg bg-blue-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg aria-hidden='true' className='h-5 w-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  clipRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  fillRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-blue-800'>What happens next?</h3>
              <div className='mt-2 text-sm text-blue-700'>
                <p>
                  Based on your selection, the next step will show specific fields relevant to your incident type. This
                  ensures we collect the right information to process your claim efficiently.
                </p>
                <p className='mt-2 text-xs text-blue-600'>
                  <strong>Note:</strong> If you change your incident type selection after filling out incident details,
                  the dynamic fields specific to the previous incident type will be cleared to avoid confusion.
                </p>
              </div>
            </div>
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
