import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import React, { useState } from 'react';

import { ClaimantHeader, ClaimantSidebar, ExitClaimButton } from '@/components/claimantDetails';
import { ExitModal } from '@/components/common';

const ReviewPage: React.FC = () => {
  // Exit modal state
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const handleExitOpen = () => setExitModalOpen(true);
  const handleExitClose = () => setExitModalOpen(false);
  const handleExitConfirm = () => {
    // Navigate to dashboard (replace with your router logic)
    window.location.href = '/';
  };

  // Sample data - in a real app, this would come from state management or API
  const policyData = {
    policyNumber: 'AW-SG-123456789',
    policyHolderName: 'John Tan',
    productType: 'Travel Insurance',
    status: 'ACTIVE',
  };

  const claimantData = {
    name: 'John Tan',
    isClaimant: 'Yes',
    gender: 'Male',
    dateOfBirth: '15/03/1998',
    phoneNumber: '+65 - 67856438',
    email: 'John@example.com',
    addressLine1: 'Lorem ipsum',
    addressLine2: 'Lorem ipsum',
    city: 'Lorem ipsum',
    postalCode: 'Lorem ipsum',
    country: 'Singapore',
    isPolicyHolder: 'Yes',
    personalId: '2P347R2R',
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <ClaimantHeader />

      <div className='flex'>
        <ClaimantSidebar />

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <div className='w-full'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900'>Review</h2>
              <ExitClaimButton onClick={handleExitOpen} />
            </div>

            {/* Policy Details Section */}
            <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>Policy Details</h3>
                <Button
                  className='text-red-600 hover:bg-red-50'
                  size='sm'
                  startContent={<PencilIcon className='h-4 w-4' />}
                  variant='light'
                >
                  Edit
                </Button>
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Policy Number</p>
                  <p className='mt-1 text-sm text-gray-900'>{policyData.policyNumber}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Policy Holder Name</p>
                  <p className='mt-1 text-sm text-gray-900'>{policyData.policyHolderName}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Product Type</p>
                  <p className='mt-1 text-sm text-gray-900'>{policyData.productType}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Status</p>
                  <div className='mt-1 flex items-center'>
                    <div className='mr-2 h-2 w-2 rounded-full bg-green-500' />
                    <span className='text-sm text-gray-900'>{policyData.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Claimant Details Section */}
            <div className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>Claimant Details</h3>
                <Button
                  className='text-red-600 hover:bg-red-50'
                  size='sm'
                  startContent={<PencilIcon className='h-4 w-4' />}
                  variant='light'
                >
                  Edit
                </Button>
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Name</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.name}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Are you a Claimant?</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.isClaimant}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Gender</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.gender}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Date of Birth</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.dateOfBirth}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Phone Number</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.phoneNumber}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Email</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.email}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Address Line 1</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.addressLine1}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Address Line 2</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.addressLine2}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>City</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.city}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Postal Code</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.postalCode}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Country / Location</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.country}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Are you the policy holder?</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.isPolicyHolder}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Personal ID</p>
                  <p className='mt-1 text-sm text-gray-900'>{claimantData.personalId}</p>
                </div>
              </div>
            </div>

            {/* Exit Modal */}
            <ExitModal isOpen={isExitModalOpen} onClose={handleExitClose} onConfirm={handleExitConfirm} />

            {/* Navigation Buttons */}
            <div className='mt-8 flex justify-between'>
              <Button className='px-8' color='default' size='lg' variant='bordered'>
                Previous: Submit Details
              </Button>
              <Button className='px-8' color='primary' size='lg'>
                Submit Claim
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewPage;
