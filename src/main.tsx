import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@/styles/globals.css';
import { Provider } from './provider.tsx';

import HomePage from '@/pages/home';
import SignInPage from '@/pages/signin';
import SignUpPage from '@/pages/signup';

// Root component that wraps everything with Provider
function AppWithProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppWithProvider>
        <HomePage />
      </AppWithProvider>
    ),
  },
  {
    path: '/signin',
    element: (
      <AppWithProvider>
        <SignInPage />
      </AppWithProvider>
    ),
  },
  {
    path: '/signup',
    element: (
      <AppWithProvider>
        <SignUpPage />
      </AppWithProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
