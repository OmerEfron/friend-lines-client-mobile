import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello {user?.fullName || user?.username}!</Text>
          <Text style={styles.subtitle}>Your friends' newsflashes</Text>
        </View>
      </View>

      <NotificationSettings />
      <Newsfeed ref={newsfeedRef} />
      
      <CreateNewsflashButton onPress={handleCreateNewsflash} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
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
});
