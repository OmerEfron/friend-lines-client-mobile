import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth-context';
import { sharedStyles } from '../styles/shared';

export function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

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

  return (
    <SafeAreaView style={sharedStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={sharedStyles.content}
      >
        <Text style={sharedStyles.title}>Create Account</Text>
        <Text style={sharedStyles.subtitle}>Sign up to get started</Text>

        <View style={sharedStyles.form}>
          <TextInput
            style={sharedStyles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TextInput
            style={sharedStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={sharedStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[
              sharedStyles.button,
              { backgroundColor: '#34C759' },
              isLoading && sharedStyles.buttonDisabled
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={sharedStyles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={sharedStyles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={sharedStyles.linkText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
