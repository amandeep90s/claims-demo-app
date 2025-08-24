import type { CompleteSignupFormProps } from '@/types/auth';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody } from '@heroui/react';

import { FormField } from '@/components/ui';
import { completeSignupSchema, type CompleteSignupFormData } from '@/schemas/auth';
import { useAuthFormStore } from '@/store/authFormStore';
import { createFormConfig } from '@/utils/forms';

export default function CompleteSignupForm({
  onSubmit,
  onResendOTP,
  isLoading: externalLoading,
  error: externalError,
}: CompleteSignupFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { completeSignup, setCompleteSignup } = useAuthFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<CompleteSignupFormData>(
    createFormConfig(completeSignupSchema, {
      defaultValues: {
        otp: completeSignup.otp || '',
      },
    })
  );

  // Persist form values to store on change
  useEffect(() => {
    const subscription = (values: any) => setCompleteSignup(values);
    const unsubscribe = (reset as any)._updateStore?.subscribe(subscription);

    return () => unsubscribe?.();
  }, [setCompleteSignup, reset]);

  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: CompleteSignupFormData) => {
    setCompleteSignup(data);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const handleResendOTP = async () => {
    if (onResendOTP) {
      setIsResending(true);
      try {
        await onResendOTP();
      } catch (error) {
        setError('root', {
          type: 'manual',
          message: error instanceof Error ? error.message : 'Failed to resend OTP',
        });
      } finally {
        setIsResending(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
        <CardBody className='p-8'>
          <div className='text-center'>
            <CheckCircleIcon className='mx-auto h-16 w-16 text-green-500' />
            <h1 className='mt-4 text-2xl font-semibold text-gray-800'>Account Verified Successfully</h1>
            <p className='mt-2 text-sm text-gray-600'>Your email has been verified and your account is now active.</p>
            <Link
              className='bg-primary hover:bg-primary/90 mt-6 inline-flex w-full justify-center rounded-sm px-4 py-3 text-base font-bold text-white transition-colors'
              to='/signin'
            >
              Sign In
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
      <CardBody className='p-8'>
        <div className='mb-6'>
          <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Verify your email</h1>
          <p className='text-sm text-gray-600'>
            We&apos;ve sent a 6-digit verification code to your email. Please enter it below to complete your signup.
          </p>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit(onFormSubmit)}>
          {/* Error Message */}
          {error && (
            <div className='border-error/20 bg-error/10 text-error rounded-md border px-4 py-3 text-sm'>{error}</div>
          )}

          {/* OTP Field */}
          <div className='space-y-2'>
            <FormField
              label='Verification Code'
              {...register('otp')}
              error={errors.otp}
              id='otp'
              isDisabled={isLoading}
              isInvalid={!!errors.otp}
              maxLength={6}
              placeholder='000000'
              size='lg'
              type='text'
              variant='bordered'
            />
          </div>

          {/* Submit Button */}
          <Button
            className='w-full rounded-sm py-3 text-base font-bold text-white'
            color='primary'
            disabled={isLoading}
            isLoading={isLoading}
            size='lg'
            type='submit'
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>

          {/* Resend OTP */}
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Didn&apos;t receive the code?{' '}
              <button
                className='text-blue-600 transition-colors hover:text-teal-700 disabled:opacity-50'
                disabled={isResending || isLoading}
                type='button'
                onClick={handleResendOTP}
              >
                {isResending ? 'Sending...' : 'Resend'}
              </button>
            </p>
          </div>

          {/* Back to Sign In Link */}
          <div className='text-center'>
            <Link className='text-sm text-blue-600 transition-colors hover:text-teal-700' to='/signin'>
              Back to Sign In
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
