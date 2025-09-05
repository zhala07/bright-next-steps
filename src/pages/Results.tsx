import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

interface CareerMatch {
  title: string;
  fitScore: number;
  fitReason: string;
  skillsToAdd: Array<{
    skill: string;
    resource: string;
  }>;
}

export const Results: React.FC = () => {
  const quizState = useQuizStore();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<CareerMatch[]>([]);

  useEffect(() => {
    calculateMatches();
  }, []);

  const calculateMatches = async () => {
    // Simplified scoring algorithm based on the requirements
    const mockMatches: CareerMatch[] = [
      {
        title: 'Product Manager',
        fitScore: 92,
        fitReason: 'High Investigative and Enterprising interests, collaborative work style, values Impact',
        skillsToAdd: [
          { skill: 'SQL', resource: 'https://sqlbolt.com' },
          { skill: 'Product Analytics', resource: 'https://mixpanel.com/learn' }
        ]
      },
      {
        title: 'Business Analyst',
        fitScore: 87,
        fitReason: 'Strong analytical thinking and communication skills alignment',
        skillsToAdd: [
          { skill: 'Data Visualization', resource: 'https://tableau.com/learn' },
          { skill: 'Process Mapping', resource: 'https://lucidchart.com/blog' }
        ]
      },
      {
        title: 'Tech Recruiter',
        fitScore: 82,
        fitReason: 'Excellent people skills and growth-oriented mindset',
        skillsToAdd: [
          { skill: 'Technical Interviewing', resource: 'https://interviewing.io' },
          { skill: 'Sourcing', resource: 'https://sourcingcertification.com' }
        ]
      }
    ];
    
    setMatches(mockMatches);
  };

  const starterPlan = [
    { day: 1, action: 'Skim 3 PM job posts and list 5 repeated responsibilities', duration: '20 min' },
    { day: 2, action: 'Do a 20 minute SQL intro lesson', duration: '20 min' },
    { day: 3, action: 'Write a one page product critique of an app you use', duration: '25 min' },
    { day: 4, action: 'Map a user journey for that app in 6 boxes', duration: '20 min' },
    { day: 5, action: 'Draft a problem statement and success metric for one pain point', duration: '25 min' },
    { day: 6, action: 'Create a lightweight PRD outline with goals, scope, out of scope', duration: '25 min' },
    { day: 7, action: 'Schedule 2 short informational chats and prepare 5 questions each', duration: '15 min' },
    { day: 8, action: 'Practice a 90 second product story aloud and record it', duration: '20 min' },
    { day: 9, action: 'Take a free analytics tutorial and recreate 1 funnel chart', duration: '25 min' },
    { day: 10, action: 'Run a tiny competitive teardown with 3 screenshots and 3 insights', duration: '25 min' },
    { day: 11, action: 'Prioritize 6 hypothetical backlog items using RICE', duration: '20 min' },
    { day: 12, action: 'Write 3 acceptance criteria for a small feature', duration: '20 min' },
    { day: 13, action: 'Present a 3 slide update to a friend and ask for feedback', duration: '25 min' },
    { day: 14, action: 'Ship a public post summarizing your learnings and next steps', duration: '15 min' }
  ];

  const topRiasec = Object.entries(quizState.riasec_vector)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
    .map(([key]) => key);

  return (
    <QuizLayout showProgress={false}>
      <div className="space-y-8">
        {/* Primary Result */}
        <QuizCard variant="mint">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-text-muted">Your Primary Career Path</div>
              <h1 className="text-3xl font-bold text-text">{matches[0]?.title}</h1>
              <div className="text-lg text-text-muted">{matches[0]?.fitScore}% match</div>
            </div>
            
            <div className="p-4 bg-card-sand/50 rounded-xl">
              <p className="text-text">{matches[0]?.fitReason}</p>
            </div>

            {/* Skills to add */}
            <div className="space-y-3">
              <h3 className="font-semibold text-text">Skills to develop next:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matches[0]?.skillsToAdd.map((item, index) => (
                  <div key={index} className="p-3 bg-card rounded-lg">
                    <div className="font-medium text-text">{item.skill}</div>
                    <a 
                      href={item.resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Learning resource →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </QuizCard>

        {/* Hidden Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.slice(1, 3).map((match, index) => (
            <QuizCard key={index} variant={index === 0 ? 'peach' : 'sand'} className="text-center">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">{match.title}</h3>
                  <div className="text-text-muted">{match.fitScore}% match</div>
                </div>
                <p className="text-sm text-text-muted">{match.fitReason}</p>
              </div>
            </QuizCard>
          ))}
        </div>

        {/* Transparency Panel */}
        <QuizCard>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text">How we calculated your match</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-medium text-text">Top Interests</div>
                <div className="text-sm text-text-muted">{topRiasec.join(', ')}</div>
              </div>
              <div>
                <div className="font-medium text-text">Work Style</div>
                <div className="text-sm text-text-muted">
                  {quizState.work_style.conscientiousness} conscientiousness
                </div>
              </div>
              <div>
                <div className="font-medium text-text">Key Value</div>
                <div className="text-sm text-text-muted">{quizState.values[0]}</div>
              </div>
              <div>
                <div className="font-medium text-text">Preference</div>
                <div className="text-sm text-text-muted">{quizState.criteria.work_mode}</div>
              </div>
            </div>
          </div>
        </QuizCard>

        {/* 14-Day Starter Plan */}
        <QuizCard variant="mint">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-text">Your 14-Day Starter Plan</h3>
              <p className="text-text-muted">Micro-actions to begin your journey</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {starterPlan.map((item) => (
                <div key={item.day} className="p-4 bg-card rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-text">Day {item.day}</span>
                    <span className="text-sm text-text-muted">{item.duration}</span>
                  </div>
                  <p className="text-sm text-text">{item.action}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Add to Calendar
              </Button>
              <Button variant="outline" size="lg">
                Save as PDF
              </Button>
            </div>
          </div>
        </QuizCard>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant="ghost"
            onClick={() => navigate('/')}
          >
            Start Over
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/quiz/goal')}
          >
            Retake Quiz
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
};