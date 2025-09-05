import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuizCard } from '@/components/QuizCard';
import { QuizLayout } from '@/components/QuizLayout';
import { useQuizStore, Skill } from '@/store/quizStore';
import { useNavigate } from 'react-router-dom';

const backgroundOptions = [
  'Software Engineering',
  'Data', 
  'Design',
  'Security',
  'Product',
  'QA and Testing',
  'Support',
  'Sales Engineering',
  'Other'
];

const skillOptions = [
  'Programming',
  'SQL',
  'Data Analysis', 
  'Cloud',
  'Networking and Security',
  'UI Design',
  'UX Research',
  'Writing and Documentation',
  'Stakeholder Communication',
  'Project Management',
  'Requirements Gathering',
  'Agile and Scrum',
  'Sales and Discovery'
];

const skillLevels = ['Beginner', 'Working', 'Strong'] as const;

export const BackgroundSkills: React.FC = () => {
  const { background, skills, setBackground, setSkills, setCurrentStep } = useQuizStore();
  const navigate = useNavigate();
  const [otherBackground, setOtherBackground] = useState('');
  const [showCustomSkill, setShowCustomSkill] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [activeSkillPicker, setActiveSkillPicker] = useState<string | null>(null);

  const handleBackgroundSelect = (option: string) => {
    setBackground(option);
    if (option !== 'Other') {
      setOtherBackground('');
    }
  };

  const handleSkillToggle = (skillName: string) => {
    const existingSkill = skills.find(s => s.name === skillName);
    
    if (existingSkill) {
      // Remove skill
      setSkills(skills.filter(s => s.name !== skillName));
      setActiveSkillPicker(null);
    } else {
      // Add skill with default level
      const newSkill: Skill = { name: skillName, level: 'Working' };
      setSkills([...skills, newSkill]);
      setActiveSkillPicker(skillName);
    }
  };

  const handleSkillLevelChange = (skillName: string, level: 'Beginner' | 'Working' | 'Strong') => {
    setSkills(skills.map(s => 
      s.name === skillName ? { ...s, level } : s
    ));
    setActiveSkillPicker(null);
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !skills.find(s => s.name === customSkill.trim())) {
      const newSkill: Skill = { name: customSkill.trim(), level: 'Working' };
      setSkills([...skills, newSkill]);
      setCustomSkill('');
      setShowCustomSkill(false);
    }
  };

  const handleNext = () => {
    const finalBackground = background === 'Other' ? otherBackground : background;
    if (finalBackground) {
      setBackground(finalBackground);
    }
    setCurrentStep(9);
    navigate('/quiz/experience');
  };

  const isSkillSelected = (skillName: string) => {
    return skills.some(s => s.name === skillName);
  };

  const getSkillLevel = (skillName: string) => {
    return skills.find(s => s.name === skillName)?.level || 'Working';
  };

  return (
    <QuizLayout>
      <QuizCard>
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-text">Background and Skills</h1>
            <p className="text-text-muted">Tell us about your experience</p>
          </div>

          {/* Background Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Your background</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {backgroundOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleBackgroundSelect(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleBackgroundSelect(option);
                    }
                  }}
                  className={`min-h-[44px] px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    background === option
                      ? 'bg-primary text-surface border-primary shadow-lg'
                      : 'bg-surface text-text border-gray-200 hover:border-primary/50'
                  }`}
                  aria-pressed={background === option}
                  aria-label={`Select ${option} as background`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {background === 'Other' && (
              <div className="mt-4">
                <Input
                  placeholder="Enter your background (40 chars max)"
                  value={otherBackground}
                  onChange={(e) => setOtherBackground(e.target.value.slice(0, 40))}
                  maxLength={40}
                  className="w-full"
                  aria-label="Custom background field"
                />
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text">Your skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillOptions.map((skill) => (
                <div key={skill} className="relative">
                  <button
                    onClick={() => handleSkillToggle(skill)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSkillToggle(skill);
                      } else if (e.key === 'Escape') {
                        setActiveSkillPicker(null);
                      }
                    }}
                    className={`w-full min-h-[44px] px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      isSkillSelected(skill)
                        ? 'bg-primary text-surface border-primary shadow-lg'
                        : 'bg-surface text-text border-gray-200 hover:border-primary/50'
                    }`}
                    aria-pressed={isSkillSelected(skill)}
                    aria-label={`${skill}${isSkillSelected(skill) ? `, selected, level ${getSkillLevel(skill)}` : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{skill}</span>
                      {isSkillSelected(skill) && (
                        <span className="text-xs bg-surface/20 px-2 py-1 rounded">
                          {getSkillLevel(skill)}
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Skill Level Picker */}
                  {activeSkillPicker === skill && isSkillSelected(skill) && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-2 space-y-1">
                        {skillLevels.map((level) => (
                          <button
                            key={level}
                            onClick={() => handleSkillLevelChange(skill, level)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSkillLevelChange(skill, level);
                              } else if (e.key === 'Escape') {
                                setActiveSkillPicker(null);
                              }
                            }}
                            className={`w-full min-h-[40px] px-3 py-2 text-sm rounded-md text-left transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                              getSkillLevel(skill) === level
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-text'
                            }`}
                            aria-label={`Set ${skill} level to ${level}`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Custom Skills */}
              {skills.filter(s => !skillOptions.includes(s.name)).map((skill) => (
                <div key={skill.name} className="relative">
                  <button
                    onClick={() => setActiveSkillPicker(activeSkillPicker === skill.name ? null : skill.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveSkillPicker(activeSkillPicker === skill.name ? null : skill.name);
                      } else if (e.key === 'Escape') {
                        setActiveSkillPicker(null);
                      }
                    }}
                    className="w-full min-h-[44px] px-4 py-3 rounded-xl border-2 bg-primary text-surface border-primary shadow-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label={`${skill.name}, custom skill, level ${skill.level}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{skill.name}</span>
                      <span className="text-xs bg-surface/20 px-2 py-1 rounded">
                        {skill.level}
                      </span>
                    </div>
                  </button>

                  {activeSkillPicker === skill.name && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-2 space-y-1">
                        {skillLevels.map((level) => (
                          <button
                            key={level}
                            onClick={() => handleSkillLevelChange(skill.name, level)}
                            className={`w-full min-h-[40px] px-3 py-2 text-sm rounded-md text-left transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                              skill.level === level
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-text'
                            }`}
                            aria-label={`Set ${skill.name} level to ${level}`}
                          >
                            {level}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setSkills(skills.filter(s => s.name !== skill.name));
                            setActiveSkillPicker(null);
                          }}
                          className="w-full min-h-[40px] px-3 py-2 text-sm rounded-md text-left text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                          aria-label={`Remove ${skill.name} skill`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Custom Skill */}
              {!showCustomSkill ? (
                <button
                  onClick={() => setShowCustomSkill(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowCustomSkill(true);
                    }
                  }}
                  className="min-h-[44px] px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 text-text-muted hover:border-primary/50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Add custom skill"
                >
                  + Add custom skill
                </button>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Skill name (25 chars max)"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value.slice(0, 25))}
                    maxLength={25}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCustomSkill();
                      } else if (e.key === 'Escape') {
                        setShowCustomSkill(false);
                        setCustomSkill('');
                      }
                    }}
                    aria-label="Custom skill name"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={handleAddCustomSkill}
                      disabled={!customSkill.trim()}
                    >
                      Add
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setShowCustomSkill(false);
                        setCustomSkill('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button 
              variant="ghost" 
              onClick={() => {
                setCurrentStep(7);
                navigate('/quiz/criteria');
              }}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!background}
            >
              Continue
            </Button>
          </div>
        </div>
      </QuizCard>
      
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {skills.length > 0 && `${skills.length} skills selected`}
      </div>
    </QuizLayout>
  );
};