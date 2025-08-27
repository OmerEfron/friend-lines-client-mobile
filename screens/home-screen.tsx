import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth-context';
import { sharedStyles } from '../styles/shared';

export function HomeScreen() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={sharedStyles.content}>
        <Text style={sharedStyles.title}>Hello {user?.fullName || user?.username}!</Text>
        <Text style={sharedStyles.subtitle}>Welcome to Friend Lines</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>You are successfully logged in</Text>
          <Text style={styles.infoText}>Username: {user?.username}</Text>
          <Text style={styles.infoText}>Full Name: {user?.fullName}</Text>
          <Text style={styles.infoText}>Email: {user?.email}</Text>
          <Text style={styles.infoText}>User ID: {user?.uuid}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
