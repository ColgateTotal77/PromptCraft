'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';

interface TooltipProps extends React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
> {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip = ({ children, content, ...props }: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(props.open || false);

  return (
    <TooltipPrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      delayDuration={300}
      {...props}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

      <AnimatePresence>
        {isOpen && (
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content
              sideOffset={5}
              side="top"
              className="z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <div className={cn(DS.card.base, DS.card.floating, 'p-2')}>
                  {content}
                </div>
                <TooltipPrimitive.Arrow className="fill-white" />
              </motion.div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        )}
      </AnimatePresence>
    </TooltipPrimitive.Root>
  );
};
