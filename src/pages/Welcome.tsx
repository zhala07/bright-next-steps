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

  const handlePreview = async () => {
    await loadSeedData();
    navigate('/quiz/results');
  };

  return (
    <QuizLayout showProgress={false}>
      <QuizCard variant="mint">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-6xl">🚀</div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              Find your career path
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Find a realistic career path in about 8–10 minutes. You will get 1 primary path, 2 hidden paths, and a 14-day starter plan.
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleStart} className="btn-bounce">
                Start Quiz
              </Button>
              <Button variant="outline" size="lg" onClick={handlePreview}>
                Preview Results
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="text-center space-y-2">
              <div className="text-2xl">🎯</div>
              <h3 className="font-semibold text-text">Personalized</h3>
              <p className="text-sm text-text-muted">
                Based on your interests, work style, and values
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">⚡</div>
              <h3 className="font-semibold text-text">Quick</h3>
              <p className="text-sm text-text-muted">
                Just 8-10 minutes to complete
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">📈</div>
              <h3 className="font-semibold text-text">Actionable</h3>
              <p className="text-sm text-text-muted">
                Get a 14-day starter plan to begin your journey
              </p>
            </div>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};