import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const riasecQuestions = [
  {
    id: 'R' as const,
    question: 'Working with tools, machines, or building things',
    description: 'Hands-on problem solving and creating tangible results'
  },
  {
    id: 'I' as const,
    question: 'Analyzing data, conducting research, or solving complex problems',
    description: 'Investigation, analysis, and understanding how things work'
  },
  {
    id: 'A' as const,
    question: 'Creating, designing, or expressing yourself artistically',
    description: 'Innovation, creativity, and aesthetic expression'
  },
  {
    id: 'S' as const,
    question: 'Helping, teaching, or working closely with people',
    description: 'Supporting others and making a positive impact'
  },
  {
    id: 'E' as const,
    question: 'Leading teams, influencing others, or driving business outcomes',
    description: 'Leadership, persuasion, and achieving goals'
  },
  {
    id: 'C' as const,
    question: 'Organizing information, following procedures, or managing details',
    description: 'Structure, accuracy, and systematic approaches'
  }
];

const scaleLabels = [
  'Not interested at all',
  'Slightly interested', 
  'Moderately interested',
  'Very interested',
  'Extremely interested'
];

export const Interests: React.FC = () => {
  const { riasec_vector, setRiasecValue, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = riasecQuestions[currentQuestionIndex];
  const currentValue = riasec_vector[currentQuestion.id];

  const handleRating = (value: number) => {
    setRiasecValue(currentQuestion.id, value);
  };

  const handleNext = () => {
    if (currentQuestionIndex < riasecQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep(12); // Move to work style questions
      navigate('/quiz/work-style');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/quiz/goal');
    }
  };

  return (
    <QuizLayout>
      <QuizCard variant="sand">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Interest {currentQuestionIndex + 1} of {riasecQuestions.length}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              How interested are you in...
            </h1>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-text">
                {currentQuestion.question}
              </h2>
              <p className="text-text-muted">
                {currentQuestion.description}
              </p>
            </div>
          </div>

          {/* Rating Scale */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary
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
              {riasecQuestions.map((_, index) => (
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
              {currentQuestionIndex < riasecQuestions.length - 1 ? 'Next' : 'Continue'}
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};