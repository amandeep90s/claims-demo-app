import { Textarea, type TextAreaProps } from '@heroui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { formFieldStyles } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export interface TextareaFieldProps extends Omit<TextAreaProps, 'errorMessage'> {
  label: string;
  error?: FieldError;
  required?: boolean;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, className, classNames, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        <Textarea
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

TextareaField.displayName = 'TextareaField';
