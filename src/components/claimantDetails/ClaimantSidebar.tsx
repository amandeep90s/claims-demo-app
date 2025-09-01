import React from 'react';
import { Link } from 'react-router-dom';

const ClaimantSidebar: React.FC = () => {
  return (
    <aside className='min-h-[calc(100vh-73px)] w-80 border-r border-gray-200 bg-white'>
      <div className='p-6'>
        <nav className='space-y-1'>
          <div className='py-2'>
            <h3 className='text-xs font-semibold tracking-wide text-gray-500 uppercase'>Claim Details</h3>
          </div>
          <Link className='flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100' to='/'>
            Claim Type
          </Link>
          <Link className='flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100' to='/'>
            Policy Details
          </Link>
          <Link className='flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600' to='/'>
            Claimant Details
          </Link>
          <Link className='flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100' to='/'>
            Incident Details
          </Link>
          <Link className='flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100' to='/'>
            Submit Details
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default ClaimantSidebar;
