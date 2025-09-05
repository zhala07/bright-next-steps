import React from 'react';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';

interface QuizCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'peach' | 'mint' | 'sand';
}

export const QuizCard: React.FC<QuizCardProps> = ({ 
  children, 
  className,
  variant = 'default' 
}) => {
  const variantClasses = {
    default: 'bg-[var(--cardBackground)]',
    peach: 'bg-[var(--cardBackground)]',
    mint: 'bg-[var(--cardBackground)]', 
    sand: 'bg-[var(--cardBackground)]'
  };

  return (
    <div className={cn(
      'rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.10)] p-6 md:p-10 transition-all duration-300 hover:scale-[1.02] text-[var(--text)]',
      variantClasses[variant],
      className
    )}>
      <div className="mb-4">
        <BrandMark />
      </div>
      {children}
    </div>
  );
};