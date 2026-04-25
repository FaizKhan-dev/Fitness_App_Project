import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseDetail'>;

const CATEGORY_COLORS: Record<string, string> = {
  Strength: '#f97316', Cardio: '#22d3ee', Core: '#a78bfa',
  Flexibility: '#34d399', Custom: '#fb7185',
};

const TIPS = [
  'Warm up for 5 minutes before starting',
  'Maintain proper form throughout',
  'Breathe steadily — exhale on exertion',
  'Rest 60-90 seconds between sets',
];

export default function ExerciseDetailScreen({ route }: Props) {
  const { exerciseId } = route.params;
  const { exercises, toggleComplete } = useExercises();
  const exercise = exercises.find(e => e.id === exerciseId);

  if (!exercise) return (
    <View style={styles.center}><Text style={styles.errorText}>Exercise not found.</Text></View>
  );

  const tagColor = CATEGORY_COLORS[exercise.category] ?? '#94a3b8';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.badge, { backgroundColor: tagColor + '22', borderColor: tagColor }]}>
            <Text style={[styles.badgeText, { color: tagColor }]}>{exercise.category}</Text>
          </View>
          {exercise.completed && (
            <View style={styles.doneBadge}>
              <Ionicons name="checkmark-circle" size={13} color="#22d3ee" />
              <Text style={styles.doneText}>Completed</Text>
            </View>
          )}
        </View>

        <Text style={styles.name}>{exercise.name}</Text>

        <View style={styles.durationRow}>
          <Ionicons name="time-outline" size={18} color="#22d3ee" />
          <Text style={styles.durationText}>{exercise.duration}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{exercise.description}</Text>

        <Text style={styles.sectionTitle}>Tips</Text>
        {TIPS.map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.btn, exercise.completed && styles.btnDone]}
          onPress={() => {
            toggleComplete(exercise.id);
            Alert.alert(
              exercise.completed ? 'Marked Incomplete' : 'Great Job!',
              `"${exercise.name}" ${exercise.completed ? 'marked as not done.' : 'marked as completed!'}`
            );
          }}
          activeOpacity={0.85}
        >
          <Ionicons
            name={exercise.completed ? 'close-circle-outline' : 'checkmark-circle-outline'}
            size={20}
            color={exercise.completed ? '#f1f5f9' : '#0f172a'}
          />
          <Text style={[styles.btnText, exercise.completed && styles.btnTextDone]}>
            {exercise.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  errorText: { color: '#64748b', fontSize: 16 },
  image: { width: '100%', height: 260 },
  content: { padding: 20, gap: 14 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  doneBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#22d3ee22', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: '#22d3ee',
  },
  doneText: { fontSize: 11, color: '#22d3ee', fontWeight: '600' },
  name: { fontSize: 26, fontWeight: '800', color: '#f1f5f9', lineHeight: 32 },
  durationRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#1e293b', padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#334155',
  },
  durationText: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: '#64748b',
    textTransform: 'uppercase', letterSpacing: 1, marginTop: 4,
  },
  description: { fontSize: 15, color: '#cbd5e1', lineHeight: 24 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  tipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22d3ee', marginTop: 7 },
  tipText: { flex: 1, fontSize: 14, color: '#94a3b8', lineHeight: 22 },
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#22d3ee', borderRadius: 14, paddingVertical: 16, marginTop: 8,
  },
  btnDone: { backgroundColor: '#334155' },
  btnText: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  btnTextDone: { color: '#f1f5f9' },
});