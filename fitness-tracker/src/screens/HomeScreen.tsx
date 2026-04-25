import React, { useMemo, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';
import ExerciseCard from '../components/ExerciseCard';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'>;
const CATEGORIES = ['All', 'Strength', 'Cardio', 'Core', 'Custom'];

export default function HomeScreen({ navigation }: Props) {
  const { exercises, toggleComplete } = useExercises();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() =>
    exercises.filter(ex => {
      const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || ex.category === activeCategory;
      return matchSearch && matchCat;
    }),
    [exercises, search, activeCategory]
  );

  const completedCount = exercises.filter(e => e.completed).length;

  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.statsBar}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{exercises.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={[styles.statNum, { color: '#22d3ee' }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={[styles.statNum, { color: '#f97316' }]}>{exercises.length - completedCount}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={16} color="#64748b" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#475569"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.catChip, activeCategory === item && styles.catChipActive]}
            onPress={() => setActiveCategory(item)}
            activeOpacity={0.85}
          >
            <Text style={[styles.catText, activeCategory === item && styles.catTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Exercise list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="barbell-outline" size={48} color="#334155" />
            <Text style={styles.emptyText}>No exercises found</Text>
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
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: '#f1f5f9' },
  statLabel: { fontSize: 11, color: '#64748b', marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: '#334155' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: { flex: 1, height: 42, color: '#f1f5f9', fontSize: 14 },
  catList: { paddingHorizontal: 16, paddingBottom: 10, alignItems: 'center' },
  catChip: {
    minWidth: 78,
    height: 34,
    marginRight: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  catChipActive: { backgroundColor: '#22d3ee', borderColor: '#22d3ee' },
  catText: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  catTextActive: { color: '#0f172a', fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 60, gap: 10 },
  emptyText: { color: '#334155', fontSize: 15 },
});