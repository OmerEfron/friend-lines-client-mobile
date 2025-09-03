import React from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { NewsflashItem } from './newsflash-item';
import { useTheme } from '../contexts/theme-context';

interface NewsflashWithAuthor {
  _id: string;
  authorId: string;
  content: string;
  targetType: 'friends' | 'group';
  targetId?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface UserNewsflashesListProps {
  newsflashes: NewsflashWithAuthor[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export function UserNewsflashesList({
  newsflashes,
  isLoading,
  error,
  hasMore,
  onRefresh,
  onLoadMore,
}: UserNewsflashesListProps) {
  const { theme } = useTheme();

  const renderNewsflash = ({ item }: { item: NewsflashWithAuthor }) => (
    <NewsflashItem newsflash={item} />
  );

  const renderFooter = () => {
    if (!isLoading || newsflashes.length === 0) return null;
    
    return (
      <View style={getFooterStyle()}>
        <ActivityIndicator size="small" color={theme.colors.brand.primary} />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={getEmptyStyle()}>
      <Text style={getEmptyTextStyle()}>No newsflashes yet</Text>
      <Text style={getEmptySubtextStyle()}>
        This user hasn't shared any newsflashes
      </Text>
    </View>
  );

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.surface,
  });

  const getSectionTitleStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.text,
    paddingHorizontal: theme.space[5],
    paddingVertical: theme.space[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  });

  const getFooterStyle = () => ({
    padding: theme.space[5],
    alignItems: 'center' as const,
  });

  const getEmptyStyle = () => ({
    padding: theme.space[10],
    alignItems: 'center' as const,
  });

  const getEmptyTextStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors['text-muted'],
    marginBottom: theme.space[2],
  });

  const getEmptySubtextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
  });

  const getErrorStyle = () => ({
    padding: theme.space[5],
    alignItems: 'center' as const,
  });

  const getErrorTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    fontWeight: theme.fonts.roles.body.weight,
    color: theme.colors.semantic.error,
    marginBottom: theme.space[1],
  });

  const getErrorSubtextStyle = () => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
  });

  if (error) {
    return (
      <View style={getErrorStyle()}>
        <Text style={getErrorTextStyle()}>Failed to load newsflashes</Text>
        <Text style={getErrorSubtextStyle()}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={getContainerStyle()}>
      <Text style={getSectionTitleStyle()}>Newsflashes</Text>
      <FlatList
        data={newsflashes}
        renderItem={renderNewsflash}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading && newsflashes.length === 0} 
            onRefresh={onRefresh}
            tintColor={theme.colors.brand.primary}
          />
        }
        onEndReached={hasMore ? onLoadMore : undefined}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}

// Styles are now handled by theme system
