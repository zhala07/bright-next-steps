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
    icon: '🚀'
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
      <QuizCard variant="peach">
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
                  p-6 rounded-xl border-2 transition-all duration-200 text-left
                  hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary
                  ${goal === option.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-card hover:border-primary/50'
                  }
                `}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <h3 className="font-semibold text-text">{option.title}</h3>
                  </div>
                  <p className="text-sm text-text-muted">{option.description}</p>
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