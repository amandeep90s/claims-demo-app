import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import React from 'react';

interface ReviewSectionProps {
  title: string;
  icon?: React.ReactNode;
  onEdit?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ title, icon, onEdit, children, className = '' }) => {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}>
      <div className='border-b border-gray-100 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {icon && <div className='text-blue-600'>{icon}</div>}
            <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
          </div>
          {onEdit && (
            <Button
              className='font-medium text-blue-600 hover:bg-blue-50'
              size='sm'
              startContent={<PencilIcon className='h-4 w-4' />}
              variant='light'
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className='p-6'>{children}</div>
    </div>
  );
};
