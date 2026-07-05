import React, { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  className = '',
  style = {}
}) => {
  return (
    <span 
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.25rem 0.75rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--badge-bg)',
        color: 'var(--badge-text)',
        ...style
      }}
    >
      {children}
    </span>
  );
};
