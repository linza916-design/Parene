import { cn } from '@/lib/utils';

type AlertVariant = 'default' | 'destructive';
type AlertProps = {
  className?: string;
  variant?: AlertVariant;
  [key: string]: any;
};

type AlertTitleProps = {
  className?: string;
  [key: string]: any;
};

type AlertDescriptionProps = {
  className?: string;
  [key: string]: any;
};

const alertVariants = (variant: AlertVariant = 'default') =>
  cn(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    variant === 'destructive'
      ? 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
      : 'bg-background text-foreground'
  );

const Alert = ({ className, variant, ...props }: AlertProps) => (
  <div
    role="alert"
    className={cn(alertVariants(variant), className)}
    {...props}
  />
);
Alert.displayName = 'Alert';

const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <h5
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => (
  <div
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
