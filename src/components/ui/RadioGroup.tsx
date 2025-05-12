import React from 'react';
import { cn } from '../../lib/utils';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  className,
  orientation = 'horizontal',
}) => {
  return (
    <div 
      className={cn(
        orientation === 'horizontal' ? 'flex space-x-4' : 'flex flex-col space-y-2',
        className
      )}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;