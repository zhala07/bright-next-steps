import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const interestCards = [
  { 
    id: 'hands-on-builder', 
    label: 'Hands-on builder (R)', 
    description: 'I like fixing or building things',
    icon: '🔧'
  },
  { 
    id: 'data-detective', 
    label: 'Data detective (I)', 
    description: 'I enjoy finding patterns in data',
    icon: '🔍'
  },
  { 
    id: 'creative-maker', 
    label: 'Creative maker (A)', 
    description: 'I like creating designs, stories, or visuals',
    icon: '🎨'
  },
  { 
    id: 'people-helper', 
    label: 'People helper or teacher (S)', 
    description: 'I prefer roles that involve helping people',
    icon: '👥'
  },
  { 
    id: 'initiative-taker', 
    label: 'Initiative taker or persuader (E)', 
    description: 'I like persuading others and driving initiatives',
    icon: '⚡'
  },
  { 
    id: 'organizer', 
    label: 'Organizer or systems keeper (C)', 
    description: 'I enjoy organizing information and keeping systems tidy',
    icon: '📋'
  }
];

export const Interests: React.FC = () => {
  const { picked_interests, setPickedInterests, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(picked_interests || []);

  const handleToggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else if (prev.length < 3) {
        return [...prev, interest];
      }
      return prev;
    });
  };

  const handleNext = () => {
    setPickedInterests(selectedInterests);
    setCurrentStep(4);
    navigate('/quiz/work-style-1');
  };

  const handleBack = () => {
    navigate('/quiz/goal');
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
              Step 3 of 10
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              Which 3 statements sound most like you today?
            </h1>
            <p className="text-text-muted">
              Pick exactly 3 that resonate with you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {interestCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleToggleInterest(card.label)}
                disabled={!selectedInterests.includes(card.label) && selectedInterests.length >= 3}
                className={`
                  chip text-left
                  ${selectedInterests.includes(card.label) ? 'chip-selected' : 'chip-unselected'}
                  ${!selectedInterests.includes(card.label) && selectedInterests.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{card.icon}</div>
                  <div className="space-y-1">
                    <div className="font-semibold">{card.label}</div>
                    <div className="text-sm opacity-80">{card.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-sm text-text-muted">
            Selected: {selectedInterests.length}/3
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={selectedInterests.length !== 3}>
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};