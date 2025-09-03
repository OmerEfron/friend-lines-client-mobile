import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserSearch } from '../hooks/use-user-search';
import { useTheme } from '../contexts/theme-context';
import { UserSearchHeader } from '../components/user-search-header';
import { UserSearchForm } from '../components/user-search-form';
import { UserSearchList } from '../components/user-search-list';
import { UserSearchError } from '../components/user-search-error';
import { TopBar } from '../components/top-bar';

export function UserSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, isLoading, error, searchUsers } = useUserSearch();
  const { theme } = useTheme();

  const handleSearch = () => {
    if (searchQuery.trim().length < 2) {
      Alert.alert('Search Error', 'Please enter at least 2 characters to search');
      return;
    }
    searchUsers(searchQuery.trim());
  };

  const handleInbox = () => {
    // Navigate to inbox
    console.log('Inbox pressed');
  };

  const handleLogo = () => {
    // Navigate to home
    console.log('Logo pressed');
  };

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Find Friends"
        onPressLogo={handleLogo}
        onPressInbox={handleInbox}
      />
      <UserSearchHeader />
      <UserSearchForm
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />
      {error && <UserSearchError error={error} />}
      <UserSearchList users={users} isLoading={isLoading} />
    </SafeAreaView>
  );
}
