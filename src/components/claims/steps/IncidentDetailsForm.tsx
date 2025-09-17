import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { FormField, TextareaField, TimePickerField } from '@/components/ui';
import { incidentDetailsSchema, type IncidentDetailsFormData } from '@/schemas/claims';
import { useClaimsFormStore } from '@/store/claimsFormStore';

interface IncidentDetailsFormProps {
  onSubmit: (data: IncidentDetailsFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export default function IncidentDetailsForm({
  onSubmit,
  onNext: _onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: IncidentDetailsFormProps) {
  const { setFormData, getStepData } = useClaimsFormStore();
  const incidentDetailsData = getStepData('incident-details');

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<IncidentDetailsFormData>({
    resolver: zodResolver(incidentDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      incidentDate: incidentDetailsData.incidentDate || '',
      incidentTime: incidentDetailsData.incidentTime || '',
      incidentLocation: incidentDetailsData.incidentLocation || '',
      incidentDescription: incidentDetailsData.incidentDescription || '',
      witnesses: incidentDetailsData.witnesses || [],
      policeReportNumber: incidentDetailsData.policeReportNumber || '',
      estimatedLoss: incidentDetailsData.estimatedLoss || '',
      attachments: incidentDetailsData.attachments || [],
    },
  });

  const {
    fields: witnessFields,
    append: addWitness,
    remove: removeWitness,
  } = useFieldArray({
    control,
    name: 'witnesses',
  });

  // Update store when form data changes
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData('incident-details', value);
    });

    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const handleFormSubmit = (data: IncidentDetailsFormData) => {
    setFormData('incident-details', data);
    onSubmit(data);
    // onNext is called inside onSubmit via handleStepSubmit
  };

  const handleAddWitness = () => {
    addWitness({ name: '', contact: '' });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Incident Details</h2>
        <p className='mt-2 text-gray-600'>Provide detailed information about the incident for your claim.</p>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField {...register('incidentDate')} error={errors.incidentDate} label='Incident Date' type='date' />

          <TimePickerField control={control} label='Incident Time' name='incidentTime' required={true} />
        </div>

        <FormField
          {...register('incidentLocation')}
          error={errors.incidentLocation}
          label='Incident Location'
          placeholder='Enter the location where the incident occurred'
        />

        <TextareaField
          {...register('incidentDescription')}
          error={errors.incidentDescription}
          label='Incident Description'
          minRows={4}
          placeholder='Provide a detailed description of what happened...'
        />

        <FormField
          {...register('estimatedLoss')}
          error={errors.estimatedLoss}
          label='Estimated Loss Amount'
          placeholder='Enter estimated loss amount'
          startContent={<span className='text-gray-500'>$</span>}
        />

        <FormField
          {...register('policeReportNumber')}
          error={errors.policeReportNumber}
          label='Police Report Number (Optional)'
          placeholder='Enter police report number if applicable'
        />

        {/* Witnesses Section */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-medium text-gray-900'>Witnesses (Optional)</h3>
            <Button
              color='primary'
              size='sm'
              startContent={<PlusIcon className='h-4 w-4' />}
              variant='flat'
              onPress={handleAddWitness}
            >
              Add Witness
            </Button>
          </div>

          {witnessFields.map((field, index) => (
            <div key={field.id} className='space-y-4 rounded-lg border border-gray-200 p-4'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium text-gray-700'>Witness {index + 1}</h4>
                <Button isIconOnly color='danger' size='sm' variant='flat' onPress={() => removeWitness(index)}>
                  <XMarkIcon className='h-4 w-4' />
                </Button>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  {...register(`witnesses.${index}.name`)}
                  error={errors.witnesses?.[index]?.name}
                  label='Witness Name'
                  placeholder='Enter witness name'
                />

                <FormField
                  {...register(`witnesses.${index}.contact`)}
                  error={errors.witnesses?.[index]?.contact}
                  label='Contact Information'
                  placeholder='Enter phone or email'
                />
              </div>
            </div>
          ))}
        </div>

        {/* File Attachments Section */}
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900'>Supporting Documents (Optional)</h3>
          <div className='rounded-lg border-2 border-dashed border-gray-300 p-6 text-center'>
            <p className='text-gray-500'>
              File attachments feature will be implemented with proper file upload handling.
            </p>
            <p className='mt-2 text-sm text-gray-400'>
              You can attach photos, receipts, medical reports, or other supporting documents.
            </p>
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
