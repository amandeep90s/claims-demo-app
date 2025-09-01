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
        <Input
          ref={ref}
          classNames={{
            input: cn(formFieldStyles.input),
            inputWrapper: cn(formFieldStyles.inputWrapper, classNames?.inputWrapper),
            ...classNames,
          }}
          errorMessage={error?.message}
          isInvalid={!!error}
          label={label}
          size='lg'
          variant='bordered'
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';
