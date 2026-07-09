import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  containerClassName = '', 
  className = '', 
  id, 
  ...props 
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-container ${containerClassName}`} style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
      {label && (
        <label htmlFor={inputId} style={{ marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={className}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${error ? 'red' : 'var(--border-color)'}`,
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-main)',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color var(--transition-fast)',
        }}
        {...props}
      />
      {error && (
        <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};
