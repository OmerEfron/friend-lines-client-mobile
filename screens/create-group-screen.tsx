import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateGroup } from '../hooks/use-create-group';
import { CreateGroupForm } from '../components/create-group-form';
import { CreateGroupRequest } from '../services/groups-api';
import { sharedStyles } from '../styles/shared';

export function CreateGroupScreen({ navigation }: any) {
  const [groupData, setGroupData] = useState<CreateGroupRequest>({
    name: '',
    description: '',
  });
  const { createGroup, isLoading, error } = useCreateGroup();

  const handleCreate = async () => {
    if (!groupData.name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (groupData.name.length > 50) {
      Alert.alert('Error', 'Group name must be 50 characters or less');
      return;
    }

    try {
      await createGroup(groupData);
      
      Alert.alert('Success', 'Group created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.error('Failed to create group:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const canCreate = groupData.name.trim().length > 0 && !isLoading;

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Create Group</Text>
        
        <TouchableOpacity 
          onPress={handleCreate} 
          style={[styles.createButton, !canCreate && styles.createButtonDisabled]}
          disabled={!canCreate}
        >
          <Text style={[styles.createText, !canCreate && styles.createTextDisabled]}>
            {isLoading ? 'Creating...' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <CreateGroupForm
          groupData={groupData}
          onGroupDataChange={setGroupData}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  createButton: {
    padding: 8,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  createTextDisabled: {
    color: '#999',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: '#FFE6E6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFB3B3',
  },
  errorText: {
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
  },
});
