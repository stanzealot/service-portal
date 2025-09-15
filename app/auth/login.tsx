// app/auth/login.tsx - Simple Layout First
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: formData.email,
        role: 'user',
      };

      login(mockUser, 'mock_token');
      setLoading(false);
      router.push('/(authenticated)/dashboard' as any);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000F29" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {/* Blue Background Section */}
        <View style={styles.blueBackground}>
          <Image
            source={require('../../assets/logo-blue.png')}
            style={{ height: 87, width: 199 }}
          />
          {/* <Text style={styles.logoText}>LOGO PLACEHOLDER</Text> */}
        </View>

        {/* White Section with Form */}
        <View style={styles.whiteSection}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.formContainer}>
              <Text style={styles.welcomeTitle}>Welcome to One Portal</Text>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    formData.email && styles.textInputFocused,
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, email: text }))
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      formData.password && styles.textInputFocused,
                    ]}
                    placeholder="Enter your Password"
                    placeholderTextColor="#999"
                    value={formData.password}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, password: text }))
                    }
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    <Ionicons
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#666"
                    />
                  </Pressable>
                </View>
              </View>

              <Pressable style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              {/* Sign In Button */}
              <Pressable
                style={styles.signInButton}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Text style={styles.signInButtonText}>Loading...</Text>
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </Pressable>

              {/* Biometric Button */}
              <Pressable style={styles.biometricButton}>
                <Ionicons name="finger-print" size={66} color="#666" />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000F29',
  },
  keyboardAvoid: {
    flex: 1,
  },
  blueBackground: {
    height: SCREEN_HEIGHT * 0.25, // 40% of screen height
    backgroundColor: '#000F29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
  },
  whiteSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 137,
    marginTop: -20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 32,
    paddingTop: 48,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  textInputFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingRight: 55,
    fontSize: 16,
    color: '#333',
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#000F29',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  biometricButton: {
    alignItems: 'center',
  },
});
