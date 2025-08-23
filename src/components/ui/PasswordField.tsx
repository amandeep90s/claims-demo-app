'use client';

import { CheckIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { forwardRef, useState } from 'react';

import { FormField, FormFieldProps } from './FormField';

import { cn } from '@/utils/helpers';

export interface PasswordValidationRule {
  label: string;
  check: (password: string) => boolean;
  errorMatch?: string; // Optional: partial match for schema error messages
}

export interface PasswordFieldProps extends Omit<FormFieldProps, 'type' | 'endContent'> {
  showValidationIndicators?: boolean;
  validationRules?: PasswordValidationRule[];
  indicatorSize?: 'sm' | 'md' | 'lg';
  indicatorLayout?: 'horizontal' | 'vertical';
  value?: string; // For watching password value
}

// Default password validation rules
export const defaultPasswordRules: PasswordValidationRule[] = [
  {
    label: '8 Digits Long',
    check: (password: string) => password.length >= 8,
    errorMatch: 'at least 8 characters',
  },
  {
    label: 'Uppercase',
    check: (password: string) => /[A-Z]/.test(password),
    errorMatch: 'uppercase letter',
  },
  {
    label: 'Lowercase',
    check: (password: string) => /[a-z]/.test(password),
    errorMatch: 'lowercase letter',
  },
  {
    label: 'Numbers',
    check: (password: string) => /[0-9]/.test(password),
    errorMatch: 'number',
  },
  {
    label: 'Special Characters',
    check: (password: string) => /[^A-Za-z0-9]/.test(password),
    errorMatch: 'special character',
  },
];

// Helper function to get validation status for a password rule
const getPasswordRuleStatus = (password: string, rule: PasswordValidationRule) => {
  if (!password) return false;

  return rule.check(password);
};

// Get indicator size classes
const getIndicatorSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  const sizeClasses = {
    sm: {
      icon: 'h-3 w-3',
      text: 'text-xs',
    },
    md: {
      icon: 'h-4 w-4',
      text: 'text-sm',
    },
    lg: {
      icon: 'h-5 w-5',
      text: 'text-base',
    },
  };

  return sizeClasses[size];
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      showValidationIndicators = true,
      validationRules = defaultPasswordRules,
      indicatorSize = 'sm',
      indicatorLayout = 'horizontal',
      value = '',
      isDisabled,
      className,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const sizeClasses = getIndicatorSizeClasses(indicatorSize);

    const endContent = (
      <button
        className={cn('flex-shrink-0 focus:outline-none')}
        disabled={isDisabled}
        tabIndex={-1}
        type='button'
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <EyeSlashIcon className={cn('h-5 w-5 text-gray-400')} />
        ) : (
          <EyeIcon className={cn('h-5 w-5 text-gray-400')} />
        )}
      </button>
    );

    return (
      <div className={cn('space-y-2', className)}>
        <FormField
          ref={ref}
          endContent={endContent}
          isDisabled={isDisabled}
          type={isPasswordVisible ? 'text' : 'password'}
          {...props}
        />

        {/* Password Validation Indicators */}
        {showValidationIndicators && value && validationRules.length > 0 && (
          <div
            className={cn(
              'mt-1',
              indicatorLayout === 'horizontal' ? 'flex flex-wrap items-center gap-x-1' : 'space-y-1'
            )}
          >
            {validationRules.map((rule, index) => {
              const isValid = getPasswordRuleStatus(value, rule);

              return (
                <div
                  key={index}
                  className={cn('flex items-center', indicatorLayout === 'horizontal' ? 'space-x-1' : 'space-x-2')}
                >
                  {isValid ? (
                    <CheckIcon className={cn(sizeClasses.icon, 'text-green-500')} />
                  ) : (
                    <XMarkIcon className={cn(sizeClasses.icon, 'text-red-500')} />
                  )}
                  <span
                    className={cn(sizeClasses.text, isValid ? 'text-green-600' : 'text-red-600')}
                    style={
                      indicatorLayout === 'horizontal' && indicatorSize === 'sm' ? { fontSize: '10px' } : undefined
                    }
                  >
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
