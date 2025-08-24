import type { VerifyOtpFormProps } from '@/types/auth';

import { Button, Card, CardBody } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@/components/ui';
import { completeSignupSchema, type CompleteSignupFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';

export default function VerifyOtpForm({
  onSubmit,
  onResendOTP,
  isLoading: externalLoading,
  error: externalError,
}: VerifyOtpFormProps) {
  const [isResending, setIsResending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CompleteSignupFormData>(
    createFormConfig(completeSignupSchema, {
      defaultValues: {
        otp: '',
      },
    })
  );
  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: CompleteSignupFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
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

  return (
    <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
      <CardBody className='p-8'>
        <div className='mb-6'>
          <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Verify your account</h1>
          <p className='text-sm text-gray-600'>Enter the 6-digit verification code sent to your email or phone.</p>
        </div>
        <form className='space-y-6' onSubmit={handleSubmit(onFormSubmit)}>
          {/* Error Message */}
          {error && (
            <div className='border-error/20 bg-error/10 text-error rounded-md border px-4 py-3 text-sm'>{error}</div>
          )}
          {/* OTP Field */}
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
          {/* Submit Button */}
          <Button
            className='w-full rounded-sm py-3 text-base font-bold text-white'
            color='primary'
            disabled={isLoading}
            isLoading={isLoading}
            size='lg'
            type='submit'
          >
            {isLoading ? 'Verifying...' : 'Verify'}
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
        </form>
      </CardBody>
    </Card>
  );
}
