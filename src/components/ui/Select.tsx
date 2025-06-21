import React from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            'w-full px-4 py-3 text-base border border-neutral-mediumGray rounded-lg bg-white transition-all duration-200',
            'focus:border-primary-blue focus:ring-2 focus:ring-primary-blue focus:ring-opacity-10 focus:outline-none',
            'appearance-none pr-10',
            'text-black',
            error && 'border-accent-red focus:border-accent-red focus:ring-accent-red',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black text-xs">
          ▼
        </span>
      </div>
      {error && (
        <p className="text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
} 