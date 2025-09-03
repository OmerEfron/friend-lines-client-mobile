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

export function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getContentStyle = () => ({
    flex: 1,
    justifyContent: 'center',
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

  const getLinkTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.brand.primary,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={getContentStyle()}
      >
        <Text style={getTitleStyle()}>Welcome Back</Text>
        <Text style={getSubtitleStyle()}>Sign in to your account</Text>

        <View style={getFormStyle()}>
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
          />

          <Button
            title={isLoading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            variant="primary"
            size="lg"
          />

          <Button
            title="Don't have an account? Sign up"
            onPress={() => navigation.navigate('Register')}
            variant="tertiary"
            size="md"
            style={getLinkButtonStyle()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
