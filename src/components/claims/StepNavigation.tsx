import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';

interface StepNavigationProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  isCurrentStepValid?: boolean;
  isSubmitting?: boolean;
  isLastStep?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinalSubmit?: () => void;
}

export default function StepNavigation({
  canGoPrevious,
  canGoNext,
  isCurrentStepValid = false,
  isSubmitting = false,
  isLastStep = false,
  onPrevious,
  onNext,
  onFinalSubmit,
}: StepNavigationProps) {
  const handleNextClick = () => {
    if (isLastStep && onFinalSubmit) {
      onFinalSubmit();
    } else {
      onNext?.();
    }
  };

  return (
    <div className='flex items-center justify-between pt-6'>
      <Button
        className='min-w-24'
        isDisabled={!canGoPrevious || isSubmitting}
        startContent={<ArrowLeftIcon className='h-4 w-4' />}
        variant='bordered'
        onPress={onPrevious}
      >
        Back
      </Button>

      <Button
        className='min-w-24'
        color='primary'
        endContent={<ArrowRightIcon className='h-4 w-4' />}
        // isDisabled={!isCurrentStepValid || isSubmitting || (!canGoNext && !isLastStep)}
        isLoading={isSubmitting}
        onPress={handleNextClick}
      >
        {isLastStep ? 'Submit Claim' : 'Next'}
      </Button>
    </div>
  );
}
