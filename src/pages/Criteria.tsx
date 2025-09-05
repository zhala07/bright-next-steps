import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const salaryBands = [
  { value: 'low', label: 'Low' },
  { value: 'mid', label: 'Mid' },
  { value: 'high', label: 'High' }
];

const workModes = [
  { value: 'remote', label: 'Remote', description: 'Work from anywhere' },
  { value: 'hybrid', label: 'Hybrid', description: 'Mix of office and remote' },
  { value: 'onsite', label: 'On-site', description: 'In-person at office' }
];

export const Criteria: React.FC = () => {
  const { criteria, setCriteria, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [selectedWorkMode, setSelectedWorkMode] = useState(criteria.work_mode || '');
  const [selectedSalaryBand, setSelectedSalaryBand] = useState(criteria.salary_band || '');

  const handleNext = () => {
    setCriteria('work_mode', selectedWorkMode);
    setCriteria('salary_band', selectedSalaryBand);
    setCurrentStep(8);
    navigate('/quiz/domains');
  };

  const handleBack = () => {
    navigate('/quiz/values');
  };

  return (
    <QuizLayout>
      <QuizCard variant="sand">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">📊</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Step 7 of 10
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              Your work preferences
            </h1>
            <p className="text-text-muted">
              Help us understand what matters to you in a role
            </p>
          </div>

          <div className="space-y-8">
            {/* Work Mode */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text">Work mode</h3>
              <div className="grid grid-cols-1 gap-3">
                {workModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setSelectedWorkMode(mode.value as any)}
                    className={`
                      chip text-left
                      ${selectedWorkMode === mode.value ? 'chip-selected' : 'chip-unselected'}
                    `}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold">{mode.label}</div>
                      <div className="text-sm opacity-80">{mode.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Band */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text">Salary Band</h3>
              <div className="flex justify-between gap-2">
                {salaryBands.map((band) => (
                  <button
                    key={band.value}
                    onClick={() => setSelectedSalaryBand(band.value as any)}
                    className={`
                      flex-1 p-4 rounded-xl border-2 transition-all
                      ${selectedSalaryBand === band.value ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-text hover:border-primary'}
                    `}
                  >
                    <div className="font-semibold">{band.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedWorkMode || !selectedSalaryBand}>
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};