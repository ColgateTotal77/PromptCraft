import * as Label from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function InputField({ label, icon, className, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label.Root className="text-sm font-medium">{label}</Label.Root>
      <div className="flex items-center border rounded px-2">
        {icon && <Slot className="mr-2 text-gray-500">{icon}</Slot>}
        <input
          {...props}
          className={cn("w-full p-2 bg-transparent outline-none", className)}
        />
      </div>
    </div>
  );
}
