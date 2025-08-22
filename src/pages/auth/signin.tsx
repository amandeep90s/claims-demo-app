import AuthLayout from '@/layouts/auth-layout';

const SigninPage = () => {
  return (
    <AuthLayout subtitle='Welcome back! Please enter your details.' title='Sign in to your account'>
      <div className='text-center'>
        <p className='text-lg font-semibold text-gray-900'>Sign In Page</p>
        <p className='mt-2 text-sm text-gray-600'>Form will be added here later</p>
      </div>
    </AuthLayout>
  );
};

export default SigninPage;
