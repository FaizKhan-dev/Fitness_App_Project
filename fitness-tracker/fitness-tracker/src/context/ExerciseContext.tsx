import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  completed: boolean;
}

interface ExerciseContextType {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id' | 'completed'>) => void;
  toggleComplete: (id: string) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

const DEFAULT_EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Push-Ups',
    description:
      'A classic upper-body exercise targeting chest, shoulders, and triceps. Start in plank position, lower your chest to the floor, then push back up. Keep your core engaged throughout.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    category: 'Strength',
    duration: '3 sets x 15 reps',
    completed: false,
  },
  {
    id: '2',
    name: 'Squats',
    description:
      'The king of lower-body exercises. Stand feet shoulder-width apart, push hips back, and lower until thighs are parallel to the ground. Drive through heels to return.',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600',
    category: 'Strength',
    duration: '4 sets x 12 reps',
    completed: false,
  },
  {
    id: '3',
    name: 'Plank',
    description:
      'An isometric core exercise that builds stability. Hold a push-up position with arms fully extended. Keep your body in a straight line from head to heels.',
    imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=600',
    category: 'Core',
    duration: '3 sets x 60 sec',
    completed: false,
  },
  {
    id: '4',
    name: 'Jumping Jacks',
    description:
      'A full-body cardio exercise that elevates your heart rate quickly. Jump while spreading legs and raising arms overhead, then return to starting position.',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600',
    category: 'Cardio',
    duration: '3 sets x 45 sec',
    completed: false,
  },
  {
    id: '5',
    name: 'Lunges',
    description:
      'A unilateral leg exercise targeting quads, hamstrings, and glutes. Step forward with one leg, lower hips until both knees are at 90 degrees. Alternate legs.',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600',
    category: 'Strength',
    duration: '3 sets x 10 each',
    completed: false,
  },
  {
    id: '6',
    name: 'Mountain Climbers',
    description:
      'A dynamic full-body exercise combining cardio and core. Start in push-up position and alternate driving knees toward your chest rapidly. Maintain a flat back.',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600',
    category: 'Cardio',
    duration: '3 sets x 30 sec',
    completed: false,
  },
];

export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<Exercise[]>(DEFAULT_EXERCISES);

  const addExercise = (data: Omit<Exercise, 'id' | 'completed'>) => {
    setExercises(prev => [
      { ...data, id: Date.now().toString(), completed: false },
      ...prev,
    ]);
  };

  const toggleComplete = (id: string) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, toggleComplete }}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercises() {
  const ctx = useContext(ExerciseContext);
  if (!ctx) throw new Error('useExercises must be used within ExerciseProvider');
  return ctx;
}