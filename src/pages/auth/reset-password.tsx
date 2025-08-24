import { useEffect } from 'react';

import { AlliedWorldLogo, AuthLayout, ResetPasswordForm } from '@/components/auth';
import { useAuthFormStore } from '@/store/authFormStore';

const ResetPasswordPage = () => {
  const { resetSetPassword } = useAuthFormStore();

  useEffect(() => {
    return () => {
      resetSetPassword();
    };
  }, [resetSetPassword]);

  return (
    <AuthLayout>
      <AlliedWorldLogo />
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
