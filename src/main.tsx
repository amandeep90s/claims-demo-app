import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter removed, handled by RouterProvider in AppRoutes

import '@/styles/globals.css';

import { AppProvider } from '@/provider';
import { AppRoutes } from '@/routes';

import '@/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
