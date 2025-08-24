import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

/**
 * Creates form configuration with default options optimized for the app
 */
export function createFormConfig<T extends z.ZodType<any, any, any>>(
  schema: T,
  options?: Partial<UseFormProps<z.infer<T>>>
): UseFormProps<z.infer<T>> {
  return {
    resolver: zodResolver(schema) as any,
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after first submission
    shouldFocusError: true,
    ...options,
  };
}

/**
 * Common form field styles for consistent UI
 */
export const formFieldStyles = {
  input: 'text-sm text-input-text',
  inputWrapper: [
    'border-gray-300 hover:border-gray-400',
    'focus-within:border-primary data-[hover=true]:border-gray-400',
    'rounded-sm h-12',
  ],
} as const;
