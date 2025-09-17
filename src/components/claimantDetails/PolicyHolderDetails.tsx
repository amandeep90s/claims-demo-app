import type { ClaimantDetailsPageFormData } from '@/schemas/claimant';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Select, SelectItem } from '@heroui/react';
import React from 'react';

import { RadioGroupField } from '../ui';

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
          <RadioGroupField
            label='Is claimant same as Policy holder?'
            name='isClaimantSameAsPolicyHolder'
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            orientation='horizontal'
            register={register}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyHolderDetails;
