// app/auth/login.tsx - Exact UI Match
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
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
  const [showBiometricModal, setShowBiometricModal] = useState(false);

  const { login } = useAuthStore();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const biometricPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Biometric pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(biometricPulse, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(biometricPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);

    // Ripple effect
    rippleAnim.setValue(0);
    Animated.timing(rippleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Simulate login
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: formData.email,
        role: 'user',
      };

      login(mockUser, 'mock_token');
      setLoading(false);
      router.push('/(authenticated)/dashboard');
    }, 2000);
  };

  const handleBiometric = () => {
    setShowBiometricModal(true);

    // Simulate biometric authentication
    setTimeout(() => {
      setShowBiometricModal(false);
      const mockUser = {
        id: '1',
        name: 'Biometric User',
        email: 'biometric@lfz.com',
        role: 'user',
      };
      login(mockUser, 'biometric_token');
      router.push('/(authenticated)/dashboard');
    }, 2500);
  };

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000F29" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {/* Top Section - Dark Blue */}
        <View style={styles.topSection}>
          {/* Animated background waves */}
          <View style={styles.backgroundWaves}>
            <Animated.View style={[styles.wave, styles.wave1]} />
            <Animated.View style={[styles.wave, styles.wave2]} />
          </View>

          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Image
              source={require('../../assets/logo-large.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Bottom Section - White with Curve */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
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

            {/* Sign In Button with Ripple Effect */}
            <Pressable
              style={styles.signInButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {/* Ripple Effect */}
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    transform: [{ scale: rippleScale }],
                    opacity: rippleOpacity,
                  },
                ]}
              />

              {loading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={styles.loadingDot} />
                  <Animated.View
                    style={[styles.loadingDot, { marginLeft: 8 }]}
                  />
                  <Animated.View
                    style={[styles.loadingDot, { marginLeft: 8 }]}
                  />
                </View>
              ) : (
                <Text style={styles.signInButtonText}>Sign In</Text>
              )}
            </Pressable>

            {/* Biometric Button */}
            <Pressable style={styles.biometricButton} onPress={handleBiometric}>
              <Animated.View
                style={[
                  styles.biometricIcon,
                  { transform: [{ scale: biometricPulse }] },
                ]}
              >
                <Ionicons name="finger-print" size={32} color="#666" />
              </Animated.View>
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>

      {/* Biometric Authentication Modal */}
      <Modal
        visible={showBiometricModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBiometricModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.biometricModal}>
            <View style={styles.modalContent}>
              {/* Animated Loading Circle */}
              <View style={styles.loadingCircleContainer}>
                <Animated.View style={styles.loadingCircle}>
                  <View style={styles.loadingSpinner} />
                </Animated.View>
              </View>

              <Text style={styles.modalTitle}>Touch ID</Text>
              <Text style={styles.modalSubtitle}>
                Use your fingerprint to authenticate
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
  topSection: {
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: '#000F29',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundWaves: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wave: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(245, 31, 0, 0.06)',
  },
  wave1: {
    width: 200,
    height: 200,
    top: -100,
    right: -50,
  },
  wave2: {
    width: 150,
    height: 150,
    bottom: -50,
    left: -30,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 80,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -16,
  },
  formContainer: {
    padding: 32,
    paddingTop: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    // transition: 'all 0.2s ease',
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
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#333',
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#000F29',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000F29',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ripple: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    zIndex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  biometricButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  biometricIcon: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  biometricModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    minWidth: 300,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  modalContent: {
    padding: 32,
    alignItems: 'center',
  },
  loadingCircleContainer: {
    marginBottom: 24,
  },
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#E8E8E8',
    borderTopColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#007AFF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
