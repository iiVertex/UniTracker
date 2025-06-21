import React from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
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
      <textarea
        className={cn(
          'w-full px-4 py-3 text-base border border-neutral-mediumGray rounded-lg bg-white transition-all duration-200',
          'focus:border-primary-blue focus:ring-2 focus:ring-primary-blue focus:ring-opacity-10 focus:outline-none',
          'text-black placeholder:text-black resize-vertical min-h-[100px]',
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