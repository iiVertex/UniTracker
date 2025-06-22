import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-black">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 text-base border border-neutral-mediumGray rounded-lg bg-white transition-all duration-200',
          'focus:border-primary-blue focus:ring-2 focus:ring-primary-blue focus:ring-opacity-10 focus:outline-none',
          'text-black placeholder:text-neutral-mediumGray',
          error && 'border-accent-red focus:border-accent-red focus:ring-accent-red',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
} 