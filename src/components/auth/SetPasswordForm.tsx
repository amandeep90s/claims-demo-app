import type { SetPasswordFormProps } from '@/types/auth';

import { Button, Card, CardBody, Textarea } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { PasswordField } from '@/components/ui';
import { setPasswordSchema, type SetPasswordFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';

export default function SetPasswordForm({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}: SetPasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<SetPasswordFormData>(
    createFormConfig(setPasswordSchema, {
      defaultValues: {
        password: '',
        confirmPassword: '',
        securityQuestion1: '',
        securityQuestion2: '',
      },
    })
  );

  const password = watch('password');
  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: SetPasswordFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Add your set password logic here
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
            <h1 className='mb-4 text-2xl font-semibold text-gray-800'>Password Set Successfully</h1>
            <p className='mb-6 text-sm text-gray-600'>
              Your password and security questions have been set successfully. You can now sign in to your account.
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

  return (
    <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
      <CardBody className='p-8'>
        <div className='mb-6'>
          <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Set your password</h1>
          <p className='text-sm text-gray-600'>
            Create a strong password and set up security questions for your account
          </p>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit(onFormSubmit)}>
          {/* Error Message */}
          {error && (
            <div className='border-error/20 bg-error/10 text-error rounded-md border px-4 py-3 text-sm'>{error}</div>
          )}

          {/* Password Field */}
          <PasswordField
            {...register('password')}
            required
            showValidationIndicators
            error={errors.password}
            id='password'
            isDisabled={isLoading}
            label='Password'
            value={password}
          />

          {/* Confirm Password Field */}
          <PasswordField
            {...register('confirmPassword')}
            required
            error={errors.confirmPassword}
            id='confirmPassword'
            isDisabled={isLoading}
            label='Confirm Password'
            showValidationIndicators={false}
          />

          {/* Security Questions */}
          <div className='space-y-4'>
            <h3 className='text-sm font-medium text-gray-700'>Security Questions</h3>
            <p className='text-xs text-gray-500'>
              Please provide answers to two different security questions. These will be used to verify your identity if
              you forget your password.
            </p>

            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700' htmlFor='securityQuestion1'>
                  What is the name of your first pet? <span className='text-red-500'>*</span>
                </label>
                <Textarea
                  {...register('securityQuestion1')}
                  className='w-full'
                  id='securityQuestion1'
                  isDisabled={isLoading}
                  isInvalid={!!errors.securityQuestion1}
                  maxRows={2}
                  minRows={1}
                  placeholder='Enter your answer'
                  variant='bordered'
                />
                {errors.securityQuestion1 && (
                  <p className='mt-1 text-xs text-red-600'>{errors.securityQuestion1.message}</p>
                )}
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700' htmlFor='securityQuestion2'>
                  What is the name of the city where you were born? <span className='text-red-500'>*</span>
                </label>
                <Textarea
                  {...register('securityQuestion2')}
                  className='w-full'
                  id='securityQuestion2'
                  isDisabled={isLoading}
                  isInvalid={!!errors.securityQuestion2}
                  maxRows={2}
                  minRows={1}
                  placeholder='Enter your answer'
                  variant='bordered'
                />
                {errors.securityQuestion2 && (
                  <p className='mt-1 text-xs text-red-600'>{errors.securityQuestion2.message}</p>
                )}
              </div>
            </div>
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
            {isLoading ? 'Setting Password...' : 'Set Password'}
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
