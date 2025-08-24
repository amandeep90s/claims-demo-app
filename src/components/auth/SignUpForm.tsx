import type { SignUpFormProps } from '@/types/auth';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardBody, Modal, ModalBody, ModalContent } from '@heroui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAuthFormStore } from '@/store/authFormStore';
import { FormField } from '@/components/ui';
import { signUpSchema, type SignUpFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';

export default function SignUpForm({ onSubmit, isLoading: externalLoading, error: externalError }: SignUpFormProps) {
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const { signUp, setSignUp } = useAuthFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignUpFormData>(
    createFormConfig(signUpSchema, {
      defaultValues: {
        firstName: signUp.firstName || '',
        lastName: signUp.lastName || '',
        email: signUp.email || '',
        personalId: signUp.personalId || '',
        mobileNumber: signUp.mobileNumber || '',
      },
    })
  );

  // Persist form values to store on change
  useEffect(() => {
    const subscription = (values: any) => setSignUp(values);
    const unsubscribe = (reset as any)._updateStore?.subscribe(subscription);

    return () => unsubscribe?.();
  }, [setSignUp, reset]);

  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: SignUpFormData) => {
    setSignUp(data);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        setSubmittedEmail(data.email);
        setShowEmailVerificationModal(true);
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <>
      <Card className='w-full max-w-md rounded-sm border border-gray-200 bg-white shadow'>
        <CardBody className='p-8'>
          <div className='mb-6'>
            <h1 className='mb-2 text-2xl font-semibold text-gray-800'>Create your account</h1>
            <p className='text-sm text-gray-600'>Fill in your information to get started</p>
          </div>

          <form className='space-y-6' onSubmit={handleSubmit(onFormSubmit)}>
            {/* Error Message */}
            {error && (
              <div className='border-error/20 bg-error/10 text-error rounded-md border px-4 py-3 text-sm'>{error}</div>
            )}

            {/* Name Fields */}
            <FormField
              {...register('firstName')}
              error={errors.firstName}
              id='firstName'
              isDisabled={isLoading}
              label='First Name'
              type='text'
            />

            <FormField
              {...register('lastName')}
              error={errors.lastName}
              id='lastName'
              isDisabled={isLoading}
              label='Last Name'
              type='text'
            />

            {/* Email Field */}
            <FormField
              {...register('email')}
              error={errors.email}
              id='email'
              isDisabled={isLoading}
              label='Email Address'
              type='email'
            />

            {/* Personal ID Field */}
            <FormField
              {...register('personalId')}
              error={errors.personalId}
              id='personalId'
              isDisabled={isLoading}
              label='Personal ID'
              type='text'
            />

            {/* Mobile Number Field */}
            <FormField
              {...register('mobileNumber')}
              error={errors.mobileNumber}
              id='mobileNumber'
              isDisabled={isLoading}
              label='Mobile Number (Optional)'
              placeholder='+1234567890'
              type='tel'
            />

            {/* Submit Button */}
            <Button
              className='w-full rounded-sm py-3 text-base font-bold text-white transition-colors'
              color='primary'
              disabled={isLoading}
              isLoading={isLoading}
              size='lg'
              type='submit'
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Sign In Link */}
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <Link className='text-blue-600 transition-colors hover:text-teal-700' to='/signin'>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Email Verification Modal */}
      <Modal
        isOpen={showEmailVerificationModal}
        placement='center'
        size='md'
        onOpenChange={setShowEmailVerificationModal}
      >
        <ModalContent>
          <ModalBody className='p-8'>
            <div className='text-center'>
              <CheckCircleIcon className='mx-auto h-16 w-16 text-green-500' />
              <h2 className='mt-4 text-xl font-semibold text-gray-800'>Check Your Email</h2>
              <p className='mt-2 text-gray-600'>
                We&apos;ve sent a verification link to <span className='font-medium'>{submittedEmail}</span>
              </p>
              <p className='mt-4 text-sm text-gray-500'>
                Click the link in your email to verify your account and complete the signup process.
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
