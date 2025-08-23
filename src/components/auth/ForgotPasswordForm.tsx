import type { ForgotPasswordFormProps } from '@/types/auth';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { FormField } from '@/components/ui';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';

export default function ForgotPasswordForm({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}: ForgotPasswordFormProps) {
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<ForgotPasswordFormData>(
    createFormConfig(forgotPasswordSchema, {
      defaultValues: {
        email: '',
      },
    })
  );

  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: ForgotPasswordFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Add your forgot password logic here
        setEmailSent(true);
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  if (emailSent) {
    return (
      <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
        <CardBody className='p-8'>
          <div className='text-center'>
            <h1 className='mb-4 text-2xl font-semibold text-gray-800'>Check Your Email</h1>
            <p className='mb-6 text-sm text-gray-600'>
              We have sent a password reset link to <span className='font-medium'>{getValues('email')}</span>
            </p>
            <p className='mb-6 text-sm text-gray-500'>
              If you do not receive an email within a few minutes, please check your spam folder or try again.
            </p>
            <div className='space-y-4'>
              <Button
                className='w-full rounded-sm py-3 text-base font-bold text-white'
                color='primary'
                size='lg'
                onPress={() => setEmailSent(false)}
              >
                Try Again
              </Button>
              <Link
                className='block text-center text-sm text-blue-600 transition-colors hover:text-teal-700'
                to='/signin'
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
      <CardBody className='p-8'>
        <div className='mb-6'>
          <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Forgot your password?</h1>
          <p className='text-sm text-gray-600'>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit(onFormSubmit)}>
          {/* Error Message */}
          {error && (
            <div className='border-error/20 bg-error/10 text-error rounded-md border px-4 py-3 text-sm'>{error}</div>
          )}

          {/* Email Field */}
          <FormField
            {...register('email')}
            required
            endContent={<InformationCircleIcon className='pointer-events-none h-5 w-5 flex-shrink-0 text-gray-400' />}
            error={errors.email}
            id='email'
            isDisabled={isLoading}
            label='Email Address'
            type='email'
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
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

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
