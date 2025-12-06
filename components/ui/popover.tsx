'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DS } from '@/lib/design-system';

const PopoverContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | undefined>(undefined);

const usePopover = () => {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error('usePopover must be used within a Popover');
  return context;
};

export const Popover = ({ children, ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  const [ open, setOpen ] = React.useState(props.open || false);

  return (
    <PopoverPrimitive.Root open={ open } onOpenChange={ setOpen } { ...props }>
      <PopoverContext.Provider value={ { open, setOpen } }>
        { children }
      </PopoverContext.Provider>
    </PopoverPrimitive.Root>
  );
};

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const { open } = usePopover();

  return (
    <AnimatePresence>
      { open && (
        <PopoverPrimitive.Portal forceMount>
          <PopoverPrimitive.Content align={ align } sideOffset={ sideOffset } asChild>
            <motion.div
              ref={ ref }
              initial={ { opacity: 0, scale: 0.95 } }
              animate={ { opacity: 1, scale: 1 } }
              exit={ { opacity: 0, scale: 0.95 } }
              transition={ { duration: 0.2, ease: 'easeInOut' } }
              className={ cn(
                DS.card.base,
                DS.card.floating,
                'w-72',
                className
              ) }
              { ...(props as HTMLMotionProps<'div'>) }
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      ) }
    </AnimatePresence>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;
