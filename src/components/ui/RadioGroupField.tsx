import { RadioGroupProps as HeroRadioGroupProps, Radio, RadioGroup } from '@heroui/react';
import { Control, Controller, FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

import { cn } from '@/utils/helpers';

export interface RadioGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<HeroRadioGroupProps, 'value' | 'onValueChange'> {
  name: TName;
  control?: Control<TFieldValues>;
  register?: UseFormRegister<TFieldValues>;
  label: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  required?: boolean;
}

export const RadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  register,
  label,
  options,
  className,
  classNames,
  required,
  ...props
}: RadioGroupFieldProps<TFieldValues, TName>) => {
  if (control) {
    return (
      <div className={cn('space-y-2', className)}>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <RadioGroup
              classNames={{
                ...classNames,
              }}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              label={
                <span className={cn(required && "after:ml-1 after:text-red-500 after:content-['*']")}>{label}</span>
              }
              value={field.value || ''}
              onValueChange={field.onChange}
              {...props}
            >
              {options.map((option) => (
                <Radio key={option.value} isDisabled={option.disabled} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
      </div>
    );
  }

  if (register) {
    return (
      <div className={cn('space-y-2', className)}>
        <RadioGroup
          classNames={{
            ...classNames,
          }}
          label={<span className={cn(required && "after:ml-1 after:text-red-500 after:content-['*']")}>{label}</span>}
          {...props}
          {...register(name)}
        >
          {options.map((option) => (
            <Radio key={option.value} isDisabled={option.disabled} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    );
  }

  return null;
};

RadioGroupField.displayName = 'RadioGroupField';
