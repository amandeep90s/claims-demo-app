import { Alert, AlertProps as HeroAlertProps } from '@heroui/react';

import { cn } from '@/utils/helpers';

export interface AlertFieldProps extends Omit<HeroAlertProps, 'variant'> {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

export const AlertField = ({
  title,
  description,
  variant = 'default',
  className,
  classNames,
  ...props
}: AlertFieldProps) => {
  const getVariantProps = (variant: AlertFieldProps['variant']) => {
    switch (variant) {
      case 'destructive':
        return {
          color: 'danger' as const,
          title: title || 'Error',
        };
      case 'success':
        return {
          color: 'success' as const,
          title: title || 'Success',
        };
      case 'warning':
        return {
          color: 'warning' as const,
          title: title || 'Warning',
        };
      case 'info':
        return {
          color: 'primary' as const,
          title: title || 'Information',
        };
      default:
        return {
          color: 'default' as const,
          title: title || 'Notice',
        };
    }
  };

  const variantProps = getVariantProps(variant);

  return (
    <Alert
      className={cn('w-full', className)}
      classNames={{
        ...classNames,
      }}
      color={variantProps.color}
      description={description}
      title={variantProps.title}
      {...props}
    />
  );
};

AlertField.displayName = 'AlertField';
