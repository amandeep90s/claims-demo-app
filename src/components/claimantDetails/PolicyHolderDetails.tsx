import type { ClaimantDetailsPageFormData } from '@/schemas/claimant';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Radio, RadioGroup, Select, SelectItem } from '@heroui/react';
import React from 'react';

interface PolicyHolderDetailsProps {
  register: UseFormRegister<ClaimantDetailsPageFormData>;
  errors: FieldErrors<ClaimantDetailsPageFormData>;
}

const PolicyHolderDetails: React.FC<PolicyHolderDetailsProps> = ({ register, errors }) => {
  return (
    <div className='mb-6 rounded-lg bg-white p-6'>
      <h3 className='mb-4 text-lg font-semibold text-gray-900'>Policy Holder Details</h3>
      <div className='space-y-4'>
        <Select
          {...register('policyHolder')}
          className='max-w-xs'
          errorMessage={errors.policyHolder?.message}
          isInvalid={!!errors.policyHolder}
          label='Policy Holder'
          placeholder='Select policy holder'
          radius='sm'
        >
          <SelectItem key='john-tan'>John Tan</SelectItem>
          <SelectItem key='amandeep-deep'>Amandeep Deep</SelectItem>
        </Select>

        <div className='mt-6'>
          <p className='mb-3 text-sm font-medium text-gray-900'>Is claimant same as Policy holder?</p>
          <RadioGroup
            {...register('isClaimantSameAsPolicyHolder')}
            className='gap-6'
            errorMessage={errors.isClaimantSameAsPolicyHolder?.message}
            isInvalid={!!errors.isClaimantSameAsPolicyHolder}
            orientation='horizontal'
          >
            <Radio
              classNames={{
                wrapper: 'border-teal-800 group-data-[selected=true]:border-teal-800', // Ring
                control: 'bg-teal-800', // Circle (dot)
              }}
              value='yes'
            >
              Yes
            </Radio>
            <Radio
              classNames={{
                wrapper: 'border-teal-800 group-data-[selected=true]:border-teal-800', // Ring
                control: 'bg-teal-800', // Circle (dot)
              }}
              value='no'
            >
              No
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default PolicyHolderDetails;
