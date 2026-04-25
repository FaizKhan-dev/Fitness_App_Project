
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ExerciseProvider } from './src/context/ExerciseContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ExerciseProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </ExerciseProvider>
  );
}