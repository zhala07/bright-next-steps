import React from 'react';

export const BrandMark: React.FC = () => {
  return (
    <div 
      className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur text-sm font-medium tracking-wide text-[color:var(--brand)]"
      aria-label="Masarly brand"
    >
      Masarly
    </div>
  );
};