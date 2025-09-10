import { CheckIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { type ClaimStep } from '@/store/claimsFormStore';

interface StepperProps {
  currentStep: ClaimStep;
  completedSteps: ClaimStep[];
}

const steps = [
  { key: 'claim-type', label: 'Claim Type' },
  { key: 'policy-details', label: 'Policy Details' },
  { key: 'claimant-details', label: 'Claimant Details' },
  { key: 'incident-details', label: 'Incident Details' },
  { key: 'review-details', label: 'Review Details' },
] as const;

export default function Stepper({ currentStep, completedSteps }: StepperProps) {
  const getCurrentStepIndex = () => steps.findIndex((step) => step.key === currentStep);

  return (
    <div className='mb-8 w-full'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.key as ClaimStep);
          const isCurrent = step.key === currentStep;
          const isUpcoming = !isCompleted && !isCurrent;

          return (
            <React.Fragment key={step.key}>
              {/* Step */}
              <div className='flex flex-col items-center'>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : isCurrent
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className='h-5 w-5' />
                  ) : (
                    <span className='text-sm font-medium'>{index + 1}</span>
                  )}
                </div>
                <div
                  className={`mt-2 text-center text-sm font-medium ${
                    isCompleted
                      ? 'text-green-600'
                      : isCurrent
                        ? 'text-blue-600'
                        : isUpcoming
                          ? 'text-gray-400'
                          : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className='flex-1 px-4'>
                  <div
                    className={`h-0.5 transition-colors duration-200 ${
                      getCurrentStepIndex() > index ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
