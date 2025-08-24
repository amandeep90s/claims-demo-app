import { useState } from 'react';

import { AlliedWorldLogo, AuthLayout, SignInForm, VerifyOtpForm } from '@/components/auth';

type Step = 'login' | 'verify-otp';

const SigninPage = () => {
  const [step, setStep] = useState<Step>('login');
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [otpError, setOtpError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  console.log(userId);

  // Simulated login API call
  const handleLogin = async (data: { userId: string; password: string }) => {
    setIsLoading(true);
    setLoginError(undefined);
    setOtpError(undefined);
    try {
      // TODO: Replace with real API call
      // Simulate API: if userId contains 'fail', fail login; else, require OTP
      await new Promise((res) => setTimeout(res, 800));
      if (data.userId.includes('fail')) {
        throw new Error('Invalid credentials');
      }
      setUserId(data.userId);
      setStep('verify-otp');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated OTP verification
  const handleVerifyOtp = async (data: { otp: string }) => {
    setIsLoading(true);
    setOtpError(undefined);
    try {
      // TODO: Replace with real OTP verification API call
      await new Promise((res) => setTimeout(res, 800));
      if (data.otp !== '123456') {
        throw new Error('Invalid OTP');
      }
      // On success, you may redirect or show success UI
      alert('OTP verified!');
    } catch (err: any) {
      setOtpError(err.message || 'OTP verification failed');
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
      {step === 'login' ? (
        <SignInForm error={loginError} isLoading={isLoading} onSubmit={handleLogin} />
      ) : (
        <VerifyOtpForm
          error={otpError}
          isLoading={isLoading}
          onResendOTP={handleResendOtp}
          onSubmit={handleVerifyOtp}
        />
      )}
    </AuthLayout>
  );
};

export default SigninPage;
