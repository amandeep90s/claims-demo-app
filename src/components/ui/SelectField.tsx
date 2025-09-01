import { Select, SelectItem, SelectProps } from '@heroui/react';
import { forwardRef, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

import { formFieldStyles } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export interface SelectOption {
  key: string;
  label: string;
}

export interface SelectFieldProps extends Omit<SelectProps, 'children' | 'errorMessage' | 'items'> {
  label: string;
  options: SelectOption[];
  error?: FieldError;
  placeholder?: string;
}

function SelectFieldComponent(
  { label, options, error, className, classNames, placeholder, ...props }: SelectFieldProps,
  ref: React.Ref<HTMLSelectElement>
): ReactElement {
  return (
    <Select
      ref={ref}
      className={className}
      classNames={{
        trigger: cn(formFieldStyles.inputWrapper, classNames?.trigger),
        value: cn('text-input-text text-sm', classNames?.value),
        popoverContent: 'z-[1000]',
        ...classNames,
      }}
      errorMessage={error?.message}
      isInvalid={!!error}
      items={options}
      label={label}
      placeholder={placeholder}
      radius='sm'
      variant='bordered'
      {...props}
    >
      {(option: SelectOption) => <SelectItem key={option.key}>{option.label}</SelectItem>}
    </Select>
  );
}

export const SelectField = forwardRef(SelectFieldComponent);
