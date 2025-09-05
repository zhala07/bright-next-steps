import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

export const Welcome: React.FC = () => {
  const { setCurrentStep, loadSeedData } = useQuizStore();
  const navigate = useNavigate();
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  const handleStart = () => {
    setCurrentStep(2);
    navigate('/quiz/1');
  };

  return (
    <QuizLayout showProgress={false}>
      <QuizCard>
        <div className="text-center">
          <div className="space-y-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
              Masarly
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-600">
              Your career finder.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleStart} 
              className="mt-6 inline-flex items-center justify-center h-12 px-5 rounded-2xl bg-[var(--brand)] text-white font-medium shadow hover:bg-[var(--brandHover)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--brand)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cardBackground)] transition-all duration-200"
            >
              Take the quiz
            </button>
            
            <p className="mt-2 text-sm text-gray-600">
              Takes 5 to 7 minutes
            </p>

            <div className="flex items-center space-x-3 justify-center mt-4">
              <Checkbox
                id="analytics-consent"
                checked={analyticsConsent}
                onCheckedChange={(checked) => setAnalyticsConsent(checked as boolean)}
                className="focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
              />
              <label 
                htmlFor="analytics-consent" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                I consent to anonymous analytics to help improve this tool
              </label>
            </div>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};