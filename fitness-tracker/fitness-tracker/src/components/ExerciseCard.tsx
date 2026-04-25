import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../context/ExerciseContext';

interface Props {
  exercise: Exercise;
  onPress: () => void;
  onToggleComplete: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Strength: '#f97316',
  Cardio: '#22d3ee',
  Core: '#a78bfa',
  Flexibility: '#34d399',
  Custom: '#fb7185',
};

export default function ExerciseCard({ exercise, onPress, onToggleComplete }: Props) {
  const tagColor = CATEGORY_COLORS[exercise.category] ?? '#94a3b8';

  return (
    <TouchableOpacity
      style={[styles.card, exercise.completed && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <View style={[styles.badge, { backgroundColor: tagColor + '22', borderColor: tagColor }]}>
          <Text style={[styles.badgeText, { color: tagColor }]}>{exercise.category}</Text>
        </View>
        <Text style={[styles.name, exercise.completed && styles.nameCompleted]} numberOfLines={1}>
          {exercise.name}
        </Text>
        <Text style={styles.duration}>{exercise.duration}</Text>
      </View>
      <TouchableOpacity onPress={onToggleComplete} style={styles.checkBtn} hitSlop={12}>
        <Ionicons
          name={exercise.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={26}
          color={exercise.completed ? '#22d3ee' : '#334155'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardCompleted: { opacity: 0.6 },
  image: { width: 80, height: 80 },
  info: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, gap: 4 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, borderWidth: 1 },
  badgeText: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  name: { fontSize: 15, fontWeight: '700', color: '#f1f5f9' },
  nameCompleted: { textDecorationLine: 'line-through', color: '#64748b' },
  duration: { fontSize: 12, color: '#64748b' },
  checkBtn: { paddingRight: 14 },
});