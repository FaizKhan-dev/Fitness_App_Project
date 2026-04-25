import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useExercises } from '../context/ExerciseContext';
import ExerciseCard from '../components/ExerciseCard';

export default function CompletedScreen() {
  const { exercises, toggleComplete } = useExercises();
  const navigation = useNavigation();
  const completed = exercises.filter(e => e.completed);
  const pct = exercises.length > 0
    ? Math.round((completed.length / exercises.length) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <Text style={styles.progressPct}>{pct}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
        </View>
        <Text style={styles.progressSub}>
          {completed.length} of {exercises.length} exercises completed
        </Text>
      </View>

      <FlatList
        data={completed}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle-outline" size={56} color="#334155" />
            <Text style={styles.emptyTitle}>Nothing completed yet</Text>
            <Text style={styles.emptyBody}>Head to Exercises and mark some as done!</Text>
            <TouchableOpacity
              style={styles.goBtn}
              onPress={() => (navigation as any).navigate('Home')}
            >
              <Text style={styles.goBtnText}>Go to Exercises</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            onPress={() =>
              (navigation as any).navigate('ExerciseDetail', { exerciseId: item.id })
            }
            onToggleComplete={() => toggleComplete(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  progressCard: {
    margin: 16, backgroundColor: '#1e293b', borderRadius: 16,
    padding: 18, gap: 10, borderWidth: 1, borderColor: '#334155',
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { fontSize: 13, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 },
  progressPct: { fontSize: 22, fontWeight: '800', color: '#22d3ee' },
  progressBar: { height: 8, backgroundColor: '#334155', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%' as any, backgroundColor: '#22d3ee', borderRadius: 4 },
  progressSub: { fontSize: 13, color: '#64748b' },
  empty: { alignItems: 'center', marginTop: 60, paddingHorizontal: 32, gap: 10 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#475569' },
  emptyBody: { fontSize: 14, color: '#334155', textAlign: 'center' },
  goBtn: {
    marginTop: 8, paddingHorizontal: 24, paddingVertical: 12,
    backgroundColor: '#22d3ee', borderRadius: 12,
  },
  goBtnText: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
});