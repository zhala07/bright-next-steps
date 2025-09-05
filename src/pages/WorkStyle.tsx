import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const workStyleQuestions = [
  {
    id: 'conscientiousness1',
    question: 'I finish what I start',
    trait: 'conscientiousness' as const
  },
  {
    id: 'conscientiousness2', 
    question: 'I plan work in steps',
    trait: 'conscientiousness' as const
  },
  {
    id: 'extraversion1',
    question: 'I gain energy from collaborating with others',
    trait: 'extraversion' as const
  },
  {
    id: 'extraversion2',
    question: 'I am comfortable speaking up in groups', 
    trait: 'extraversion' as const
  },
  {
    id: 'pace',
    question: 'I prefer a steady pace',
    trait: 'pace' as const
  }
];

const scaleLabels = [
  'Strongly disagree',
  'Disagree', 
  'Neutral',
  'Agree',
  'Strongly agree'
];

export const WorkStyle: React.FC = () => {
  const { work_style, setWorkStyle, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  
  const currentQuestion = workStyleQuestions[currentQuestionIndex];
  const currentValue = responses[currentQuestion.id];

  const handleRating = (value: number) => {
    setResponses(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const calculateTraitScores = () => {
    const conscientious = [
      responses['conscientiousness1'] || 0,
      responses['conscientiousness2'] || 0
    ];
    const extravert = [
      responses['extraversion1'] || 0, 
      responses['extraversion2'] || 0
    ];
    
    const conscAvg = conscientious.reduce((a, b) => a + b, 0) / 2;
    const extraAvg = extravert.reduce((a, b) => a + b, 0) / 2;
    
    return {
      conscientiousness: conscAvg >= 4 ? 'high' : conscAvg >= 3 ? 'medium' : 'low',
      extraversion: extraAvg >= 4 ? 'high' : extraAvg >= 3 ? 'medium' : 'low',
      pace: responses['pace'] >= 3 ? 'steady' : 'fast'
    };
  };

  const handleNext = () => {
    if (currentQuestionIndex < workStyleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate and save trait scores
      const traitScores = calculateTraitScores();
      Object.entries(traitScores).forEach(([key, value]) => {
        setWorkStyle(key as any, value);
      });
      
      setCurrentStep(17); // Move to values
      navigate('/quiz/values');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/quiz/interests');
    }
  };

  return (
    <QuizLayout>
      <QuizCard variant="peach">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">⚡</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Work Style {currentQuestionIndex + 1} of {workStyleQuestions.length}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              How much do you agree?
            </h1>
            <h2 className="text-xl font-semibold text-text">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Rating Scale */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  className={`
                    likert-scale button
                    ${currentValue === value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card hover:border-primary/50'
                    }
                  `}
                >
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-xs leading-tight">
                      {scaleLabels[value - 1]}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Visual progress indicator */}
            <div className="flex justify-center space-x-2">
              {workStyleQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index <= currentQuestionIndex ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!currentValue}
            >
              {currentQuestionIndex < workStyleQuestions.length - 1 ? 'Next' : 'Continue'}
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};