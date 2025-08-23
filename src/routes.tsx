import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages for better code splitting
const HomePage = lazy(() => import('@/pages/home'));
const SigninPage = lazy(() => import('@/pages/auth/signin'));
const SignupPage = lazy(() => import('@/pages/auth/signup'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password'));
const SetPasswordPage = lazy(() => import('@/pages/auth/set-password'));
const CompleteSignupPage = lazy(() => import('@/pages/auth/complete-signup'));
const VerifyOtpPage = lazy(() => import('@/pages/auth/verify-otp'));

// Loading component
const LoadingSpinner = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
  </div>
);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}
