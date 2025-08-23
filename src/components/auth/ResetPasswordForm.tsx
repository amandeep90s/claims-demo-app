import type { ResetPasswordFormProps } from '@/types/auth';

import { Button, Card, CardBody } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';

import { PasswordField } from '@/components/ui';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';

export default function ResetPasswordForm({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}: ResetPasswordFormProps) {
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const token = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<ResetPasswordFormData>(
    createFormConfig(resetPasswordSchema, {
      defaultValues: {
        token,
        password: '',
        confirmPassword: '',
      },
    })
  );

  const password = watch('password');
  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Add your reset password logic here
        setIsSuccess(true);
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  if (isSuccess) {
    return (
      <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
        <CardBody className='p-8'>
          <div className='text-center'>
            <h1 className='mb-4 text-2xl font-semibold text-gray-800'>Password Reset Successful</h1>
            <p className='mb-6 text-sm text-gray-600'>
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <Link
              className='bg-primary hover:bg-primary/90 inline-flex w-full justify-center rounded-sm px-4 py-3 text-base font-bold text-white transition-colors'
              to='/signin'
            >
              Sign In
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!token) {
    return (
      <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
        <CardBody className='p-8'>
          <div className='text-center'>
            <h1 className='mb-4 text-2xl font-semibold text-gray-800'>Invalid Reset Link</h1>
            <p className='mb-6 text-sm text-gray-600'>
              The password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              className='bg-primary hover:bg-primary/90 inline-flex w-full justify-center rounded-sm px-4 py-3 text-base font-bold text-white transition-colors'
              to='/forgot-password'
            >
              Request New Link
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
          <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Reset your password</h1>
          <p className='text-sm text-gray-600'>Enter your new password below</p>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit(onFormSubmit)}>
          {/* Error Message */}
          {error && (
            <div className='border-error/20 bg-error/10 text-error rounded-md border px-4 py-3 text-sm'>{error}</div>
          )}

          {/* Hidden Token Field */}
          <input {...register('token')} type='hidden' />

          {/* New Password Field */}
          <PasswordField
            {...register('password')}
            required
            showValidationIndicators
            error={errors.password}
            id='password'
            isDisabled={isLoading}
            label='New Password'
            value={password}
          />

          {/* Confirm Password Field */}
          <PasswordField
            {...register('confirmPassword')}
            required
            error={errors.confirmPassword}
            id='confirmPassword'
            isDisabled={isLoading}
            label='Confirm New Password'
            showValidationIndicators={false}
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
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
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
