import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  quote: string;
  author: string;
}

export default function QuoteCard({ quote, author }: Props) {
  return (
    <View style={styles.card}>
      <Ionicons name="chatbubble-ellipses-outline" size={24} color="#22d3ee" />
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.author}>— {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quote: { fontSize: 15, color: '#e2e8f0', lineHeight: 24, fontStyle: 'italic' },
  author: { fontSize: 13, color: '#22d3ee', fontWeight: '600', textAlign: 'right' },
});