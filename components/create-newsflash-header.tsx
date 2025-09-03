import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CreateNewsflashHeaderProps {
  isLoading: boolean;
  hasContent: boolean;
  onCancel: () => void;
  onCreate: () => void;
}

export function CreateNewsflashHeader({
  isLoading,
  hasContent,
  onCancel,
  onCreate,
}: CreateNewsflashHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onCancel}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Newsflash</Text>
      <TouchableOpacity 
        onPress={onCreate}
        disabled={isLoading || !hasContent}
        style={[styles.postButton, (!hasContent || isLoading) && styles.postButtonDisabled]}
      >
        <Text style={styles.postButtonText}>
          {isLoading ? 'Posting...' : 'Post'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  postButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
