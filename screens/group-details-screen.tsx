import React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGroupFeed } from '../hooks/use-group-feed';
import { NewsflashItem } from '../components/newsflash-item';
import { NewsflashWithAuthor } from '../services/newsflashes-api';
import { sharedStyles } from '../styles/shared';

export function GroupDetailsScreen({ route, navigation }: any) {
  const { group } = route.params;
  const { newsflashes, isLoading, error, hasMore, refresh, loadMore } = useGroupFeed(group._id);

  const renderNewsflash = ({ item }: { item: NewsflashWithAuthor }) => (
    <NewsflashItem 
      newsflash={item} 
      onPress={() => console.log('Newsflash pressed:', item._id)}
    />
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No newsflashes yet</Text>
      <Text style={styles.emptySubtitle}>
        Be the first to share something in this group!
      </Text>
    </View>
  );

  if (error) {
    return (
      <SafeAreaView style={sharedStyles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{group.name}</Text>
        <Text style={styles.memberCount}>{group.members.length} members</Text>
        {group.description && (
          <Text style={styles.description}>{group.description}</Text>
        )}
      </View>

      <FlatList
        data={newsflashes}
        renderItem={renderNewsflash}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
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

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
