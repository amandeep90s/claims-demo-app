import AuthLayout from '@/layouts/auth-layout';

const ResetPasswordPage = () => {
  return (
    <AuthLayout subtitle='Enter your new password below.' title='Reset your password'>
      <div className='text-center'>
        <p className='text-lg font-semibold text-gray-900'>Reset Password Page</p>
        <p className='mt-2 text-sm text-gray-600'>Form will be added here later</p>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
