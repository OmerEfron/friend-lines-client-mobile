import React from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGroups } from '../hooks/use-groups';
import { GroupItem } from '../components/group-item';
import { Group } from '../services/groups-api';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';
import { Button } from '../components/ui/button';

export function GroupsListScreen({ navigation }: any) {
  const { groups, isLoading, error, hasMore, refresh, loadMore } = useGroups();
  const { theme } = useTheme();

  const handleGroupPress = (group: Group) => {
    navigation.navigate('GroupDetails', { group });
  };

  const handleCreateGroup = () => {
    navigation.navigate('CreateGroup');
  };

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Search pressed');
  };

  const handleInbox = () => {
    navigation.navigate('Inbox');
  };

  const handleLogo = () => {
    navigation.navigate('Home');
  };

  const renderGroup = ({ item }: { item: Group }) => (
    <GroupItem group={item} onPress={handleGroupPress} />
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    
    return (
      <View style={getFooterStyle()}>
        <ActivityIndicator size="small" color={theme.colors.brand.primary} />
        <Text style={getLoadingTextStyle()}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={getEmptyStyle()}>
      <Text style={getEmptyTitleStyle()}>No groups yet</Text>
      <Text style={getEmptySubtitleStyle()}>
        Create your first group to start sharing newsflashes with specific friends
      </Text>
      <Button
        title="Create Group"
        onPress={handleCreateGroup}
        variant="primary"
        size="md"
        style={getCreateButtonStyle()}
      />
    </View>
  );

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getListStyle = () => ({
    paddingTop: theme.space[2],
    paddingBottom: theme.space[8],
  });

  const getFooterStyle = () => ({
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.space[4],
  });

  const getLoadingTextStyle = () => ({
    marginLeft: theme.space[2],
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
  });

  const getEmptyStyle = () => ({
    alignItems: 'center' as const,
    padding: theme.space[8],
  });

  const getEmptyTitleStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.text,
    marginBottom: theme.space[2],
  });

  const getEmptySubtitleStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
    marginBottom: theme.space[6],
  });

  const getCreateButtonStyle = () => ({
    marginTop: theme.space[4],
  });

  const getErrorStyle = () => ({
    alignItems: 'center' as const,
    padding: theme.space[8],
  });

  const getErrorTitleStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.semantic.error,
    marginBottom: theme.space[2],
  });

  const getErrorMessageStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
  });

  if (error) {
    return (
      <SafeAreaView style={getContainerStyle()}>
        <TopBar
          title="Groups"
          onPressLogo={handleLogo}
          onPressSearch={handleSearch}
          onPressInbox={handleInbox}
        />
        <View style={getErrorStyle()}>
          <Text style={getErrorTitleStyle()}>Something went wrong</Text>
          <Text style={getErrorMessageStyle()}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Groups"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
        onOpenSectionPicker={handleCreateGroup}
      />

      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(item) => item._id}
        contentContainerStyle={getListStyle()}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading} 
            onRefresh={refresh}
            tintColor={theme.colors.brand.primary}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Styles are now handled by theme system
