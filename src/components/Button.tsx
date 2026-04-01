import React from 'react'

export type ButtonVariant = 'primary' | 'danger' | 'ghost' | 'icon'
export type ButtonSize = 'sm' | 'md'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  danger?: boolean  // modificador para c-btn-icon.danger
}

export function Button({
  variant = 'primary',
  size = 'md',
  danger = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = variant === 'icon'
    ? `c-btn-icon${danger ? ' danger' : ''}`
    : `c-btn c-btn-${variant}${size === 'sm' ? ' c-btn-sm' : ''}`

  return (
    <button
      className={`${variantClass} ${className}`.trim()}
      {...props}
    />
  )
}
