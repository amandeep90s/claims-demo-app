import { TimeInput as HeroTimeInput, TimeInputProps as HeroTimeInputProps } from '@heroui/react';
import { CalendarDateTime, Time, ZonedDateTime, parseTime } from '@internationalized/date';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/helpers';

export interface TimePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<HeroTimeInputProps, 'value' | 'onChange'> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  required?: boolean;
}

export const TimePickerField = <
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
}: TimePickerFieldProps<TFieldValues, TName>) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          // Ensure field value is always a string (empty string if undefined/null)
          const fieldValue = field.value || '';

          // Convert string value to Time object for TimeInput
          const timeValue = fieldValue ? parseTime(fieldValue) : null;

          // Handle time change and convert back to string
          const handleTimeChange = (value: Time | CalendarDateTime | ZonedDateTime | null) => {
            if (value instanceof Time) {
              field.onChange(value.toString());
            } else if (value instanceof CalendarDateTime) {
              field.onChange(value.toString());
            } else if (value instanceof ZonedDateTime) {
              field.onChange(value.toString());
            } else {
              field.onChange('');
            }
          };

          return (
            <HeroTimeInput
              classNames={{
                ...classNames,
              }}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              label={
                <span className={cn(required && "after:ml-1 after:text-red-500 after:content-['*']")}>{label}</span>
              }
              value={timeValue}
              onChange={handleTimeChange}
              {...props}
            />
          );
        }}
      />
    </div>
  );
};

TimePickerField.displayName = 'TimePickerField';
