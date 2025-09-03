import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function UserSearchHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Find Friends</Text>
      <Text style={styles.subtitle}>Search for users to connect with</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
