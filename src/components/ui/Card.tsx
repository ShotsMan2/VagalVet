import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  isGlass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  isGlass = false 
}) => {
  const baseClass = isGlass ? 'glass-panel' : 'surface-card';
  
  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
};
