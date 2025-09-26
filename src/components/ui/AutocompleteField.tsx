import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { forwardRef, ReactElement } from 'react';
import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form';

import { formFieldStyles } from '@/utils/forms';
import { cn } from '@/utils/helpers';

export interface AutocompleteOption {
  key: string;
  label: string;
  description?: string;
}

export interface AutocompleteFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  options: AutocompleteOption[];
  error?: FieldError;
  placeholder?: string;
  description?: string;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onSelectionChange?: (key: string | number | null) => void;
}

function AutocompleteFieldComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  {
    name,
    control,
    label,
    options,
    error,
    className,
    placeholder,
    description,
    isDisabled,
    isRequired,
    onSelectionChange,
  }: AutocompleteFieldProps<TFieldValues, TName>,
  _ref?: React.Ref<HTMLInputElement>
): ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur }, fieldState: { error: fieldError } }) => (
        <Autocomplete
          className={className}
          classNames={{
            base: 'w-full',
            listboxWrapper: 'max-h-[200px]',
            popoverContent: 'z-[1000]',
            selectorButton: cn(formFieldStyles.inputWrapper),
          }}
          description={description}
          errorMessage={error?.message || fieldError?.message}
          inputValue={value || ''}
          isDisabled={isDisabled}
          isInvalid={!!(error || fieldError)}
          isRequired={isRequired}
          items={options}
          label={label}
          placeholder={placeholder}
          radius='sm'
          selectedKey={value || null}
          size='lg'
          variant='bordered'
          onBlur={onBlur}
          onInputChange={onChange}
          onSelectionChange={(key) => {
            onChange(key);
            onSelectionChange?.(key);
          }}
        >
          {(option: AutocompleteOption) => (
            <AutocompleteItem key={option.key} description={option.description} textValue={option.label}>
              {option.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
}

export const AutocompleteField = forwardRef(AutocompleteFieldComponent) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: AutocompleteFieldProps<TFieldValues, TName> & {
    ref?: React.Ref<HTMLInputElement>;
  }
) => ReactElement;
