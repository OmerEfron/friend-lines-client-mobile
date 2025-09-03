import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Group } from '../services/groups-api';

interface GroupSelectionModalProps {
  visible: boolean;
  groups: Group[];
  selectedGroupId: string;
  onSelectGroup: (group: Group) => void;
  onClose: () => void;
}

export function GroupSelectionModal({ 
  visible, 
  groups, 
  selectedGroupId, 
  onSelectGroup, 
  onClose 
}: GroupSelectionModalProps) {
  const renderGroup = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={[
        styles.groupItem,
        selectedGroupId === item._id && styles.selectedGroupItem
      ]}
      onPress={() => onSelectGroup(item)}
    >
      <View style={styles.groupContent}>
        <Text style={[
          styles.groupName,
          selectedGroupId === item._id && styles.selectedGroupName
        ]}>
          {item.name}
        </Text>
        <Text style={styles.memberCount}>
          {item.members.length} members
        </Text>
      </View>
      {selectedGroupId === item._id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Group</Text>
          <View style={styles.placeholder} />
        </View>

        <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
  placeholder: {
    width: 60,
  },
  list: {
    padding: 16,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedGroupItem: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  groupContent: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedGroupName: {
    color: '#007AFF',
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
