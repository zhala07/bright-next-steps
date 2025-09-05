import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const { setCurrentStep, loadSeedData } = useQuizStore();
  const navigate = useNavigate();

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
      <div className="text-center space-y-8">
        {/* Hero Content */}
        <QuizCard variant="mint" className="text-center">
          <div className="space-y-6">
            {/* 3D Illustration Placeholder */}
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-primary rounded-lg shadow-lg"></div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text">
                Discover Your Ideal Career Path
              </h1>
              <p className="text-lg text-text-muted leading-relaxed">
                Take our comprehensive career quiz to discover roles that match your interests, 
                work style, and values. Get a personalized 14-day action plan to start your journey.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-card-peach rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded"></div>
                </div>
                <p className="text-sm font-medium">Science-based matching</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-card-sand rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm font-medium">Personalized action plan</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-card-mint rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-lg"></div>
                </div>
                <p className="text-sm font-medium">Resume from anywhere</p>
              </div>
            </div>

            {/* Consent & Actions */}
            <div className="space-y-6">
              <div className="text-left bg-card-sand/50 rounded-xl p-4">
                <label className="flex items-start gap-3 text-sm">
                  <input 
                    type="checkbox" 
                    className="mt-1 h-4 w-4 rounded border-border"
                    defaultChecked
                  />
                  <span>
                    I consent to this assessment collecting my responses for personalized recommendations. 
                    Data is stored locally and can be deleted at any time.
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleStart}
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  Start Quiz
                </Button>
                <Button 
                  onClick={handlePreview}
                  variant="outline"
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  Preview Results
                </Button>
              </div>
            </div>
          </div>
        </QuizCard>
      </div>
    </QuizLayout>
  );
};