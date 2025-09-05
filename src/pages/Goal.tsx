import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const goalOptions = [
  {
    id: 'explore' as const,
    title: 'Explore careers',
    description: 'I want to discover new career possibilities',
    icon: '🔍'
  },
  {
    id: 'switch_soon' as const,
    title: 'Switch soon',
    description: 'I need to find a new role within 6 months',
    icon: '⏰'
  },
  {
    id: 'grow_in_place' as const,
    title: 'Grow in place',
    description: 'I want to advance in my current field',
    icon: '📈'
  },
  {
    id: 'not_sure' as const,
    title: 'Not sure',
    description: 'I need help figuring out my next step',
    icon: '💭'
  }
];

export const Goal: React.FC = () => {
  const { goal, setGoal, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();

  const handleSelect = (selectedGoal: typeof goal) => {
    setGoal(selectedGoal);
    setCurrentStep(3);
    navigate('/quiz/interests');
  };

  return (
    <QuizLayout>
      <QuizCard>
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              What's your career goal?
            </h1>
            <p className="text-lg text-text-muted">
              This helps us tailor your recommendations and action plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goalOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-200 text-left min-h-[112px]
                  hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2
                  ${goal === option.id 
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10' 
                    : 'border-gray-300 bg-white hover:border-[var(--brand)]/50'
                  }
                `}
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-hidden="true">{option.icon}</span>
                    <h3 className="font-semibold text-[var(--text)]" style={{ fontSize: '16px', lineHeight: '1.4' }}>{option.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600" style={{ lineHeight: '1.4', fontSize: '16px' }}>{option.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              Back
            </Button>
            <Button 
              onClick={() => handleSelect(goal)}
              disabled={!goal}
            >
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};