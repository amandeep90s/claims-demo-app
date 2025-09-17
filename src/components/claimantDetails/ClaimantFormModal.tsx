import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import React from 'react';
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { type ClaimantData } from './ClaimantListItem';

import { DatePicker, FormField, SelectField } from '@/components/ui';
import { type ClaimantFormData } from '@/schemas/claimant';

interface ClaimantFormModalProps {
  isOpen: boolean;
  editingClaimant: ClaimantData | null;
  isSubmitting: boolean;
  errors: FieldErrors<ClaimantFormData>;
  register: UseFormRegister<ClaimantFormData>;
  control: Control<ClaimantFormData>;
  handleSubmit: UseFormHandleSubmit<ClaimantFormData>;
  onSubmit: (data: ClaimantFormData) => void;
  onClose: () => void;
}

const ClaimantFormModal: React.FC<ClaimantFormModalProps> = ({
  isOpen,
  editingClaimant,
  isSubmitting,
  errors,
  register,
  control,
  handleSubmit,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} placement='top-center' size='2xl' onOpenChange={onClose}>
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {editingClaimant ? 'Edit Claimant' : 'Add New Claimant'}
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    label='Full Name'
                    placeholder='Enter full name'
                    {...register('name')}
                    error={errors.name}
                  />

                  <SelectField
                    {...register('isClaimant')}
                    error={errors.isClaimant}
                    label='Are you a Claimant?'
                    options={[
                      { key: 'yes', label: 'Yes' },
                      { key: 'no', label: 'No' },
                    ]}
                    placeholder='Select option'
                  />

                  <SelectField
                    {...register('gender')}
                    error={errors.gender}
                    label='Gender'
                    options={[
                      { key: 'male', label: 'Male' },
                      { key: 'female', label: 'Female' },
                      { key: 'other', label: 'Other' },
                    ]}
                    placeholder='Select gender'
                  />

                  <DatePicker<ClaimantFormData> control={control} label='Date of Birth' name='dateOfBirth' />
                </div>

                <div className='space-y-4'>
                  <FormField
                    label='Address Line 1'
                    placeholder='Enter address line 1'
                    {...register('addressLine1')}
                    error={errors.addressLine1}
                  />

                  <FormField
                    label='Address Line 2 (Optional)'
                    placeholder='Enter address line 2'
                    {...register('addressLine2')}
                    error={errors.addressLine2}
                  />

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField label='City' placeholder='Enter city' {...register('city')} error={errors.city} />

                    <FormField
                      label='Postal Code'
                      placeholder='Enter postal code'
                      {...register('postalCode')}
                      error={errors.postalCode}
                    />
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <SelectField
                      {...register('country')}
                      error={errors.country}
                      label='Country'
                      options={[
                        { key: 'singapore', label: 'Singapore' },
                        { key: 'australia', label: 'Australia' },
                        { key: 'malaysia', label: 'Malaysia' },
                        { key: 'thailand', label: 'Thailand' },
                        { key: 'indonesia', label: 'Indonesia' },
                      ]}
                      placeholder='Select country'
                    />

                    <SelectField
                      {...register('isPolicyHolder')}
                      error={errors.isPolicyHolder}
                      label='Are you a Policy Holder?'
                      options={[
                        { key: 'yes', label: 'Yes' },
                        { key: 'no', label: 'No' },
                      ]}
                      placeholder='Select option'
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Cancel
                </Button>
                <Button color='primary' isLoading={isSubmitting} type='submit'>
                  {editingClaimant ? 'Update Claimant' : 'Add Claimant'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ClaimantFormModal;
