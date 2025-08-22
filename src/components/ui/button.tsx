import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  onClick,
}) => {
  const baseClasses = 'rounded-md px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none';
  
  const variantClasses = {
    primary: 'flex w-full justify-center border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-blue-500',
    text: 'text-blue-600 hover:text-blue-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
