import React from 'react';
import { cn } from '../../lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          className={cn(
            'h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded',
            className
          )}
          ref={ref}
          {...props}
        />
        <label className="ml-2 block text-sm text-gray-700" htmlFor={props.id}>
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;