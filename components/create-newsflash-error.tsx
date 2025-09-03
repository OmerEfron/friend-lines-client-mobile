import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CreateNewsflashErrorProps {
  error: string;
}

export function CreateNewsflashError({ error }: CreateNewsflashErrorProps) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
  },
});
