import React, { useState } from 'react';
import { Alert, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateGroup } from '../hooks/use-create-group';
import { CreateGroupForm } from '../components/create-group-form';
import { CreateGroupRequest } from '../services/groups-api';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';

export function CreateGroupScreen({ navigation }: any) {
  const [groupData, setGroupData] = useState<CreateGroupRequest>({
    name: '',
    description: '',
  });
  const { createGroup, isLoading, error } = useCreateGroup();
  const { theme } = useTheme();

  const handleCreate = async () => {
    if (!groupData.name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (groupData.name.length > 50) {
      Alert.alert('Error', 'Group name must be 50 characters or less');
      return;
    }

    try {
      await createGroup(groupData);
      
      Alert.alert('Success', 'Group created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.error('Failed to create group:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const canCreate = groupData.name.trim().length > 0 && !isLoading;

  const handleSearch = () => {
    console.log('Search pressed');
  };

  const handleInbox = () => {
    console.log('Inbox pressed');
  };

  const handleLogo = () => {
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

  const getHeaderStyle = () => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: theme.space[4],
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  });

  const getCancelButtonStyle = () => ({
    padding: theme.space[2],
  });

  const getCancelTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.brand.primary,
  });

  const getTitleStyle = () => ({
    fontSize: theme.fonts.roles.subhead.size,
    fontWeight: theme.fonts.roles.subhead.weight,
    color: theme.colors.text,
  });

  const getCreateButtonStyle = () => ({
    padding: theme.space[2],
  });

  const getCreateTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    fontWeight: theme.fonts.roles.body.weight,
    color: theme.colors.brand.primary,
  });

  const getCreateTextDisabledStyle = () => ({
    color: theme.colors['text-muted'],
  });

  const getErrorContainerStyle = () => ({
    margin: theme.space[4],
    padding: theme.space[3],
    backgroundColor: theme.colors.semantic.error + '20',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.semantic.error + '40',
  });

  const getErrorTextStyle = () => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors.semantic.error,
    textAlign: 'center' as const,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Create Group"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
      />
      
      <View style={getHeaderStyle()}>
        <TouchableOpacity onPress={handleCancel} style={getCancelButtonStyle()}>
          <Text style={getCancelTextStyle()}>Cancel</Text>
        </TouchableOpacity>
        
        <Text style={getTitleStyle()}>Create Group</Text>
        
        <TouchableOpacity 
          onPress={handleCreate} 
          style={[getCreateButtonStyle(), !canCreate && { opacity: 0.5 }]}
          disabled={!canCreate}
        >
          <Text style={[getCreateTextStyle(), !canCreate && getCreateTextDisabledStyle()]}>
            {isLoading ? 'Creating...' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={getContentStyle()} keyboardShouldPersistTaps="handled">
        {error && (
          <View style={getErrorContainerStyle()}>
            <Text style={getErrorTextStyle()}>{error}</Text>
          </View>
        )}
        
        <CreateGroupForm
          groupData={groupData}
          onGroupDataChange={setGroupData}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles are now handled by theme system
