import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NewsflashWithAuthor } from '../services';

interface NewsflashItemProps {
  newsflash: NewsflashWithAuthor;
  onPress?: () => void;
}

export function NewsflashItem({ newsflash, onPress }: NewsflashItemProps) {
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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{authorName}</Text>
          {username && <Text style={styles.username}>{username}</Text>}
        </View>
        <Text style={styles.timestamp}>
          {formatDate(newsflash.createdAt)}
        </Text>
      </View>
      
      <Text style={styles.content}>{newsflash.content}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.targetInfo}>
          {newsflash.targetType === 'friends' ? '👥 Friends' : '🏷️ Group'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetInfo: {
    fontSize: 12,
    color: '#666',
  },
});
