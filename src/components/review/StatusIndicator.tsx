import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

type StatusType = 'active' | 'inactive' | 'pending' | 'expired' | 'warning';

interface StatusIndicatorProps {
  status: string;
  type?: StatusType;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, type = 'active' }) => {
  const getStatusConfig = (statusType: StatusType) => {
    switch (statusType) {
      case 'active':
        return {
          icon: <CheckCircleIcon className='h-4 w-4' />,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          dotColor: 'bg-green-500',
        };
      case 'pending':
        return {
          icon: <ExclamationTriangleIcon className='h-4 w-4' />,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          dotColor: 'bg-yellow-500',
        };
      case 'inactive':
      case 'expired':
        return {
          icon: <XCircleIcon className='h-4 w-4' />,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          dotColor: 'bg-red-500',
        };
      case 'warning':
        return {
          icon: <ExclamationTriangleIcon className='h-4 w-4' />,
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          dotColor: 'bg-orange-500',
        };
      default:
        return {
          icon: <CheckCircleIcon className='h-4 w-4' />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-500',
        };
    }
  };

  const config = getStatusConfig(type);

  return (
    <div className='flex items-center gap-2'>
      <div className={`h-2 w-2 rounded-full ${config.dotColor}`} />
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${config.bgColor} ${config.textColor}`}
      >
        {config.icon}
        {status}
      </span>
    </div>
  );
};
