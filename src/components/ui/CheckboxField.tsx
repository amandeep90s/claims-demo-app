import { Checkbox as HeroCheckbox, CheckboxProps as HeroCheckboxProps } from '@heroui/react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/helpers';

export interface CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<HeroCheckboxProps, 'isSelected' | 'onValueChange'> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
}

export const CheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  className,
  classNames,
  required,
  ...props
}: CheckboxFieldProps<TFieldValues, TName>) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <HeroCheckbox
            classNames={{
              ...classNames,
            }}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            isSelected={field.value || false}
            onValueChange={field.onChange}
            {...props}
          >
            {label && (
              <span className={cn(required && "after:ml-1 after:text-red-500 after:content-['*']")}>{label}</span>
            )}
          </HeroCheckbox>
        )}
      />
    </div>
  );
};

CheckboxField.displayName = 'CheckboxField';
