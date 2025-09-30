import { Input } from '@heroui/react';
import { forwardRef, ReactElement } from 'react';
import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form';

import { formFieldStyles } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export interface AmountFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  error?: FieldError;
  placeholder?: string;
  description?: string;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  currency?: string;
  locale?: string;
  maxDecimals?: number;
  onValueChange?: (value: string) => void;
}

/**
 * Formats a number as currency with proper thousands separators and decimal places
 */
function formatAmount(value: string | number, locale = 'en-US', maxDecimals = 2): string {
  if (!value && value !== 0) return '';

  const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

  if (isNaN(numValue)) return '';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(numValue);
}

/**
 * Removes formatting from amount string to get raw numeric value
 */
function parseAmount(formattedValue: string): string {
  if (!formattedValue) return '';

  // Remove all non-numeric characters except decimal point
  const cleaned = formattedValue.replace(/[^0-9.-]/g, '');

  // Handle multiple decimal points - keep only the first one
  const parts = cleaned.split('.');

  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }

  return cleaned;
}

/**
 * Validates if the input is a valid number format
 */
function isValidAmountInput(value: string): boolean {
  if (!value) return true;

  // Allow numbers, single decimal point, and negative sign at the beginning
  const regex = /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d*)?$/;
  const cleanValue = value.replace(/,/g, '');

  return regex.test(value) || /^-?\d*\.?\d*$/.test(cleanValue);
}

function AmountFieldComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  {
    name,
    control,
    label,
    error,
    className,
    placeholder = '0.00',
    description,
    isDisabled,
    isRequired,
    currency,
    locale = 'en-US',
    maxDecimals = 2,
    onValueChange,
  }: AmountFieldProps<TFieldValues, TName>,
  _ref?: React.Ref<HTMLInputElement>
): ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur, name: fieldName }, fieldState: { error: fieldError } }) => (
        <Input
          className={className}
          classNames={{
            input: cn(formFieldStyles.input, 'text-right'),
            inputWrapper: cn(formFieldStyles.inputWrapper),
          }}
          description={description}
          errorMessage={error?.message || fieldError?.message}
          isDisabled={isDisabled}
          isInvalid={!!(error || fieldError)}
          isRequired={isRequired}
          label={label}
          name={fieldName}
          placeholder={placeholder}
          radius='sm'
          size='lg'
          startContent={currency && <span className='text-default-400 text-sm'>{currency}</span>}
          type='text'
          value={value || ''}
          variant='bordered'
          onBlur={(e) => {
            const rawValue = parseAmount(e.target.value);
            const formattedValue = formatAmount(rawValue, locale, maxDecimals);

            // Show formatted value in the input
            e.target.value = formattedValue;

            // Update the form with the raw numeric value (or empty string if empty)
            const finalValue = rawValue || '';

            onChange(finalValue);
            onValueChange?.(finalValue);
            onBlur();
          }}
          onChange={(e) => {
            const inputValue = e.target.value;

            // Allow typing while maintaining some validation
            if (isValidAmountInput(inputValue)) {
              // Store raw value during typing (don't format until blur)
              const rawValue = parseAmount(inputValue);

              onChange(rawValue || '');
              onValueChange?.(rawValue || '');
            }
          }}
          onFocus={(e) => {
            // On focus, show the raw unformatted value for easier editing
            const rawValue = parseAmount(value || '');

            e.target.value = rawValue;
          }}
        />
      )}
    />
  );
}

export const AmountField = forwardRef(AmountFieldComponent) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: AmountFieldProps<TFieldValues, TName> & {
    ref?: React.Ref<HTMLInputElement>;
  }
) => ReactElement;
