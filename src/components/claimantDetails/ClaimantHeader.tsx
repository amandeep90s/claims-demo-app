import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import React from 'react';

const ClaimantHeader: React.FC = () => {
  return (
    <header className='border-b border-gray-200 bg-white'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button className='rounded-lg p-2 hover:bg-gray-100'>
              <XMarkIcon className='h-5 w-5 text-gray-600' />
            </button>
            <h1 className='text-xl font-semibold text-gray-900'>Personal / Travel Claim</h1>
          </div>
          <Button className='text-red-600 hover:bg-red-50' color='danger' size='sm' variant='ghost'>
            Exit Claim
          </Button>
        </div>
        <div className='mt-2'>
          <p className='text-sm text-gray-600'>Policy #: AW-SG-12345678</p>
        </div>
      </div>
    </header>
  );
};

export default ClaimantHeader;
