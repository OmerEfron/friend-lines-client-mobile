import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface CreateNewsflashFormProps {
  content: string;
  onContentChange: (content: string) => void;
  targetType: 'friends' | 'group';
  onTargetTypeChange: (type: 'friends' | 'group') => void;
  selectedGroupId: string;
  onGroupSelect: () => void;
}

export function CreateNewsflashForm({
  content,
  onContentChange,
  targetType,
  onTargetTypeChange,
  selectedGroupId,
  onGroupSelect,
}: CreateNewsflashFormProps) {
  return (
    <>
      <TextInput
        style={styles.contentInput}
        placeholder="What's happening?"
        value={content}
        onChangeText={onContentChange}
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
          onPress={() => onTargetTypeChange('friends')}
        >
          <Text style={[styles.targetOptionText, targetType === 'friends' && styles.targetOptionTextSelected]}>
            👥 All Friends
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.targetOption, targetType === 'group' && styles.targetOptionSelected]}
          onPress={() => onTargetTypeChange('group')}
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
            onPress={onGroupSelect}
          >
            <Text style={styles.groupSelectorText}>
              {selectedGroupId ? 'Group Selected' : 'Choose a group...'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
});
