import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface MessageContainerProps {
  children: React.ReactNode;
  actions?: React.ReactNode[];
  direction?: 'left' | 'right';
}

export function MessageContainer(props: MessageContainerProps) {
  const {
    children,
    actions,
    direction = 'left',
  } = props;

  const isRight = direction === 'right';

  return (
    <div
      className={cn(
        "flex w-full mb-3",
        isRight ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex flex-col max-w-[75%]">
        <div
          className={cn(
            "p-4 shadow rounded-md text-sm leading-relaxed whitespace-pre-wrap",
            "bg-gray-800 text-white",
          )}
        >
          { children }
        </div>

        { Boolean(actions?.length) && (
          <Slot
            className={cn(
              "flex items-center gap-2 mt-1",
              isRight ? "justify-end" : "justify-start"
            )}
          >
            { actions }
          </Slot>
        )}
      </div>
    </div>
  );
}
