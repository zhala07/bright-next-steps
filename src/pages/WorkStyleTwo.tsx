import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const scaleOptions = [
  { value: 'low', label: '1 - Strongly disagree' },
  { value: 'low', label: '2 - Disagree' },
  { value: 'medium', label: '3 - Neutral' },
  { value: 'high', label: '4 - Agree' },
  { value: 'high', label: '5 - Strongly agree' }
];

export const WorkStyleTwo: React.FC = () => {
  const { work_style, setWorkStyle, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(work_style.extraversion || '');

  const handleNext = () => {
    setWorkStyle('extraversion', selectedValue);
    setCurrentStep(6);
    navigate('/quiz/values');
  };

  const handleBack = () => {
    navigate('/quiz/work-style-1');
  };

  return (
    <QuizLayout>
      <QuizCard variant="sand">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">🤝</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Step 5 of 10
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              I gain energy from collaborating with others
            </h1>
            <p className="text-text-muted">
              How much do you agree with this statement?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {scaleOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedValue(option.value)}
                className={`
                  chip text-center
                  ${selectedValue === option.value ? 'chip-selected' : 'chip-unselected'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedValue}>
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};