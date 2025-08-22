import React from 'react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header */}
      <header className='bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex h-8 w-8 items-center justify-center rounded bg-blue-600'>
                <span className='text-sm font-bold text-white'>C</span>
              </div>
              <span className='ml-2 text-xl font-semibold text-gray-900'>Claims App</span>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700'>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='py-6'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>{children}</div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
