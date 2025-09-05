import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface WorkStyle {
  conscientiousness: 'low' | 'medium' | 'high';
  extraversion: 'low' | 'medium' | 'high';
}

export interface Criteria {
  salary_band: 'low' | 'mid' | 'high';
  work_mode: 'remote' | 'hybrid' | 'onsite';
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Working' | 'Strong';
}

export interface QuizState {
  // Progress tracking
  currentStep: number;
  totalSteps: number;
  
  // User responses
  current_role?: string;
  goal?: 'explore' | 'switch_soon' | 'grow_in_place' | 'not_sure';
  picked_interests: string[];
  work_style: Partial<WorkStyle>;
  values: string[];
  criteria: Partial<Criteria>;
  background?: string;
  skills: Skill[];
  experience_band?: 'student' | '1_to_3' | '3_to_7' | '7_plus';
  
  // Results
  results?: {
    primary_path: string;
    hidden_paths: string[];
    transparency: any;
    starter_plan: any[];
  };
}

export interface QuizActions {
  setCurrentStep: (step: number) => void;
  setGoal: (goal: QuizState['goal']) => void;
  setPickedInterests: (interests: string[]) => void;
  setWorkStyle: (key: keyof WorkStyle, value: string) => void;
  setValues: (values: string[]) => void;
  setCriteria: (key: keyof Criteria, value: string) => void;
  setBackground: (background: string) => void;
  setSkills: (skills: Skill[]) => void;
  setExperienceBand: (band: QuizState['experience_band']) => void;
  loadSeedData: () => void;
  resetQuiz: () => void;
  saveToLocalStorage: () => void;
  saveToSupabase: () => Promise<void>;
}

const initialState: QuizState = {
  currentStep: 1,
  totalSteps: 10,
  picked_interests: [],
  work_style: {},
  values: [],
  criteria: {},
  skills: [],
};

export const useQuizStore = create<QuizState & QuizActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setCurrentStep: (step) => {
        set({ currentStep: step });
        get().saveToLocalStorage();
      },
      
      setGoal: (goal) => {
        set({ goal });
        get().saveToLocalStorage();
      },
      
      setPickedInterests: (picked_interests) => {
        set({ picked_interests });
        get().saveToLocalStorage();
      },
      
      setWorkStyle: (key, value) => {
        set((state) => ({
          work_style: { ...state.work_style, [key]: value }
        }));
        get().saveToLocalStorage();
      },
      
      setValues: (values) => {
        set({ values });
        get().saveToLocalStorage();
      },
      
      setCriteria: (key, value) => {
        set((state) => ({
          criteria: { ...state.criteria, [key]: value }
        }));
        get().saveToLocalStorage();
      },
      
      setBackground: (background) => {
        set({ background });
        get().saveToLocalStorage();
      },
      
      setSkills: (skills) => {
        set({ skills });
        get().saveToLocalStorage();
      },
      
      setExperienceBand: (experience_band) => {
        set({ experience_band });
        get().saveToLocalStorage();
      },
      
      loadSeedData: async () => {
        try {
          const response = await fetch('/data/seed-user.json');
          const seedData = await response.json();
          set({
            current_role: seedData.current_role,
            goal: seedData.goal === 'Switch soon' ? 'switch_soon' : seedData.goal,
            picked_interests: seedData.picked_interests,
            work_style: seedData.work_style,
            values: seedData.values,
            criteria: seedData.criteria,
            background: seedData.background,
            skills: seedData.skills || [],
            experience_band: seedData.experience_band === '3–7' ? '3_to_7' : seedData.experience_band,
            currentStep: 10, // Go to results
          });
        } catch (error) {
          console.error('Failed to load seed data:', error);
        }
      },
      
      resetQuiz: () => {
        set(initialState);
        localStorage.removeItem('quiz-storage');
      },
      
      saveToLocalStorage: () => {
        // Auto-save is handled by persist middleware
      },
      
      saveToSupabase: async () => {
        const state = get();
        try {
          const { error } = await supabase
            .from('quiz_responses')
            .upsert({
              current_role: state.current_role,
              goal: state.goal,
              picked_interests: state.picked_interests,
              work_style: state.work_style,
              values: state.values,
              criteria: state.criteria,
              background: state.background,
              skills: state.skills,
              experience_band: state.experience_band,
              results: state.results,
            });
          
          if (error) {
            console.error('Error saving to Supabase:', error);
          }
        } catch (error) {
          console.error('Failed to save to Supabase:', error);
        }
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        goal: state.goal,
        picked_interests: state.picked_interests,
        work_style: state.work_style,
        values: state.values,
        criteria: state.criteria,
        background: state.background,
        skills: state.skills,
        experience_band: state.experience_band,
      }),
    }
  )
);