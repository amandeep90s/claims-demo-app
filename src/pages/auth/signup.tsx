import AuthLayout from '@/layouts/auth-layout';

const SignupPage = () => {
  return (
    <AuthLayout subtitle='Create your account to get started.' title='Create your account'>
      <div className='text-center'>
        <p className='text-lg font-semibold text-gray-900'>Sign Up Page</p>
        <p className='mt-2 text-sm text-gray-600'>Form will be added here later</p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
