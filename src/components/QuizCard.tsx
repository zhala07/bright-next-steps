import React from 'react';
import { cn } from '@/lib/utils';

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
    default: 'bg-card',
    peach: 'quiz-card-peach',
    mint: 'quiz-card-mint', 
    sand: 'quiz-card-sand'
  };

  return (
    <div className={cn(
      'quiz-card transition-all duration-300 hover:scale-[1.02]',
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
};