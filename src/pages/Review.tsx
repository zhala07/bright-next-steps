import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

export const Review: React.FC = () => {
  const quizState = useQuizStore();
  const navigate = useNavigate();

  const topRiasec = Object.entries(quizState.riasec_vector)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
    .map(([key]) => key);

  const handleSeeResults = () => {
    navigate('/quiz/results');
  };

  const handleEdit = (section: string) => {
    switch (section) {
      case 'goal':
        navigate('/quiz/goal');
        break;
      case 'interests':
        navigate('/quiz/interests');
        break;
      case 'workstyle':
        navigate('/quiz/work-style');
        break;
      case 'values':
        navigate('/quiz/values');
        break;
      case 'criteria':
        navigate('/quiz/criteria');
        break;
      case 'domains':
        navigate('/quiz/domains');
        break;
      case 'experience':
        navigate('/quiz/experience');
        break;
    }
  };

  return (
    <QuizLayout>
      <QuizCard variant="sand">
        <div className="text-center space-y-8">
          {/* Illustration placeholder */}
          <div className="illustration-placeholder">
            <div className="text-4xl">📋</div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-text-muted">
              Step 21 of 21
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-text">
              Review your responses
            </h1>
            <p className="text-text-muted">
              Make sure everything looks right before we generate your results
            </p>
          </div>

          <div className="space-y-6 text-left">
            {/* Goal */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Your goal</h3>
                  <p className="text-text-muted capitalize">
                    {quizState.goal?.replace('_', ' ') || 'Not specified'}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('goal')}>
                  Edit
                </Button>
              </div>
            </div>

            {/* Interests */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Top interests</h3>
                  <p className="text-text-muted">{topRiasec.join(', ')}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('interests')}>
                  Edit
                </Button>
              </div>
            </div>

            {/* Work Style */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Work style</h3>
                  <p className="text-text-muted">
                    {quizState.work_style.conscientiousness} conscientiousness, {' '}
                    {quizState.work_style.extraversion} extraversion, {' '}
                    {quizState.work_style.pace} pace
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('workstyle')}>
                  Edit
                </Button>
              </div>
            </div>

            {/* Values */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Core values</h3>
                  <p className="text-text-muted">{quizState.values.join(', ')}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('values')}>
                  Edit
                </Button>
              </div>
            </div>

            {/* Criteria */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Preferences</h3>
                  <p className="text-text-muted">
                    {quizState.criteria.salary_band} salary, {' '}
                    {quizState.criteria.work_mode} work, {' '}
                    {quizState.criteria.company_size} company
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('criteria')}>
                  Edit
                </Button>
              </div>
            </div>

            {/* Domains */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Tech domains</h3>
                  <p className="text-text-muted">{quizState.domain.join(', ')}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('domains')}>
                  Edit
                </Button>
              </div>
            </div>

            {/* Experience */}
            <div className="p-4 bg-card rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text">Experience</h3>
                  <p className="text-text-muted">
                    {quizState.experience_band?.replace('_', '-') || 'Not specified'}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEdit('experience')}>
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg" onClick={handleSeeResults} className="w-full">
              See my results
            </Button>
          </div>
        </div>
      </QuizCard>
    </QuizLayout>
  );
};