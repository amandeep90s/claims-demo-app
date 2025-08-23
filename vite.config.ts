import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom', 'react-router'],
          'vendor-ui': ['@heroui/react', '@heroui/theme'],
          'vendor-icons': ['@heroicons/react'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-query': ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'framer-motion'],
          // App chunks
          'auth-components': [
            './src/components/auth/SignInForm',
            './src/components/auth/SignUpForm',
            './src/components/auth/ForgotPasswordForm',
            './src/components/auth/ResetPasswordForm',
            './src/components/auth/SetPasswordForm',
            './src/components/auth/CompleteSignupForm',
            './src/components/auth/AuthLayout',
            './src/components/auth/AlliedWorldLogo',
          ],
          'ui-components': ['./src/components/ui/FormField', './src/components/ui/PasswordField'],
          utils: ['./src/utils/forms', './src/utils/helpers', './src/schemas/auth', './src/types/auth'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable source maps for better debugging
    sourcemap: false,
  },
});
