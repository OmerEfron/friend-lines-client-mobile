import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../contexts/theme-context';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CreateNewsflashFormProps {
  content: string;
  onContentChange: (content: string) => void;
  targetType: 'friends' | 'group';
  onTargetTypeChange: (type: 'friends' | 'group') => void;
  selectedGroupId: string;
  onGroupSelect: () => void;
}

export function CreateNewsflashForm({
  content,
  onContentChange,
  targetType,
  onTargetTypeChange,
  selectedGroupId,
  onGroupSelect,
}: CreateNewsflashFormProps) {
  const { theme } = useTheme();

  const getContentInputStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    padding: theme.space[5],
    minHeight: 120,
    textAlignVertical: 'top' as const,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    margin: theme.space[4],
    borderWidth: 1,
    borderColor: theme.colors.divider,
  });

  const getCharacterCountStyle = () => ({
    textAlign: 'right' as const,
    paddingHorizontal: theme.space[5],
    color: theme.colors['text-muted'],
    fontSize: theme.fonts.roles.caption.size,
  });

  const getSectionStyle = () => ({
    padding: theme.space[5],
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  });

  const getSectionTitleStyle = () => ({
    fontSize: theme.fonts.roles.subhead.size,
    fontWeight: theme.fonts.roles.subhead.weight,
    color: theme.colors.text,
    marginBottom: theme.space[3],
  });

  const getTargetOptionStyle = (selected: boolean) => ({
    padding: theme.space[4],
    borderWidth: 1,
    borderColor: selected ? theme.colors.brand.primary : theme.colors.divider,
    borderRadius: theme.radius.md,
    marginBottom: theme.space[2],
    backgroundColor: selected ? theme.colors.brand.primary + '10' : theme.colors.surface,
  });

  const getTargetOptionTextStyle = (selected: boolean) => ({
    fontSize: theme.fonts.roles.body.size,
    color: selected ? theme.colors.brand.primary : theme.colors.text,
    fontWeight: selected ? theme.fonts.roles.body.weight : 'normal',
  });

  const getGroupSelectorStyle = () => ({
    padding: theme.space[4],
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors['chip-bg'],
  });

  const getGroupSelectorTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
  });

  return (
    <>
      <TextInput
        style={getContentInputStyle()}
        placeholder="What's happening?"
        value={content}
        onChangeText={onContentChange}
        multiline
        maxLength={100}
        autoFocus
        placeholderTextColor={theme.colors['text-muted']}
      />
      
      <Text style={getCharacterCountStyle()}>
        {content.length}/100
      </Text>

      <View style={getSectionStyle()}>
        <Text style={getSectionTitleStyle()}>Share with:</Text>
        
        <TouchableOpacity
          style={getTargetOptionStyle(targetType === 'friends')}
          onPress={() => onTargetTypeChange('friends')}
        >
          <Text style={getTargetOptionTextStyle(targetType === 'friends')}>
            👥 All Friends
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getTargetOptionStyle(targetType === 'group')}
          onPress={() => onTargetTypeChange('group')}
        >
          <Text style={getTargetOptionTextStyle(targetType === 'group')}>
            🏷️ Specific Group
          </Text>
        </TouchableOpacity>
      </View>

      {targetType === 'group' && (
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Select Group:</Text>
          <TouchableOpacity
            style={getGroupSelectorStyle()}
            onPress={onGroupSelect}
          >
            <Text style={getGroupSelectorTextStyle()}>
              {selectedGroupId ? 'Group Selected' : 'Choose a group...'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

// Styles are now handled by theme system
