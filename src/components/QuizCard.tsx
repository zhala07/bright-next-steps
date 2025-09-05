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
      'rounded-[24px] bg-[var(--cardBackground)] shadow-[0_10px_30px_rgba(0,0,0,0.10)] p-6 md:p-10 transition-all duration-300 hover:scale-[1.02] text-[var(--text)]',
      className
    )}>
      <div className="mt-2 ml-2 md:mt-4 md:ml-4 mb-4">
        <BrandMark />
      </div>
      {children}
    </div>
  );
};