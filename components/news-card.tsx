import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { useTheme } from '../contexts/theme-context';
import { Card } from './ui/card';
import { Chip } from './ui/chip';
import { Badge } from './ui/badge';

export type ImageRatio = '16:9' | '1:1' | '1.91:1';

interface Source {
  type: 'friend' | 'group';
  name: string;
  avatarUrl?: string;
}

interface NewsCardProps {
  id: string;
  thumbnailUrl?: string;
  ratio?: ImageRatio;
  source: Source;
  headline: string;
  subhead?: string;
  timestamp: string;
  isRead?: boolean;
  isNew?: boolean;
  onPress?: () => void;
  onShare?: () => void;
  onSave?: (saved: boolean) => void;
  onMute?: () => void;
  testID?: string;
}

export function NewsCard({
  id,
  thumbnailUrl,
  ratio = '16:9',
  source,
  headline,
  subhead,
  timestamp,
  isRead = false,
  isNew = false,
  onPress,
  onShare,
  onSave,
  onMute,
  testID,
}: NewsCardProps) {
  const { theme } = useTheme();

  const getImageStyle = (): ImageStyle => {
    const ratios = {
      '16:9': { aspectRatio: 16 / 9 },
      '1:1': { aspectRatio: 1 },
      '1.91:1': { aspectRatio: 1.91 },
    };

    return {
      width: '100%',
      backgroundColor: theme.colors['surface-2'],
      ...ratios[ratio],
    };
  };

  const getBodyStyle = (): ViewStyle => ({
    padding: theme.space[4],
  });

  const getMetaRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.space[2],
    gap: theme.space[2],
  });

  const getHeadlineStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.headline.size,
    fontWeight: theme.fonts.roles.headline.weight,
    lineHeight: theme.fonts.roles.headline.size * theme.fonts.roles.headline.lh,
    color: theme.colors.text,
    marginBottom: theme.space[2],
  });

  const getSubheadStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.subhead.size,
    fontWeight: theme.fonts.roles.subhead.weight,
    lineHeight: theme.fonts.roles.subhead.size * theme.fonts.roles.subhead.lh,
    color: theme.colors['text-muted'],
    marginBottom: theme.space[3],
  });

  const getBylineStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.meta.size,
    fontWeight: theme.fonts.roles.meta.weight,
    lineHeight: theme.fonts.roles.meta.size * theme.fonts.roles.meta.lh,
    color: theme.colors['text-muted'],
  });

  const getDividerStyle = (): ViewStyle => ({
    height: 1,
    backgroundColor: theme.colors.divider,
    marginTop: theme.space[3],
  });

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card onPress={onPress} elevation={1} testID={testID}>
      {thumbnailUrl && (
        <Image
          source={{ uri: thumbnailUrl }}
          style={getImageStyle()}
          resizeMode="cover"
        />
      )}
      
      <View style={getBodyStyle()}>
        <View style={getMetaRowStyle()}>
          <Chip>
            {source.type === 'friend' ? '👤' : '👥'} {source.name}
          </Chip>
          {isNew && (
            <Badge variant="default" size="sm">
              NEW
            </Badge>
          )}
        </View>
        
        <Text numberOfLines={2} style={getHeadlineStyle()}>
          {headline}
        </Text>
        
        {subhead && (
          <Text numberOfLines={1} style={getSubheadStyle()}>
            {subhead}
          </Text>
        )}
        
        <Text style={getBylineStyle()}>
          {formatTimestamp(timestamp)}
        </Text>
      </View>
      
      <View style={getDividerStyle()} />
    </Card>
  );
}
