import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarStepper from './SidebarStepper';
import { ClaimantDetailsForm, ClaimTypeForm, IncidentDetailsForm, PolicyDetailsForm, ReviewDetailsForm } from './steps';

import { ClaimantHeader, ExitClaimButton } from '@/components/claimantDetails';
import { ExitModal } from '@/components/common';
import {
  type ClaimantDetailsFormData,
  type ClaimTypeFormData,
  type IncidentDetailsFormData,
  type PolicyDetailsFormData,
  type ReviewDetailsFormData,
} from '@/schemas/claims';
import { type ClaimStep, useClaimsFormStore } from '@/store/claimsFormStore';

export default function ClaimsStepper() {
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    currentStep,
    completedSteps,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
    markStepAsCompleted,
    setCurrentStep,
    getAllFormData,
  } = useClaimsFormStore();

  const handleExitOpen = () => setExitModalOpen(true);
  const handleExitClose = () => setExitModalOpen(false);
  const handleExitConfirm = () => {
    // Navigate to dashboard
    navigate('/');
  };

  const handleStepClick = (step: ClaimStep) => {
    // Only allow navigation to completed steps
    if (completedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const handleStepSubmit = (step: ClaimStep) => {
    markStepAsCompleted(step);
    if (step !== 'review-details') {
      goToNextStep();
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const allData = getAllFormData();

      // eslint-disable-next-line no-console
      console.log('Final claim submission:', allData);

      // Here you would normally send the data to your API
      // await submitClaim(allData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Claim submitted successfully!');
      // Navigate to success page or dashboard
      navigate('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to submit claim:', error);
      alert('Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case 'claim-type':
        return (
          <ClaimTypeForm
            canGoNext={canGoNext()}
            canGoPrevious={canGoPrevious()}
            isSubmitting={isSubmitting}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            onSubmit={(_data: ClaimTypeFormData) => handleStepSubmit('claim-type')}
          />
        );

      case 'policy-details':
        return (
          <PolicyDetailsForm
            canGoNext={canGoNext()}
            canGoPrevious={canGoPrevious()}
            isSubmitting={isSubmitting}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            onSubmit={(_data: PolicyDetailsFormData) => handleStepSubmit('policy-details')}
          />
        );

      case 'claimant-details':
        return (
          <ClaimantDetailsForm
            canGoNext={canGoNext()}
            canGoPrevious={canGoPrevious()}
            isSubmitting={isSubmitting}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            onSubmit={(_data: ClaimantDetailsFormData) => handleStepSubmit('claimant-details')}
          />
        );

      case 'incident-details':
        return (
          <IncidentDetailsForm
            canGoNext={canGoNext()}
            canGoPrevious={canGoPrevious()}
            isSubmitting={isSubmitting}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            onSubmit={(_data: IncidentDetailsFormData) => handleStepSubmit('incident-details')}
          />
        );

      case 'review-details':
        return (
          <ReviewDetailsForm
            canGoPrevious={canGoPrevious()}
            isSubmitting={isSubmitting}
            onFinalSubmit={handleFinalSubmit}
            onPrevious={goToPreviousStep}
            onSubmit={(_data: ReviewDetailsFormData) => handleStepSubmit('review-details')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <ClaimantHeader />

      <div className='flex'>
        {/* Sidebar with Stepper */}
        <SidebarStepper completedSteps={completedSteps} currentStep={currentStep} onStepClick={handleStepClick} />

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <div className='mx-auto max-w-4xl'>
            {/* Exit Button */}
            <div className='mb-6 flex justify-end'>
              <ExitClaimButton onClick={handleExitOpen} />
            </div>

            {/* Current Step Form with integrated navigation */}
            <div className='rounded-lg bg-white p-6 shadow-sm'>{renderCurrentStepForm()}</div>
          </div>
        </main>
      </div>

      {/* Exit Modal */}
      <ExitModal isOpen={isExitModalOpen} onClose={handleExitClose} onConfirm={handleExitConfirm} />
    </div>
  );
}
