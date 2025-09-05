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
    navigate('/quiz/goal');
  };

  return (
    <QuizLayout showProgress={false}>
      <QuizCard>
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-6xl">🚀</div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-text">
              Masarly
            </h1>
            <p className="mt-2 text-base text-text-muted">
              Your career finder.
            </p>
          </div>

          <div className="space-y-6">
            {/* Analytics Consent */}
            <div className="flex items-center space-x-3 justify-center">
              <Checkbox
                id="analytics-consent"
                checked={analyticsConsent}
                onCheckedChange={(checked) => setAnalyticsConsent(checked as boolean)}
              />
              <label 
                htmlFor="analytics-consent" 
                className="text-sm text-text-muted cursor-pointer"
              >
                I consent to anonymous analytics to help improve this tool
              </label>
            </div>

            <div className="flex justify-center">
              <Button size="lg" onClick={handleStart} className="btn-bounce min-h-[40px] px-8">
                Take the quiz
              </Button>
            </div>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};