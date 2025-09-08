import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
  label: string;
  path: string;
}

interface ClaimsSidebarProps {
  items?: SidebarItem[];
}

const ClaimsSidebar: React.FC<ClaimsSidebarProps> = ({ items }) => {
  const location = useLocation();

  const defaultItems: SidebarItem[] = [
    { label: 'Claim Type', path: '/claims/claim-type' },
    { label: 'Policy Details', path: '/claims/policy-details' },
    { label: 'Claimant Details', path: '/claims/claimant-details' },
    { label: 'Incident Details', path: '/claims/incident-details' },
    { label: 'Submit Details', path: '/claims/submit-details' },
    { label: 'Review', path: '/claims/review' },
  ];

  const sidebarItems = items || defaultItems;

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className='min-h-[calc(100vh-73px)] w-80 border-r border-gray-200 bg-white'>
      <div className='p-6'>
        <nav className='space-y-1'>
          <div className='py-2'>
            <h3 className='text-xs font-semibold tracking-wide text-gray-500 uppercase'>Claim Details</h3>
          </div>
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              className={`flex items-center rounded-md px-3 py-2 text-sm ${
                isActivePath(item.path) ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default ClaimsSidebar;
