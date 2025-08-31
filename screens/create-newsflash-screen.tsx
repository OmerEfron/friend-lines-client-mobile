import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateNewsflash } from '../hooks/use-create-newsflash';
import { sharedStyles } from '../styles/shared';

export function CreateNewsflashScreen({ navigation, route }: any) {
  const [content, setContent] = useState('');
  const [targetType, setTargetType] = useState<'friends' | 'group'>('friends');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const { createNewsflash, isLoading, error } = useCreateNewsflash();

  const handleCreate = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    if (content.length > 100) {
      Alert.alert('Error', 'Content must be 100 characters or less');
      return;
    }

    if (targetType === 'group' && !selectedGroupId) {
      Alert.alert('Error', 'Please select a group');
      return;
    }

    try {
      const newsflashData = {
        content: content.trim(),
        targetType,
        targetId: targetType === 'group' ? selectedGroupId : undefined,
      };

      await createNewsflash(newsflashData);
      
      // Call refresh callback if provided
      if (route.params?.onRefresh) {
        route.params.onRefresh();
      }
      
      Alert.alert('Success', 'Newsflash created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      // Error is already handled by the hook
      console.error('Failed to create newsflash:', error);
    }
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Newsflash</Text>
        <TouchableOpacity 
          onPress={handleCreate}
          disabled={isLoading || !content.trim()}
          style={[styles.postButton, (!content.trim() || isLoading) && styles.postButtonDisabled]}
        >
          <Text style={styles.postButtonText}>
            {isLoading ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TextInput
          style={styles.contentInput}
          placeholder="What's happening?"
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={100}
          autoFocus
        />
        
        <Text style={styles.characterCount}>
          {content.length}/100
        </Text>

        <View style={styles.targetSection}>
          <Text style={styles.sectionTitle}>Share with:</Text>
          
          <TouchableOpacity
            style={[styles.targetOption, targetType === 'friends' && styles.targetOptionSelected]}
            onPress={() => setTargetType('friends')}
          >
            <Text style={[styles.targetOptionText, targetType === 'friends' && styles.targetOptionTextSelected]}>
              👥 All Friends
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.targetOption, targetType === 'group' && styles.targetOptionSelected]}
            onPress={() => setTargetType('group')}
          >
            <Text style={[styles.targetOptionText, targetType === 'group' && styles.targetOptionTextSelected]}>
              🏷️ Specific Group
            </Text>
          </TouchableOpacity>
        </View>

        {targetType === 'group' && (
          <View style={styles.groupSection}>
            <Text style={styles.sectionTitle}>Select Group:</Text>
            <TouchableOpacity
              style={styles.groupSelector}
              onPress={() => {
                // TODO: Navigate to group selection
                Alert.alert('Coming Soon', 'Group selection will be implemented next');
              }}
            >
              <Text style={styles.groupSelectorText}>
                {selectedGroupId ? 'Group Selected' : 'Choose a group...'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentInput: {
    fontSize: 18,
    padding: 20,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    paddingHorizontal: 20,
    color: '#666',
    fontSize: 14,
  },
  targetSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  targetOption: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  targetOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  targetOptionText: {
    fontSize: 16,
    color: '#333',
  },
  targetOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  groupSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  groupSelector: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  groupSelectorText: {
    fontSize: 16,
    color: '#666',
  },
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
