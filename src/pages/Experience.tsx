import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const experienceBands = [
  { value: 'student', label: 'Student or early career', description: 'Just starting out' },
  { value: '1_to_3', label: '1-3 years', description: 'Building foundational skills' },
  { value: '3_to_7', label: '3-7 years', description: 'Growing expertise' },
  { value: '7_plus', label: '7+ years', description: 'Senior professional' }
];

export const Experience: React.FC = () => {
  const { experience_band, setExperienceBand, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [selectedBand, setSelectedBand] = useState(experience_band || '1_to_3');

  const handleNext = () => {
    setExperienceBand(selectedBand);
    setCurrentStep(10);
    navigate('/quiz/review');
  };

  const handleBack = () => {
    navigate('/quiz/background-skills');
  };

  return (
    <QuizLayout>
      <QuizCard variant="mint">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">🎓</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Step 9 of 10
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              Your experience level
            </h1>
            <p className="text-text-muted">
              This helps us calibrate recommendations to your career stage
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {experienceBands.map((band) => (
              <button
                key={band.value}
                onClick={() => setSelectedBand(band.value as any)}
                className={`
                  chip text-left
                  ${selectedBand === band.value ? 'chip-selected' : 'chip-unselected'}
                `}
              >
                <div className="space-y-1">
                  <div className="font-semibold">{band.label}</div>
                  <div className="text-sm opacity-80">{band.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};