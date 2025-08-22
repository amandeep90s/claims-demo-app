import AuthLayout from '@/layouts/auth-layout';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      subtitle="Enter your email and we'll send you a link to reset your password."
      title='Forgot your password?'
    >
      <div className='text-center'>
        <p className='text-lg font-semibold text-gray-900'>Forgot Password Page</p>
        <p className='mt-2 text-sm text-gray-600'>Form will be added here later</p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
