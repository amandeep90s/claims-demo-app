import { Radio, RadioGroup, Select, SelectItem } from '@heroui/react';
import React, { useState } from 'react';

interface PolicyHolderDetailsProps {
  selectedClaimant: string;
  onSelectedClaimantChange: (value: string) => void;
}

const PolicyHolderDetails: React.FC<PolicyHolderDetailsProps> = ({ selectedClaimant, onSelectedClaimantChange }) => {
  const [selectedPolicyHolder, setSelectedPolicyHolder] = useState(new Set(['john-tan']));

  const handlePolicyHolderChange = (keys: any) => {
    if (keys === 'all') return;
    setSelectedPolicyHolder(new Set(keys));
  };

  return (
    <div className='mb-6 rounded-lg bg-white p-6'>
      <h3 className='mb-4 text-lg font-semibold text-gray-900'>Policy Holder Details</h3>
      <div className='space-y-4'>
        <Select
          className='max-w-xs'
          label='Policy Holder'
          placeholder='Select policy holder'
          radius='sm'
          selectedKeys={selectedPolicyHolder}
          onSelectionChange={handlePolicyHolderChange}
        >
          <SelectItem key='john-tan'>John Tan</SelectItem>
          <SelectItem key='amandeep-deep'>Amandeep Deep</SelectItem>
        </Select>

        <div className='mt-6'>
          <p className='mb-3 text-sm font-medium text-gray-900'>Is claimant same as Policy holder?</p>
          <RadioGroup
            className='gap-6'
            orientation='horizontal'
            value={selectedClaimant}
            onValueChange={onSelectedClaimantChange}
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
