import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LoadingScreen = () => {
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const entranceAnimation = Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    entranceAnimation.start();
    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000F29" />

      <View style={styles.gradient}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }, { scale: pulseScale }],
              },
            ]}
          >
            <Image
              source={require('../../assets/logo-large.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <ActivityIndicator
            size="large"
            color="#F51F00"
            style={styles.loader}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000F29',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#000F29',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  loader: {
    marginBottom: 16,
  },
});

export default LoadingScreen;
