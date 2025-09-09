import type { ClaimantDetailsPageFormData } from '@/schemas/claimant';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { ClaimantData } from './ClaimantListItem';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionItem, Button, Checkbox } from '@heroui/react';
import React from 'react';

interface ClaimantListProps {
  claimants: ClaimantData[];
  register: UseFormRegister<ClaimantDetailsPageFormData>;
  setValue: UseFormSetValue<ClaimantDetailsPageFormData>;
  watch: UseFormWatch<ClaimantDetailsPageFormData>;
  errors: FieldErrors<ClaimantDetailsPageFormData>;
  onAddClaimant: () => void;
  onEditClaimant: (claimant: ClaimantData) => void;
  onDeleteClaimant: (id: number) => void;
}

const ClaimantList: React.FC<ClaimantListProps> = ({
  claimants,
  register,
  setValue,
  watch,
  errors,
  onAddClaimant,
  onEditClaimant,
  onDeleteClaimant,
}) => {
  const selectedClaimants = watch('selectedClaimants') || [];

  const handleClaimantSelection = (claimantId: number, selected: boolean) => {
    if (selected) {
      setValue('selectedClaimants', [...selectedClaimants, claimantId]);
    } else {
      setValue(
        'selectedClaimants',
        selectedClaimants.filter((id: number) => id !== claimantId)
      );
    }
  };

  return (
    <div className='rounded-lg bg-white p-6'>
      {/* Hidden input to register the field with react-hook-form */}
      <input {...register('selectedClaimants')} style={{ display: 'none' }} type='hidden' />

      <div className='mb-4 flex w-full items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>Claimant Details</h3>
        <Button
          color='primary'
          size='sm'
          startContent={<PlusIcon className='h-4 w-4' />}
          variant='ghost'
          onPress={onAddClaimant}
        >
          Add Claimant
        </Button>
      </div>
      <div className='max-w-lg space-y-3'>
        <Accordion variant='splitted'>
          {claimants.map((claimant) => (
            <AccordionItem
              key={claimant.id.toString()}
              aria-label={claimant.name}
              classNames={{
                base: ' bg-teal-600 rounded-sm px-0',
                trigger: ' text-white p-4 rounded-sm data-[open=true]:rounded-b-none',
                content: 'bg-white border border-t-0 border-gray-200 rounded-b-lg p-4',
                titleWrapper: 'flex-1',
              }}
              title={
                <div className='flex w-full items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Checkbox
                      isSelected={selectedClaimants.includes(claimant.id)}
                      radius='none'
                      size='lg'
                      onClick={(e) => e.stopPropagation()}
                      onValueChange={(selected) => {
                        handleClaimantSelection(claimant.id, selected);
                      }}
                    />
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-white'>{claimant.name}</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div
                      className='cursor-pointer rounded p-1 hover:bg-teal-700'
                      role='button'
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClaimant(claimant);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          onEditClaimant(claimant);
                        }
                      }}
                    >
                      <PencilIcon className='h-4 w-4 text-white' />
                    </div>
                    <div
                      className='cursor-pointer rounded p-1 hover:bg-teal-700'
                      role='button'
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClaimant(claimant.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          onDeleteClaimant(claimant.id);
                        }
                      }}
                    >
                      <TrashIcon className='h-4 w-4 text-white' />
                    </div>
                  </div>
                </div>
              }
            >
              <div className='space-y-4 text-gray-900'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <span className='text-sm font-medium text-gray-700'>Email</span>
                    <p className='text-sm text-gray-900'>{claimant.email}</p>
                  </div>
                  <div>
                    <span className='text-sm font-medium text-gray-700'>Phone</span>
                    <p className='text-sm text-gray-900'>{claimant.phone}</p>
                  </div>
                </div>
                <div>
                  <span className='text-sm font-medium text-gray-700'>Relationship to Policy Holder</span>
                  <p className='text-sm text-gray-900'>{claimant.relationship}</p>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {errors.selectedClaimants && <p className='mt-2 text-sm text-red-600'>{errors.selectedClaimants.message}</p>}
    </div>
  );
};

export default ClaimantList;
