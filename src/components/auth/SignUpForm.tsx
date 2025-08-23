import type { SignUpFormProps } from '@/types/auth';

import {
  CheckCircleIcon,
  IdentificationIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody, Modal, ModalBody, ModalContent } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { FormField } from '@/components/ui';
import { signUpSchema, type SignUpFormData } from '@/schemas/auth';
import { createFormConfig } from '@/utils/forms';

export default function SignUpForm({ onSubmit, isLoading: externalLoading, error: externalError }: SignUpFormProps) {
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>(
    createFormConfig(signUpSchema, {
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        personalId: '',
        mobileNumber: '',
      },
    })
  );

  const isLoading = externalLoading || isSubmitting;
  const error = externalError;

  const onFormSubmit = async (data: SignUpFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Add your sign up logic here
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
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField
                {...register('firstName')}
                required
                endContent={<UserIcon className='pointer-events-none h-5 w-5 flex-shrink-0 text-gray-400' />}
                error={errors.firstName}
                id='firstName'
                isDisabled={isLoading}
                label='First Name'
                type='text'
              />
              <FormField
                {...register('lastName')}
                required
                endContent={<UserIcon className='pointer-events-none h-5 w-5 flex-shrink-0 text-gray-400' />}
                error={errors.lastName}
                id='lastName'
                isDisabled={isLoading}
                label='Last Name'
                type='text'
              />
            </div>

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

            {/* Personal ID Field */}
            <FormField
              {...register('personalId')}
              required
              endContent={<IdentificationIcon className='pointer-events-none h-5 w-5 flex-shrink-0 text-gray-400' />}
              error={errors.personalId}
              id='personalId'
              isDisabled={isLoading}
              label='Personal ID'
              type='text'
            />

            {/* Mobile Number Field */}
            <FormField
              {...register('mobileNumber')}
              endContent={<PhoneIcon className='pointer-events-none h-5 w-5 flex-shrink-0 text-gray-400' />}
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
