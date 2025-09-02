// components/animations/RotatingImageCarousel.tsx - Correct Implementation
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CIRCLE_SIZE = 300;

interface RotatingImageCarouselProps {
  image: any;
  isActive?: boolean;
}

const RotatingImageCarousel: React.FC<RotatingImageCarouselProps> = ({
  image,
  isActive = true,
}) => {
  // Only the image rotates, logo stays static
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    const entranceAnimations = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: 300,
        tension: 100,
        friction: 12,
        useNativeDriver: true,
      }),
    ]);

    entranceAnimations.start();

    if (isActive) {
      // Continuous rotation - only for the image
      const rotationAnimation = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 25000, // 25 seconds per rotation
          useNativeDriver: true,
        }),
        { resetBeforeIteration: true }
      );

      setTimeout(() => rotationAnimation.start(), 800);

      return () => {
        rotationAnimation.stop();
      };
    }
  }, [isActive]);

  // Convert rotation value to degrees
  const rotationInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Main container */}
      <Animated.View
        style={[
          styles.rotatingContainer,
          {
            transform: [{ scale: scale }],
            opacity: opacity,
          },
        ]}
      >
        {/* Rotating image - ONLY this rotates */}
        <Animated.View
          style={[
            styles.imageContainer,
            { transform: [{ rotate: rotationInterpolation }] },
          ]}
        >
          <Image source={image} style={styles.image} resizeMode="cover" />
        </Animated.View>

        {/* Center logo - STATIC, doesn't rotate */}
        <View style={styles.centerLogo}>
          <LinearGradient
            colors={['#FF4444', '#FF6B35']}
            style={styles.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoText}>LFZ</Text>
          </LinearGradient>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rotatingContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  centerLogo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 20,
    shadowColor: '#FF4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  logoGradient: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});

export default RotatingImageCarousel;
