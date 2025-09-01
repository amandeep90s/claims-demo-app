import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { AccordionItem, Checkbox } from '@heroui/react';
import React from 'react';

interface ClaimantData {
  id: number;
  name: string;
  completed: boolean;
  selected: boolean;
  email: string;
  phone: string;
  relationship: string;
  gender: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  isClaimant: string;
  isPolicyHolder: string;
}

interface ClaimantListItemProps {
  claimant: ClaimantData;
  onEdit: (claimant: ClaimantData) => void;
  onDelete: (id: number) => void;
  onSelectionChange: (id: number, selected: boolean) => void;
}

const ClaimantListItem: React.FC<ClaimantListItemProps> = ({ claimant, onEdit, onDelete, onSelectionChange }) => {
  return (
    <AccordionItem
      key={claimant.id}
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
              isSelected={claimant.selected}
              radius='none'
              size='lg'
              onClick={(e) => e.stopPropagation()}
              onValueChange={(selected) => {
                onSelectionChange(claimant.id, selected);
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
                onEdit(claimant);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onEdit(claimant);
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
                onDelete(claimant.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onDelete(claimant.id);
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
  );
};

export default ClaimantListItem;
export type { ClaimantData };
