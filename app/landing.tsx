import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RotatingImageCarousel from '../components/animations/RotatingImageCarousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LandingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
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
  }, []);

  const handleSignIn = () => {
    // Navigate to login
    router.push('/auth/login');
  };

  const handleContinueAsGuest = () => {
    // Skip authentication and go to app
    router.push('/(authenticated)/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000F29" />

      <View style={styles.gradient}>
        {/* Animated background waves */}
        <View style={styles.backgroundWaves}>
          <Animated.View style={[styles.wave, styles.wave1]} />
          <Animated.View style={[styles.wave, styles.wave2]} />
          <Animated.View style={[styles.wave, styles.wave3]} />
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Rotating Image */}
          <View style={styles.imageContainer}>
            <RotatingImageCarousel
              image={require('../assets/images/onboarding/gateway-circle.png')}
              isActive={true}
            />
          </View>

          {/* Title */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to Lagos Free Zone</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.primaryButton} onPress={handleSignIn}>
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleContinueAsGuest}
            >
              <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000F29',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#000F29',
    position: 'relative',
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
    backgroundColor: 'rgba(245, 31, 0, 0.08)',
  },
  wave1: {
    width: 300,
    height: 300,
    top: -150,
    right: -150,
  },
  wave2: {
    width: 200,
    height: 200,
    bottom: 100,
    left: -100,
  },
  wave3: {
    width: 150,
    height: 150,
    top: '40%',
    left: -75,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 1,
  },
  imageContainer: {
    marginBottom: 60,
  },
  textContainer: {
    // alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#F2F2F2',
    textAlign: 'left',
    lineHeight: 50,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#F51F00',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#F51F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F2F2F2',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
