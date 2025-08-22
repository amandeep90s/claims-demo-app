import { createBrowserRouter } from 'react-router-dom';

import { AppProvider } from './provider';

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

// Helper function to wrap components with AppProvider
const withProvider = (Component: React.ComponentType) => (
  <AppProvider>
    <Component />
  </AppProvider>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withProvider(HomePage),
  },
  {
    path: '/auth/signin',
    element: withProvider(SigninPage),
  },
  {
    path: '/auth/signup',
    element: withProvider(SignupPage),
  },
  {
    path: '/auth/forgot-password',
    element: withProvider(ForgotPasswordPage),
  },
  {
    path: '/auth/reset-password',
    element: withProvider(ResetPasswordPage),
  },
  {
    path: '/auth/set-password',
    element: withProvider(SetPasswordPage),
  },
  {
    path: '/auth/complete-signup',
    element: withProvider(CompleteSignupPage),
  },
  {
    path: '/auth/verify-otp',
    element: withProvider(VerifyOtpPage),
  },
]);
