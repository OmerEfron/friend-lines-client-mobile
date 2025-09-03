import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Group } from '../services/groups-api';

interface GroupItemProps {
  group: Group;
  onPress: (group: Group) => void;
}

export function GroupItem({ group, onPress }: GroupItemProps) {
  const handlePress = () => {
    onPress(group);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{group.name}</Text>
          <Text style={styles.memberCount}>{group.members.length} members</Text>
        </View>
        
        {group.description && (
          <Text style={styles.description} numberOfLines={2}>
            {group.description}
          </Text>
        )}
        
        <Text style={styles.createdAt}>
          Created {new Date(group.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
  },
});
