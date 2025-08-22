import AuthLayout from '@/layouts/auth-layout';

const VerifyOtpPage = () => {
  return (
    <AuthLayout subtitle="We've sent a 6-digit verification code to your email." title='Verify your email'>
      <div className='text-center'>
        <p className='text-lg font-semibold text-gray-900'>Verify OTP Page</p>
        <p className='mt-2 text-sm text-gray-600'>Form will be added here later</p>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
