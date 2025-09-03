import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateNewsflash } from '../hooks/use-create-newsflash';
import { useGroups } from '../hooks/use-groups';
import { CreateNewsflashHeader } from '../components/create-newsflash-header';
import { CreateNewsflashForm } from '../components/create-newsflash-form';
import { CreateNewsflashError } from '../components/create-newsflash-error';
import { GroupSelectionModal } from '../components/group-selection-modal';
import { Group } from '../services/groups-api';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';

export function CreateNewsflashScreen({ navigation, route }: any) {
  const [content, setContent] = useState('');
  const [targetType, setTargetType] = useState<'friends' | 'group'>('friends');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const { createNewsflash, isLoading, error } = useCreateNewsflash();
  const { groups } = useGroups();
  const { theme } = useTheme();

  const handleCreate = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    if (content.length > 100) {
      Alert.alert('Error', 'Content must be 100 characters or less');
      return;
    }

    if (targetType === 'group' && !selectedGroupId) {
      Alert.alert('Error', 'Please select a group');
      return;
    }

    try {
      const newsflashData = {
        content: content.trim(),
        targetType,
        targetId: targetType === 'group' ? selectedGroupId : undefined,
      };

      await createNewsflash(newsflashData);
      
      if (route.params?.onRefresh) {
        route.params.onRefresh();
      }
      
      Alert.alert('Success', 'Newsflash created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.error('Failed to create newsflash:', error);
    }
  };

  const handleGroupSelect = () => {
    setShowGroupModal(true);
  };

  const handleGroupSelected = (group: Group) => {
    setSelectedGroupId(group._id);
    setShowGroupModal(false);
  };

  const handleCloseGroupModal = () => {
    setShowGroupModal(false);
  };

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Search pressed');
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

  const getContentStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.surface,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Create Post"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
      />
      
      <CreateNewsflashHeader
        isLoading={isLoading}
        hasContent={content.trim().length > 0}
        onCancel={() => navigation.goBack()}
        onCreate={handleCreate}
      />

      <ScrollView style={getContentStyle()} keyboardShouldPersistTaps="handled">
        {error && <CreateNewsflashError error={error} />}
        <CreateNewsflashForm
          content={content}
          onContentChange={setContent}
          targetType={targetType}
          onTargetTypeChange={setTargetType}
          selectedGroupId={selectedGroupId}
          onGroupSelect={handleGroupSelect}
        />
      </ScrollView>

      <GroupSelectionModal
        visible={showGroupModal}
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={handleGroupSelected}
        onClose={handleCloseGroupModal}
      />
    </SafeAreaView>
  );
}

// Styles are now handled by theme system
