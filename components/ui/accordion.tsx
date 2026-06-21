'use client';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import { cn } from '@/lib/utils';

const Accordion = ({ className, ...props }: any) => (
  <div className={cn('space-y-2', className)} {...props} />
);

const ChevronDown = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
Accordion.displayName = 'Accordion';

const AccordionItem = ({ className, ...props }: any) => (
  <details className={cn('border-b', className)} {...props} />
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = ({ className, children, ...props }: any) => (
  <summary
    className={cn(
      'flex list-none items-center justify-between py-4 font-medium transition-all hover:underline',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </summary>
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = ({ className, children, ...props }: any) => (
  <div className={cn('overflow-hidden text-sm pb-4 pt-0', className)} {...props}>
    {children}
  </div>
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
