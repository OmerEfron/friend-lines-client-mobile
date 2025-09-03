import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';
import { NewsCard } from '../components/news-card';
import { NotificationSettings } from '../components/notification-settings';

export function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { theme } = useTheme();

  // Mock data for demonstration - replace with actual data from hooks
  const mockNewsflashes = [
    {
      id: '1',
      headline: 'Team meeting moved to 3 PM',
      subhead: 'Conference room B has been updated',
      source: { type: 'group' as const, name: 'Office Team' },
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isNew: true,
    },
    {
      id: '2',
      headline: 'Sarah shared a photo from the weekend',
      source: { type: 'friend' as const, name: 'Sarah Johnson' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isNew: false,
    },
    {
      id: '3',
      headline: 'Project deadline extended by one week',
      subhead: 'Client requested additional time for review',
      source: { type: 'group' as const, name: 'Design Team' },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isNew: false,
    },
  ];

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Search pressed');
  };

  const handleInbox = () => {
    navigation.navigate('Inbox');
  };

  const handleLogo = () => {
    // Navigate to home or refresh
    console.log('Logo pressed');
  };

  const handleSectionPicker = () => {
    // Show section picker modal
    console.log('Section picker pressed');
  };

  const handleNewsCardPress = (newsflashId: string) => {
    console.log('News card pressed:', newsflashId);
  };

  const renderNewsCard = ({ item }: { item: any }) => (
    <NewsCard
      id={item.id}
      headline={item.headline}
      subhead={item.subhead}
      source={item.source}
      timestamp={item.timestamp}
      isNew={item.isNew}
      onPress={() => handleNewsCardPress(item.id)}
    />
  );

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getEmptyStyle = () => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.space[6],
  });

  const getEmptyTextStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors['text-muted'],
    textAlign: 'center',
    marginBottom: theme.space[2],
  });

  const getEmptySubtextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center',
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Friendlines"
        section="Main"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
        onOpenSectionPicker={handleSectionPicker}
        badgeCount={3}
      />

      <NotificationSettings />

      {mockNewsflashes.length > 0 ? (
        <FlatList
          data={mockNewsflashes}
          renderItem={renderNewsCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.space[8] }}
        />
      ) : (
        <View style={getEmptyStyle()}>
          <Text style={getEmptyTextStyle()}>
            No updates yet
          </Text>
          <Text style={getEmptySubtextStyle()}>
            Invite friends or follow groups to see their newsflashes here.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Styles are now handled by theme system
});
