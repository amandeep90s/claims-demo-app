import {
  ClipboardDocumentListIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  IdentificationIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Listbox, ListboxItem, Selection } from '@heroui/react';

import { type ClaimStep } from '@/store/claimsFormStore';

interface SidebarStepperProps {
  currentStep: ClaimStep;
  completedSteps: ClaimStep[];
  onStepClick?: (step: ClaimStep) => void;
}

const steps = [
  {
    key: 'claim-type',
    label: 'Claim Type',
    icon: ClipboardDocumentListIcon,
  },
  {
    key: 'policy-details',
    label: 'Policy Details',
    icon: ShieldCheckIcon,
  },
  {
    key: 'claimant-details',
    label: 'Claimant Details',
    icon: IdentificationIcon,
  },
  {
    key: 'incident-type',
    label: 'Incident Type',
    icon: ExclamationCircleIcon,
  },
  {
    key: 'incident-details',
    label: 'Incident Details',
    icon: ExclamationTriangleIcon,
  },
  {
    key: 'review-details',
    label: 'Review',
    icon: EyeIcon,
  },
] as const;

export default function SidebarStepper({ currentStep, completedSteps, onStepClick }: SidebarStepperProps) {
  const handleSelectionChange = (keys: Selection) => {
    if (keys instanceof Set && keys.size > 0) {
      const selectedKey = Array.from(keys)[0] as ClaimStep;

      // Only allow clicking on completed steps
      if (completedSteps.includes(selectedKey) && onStepClick) {
        onStepClick(selectedKey);
      }
    }
  };

  // Calculate disabled keys (steps that are not completed and not current)
  const disabledKeys = steps
    .filter((step) => {
      const isCompleted = completedSteps.includes(step.key as ClaimStep);
      const isCurrent = step.key === currentStep;

      return !isCompleted && !isCurrent;
    })
    .map((step) => step.key);

  return (
    <div className='w-80 border-r border-gray-200 bg-white shadow-lg'>
      {/* Header Section */}
      <div className='border-b border-gray-200 bg-gray-50 px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded bg-red-500'>
            <svg className='h-5 w-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path
                clipRule='evenodd'
                d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z'
                fillRule='evenodd'
              />
            </svg>
          </div>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Personal / Travel Claim</h2>
            <p className='text-sm text-gray-600'>Policy #: AW-SG-12345678</p>
          </div>
        </div>
      </div>

      {/* Steps Navigation using HeroUI Listbox */}
      <div className='py-6'>
        <Listbox
          aria-label='Claim filing steps'
          className='p-0'
          disabledKeys={new Set(disabledKeys)}
          itemClasses={{
            base: 'px-6 py-3 data-[selected=true]:bg-red-50 data-[selected=true]:border-r-2 data-[selected=true]:border-red-500',
          }}
          selectedKeys={new Set([currentStep])}
          selectionMode='single'
          onSelectionChange={handleSelectionChange}
        >
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.key as ClaimStep);
            const isCurrent = step.key === currentStep;
            const isDisabled = !isCompleted && !isCurrent;
            const Icon = step.icon;

            return (
              <ListboxItem
                key={step.key}
                className={`${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                startContent={
                  <div className='mr-2 flex-shrink-0'>
                    {isCompleted ? (
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-500'>
                        <CheckIcon className='h-4 w-4 text-white' />
                      </div>
                    ) : (
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          isCurrent ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className='h-4 w-4' />
                      </div>
                    )}
                  </div>
                }
              >
                <div className='min-w-0 flex-1'>
                  <h3
                    className={`text-sm font-medium ${
                      isCurrent ? 'text-red-700' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </h3>
                </div>
              </ListboxItem>
            );
          })}
        </Listbox>
      </div>
    </div>
  );
}
