import React from 'react';
import '../styles/Button.css';

/**
 * BUTTON COMPONENT
 * Versatile button component with multiple variants and sizes
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
 * - size: 'sm' | 'md' | 'lg'
 * - disabled: boolean
 * - loading: boolean
 * - fullWidth: boolean
 * - children: ReactNode
 * - onClick: function
 * - type: 'button' | 'submit' | 'reset'
 * - ...other props
 */

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner">⟳</span>}
      {children}
    </button>
  );
};

export default Button;