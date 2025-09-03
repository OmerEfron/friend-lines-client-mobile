import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { theme } = useTheme();

  async function handleRegister() {
    console.log('🚀 [RegisterScreen] handleRegister called');
    console.log('📝 [RegisterScreen] Form data:', { name, email, password: password ? '***' : 'empty' });
    
    if (!name || !email || !password) {
      console.log('❌ [RegisterScreen] Validation failed - missing fields');
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      console.log('❌ [RegisterScreen] Validation failed - password too short');
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    console.log('✅ [RegisterScreen] Validation passed, calling register function');
    setIsLoading(true);
    
    try {
      console.log('📞 [RegisterScreen] Calling register function...');
      await register({ name, email, password });
      console.log('✅ [RegisterScreen] Registration successful!');
    } catch (error) {
      console.error('💥 [RegisterScreen] Registration error:', error);
      Alert.alert('Registration Failed', 'Please try again with different credentials.');
    } finally {
      console.log('🏁 [RegisterScreen] Registration attempt completed');
      setIsLoading(false);
    }
  }

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getContentStyle = () => ({
    flex: 1,
    justifyContent: 'center' as const,
    paddingHorizontal: theme.space[5],
  });

  const getTitleStyle = () => ({
    fontSize: theme.fonts.roles.headline.size,
    fontWeight: theme.fonts.roles.headline.weight,
    lineHeight: theme.fonts.roles.headline.size * theme.fonts.roles.headline.lh,
    color: theme.colors.text,
    textAlign: 'center' as const,
    marginBottom: theme.space[2],
  });

  const getSubtitleStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
    marginBottom: theme.space[8],
  });

  const getFormStyle = () => ({
    width: '100%',
  });

  const getLinkButtonStyle = () => ({
    alignItems: 'center' as const,
    marginTop: theme.space[4],
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={getContentStyle()}
      >
        <Text style={getTitleStyle()}>Create Account</Text>
        <Text style={getSubtitleStyle()}>Sign up to get started</Text>

        <View style={getFormStyle()}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            helper="Password must be at least 6 characters"
          />

          <Button
            title={isLoading ? 'Creating Account...' : 'Create Account'}
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
            variant="primary"
            size="lg"
          />

          <Button
            title="Already have an account? Sign in"
            onPress={() => navigation.navigate('Login')}
            variant="tertiary"
            size="md"
            style={getLinkButtonStyle()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
