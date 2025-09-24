import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarStepper from './SidebarStepper';
import { ClaimantDetailsForm, ClaimTypeForm, IncidentDetailsForm, IncidentTypeForm, PolicyDetailsForm } from './steps';

import { ClaimantHeader, ExitClaimButton } from '@/components/claimantDetails';
import { ExitModal } from '@/components/common';
import ReviewPage from '@/pages/claims/review';
import {
  type ClaimantDetailsFormData,
  type ClaimTypeFormData,
  type IncidentDetailsFormData,
  type IncidentTypeFormData,
  type PolicyDetailsFormData,
  type ReviewDetailsFormData,
} from '@/schemas/claims';
import { type ClaimStep, useClaimsFormStore } from '@/store/claimsFormStore';
import { submitClaim } from '@/utils/mockAPI';

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

  const handleFinalSubmit = async (pdfResponse?: any) => {
    setIsSubmitting(true);
    try {
      const allData = getAllFormData();

      // Prepare the final claim submission payload
      const claimPayload = {
        ...allData,
        // Include PDF response if available
        ...(pdfResponse && {
          attachments: [
            {
              type: 'claim-review-pdf',
              fileId: pdfResponse.fileId,
              fileName: pdfResponse.fileName,
              fileUrl: pdfResponse.fileUrl,
              uploadedAt: pdfResponse.uploadedAt,
            },
          ],
        }),
        submittedAt: new Date().toISOString(),
        status: 'submitted',
      };

      // eslint-disable-next-line no-console
      console.log('Final claim submission with PDF:', claimPayload);

      if (pdfResponse) {
        // eslint-disable-next-line no-console
        console.log('📎 PDF attachment URL for final submission:', pdfResponse.fileUrl);
      }

      // Use the mock API for claim submission
      const claimResponse = await submitClaim(claimPayload);

      // eslint-disable-next-line no-console
      console.log('Claim submitted successfully:', claimResponse);

      alert(`Claim submitted successfully!${pdfResponse ? ' PDF document has been attached to your claim.' : ''}`);

      // Navigate to success page or dashboard
      navigate('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to submit claim:', error);

      // Provide more specific error message based on error type
      let errorMessage = 'Failed to submit claim. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('Upload failed')) {
          errorMessage = 'Failed to upload PDF document. Please try again.';
        } else if (error.message.includes('Claim submission failed')) {
          errorMessage = 'Failed to submit claim data. Please check your information and try again.';
        } else if (error.message.includes('PDF generation')) {
          errorMessage = 'Failed to generate PDF document. Please try again.';
        }
      }

      alert(errorMessage);
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

      case 'incident-type':
        return (
          <IncidentTypeForm
            canGoNext={canGoNext()}
            canGoPrevious={canGoPrevious()}
            isSubmitting={isSubmitting}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            onSubmit={(_data: IncidentTypeFormData) => handleStepSubmit('incident-type')}
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
          <ReviewPage
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
