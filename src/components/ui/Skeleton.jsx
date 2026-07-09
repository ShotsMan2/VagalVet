import React from 'react';

const Skeleton = ({ width, height, borderRadius, style, className }) => {
  return (
    <div
      className={`skeleton-loader ${className || ''}`}
      style={{
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || '4px',
        backgroundColor: 'var(--bg-soft)',
        animation: 'pulse 1.5s infinite ease-in-out',
        ...style
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default Skeleton;
