import type { SignInFormProps } from '@/types/auth';

import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { FormField } from '@/components/ui';
import { signInSchema, type SignInFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export default function SignInForm({ onSubmit, isLoading: externalLoading, error: externalError }: SignInFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData>(
    createFormConfig(signInSchema, {
      defaultValues: {
        userId: '',
        password: '',
      },
    })
  );

  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onFormSubmit = async (data: SignInFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log('Sign in data:', data);
        // Add your sign in logic here
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <Card className={cn('w-full max-w-md rounded-sm border border-gray-200 bg-white shadow')}>
      <CardBody className={cn('p-8')}>
        <div className={cn('mb-6')}>
          <h1 className={cn('mb-2 text-2xl font-semibold text-gray-800')}>Sign in to your account</h1>
          <p className={cn('text-sm text-gray-600')}>Enter your User ID and password to continue</p>
        </div>

        <form className={cn('space-y-6')} onSubmit={handleSubmit(onFormSubmit)}>
          {/* Error Message */}
          {error && (
            <div className={cn('border-error/20 bg-error/10 text-error', 'rounded-md border px-4 py-3 text-sm')}>
              {error}
            </div>
          )}

          {/* User ID Field */}
          <FormField
            id='userId'
            label='User ID'
            type='email'
            {...register('userId')}
            required
            endContent={
              <InformationCircleIcon className={cn('pointer-events-none h-5 w-5 flex-shrink-0 text-gray-400')} />
            }
            error={errors.userId}
            isDisabled={isLoading}
          />

          {/* Password Field */}
          <FormField
            id='password'
            label='Password'
            type={isVisible ? 'text' : 'password'}
            {...register('password')}
            required
            endContent={
              <button
                className={cn('flex-shrink-0 focus:outline-none')}
                disabled={isLoading}
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon className={cn('h-5 w-5 text-gray-400')} />
                ) : (
                  <EyeIcon className={cn('h-5 w-5 text-gray-400')} />
                )}
              </button>
            }
            error={errors.password}
            isDisabled={isLoading}
          />

          {/* Forgot Password Link */}
          <div className={cn('flex justify-end')}>
            <Link
              className={cn('text-sm text-blue-600', 'transition-colors hover:text-teal-700')}
              to='/forgot-password'
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            className={cn('w-full rounded-sm py-3 text-base font-bold text-white', 'transition-colors')}
            color='primary'
            disabled={isLoading}
            isLoading={isLoading}
            size='lg'
            type='submit'
          >
            {isLoading ? 'Signing in...' : 'Continue'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
