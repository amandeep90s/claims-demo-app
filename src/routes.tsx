import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

// Lazy load pages for better code splitting
const HomePage = lazy(() => import('@/pages/home'));
const SigninPage = lazy(() => import('@/pages/auth/signin'));
const SignupPage = lazy(() => import('@/pages/auth/signup'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password'));
const ClaimantDetailsPage = lazy(() => import('@/pages/claims/claimant-details'));
const FileClaimPage = lazy(() => import('@/pages/claims/file-claim'));

// Loading component
const LoadingSpinner = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
  </div>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/claims/claimant-details',
    element: <ClaimantDetailsPage />,
  },
  {
    path: '/claims/file-claim',
    element: <FileClaimPage />,
  },
];

const router = createBrowserRouter(routes);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
