import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';

const CATEGORIES = ['Strength', 'Cardio', 'Core', 'Flexibility', 'Custom'];

interface FormState {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
}

const INITIAL: FormState = {
  name: '', description: '', imageUrl: '', category: 'Custom', duration: '',
};

export default function AddExerciseScreen() {
  const { addExercise } = useExercises();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Exercise name is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.duration.trim()) e.duration = 'Duration is required';
    if (form.imageUrl && !form.imageUrl.startsWith('http')) e.imageUrl = 'Must start with http';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addExercise({
      name: form.name.trim(),
      description: form.description.trim(),
      imageUrl:
        form.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
      category: form.category,
      duration: form.duration.trim(),
    });
    Alert.alert('Exercise Added!', `"${form.name}" added to your list.`);
    setForm(INITIAL);
    setErrors({});
  };

  const fields: { key: keyof FormState; label: string; placeholder: string; multiline?: boolean }[] = [
    { key: 'name', label: 'Exercise Name *', placeholder: 'e.g. Bicep Curls' },
    { key: 'description', label: 'Description *', placeholder: 'Describe how to perform...', multiline: true },
    { key: 'duration', label: 'Duration / Sets *', placeholder: 'e.g. 3 sets x 12 reps' },
    { key: 'imageUrl', label: 'Image URL (optional)', placeholder: 'https://...' },
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <View style={styles.banner}>
            <Ionicons name="add-circle" size={32} color="#22d3ee" />
            <View>
              <Text style={styles.bannerTitle}>New Exercise</Text>
              <Text style={styles.bannerSub}>Build your custom routine</Text>
            </View>
          </View>

          {fields.map(({ key, label, placeholder, multiline }) => (
            <View key={key} style={styles.fieldGroup}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={[
                  styles.input,
                  multiline && styles.textArea,
                  errors[key] && styles.inputError,
                ]}
                placeholder={placeholder}
                placeholderTextColor="#475569"
                value={form[key]}
                onChangeText={val => {
                  setForm(prev => ({ ...prev, [key]: val }));
                  if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
                }}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                textAlignVertical={multiline ? 'top' : 'center'}
              />
              {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
            </View>
          ))}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.catRow}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, form.category === cat && styles.catChipActive]}
                  onPress={() => setForm(prev => ({ ...prev, category: cat }))}
                >
                  <Text style={[styles.catText, form.category === cat && styles.catTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Ionicons name="add" size={20} color="#0f172a" />
            <Text style={styles.submitText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  inner: { padding: 20, gap: 18, paddingBottom: 40 },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#1e293b', padding: 16, borderRadius: 16,
    borderWidth: 1, borderColor: '#22d3ee33',
  },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: '#f1f5f9' },
  bannerSub: { fontSize: 12, color: '#64748b', marginTop: 2 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 12, fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#1e293b', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: '#f1f5f9', borderWidth: 1, borderColor: '#334155',
  },
  textArea: { height: 100, paddingTop: 12 },
  inputError: { borderColor: '#fb7185' },
  errorText: { fontSize: 12, color: '#fb7185' },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155',
  },
  catChipActive: { backgroundColor: '#22d3ee', borderColor: '#22d3ee' },
  catText: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  catTextActive: { color: '#0f172a', fontWeight: '700' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#22d3ee', borderRadius: 14, paddingVertical: 16, marginTop: 6,
  },
  submitText: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
});