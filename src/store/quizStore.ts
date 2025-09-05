import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RiasecVector {
  R: number; // Realistic
  I: number; // Investigative  
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface WorkStyle {
  conscientiousness: 'low' | 'medium' | 'high';
  extraversion: 'low' | 'medium' | 'high';
  pace: 'fast' | 'steady' | 'relaxed';
}

export interface Criteria {
  salary_band: 'entry' | 'mid' | 'senior' | 'executive';
  work_mode: 'remote' | 'hybrid' | 'onsite';
  company_size: 'startup' | 'scaleup' | 'enterprise';
}

export interface QuizState {
  // Progress tracking
  currentStep: number;
  totalSteps: number;
  
  // User responses
  current_role?: string;
  goal?: 'explore' | 'switch_soon' | 'grow_in_place' | 'not_sure';
  riasec_vector: RiasecVector;
  work_style: Partial<WorkStyle>;
  values: string[];
  criteria: Partial<Criteria>;
  domain: string[];
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
  setRiasecValue: (dimension: keyof RiasecVector, value: number) => void;
  setWorkStyle: (key: keyof WorkStyle, value: string) => void;
  setValues: (values: string[]) => void;
  setCriteria: (key: keyof Criteria, value: string) => void;
  setDomain: (domains: string[]) => void;
  setExperienceBand: (band: QuizState['experience_band']) => void;
  loadSeedData: () => void;
  resetQuiz: () => void;
  saveToLocalStorage: () => void;
}

const initialState: QuizState = {
  currentStep: 1,
  totalSteps: 21,
  riasec_vector: { R: 3, I: 3, A: 3, S: 3, E: 3, C: 3 },
  work_style: {},
  values: [],
  criteria: {},
  domain: [],
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
      
      setRiasecValue: (dimension, value) => {
        set((state) => ({
          riasec_vector: { ...state.riasec_vector, [dimension]: value }
        }));
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
      
      setDomain: (domain) => {
        set({ domain });
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
            goal: seedData.goal,
            riasec_vector: seedData.riasec_vector,
            work_style: seedData.work_style,
            values: seedData.values,
            criteria: seedData.criteria,
            domain: seedData.domain,
            experience_band: seedData.experience_band,
            currentStep: 21, // Go to results
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
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        goal: state.goal,
        riasec_vector: state.riasec_vector,
        work_style: state.work_style,
        values: state.values,
        criteria: state.criteria,
        domain: state.domain,
        experience_band: state.experience_band,
      }),
    }
  )
);