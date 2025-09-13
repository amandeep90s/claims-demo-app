import React from 'react';

import { ReviewField } from './ReviewField';

interface DataGridProps {
  data: Array<{
    label: string;
    value: string | React.ReactNode;
    isHighlighted?: boolean;
  }>;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const DataGrid: React.FC<DataGridProps> = ({ data, columns = 3, className = '' }) => {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <dl className={`grid gap-6 ${gridClass[columns]} ${className}`}>
      {data.map((item, index) => (
        <ReviewField key={index} isHighlighted={item.isHighlighted} label={item.label} value={item.value} />
      ))}
    </dl>
  );
};
