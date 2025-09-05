import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const domainOptions = [
  { id: 'Product', label: 'Product', description: 'Building products users love' },
  { id: 'Data', label: 'Data', description: 'Analytics and insights' },
  { id: 'Security', label: 'Security', description: 'Protecting systems and data' },
  { id: 'Design', label: 'Design', description: 'User experience and interfaces' },
  { id: 'Cloud or Infra', label: 'Cloud/Infra', description: 'Infrastructure and platforms' },
  { id: 'QA and Testing', label: 'QA/Testing', description: 'Quality assurance' },
  { id: 'Support', label: 'Support', description: 'Customer and technical support' },
  { id: 'Sales Engineering', label: 'Sales Engineering', description: 'Technical sales' }
];

export const Domains: React.FC = () => {
  const { domain, setDomain, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [selectedDomains, setSelectedDomains] = useState<string[]>(domain);

  const handleDomainToggle = (domainId: string) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainId)) {
        return prev.filter(d => d !== domainId);
      } else if (prev.length < 3) {
        return [...prev, domainId];
      } else {
        return prev; // Don't add if already at limit
      }
    });
  };

  const handleNext = () => {
    setDomain(selectedDomains);
    setCurrentStep(9);
    navigate('/quiz/experience');
  };

  const handleBack = () => {
    navigate('/quiz/criteria');
  };

  return (
    <QuizLayout>
      <QuizCard variant="peach">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">🔧</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Step 19 of 21
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              Tech domains of interest
            </h1>
            <p className="text-text-muted">
              Select up to 3 areas that excite you most
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domainOptions.map((domain) => (
              <button
                key={domain.id}
                onClick={() => handleDomainToggle(domain.id)}
                className={`
                  chip text-left
                  ${selectedDomains.includes(domain.id)
                    ? 'chip-selected'
                    : 'chip-unselected'
                  }
                  ${selectedDomains.length >= 3 && !selectedDomains.includes(domain.id)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }
                `}
                disabled={selectedDomains.length >= 3 && !selectedDomains.includes(domain.id)}
              >
                <div className="space-y-1">
                  <div className="font-semibold">{domain.label}</div>
                  <div className="text-sm opacity-80">{domain.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-sm text-text-muted">
            {selectedDomains.length}/3 selected
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={selectedDomains.length === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};