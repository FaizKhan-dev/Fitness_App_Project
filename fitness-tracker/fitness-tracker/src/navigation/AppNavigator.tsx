import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';
import CompletedScreen from '../screens/CompletedScreen';
import QuotesScreen from '../screens/QuotesScreen';

export type RootStackParamList = {
  Tabs: undefined;
  ExerciseDetail: { exerciseId: string };
};

export type TabParamList = {
  Home: undefined;
  Add: undefined;
  Completed: undefined;
  Quotes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: '#22d3ee',
        tabBarInactiveTintColor: '#64748b',
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f1f5f9',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<string, string> = {
            Home: focused ? 'barbell' : 'barbell-outline',
            Add: focused ? 'add-circle' : 'add-circle-outline',
            Completed: focused ? 'checkmark-circle' : 'checkmark-circle-outline',
            Quotes: focused ? 'sparkles' : 'sparkles-outline',
          };
          return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Exercises' }} />
      <Tab.Screen name="Add" component={AddExerciseScreen} options={{ title: 'Add Exercise' }} />
      <Tab.Screen name="Completed" component={CompletedScreen} options={{ title: 'Completed' }} />
      <Tab.Screen name="Quotes" component={QuotesScreen} options={{ title: 'Motivation' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="ExerciseDetail"
          component={ExerciseDetailScreen}
          options={{
            title: 'Exercise Details',
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#f1f5f9',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}