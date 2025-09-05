import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const salaryBands = [
  { value: 'entry', label: 'Entry level', range: '$40-60K' },
  { value: 'mid', label: 'Mid level', range: '$60-100K' },
  { value: 'senior', label: 'Senior level', range: '$100-150K' },
  { value: 'executive', label: 'Executive', range: '$150K+' }
];

const workModes = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'Onsite' }
];

const companySizes = [
  { value: 'startup', label: 'Startup', description: '< 50 people' },
  { value: 'scaleup', label: 'Scaleup', description: '50-500 people' },
  { value: 'enterprise', label: 'Enterprise', description: '500+ people' }
];

export const Criteria: React.FC = () => {
  const { criteria, setCriteria, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  
  const [salaryBand, setSalaryBand] = useState(criteria.salary_band || 'mid');
  const [workMode, setWorkMode] = useState(criteria.work_mode || 'hybrid');
  const [companySize, setCompanySize] = useState(criteria.company_size || 'scaleup');

  const handleNext = () => {
    setCriteria('salary_band', salaryBand);
    setCriteria('work_mode', workMode);
    setCriteria('company_size', companySize);
    setCurrentStep(19);
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
              Step 18 of 21
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              Your work preferences
            </h1>
            <p className="text-text-muted">
              Tell us about your ideal work environment
            </p>
          </div>

          <div className="space-y-8">
            {/* Salary Band */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">Salary expectations</h3>
              <div className="grid grid-cols-2 gap-3">
                {salaryBands.map((band) => (
                  <button
                    key={band.value}
                    onClick={() => setSalaryBand(band.value as any)}
                    className={`
                      chip text-left
                      ${salaryBand === band.value ? 'chip-selected' : 'chip-unselected'}
                    `}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold">{band.label}</div>
                      <div className="text-sm opacity-80">{band.range}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">Work mode</h3>
              <div className="grid grid-cols-3 gap-3">
                {workModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setWorkMode(mode.value as any)}
                    className={`
                      chip
                      ${workMode === mode.value ? 'chip-selected' : 'chip-unselected'}
                    `}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Size */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text">Company size</h3>
              <div className="grid grid-cols-1 gap-3">
                {companySizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setCompanySize(size.value as any)}
                    className={`
                      chip text-left
                      ${companySize === size.value ? 'chip-selected' : 'chip-unselected'}
                    `}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold">{size.label}</div>
                      <div className="text-sm opacity-80">{size.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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