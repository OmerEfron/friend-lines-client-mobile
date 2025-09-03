import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NewsflashWithAuthor } from '../services';
import { useTheme } from '../contexts/theme-context';
import { Card } from './ui/card';

interface NewsflashItemProps {
  newsflash: NewsflashWithAuthor;
  onPress?: () => void;
}

export function NewsflashItem({ newsflash, onPress }: NewsflashItemProps) {
  const { theme } = useTheme();

  // Debug logging to see the actual structure
  console.log('📰 [NewsflashItem] Rendering newsflash:', {
    id: newsflash._id,
    content: newsflash.content?.substring(0, 50) + '...',
    author: newsflash.author,
    hasAuthor: !!newsflash.author,
    authorKeys: newsflash.author ? Object.keys(newsflash.author) : 'no author'
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  // Handle missing author data gracefully
  const authorName = newsflash.author?.fullName || newsflash.author?.username || 'Unknown User';
  const username = newsflash.author?.username ? `@${newsflash.author.username}` : '';

  const getHeaderStyle = () => ({
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: theme.space[3],
  });

  const getAuthorInfoStyle = () => ({
    flex: 1,
  });

  const getAuthorNameStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    fontWeight: theme.fonts.roles.body.weight,
    color: theme.colors.text,
    marginBottom: theme.space[1],
  });

  const getUsernameStyle = () => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
  });

  const getTimestampStyle = () => ({
    fontSize: theme.fonts.roles.meta.size,
    color: theme.colors['text-muted'],
  });

  const getContentStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.text,
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
    marginBottom: theme.space[3],
  });

  const getFooterStyle = () => ({
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  });

  const getTargetInfoStyle = () => ({
    fontSize: theme.fonts.roles.meta.size,
    color: theme.colors['text-muted'],
  });

  return (
    <Card onPress={onPress} elevation={1}>
      <View style={getHeaderStyle()}>
        <View style={getAuthorInfoStyle()}>
          <Text style={getAuthorNameStyle()}>{authorName}</Text>
          {username && <Text style={getUsernameStyle()}>{username}</Text>}
        </View>
        <Text style={getTimestampStyle()}>
          {formatDate(newsflash.createdAt)}
        </Text>
      </View>
      
      <Text style={getContentStyle()}>{newsflash.content}</Text>
      
      <View style={getFooterStyle()}>
        <Text style={getTargetInfoStyle()}>
          {newsflash.targetType === 'friends' ? '👥 Friends' : '🏷️ Group'}
        </Text>
      </View>
    </Card>
  );
}

// Styles are now handled by theme system
