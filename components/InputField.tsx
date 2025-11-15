import * as Label from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import React, { useId } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function InputField(props: InputFieldProps) {
  const { label, icon, className, id, ...inputProps } = props;
  const generatedId = useId();
  const inputId = id || `input-${ generatedId }`;

  return (
    <div className="flex flex-col gap-1">
      { label && (
        <Label.Root htmlFor={ inputId } className="text-sm font-medium">
          { label }
        </Label.Root>
      ) }
      <div className="flex items-center border rounded-md px-2 focus-within:ring-2 focus-within:ring-gray-600">
        { icon && <Slot className="mr-2">{ icon }</Slot> }

        <input
          id={ inputId }
          { ...inputProps }
          className={ cn(
            'flex-1 px-2.5 py-3 bg-transparent outline-none placeholder-gray-600',
            className
          ) }
        />

      </div>
    </div>
  );
}
