import AuthLayout from '@/layouts/auth-layout';

const CompleteSignupPage = () => {
  return (
    <AuthLayout
      subtitle='Your account has been created successfully! Complete your profile to get started.'
      title='Complete your signup'
    >
      <div className='text-center'>
        <p className='text-lg font-semibold text-gray-900'>Complete Signup Page</p>
        <p className='mt-2 text-sm text-gray-600'>Form will be added here later</p>
      </div>
    </AuthLayout>
  );
};

export default CompleteSignupPage;
