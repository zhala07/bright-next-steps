import React from 'react';
import { QuizProgress } from './QuizProgress';

interface QuizLayoutProps {
  children: React.ReactNode;
  showProgress?: boolean;
  className?: string;
}

export const QuizLayout: React.FC<QuizLayoutProps> = ({ 
  children, 
  showProgress = true,
  className = "" 
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className={`w-full max-w-2xl mx-auto ${className}`}>
          {showProgress && <QuizProgress />}
          {children}
        </div>
      </main>
    </div>
  );
};