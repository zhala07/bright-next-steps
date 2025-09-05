import React from 'react';

export const BrandMark: React.FC = () => {
  return (
    <div 
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur"
      aria-label="Masarly brand"
    >
      <span 
        className="text-sm font-medium tracking-wide" 
        style={{ color: 'var(--brand)' }}
      >
        Masarly
      </span>
    </div>
  );
};