import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CreateGroupRequest } from '../services/groups-api';

interface CreateGroupFormProps {
  groupData: CreateGroupRequest;
  onGroupDataChange: (data: CreateGroupRequest) => void;
}

export function CreateGroupForm({ groupData, onGroupDataChange }: CreateGroupFormProps) {
  const handleNameChange = (name: string) => {
    onGroupDataChange({ ...groupData, name });
  };

  const handleDescriptionChange = (description: string) => {
    onGroupDataChange({ ...groupData, description });
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Group Name *</Text>
        <TextInput
          style={styles.input}
          value={groupData.name}
          onChangeText={handleNameChange}
          placeholder="Enter group name"
          maxLength={50}
          autoCapitalize="words"
        />
        <Text style={styles.characterCount}>
          {groupData.name.length}/50
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={groupData.description || ''}
          onChangeText={handleDescriptionChange}
          placeholder="Describe your group"
          maxLength={200}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        <Text style={styles.characterCount}>
          {(groupData.description || '').length}/200
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
});
