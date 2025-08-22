import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600'>
            <span className='text-xl font-bold text-white'>C</span>
          </div>
        </div>
        {title && <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>{title}</h2>}
        {subtitle && <p className='mt-2 text-center text-sm text-gray-600'>{subtitle}</p>}
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
