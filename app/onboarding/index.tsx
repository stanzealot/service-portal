import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
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
import RotatingImageCarousel from '../../components/animations/RotatingImageCarousel';
import { useAuthStore } from '../../store/authStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Welcome to\nLagos Free Zone',
    subtitle:
      "Your gateway to seamless business operations in Nigeria's premier free trade zone",
    image: require('../../assets/images/onboarding/gateway-circle.png'),
  },
  {
    id: 2,
    title: 'Your Gateway\nto a New Frontier',
    subtitle:
      'Connecting industry with global opportunities and facilitating growth across borders',
    image: require('../../assets/images/onboarding/gateway-circle.png'),
  },
  {
    id: 3,
    title: 'Where Industry\nMeets Global Connection',
    subtitle:
      'Facilitating trade and commerce excellence across international markets and partnerships',
    image: require('../../assets/images/onboarding/gateway-circle.png'),
  },
  {
    id: 4,
    title: 'Sustainable Growth,\nEquals Real Impact',
    subtitle:
      'Building tomorrow with sustainable practices and environmental responsibility at our core',
    image: require('../../assets/images/onboarding/gateway-circle.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setFirstLaunch } = useAuthStore();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentSlide = onboardingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      // Smooth transition animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    setFirstLaunch(false);
    router.push('/landing');
    // For now, just show an alert since we haven't built auth yet
    // alert('Onboarding complete! 🎉\n\nNext: Login screen will be implemented');
  };

  // Create interpolated styles for animations
  const contentTranslateY = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const contentScale = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000F29" />

      <LinearGradient colors={['#000F29', '#000F29']} style={styles.gradient}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Rotating Image */}
          <View style={styles.imageContainer}>
            <RotatingImageCarousel
              image={currentSlide.image}
              key={currentSlide.id}
              isActive={true}
            />
          </View>

          {/* Text Content with animations */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: contentTranslateY },
                  { scale: contentScale },
                ],
              },
            ]}
          >
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
          </Animated.View>
        </View>

        {/* Bottom Navigation - Skip/Next buttons */}
        <View style={styles.bottomNavigation}>
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>

          <Pressable onPress={handleNext} style={styles.nextButton}>
            <View style={styles.nextButtonInner}>
              <Text style={styles.nextArrow}>→</Text>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    marginBottom: 60,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: SCREEN_WIDTH - 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextArrow: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
