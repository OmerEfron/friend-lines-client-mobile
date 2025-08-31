import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNotifications } from '../hooks/use-notifications';

export function NotificationSettings() {
  const { isEnabled, isLoading, testNotification } = useNotifications();

  const handleTestNotification = () => {
    if (isEnabled) {
      testNotification();
      Alert.alert('Test Notification', 'A test notification will appear in 2 seconds!');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Setting up notifications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Notifications:</Text>
        <Text style={[styles.statusValue, { color: isEnabled ? '#34C759' : '#FF3B30' }]}>
          {isEnabled ? 'Enabled' : 'Disabled'}
        </Text>
      </View>
      
      {isEnabled && (
        <TouchableOpacity style={styles.testButton} onPress={handleTestNotification}>
          <Text style={styles.testButtonText}>Test Notification</Text>
        </TouchableOpacity>
      )}
      
      {!isEnabled && (
        <Text style={styles.helpText}>
          Enable notifications in your device settings to receive updates from friends
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  testButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
