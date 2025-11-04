import React, { forwardRef } from 'react';
import '../styles/Input.css';

/**
 * INPUT COMPONENT
 * Flexible input component with various types and states
 *
 * Props:
 * - type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
 * - size: 'sm' | 'md' | 'lg'
 * - variant: 'default' | 'error' | 'success'
 * - disabled: boolean
 * - readonly: boolean
 * - required: boolean
 * - placeholder: string
 * - value: string | number
 * - label: string
 * - helperText: string
 * - error: string
 * - icon: ReactNode
 * - fullWidth: boolean
 * - onChange: function
 * - ...other props
 */

const Input = forwardRef(({
  type = 'text',
  size = 'md',
  variant = 'default',
  disabled = false,
  readonly = false,
  required = false,
  placeholder,
  value,
  label,
  helperText,
  error,
  icon,
  fullWidth = false,
  className = '',
  onChange,
  ...props
}, ref) => {
  const inputClasses = [
    'input',
    `input-${size}`,
    `input-${variant}`,
    error ? 'input-error' : '',
    icon ? 'input-with-icon' : '',
    fullWidth ? 'input-full' : '',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'input-container',
    fullWidth ? 'input-container-full' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readonly}
          required={required}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <div className={`input-message ${error ? 'input-message-error' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;