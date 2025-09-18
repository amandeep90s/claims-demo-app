/**
 * IncidentDetailsForm Component
 *
 * This form dynamically adapts based on the selected incident type from the previous step.
 * It uses a schema composition approach where:
 * 1. A base schema contains common fields (incident date, location, description, etc.)
 * 2. Dynamic schemas for each incident type contain specific required fields
 * 3. The appropriate schema is merged at runtime based on the selected incident type
 * 4. Form validation is automatically adjusted to match the required fields for each type
 *
 * This approach provides:
 * - Strong type safety with proper validation
 * - Better user experience with contextual field requirements
 * - Maintainable code with separated concerns per incident type
 */

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import StepNavigation from '../StepNavigation';

import { FormField, TextareaField, TimePickerField } from '@/components/ui';
import { getIncidentDetailsSchema, type IncidentDetailsFormData } from '@/schemas/claims';
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
  const incidentTypeData = getStepData('incident-type');

  // Get the selected incident type
  const selectedIncidentType = incidentTypeData.incidentType;

  // Get the appropriate schema based on incident type
  const currentSchema = useMemo(() => {
    return getIncidentDetailsSchema(selectedIncidentType);
  }, [selectedIncidentType]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<IncidentDetailsFormData>({
    resolver: zodResolver(currentSchema),
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
      // Dynamic fields
      flightNumber: incidentDetailsData.flightNumber || '',
      departureDate: incidentDetailsData.departureDate || '',
      arrivalDate: incidentDetailsData.arrivalDate || '',
      delayDuration: incidentDetailsData.delayDuration || '',
      cancellationReason: incidentDetailsData.cancellationReason || '',
      medicalFacility: incidentDetailsData.medicalFacility || '',
      diagnosisCode: incidentDetailsData.diagnosisCode || '',
      treatmentDate: incidentDetailsData.treatmentDate || '',
      baggageClaimNumber: incidentDetailsData.baggageClaimNumber || '',
      itemsLost: incidentDetailsData.itemsLost || '',
      purchaseReceipts: incidentDetailsData.purchaseReceipts || false,
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

  // Helper function to get required fields info for current incident type
  const getRequiredFieldsInfo = (incidentType?: string) => {
    switch (incidentType) {
      case 'travel-delay':
        return ['Flight/Transport Number', 'Scheduled Departure Date', 'Actual Arrival Date', 'Delay Duration'];
      case 'travel-misconnection':
        return ['Initial Flight Number', 'Connection Time Missed'];
      case 'trip-cancellation':
        return ['Cancellation Reason', 'Original Departure Date'];
      case 'medical-accident':
        return ['Medical Facility Name', 'Treatment Date'];
      case 'lost-baggage':
        return ['Baggage Claim Number', 'Flight Number', 'Items Lost/Damaged Details'];
      default:
        return [];
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Incident Details</h2>
        <p className='mt-2 text-gray-600'>Provide detailed information about the incident for your claim.</p>
        {selectedIncidentType && (
          <div className='mt-3 rounded-lg bg-blue-50 p-3'>
            <p className='text-sm text-blue-700'>
              <span className='font-medium'>Selected Incident Type:</span>{' '}
              {selectedIncidentType.charAt(0).toUpperCase() + selectedIncidentType.slice(1).replace('-', ' ')}
            </p>
            <p className='mt-1 text-xs text-blue-600'>
              Additional fields specific to this incident type will appear below the common fields.
            </p>
            {getRequiredFieldsInfo(selectedIncidentType).length > 0 && (
              <div className='mt-2'>
                <p className='text-xs font-medium text-blue-700'>Required additional fields:</p>
                <ul className='mt-1 list-inside list-disc text-xs text-blue-600'>
                  {getRequiredFieldsInfo(selectedIncidentType).map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
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

        {/* Dynamic fields based on incident type */}
        {selectedIncidentType === 'travel-delay' && (
          <div className='space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4'>
            <h3 className='text-lg font-medium text-blue-900'>Travel Delay Details</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                {...register('flightNumber')}
                error={errors.flightNumber}
                label='Flight/Transport Number'
                placeholder='Enter flight or transport number'
              />
              <FormField
                {...register('delayDuration')}
                error={errors.delayDuration}
                label='Delay Duration (hours)'
                placeholder='Enter delay duration'
                type='number'
              />
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                {...register('departureDate')}
                error={errors.departureDate}
                label='Scheduled Departure Date'
                type='date'
              />
              <FormField
                {...register('arrivalDate')}
                error={errors.arrivalDate}
                label='Actual Arrival Date'
                type='date'
              />
            </div>
          </div>
        )}

        {selectedIncidentType === 'travel-misconnection' && (
          <div className='space-y-4 rounded-lg border border-purple-200 bg-purple-50 p-4'>
            <h3 className='text-lg font-medium text-purple-900'>Travel Misconnection Details</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                {...register('flightNumber')}
                error={errors.flightNumber}
                label='Initial Flight Number'
                placeholder='Enter initial flight number'
              />
              <FormField
                {...register('delayDuration')}
                error={errors.delayDuration}
                label='Connection Time Missed (hours)'
                placeholder='Enter missed connection time'
                type='number'
              />
            </div>
          </div>
        )}

        {selectedIncidentType === 'trip-cancellation' && (
          <div className='space-y-4 rounded-lg border border-orange-200 bg-orange-50 p-4'>
            <h3 className='text-lg font-medium text-orange-900'>Trip Cancellation Details</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                {...register('cancellationReason')}
                error={errors.cancellationReason}
                label='Cancellation Reason'
                placeholder='Enter reason for cancellation'
              />
              <FormField
                {...register('departureDate')}
                error={errors.departureDate}
                label='Original Departure Date'
                type='date'
              />
            </div>
          </div>
        )}

        {selectedIncidentType === 'medical-accident' && (
          <div className='space-y-4 rounded-lg border border-red-200 bg-red-50 p-4'>
            <h3 className='text-lg font-medium text-red-900'>Medical/Accident Details</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                {...register('medicalFacility')}
                error={errors.medicalFacility}
                label='Medical Facility Name'
                placeholder='Enter hospital/clinic name'
              />
              <FormField
                {...register('treatmentDate')}
                error={errors.treatmentDate}
                label='Treatment Date'
                type='date'
              />
            </div>
            <FormField
              {...register('diagnosisCode')}
              error={errors.diagnosisCode}
              label='Diagnosis/ICD Code (if available)'
              placeholder='Enter diagnosis or medical code'
            />
          </div>
        )}

        {selectedIncidentType === 'lost-baggage' && (
          <div className='space-y-4 rounded-lg border border-green-200 bg-green-50 p-4'>
            <h3 className='text-lg font-medium text-green-900'>Lost Baggage Details</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                {...register('baggageClaimNumber')}
                error={errors.baggageClaimNumber}
                label='Baggage Claim Number'
                placeholder='Enter baggage claim reference'
              />
              <FormField
                {...register('flightNumber')}
                error={errors.flightNumber}
                label='Flight Number'
                placeholder='Enter flight number'
              />
            </div>
            <TextareaField
              {...register('itemsLost')}
              error={errors.itemsLost}
              label='Items Lost/Damaged'
              minRows={3}
              placeholder='List items that were lost or damaged...'
            />
            <div className='flex items-center space-x-3'>
              <input
                {...register('purchaseReceipts')}
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                id='purchaseReceipts'
                type='checkbox'
              />
              <label className='text-sm font-medium text-gray-700' htmlFor='purchaseReceipts'>
                I have purchase receipts for the lost items
              </label>
            </div>
          </div>
        )}

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
          // isCurrentStepValid={isValid}
          isLastStep={false}
          isSubmitting={isSubmitting}
          onNext={() => handleSubmit(handleFormSubmit)()}
          onPrevious={onPrevious}
        />
      </form>
    </div>
  );
}
