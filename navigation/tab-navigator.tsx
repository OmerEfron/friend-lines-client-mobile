import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/theme-context';
import { HomeScreen } from '../screens/home-screen';
import { GroupsListScreen } from '../screens/groups-list-screen';
import { CreateNewsflashScreen } from '../screens/create-newsflash-screen';
import { FriendRequestsScreen } from '../screens/friend-requests-screen';
import { UserProfileScreen } from '../screens/user-profile-screen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors['text-muted'],
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.divider,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.fonts.roles.meta.size,
          fontWeight: theme.fonts.roles.meta.weight,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Groups" 
        component={GroupsListScreen}
        options={{ title: 'Groups' }}
      />
      <Tab.Screen 
        name="Post" 
        component={CreateNewsflashScreen}
        options={{ 
          title: 'Post',
          tabBarStyle: { display: 'none' }, // Hide tab bar for post screen
        }}
      />
      <Tab.Screen 
        name="Inbox" 
        component={FriendRequestsScreen}
        options={{ title: 'Inbox' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
