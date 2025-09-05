import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const valueOptions = [
  { id: 'Impact', label: 'Impact', description: 'Making a meaningful difference' },
  { id: 'Autonomy', label: 'Autonomy', description: 'Freedom and independence' },
  { id: 'Stability', label: 'Stability', description: 'Security and predictability' },
  { id: 'Creativity', label: 'Creativity', description: 'Innovation and expression' },
  { id: 'Growth', label: 'Growth', description: 'Learning and development' },
  { id: 'Service', label: 'Service', description: 'Helping others succeed' }
];

export const Values: React.FC = () => {
  const { values, setValues, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState<string[]>(values);

  const handleValueToggle = (valueId: string) => {
    setSelectedValues(prev => {
      if (prev.includes(valueId)) {
        return prev.filter(v => v !== valueId);
      } else if (prev.length < 2) {
        return [...prev, valueId];
      } else {
        // Replace the first selected value with the new one
        return [prev[1], valueId];
      }
    });
  };

  const handleNext = () => {
    setValues(selectedValues);
    setCurrentStep(18);
    navigate('/quiz/criteria');
  };

  const handleBack = () => {
    navigate('/quiz/work-style');
  };

  return (
    <QuizLayout>
      <QuizCard variant="mint">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">🎯</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Step 17 of 21
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              What matters most to you?
            </h1>
            <p className="text-text-muted">
              Pick any 2 values that guide your career decisions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valueOptions.map((value) => (
              <button
                key={value.id}
                onClick={() => handleValueToggle(value.id)}
                className={`
                  chip text-left
                  ${selectedValues.includes(value.id)
                    ? 'chip-selected'
                    : 'chip-unselected'
                  }
                `}
              >
                <div className="space-y-1">
                  <div className="font-semibold">{value.label}</div>
                  <div className="text-sm opacity-80">{value.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-sm text-text-muted">
            {selectedValues.length}/2 selected
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={selectedValues.length === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};