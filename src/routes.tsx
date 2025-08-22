import { Route, Routes } from 'react-router-dom';

import {
  CompleteSignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SetPasswordPage,
  SigninPage,
  SignupPage,
  VerifyOtpPage,
} from '@/pages/auth';
import HomePage from '@/pages/home';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomePage />} path='/' />
      <Route element={<SigninPage />} path='/signin' />
      <Route element={<SignupPage />} path='/signup' />
      <Route element={<ForgotPasswordPage />} path='/forgot-password' />
      <Route element={<ResetPasswordPage />} path='/reset-password' />
      <Route element={<SetPasswordPage />} path='/set-password' />
      <Route element={<CompleteSignupPage />} path='/complete-signup' />
      <Route element={<VerifyOtpPage />} path='/verify-otp' />
    </Routes>
  );
}
