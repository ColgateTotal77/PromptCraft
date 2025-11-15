import * as Label from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import React, { useEffect, useId, useRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  startBtns?: React.ReactNode[];
  endBtns?: React.ReactNode[];
}

export function Textarea(props: TextareaProps) {
  const { label, startBtns, endBtns, className, id, ...textAreaProps } = props;
  const generatedId = useId();
  const inputId = id || `input-${ generatedId }`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const maxHeight = 5 * 24;
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      { label && (
        <Label.Root htmlFor={ inputId } className="text-sm font-medium">
          { label }
        </Label.Root>
      ) }
      <div className="flex items-center bg-gray-800 border rounded-md focus-within:ring-2 focus-within:ring-gray-600">
        { startBtns && React.Children.toArray(startBtns).map((btn, idx) => (
          <div key={ idx } className="mr-1">{ btn }</div>
        )) }
        <textarea
          ref={ textareaRef }
          id={ inputId }
          { ...textAreaProps }
          rows={ 1 }
          onInput={ adjustHeight }
          className={ cn(
            'flex-1 px-2 py-2 leading-6 outline-none resize-none placeholder-gray-600',
            className
          ) }
        />
        { endBtns && React.Children.toArray(endBtns).map((btn, idx) => (
          <div key={ idx } className="ml-1">{ btn }</div>
        )) }
      </div>
    </div>
  );
}

