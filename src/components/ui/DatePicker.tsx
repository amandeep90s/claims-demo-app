import { DatePicker as HeroDatePicker, DatePickerProps as HeroDatePickerProps } from '@heroui/react';
import { CalendarDate, CalendarDateTime, parseDate, ZonedDateTime } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { formFieldStyles } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<HeroDatePickerProps, 'errorMessage' | 'value' | 'onChange'> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  required?: boolean;
}

export const DatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  className,
  classNames,
  ...props
}: DatePickerProps<TFieldValues, TName>) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          // Ensure field value is always a string (empty string if undefined/null)
          const fieldValue = field.value || '';

          // Convert string value to CalendarDate for DatePicker
          const dateValue: CalendarDate | null = fieldValue ? parseDate(fieldValue) : null;

          // Handle date change and convert back to string
          const handleDateChange = (date: CalendarDate | CalendarDateTime | ZonedDateTime | null) => {
            field.onChange(date ? date.toString() : '');
          };

          // Handle blur to ensure empty string instead of undefined
          const handleBlur = () => {
            if (!field.value) {
              field.onChange('');
            }
            field.onBlur();
          };

          return (
            <I18nProvider locale='en-GB'>
              {/* @ts-expect-error - Version mismatch in @internationalized/date causes type conflicts */}
              <HeroDatePicker
                classNames={{
                  input: cn(formFieldStyles.input),
                  inputWrapper: cn(formFieldStyles.inputWrapper, classNames?.inputWrapper),
                  ...classNames,
                }}
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                label={label}
                size='lg'
                value={dateValue as any}
                variant='bordered'
                onBlur={handleBlur}
                onChange={handleDateChange}
                {...props}
              />
            </I18nProvider>
          );
        }}
      />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
