import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/home-screen';
import { UserSearchScreen } from '../screens/user-search-screen';
import { FriendsScreen } from '../screens/friends-screen';
import { FriendRequestsScreen } from '../screens/friend-requests-screen';
import { GroupsListScreen } from '../screens/groups-list-screen';
import { UserProfileScreen } from '../screens/user-profile-screen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Requests') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Newsfeed' }}
      />
      <Tab.Screen 
        name="Search" 
        component={UserSearchScreen}
        options={{ title: 'Find Friends' }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen}
        options={{ title: 'My Friends' }}
      />
      <Tab.Screen 
        name="Requests" 
        component={FriendRequestsScreen}
        options={{ title: 'Requests' }}
      />
      <Tab.Screen 
        name="Groups" 
        component={GroupsListScreen}
        options={{ title: 'Groups' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfileScreen}
        options={{ title: 'My Profile' }}
      />
    </Tab.Navigator>
  );
}
