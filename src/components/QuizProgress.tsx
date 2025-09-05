import React from 'react';
import { useQuizStore } from '@/store/quizStore';

export const QuizProgress: React.FC = () => {
  const { currentStep, totalSteps } = useQuizStore();
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-text">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-card rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};