import React from 'react';

interface ReviewFieldProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

export const ReviewField: React.FC<ReviewFieldProps> = ({ label, value, className = '', isHighlighted = false }) => {
  return (
    <div className={`${className}`}>
      <dt className='mb-1 text-sm font-medium text-gray-600'>{label}</dt>
      <dd className={`text-sm ${isHighlighted ? 'font-semibold text-blue-600' : 'text-gray-900'} break-words`}>
        {value || '—'}
      </dd>
    </div>
  );
};
