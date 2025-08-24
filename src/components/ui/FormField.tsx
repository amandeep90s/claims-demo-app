import { Input, InputProps } from '@heroui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { formFieldStyles } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export interface FormFieldProps extends Omit<InputProps, 'errorMessage'> {
  label: string;
  error?: FieldError;
  required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, classNames, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        <label className={cn('block text-sm font-medium text-gray-700')} htmlFor={props.id || props.name}>
          {label}
        </label>
        <Input
          ref={ref}
          classNames={{
            input: cn(formFieldStyles.input),
            inputWrapper: cn(formFieldStyles.inputWrapper, classNames?.inputWrapper),
            ...classNames,
          }}
          errorMessage={error?.message}
          isInvalid={!!error}
          variant='bordered'
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';
