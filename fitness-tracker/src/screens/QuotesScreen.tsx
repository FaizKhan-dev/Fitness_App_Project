import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QuoteCard from '../components/QuoteCard';

interface Quote { q: string; a: string; }

const FALLBACK_QUOTES: Quote[] = [
  { q: "The only bad workout is the one that didn't happen.", a: "Unknown" },
  { q: "Your body can stand almost anything. It's your mind you have to convince.", a: "Unknown" },
  { q: "Take care of your body. It's the only place you have to live.", a: "Jim Rohn" },
  { q: "The pain you feel today will be the strength you feel tomorrow.", a: "Unknown" },
  { q: "An hour of training is 4% of your day. No excuses.", a: "Unknown" },
];

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setOffline(false);
    try {
      const res = await fetch('https://zenquotes.io/api/quotes');
      if (!res.ok) throw new Error();
      const data: Quote[] = await res.json();
      setQuotes(data.slice(0, 12));
    } catch {
      setQuotes(FALLBACK_QUOTES);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchQuotes(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Ionicons name="sparkles" size={22} color="#fbbf24" />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Daily Motivation</Text>
          <Text style={styles.headerSub}>
            {offline ? 'Showing offline quotes' : 'Fetched from ZenQuotes API'}
          </Text>
        </View>
        <TouchableOpacity onPress={fetchQuotes} disabled={loading}>
          <Ionicons name="refresh" size={22} color={loading ? '#334155' : '#22d3ee'} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#22d3ee" />
          <Text style={styles.loadingText}>Loading inspiration...</Text>
        </View>
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <QuoteCard quote={item.q} author={item.a} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  headerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    margin: 16, backgroundColor: '#1e293b', padding: 16,
    borderRadius: 16, borderWidth: 1, borderColor: '#fbbf2430',
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: '#f1f5f9' },
  headerSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: '#64748b', fontSize: 14 },
});