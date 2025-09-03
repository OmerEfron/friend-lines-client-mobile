import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserProfile } from '../types/profile';

interface UserProfileStatsProps {
  profile: UserProfile;
}

export function UserProfileStats({ profile }: UserProfileStatsProps) {
  // For now, we'll show placeholder stats
  // In a real app, you'd fetch these from the API
  const stats = [
    { label: 'Friends', value: '0' },
    { label: 'Groups', value: '0' },
    { label: 'Newsflashes', value: '0' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
