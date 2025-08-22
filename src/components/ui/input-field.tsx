import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel';
  label: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  required = false,
  autoComplete,
  maxLength,
  pattern,
  className = '',
}) => {
  const baseInputClasses =
    'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm';

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700' htmlFor={id}>
        {label}
      </label>
      <div className='mt-1'>
        <input
          required={required}
          autoComplete={autoComplete}
          className={`${baseInputClasses} ${className}`.trim()}
          id={id}
          maxLength={maxLength}
          name={name}
          pattern={pattern}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  );
};
