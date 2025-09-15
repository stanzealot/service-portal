// components/slider/NewsSliderItem.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { NewsSliderItemProps } from './types';

export const NewsSliderItem: React.FC<NewsSliderItemProps> = ({
  item,
  index,
  scrollX,
  width,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.1, 0, width * 0.1],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.95, 1, 0.95],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }, { scale }],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, { width }, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          {item.source_name && (
            <View style={styles.sourceContainer}>
              {item.source_icon && (
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.sourceIcon}
                />
              )}
              <Text style={styles.sourceText}>{item.source_name}</Text>
            </View>
          )}
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 180,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'flex-end',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  sourceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
});
