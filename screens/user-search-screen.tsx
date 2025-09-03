import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserSearch } from '../hooks/use-user-search';
import { UserSearchHeader } from '../components/user-search-header';
import { UserSearchForm } from '../components/user-search-form';
import { UserSearchList } from '../components/user-search-list';
import { UserSearchError } from '../components/user-search-error';
import { sharedStyles } from '../styles/shared';

export function UserSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, isLoading, error, searchUsers } = useUserSearch();

  const handleSearch = () => {
    if (searchQuery.trim().length < 2) {
      Alert.alert('Search Error', 'Please enter at least 2 characters to search');
      return;
    }
    searchUsers(searchQuery.trim());
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
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
