import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/auth-context';
import { sharedStyles } from '../styles/shared';
import { Newsfeed, NewsfeedRef } from '../components/newsfeed';
import { NotificationSettings } from '../components/notification-settings';
import { CreateNewsflashButton } from '../components/create-newsflash-button';

export function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const newsfeedRef = useRef<NewsfeedRef>(null);

  const handleCreateNewsflash = () => {
    navigation.navigate('CreateNewsflash', {
      onRefresh: () => {
        if (newsfeedRef.current?.refresh) {
          newsfeedRef.current.refresh();
        }
      }
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello {user?.fullName || user?.username}!</Text>
          <Text style={styles.subtitle}>Your friends' newsflashes</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={handleProfilePress}
          testID="profile-button"
        >
          <Ionicons name="person-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <NotificationSettings />
      <Newsfeed ref={newsfeedRef} />
      
      <CreateNewsflashButton onPress={handleCreateNewsflash} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
  },
});
