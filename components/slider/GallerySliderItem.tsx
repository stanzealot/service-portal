// components/slider/GallerySliderItem.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { GallerySliderItemProps } from './types';

export const GallerySliderItem: React.FC<GallerySliderItemProps> = ({
  item,
  index,
  scrollX,
  itemWidth,
  spacing,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (itemWidth + spacing),
      index * (itemWidth + spacing),
      (index + 1) * (itemWidth + spacing),
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      style={{ width: itemWidth, marginHorizontal: spacing / 2 }}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
