import { useState } from 'react';

import { AlliedWorldLogo, AuthLayout, CompleteSignupForm, SetPasswordForm, SignUpForm } from '@/components/auth';

type Step = 'signup' | 'set-password' | 'complete-signup';

const SignupPage = () => {
  const [step, setStep] = useState<Step>('signup');
  const [signupError, setSignupError] = useState<string | undefined>(undefined);
  const [setPasswordError, setSetPasswordError] = useState<string | undefined>(undefined);
  const [completeError, setCompleteError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // You can store user info here if needed for later steps
  // const [userData, setUserData] = useState<any>(null);

  // Simulated signup API call
  const handleSignup = async (_data: any) => {
    setIsLoading(true);
    setSignupError(undefined);
    try {
      // TODO: Replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      setStep('set-password');
    } catch (err: any) {
      setSignupError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated set password API call
  const handleSetPassword = async (_data: any) => {
    setIsLoading(true);
    setSetPasswordError(undefined);
    try {
      // TODO: Replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      setStep('complete-signup');
    } catch (err: any) {
      setSetPasswordError(err.message || 'Set password failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated complete signup (OTP) API call
  const handleCompleteSignup = async (_data: any) => {
    setIsLoading(true);
    setCompleteError(undefined);
    try {
      // TODO: Replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      // On success, you may redirect or show a success UI
      alert('Signup complete!');
    } catch (err: any) {
      setCompleteError(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      alert('OTP resent!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AlliedWorldLogo />
      {step === 'signup' && <SignUpForm error={signupError} isLoading={isLoading} onSubmit={handleSignup} />}
      {step === 'set-password' && (
        <SetPasswordForm error={setPasswordError} isLoading={isLoading} onSubmit={handleSetPassword} />
      )}
      {step === 'complete-signup' && (
        <CompleteSignupForm
          error={completeError}
          isLoading={isLoading}
          onResendOTP={handleResendOtp}
          onSubmit={handleCompleteSignup}
        />
      )}
    </AuthLayout>
  );
};

export default SignupPage;
