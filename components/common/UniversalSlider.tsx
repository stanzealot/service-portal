// components/common/UniversalSlider.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

// Types
export interface SliderItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  source_name?: string;
  source_icon?: string;
}

interface UniversalSliderProps {
  data: SliderItem[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  variant: 'news' | 'gallery';
  onItemPress?: (item: SliderItem, index: number) => void;
}

// Pagination Component
const SliderPagination: React.FC<{
  items: SliderItem[];
  currentIndex: number;
  variant: 'news' | 'gallery';
}> = ({ items, currentIndex, variant }) => {
  if (variant === 'gallery') return null;

  return (
    <View style={styles.paginationContainer}>
      {items.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor: currentIndex === index ? '#002B82' : '#E5E7EB',
              width: currentIndex === index ? 20 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
};

// News Item Component (Full Width)
const NewsSliderItem: React.FC<{
  item: SliderItem;
  index: number;
  scrollX: Animated.SharedValue<number>;
  width: number;
  onPress?: () => void;
}> = ({ item, index, scrollX, width, onPress }) => {
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
      <Animated.View
        style={[styles.newsItemContainer, { width }, animatedStyle]}
      >
        <Image source={{ uri: item.image }} style={styles.newsImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.newsOverlay}
        >
          {item.source_name && (
            <View style={styles.newsSourceContainer}>
              {item.source_icon && (
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.newsSourceIcon}
                />
              )}
              <Text style={styles.newsSourceText}>{item.source_name}</Text>
            </View>
          )}
          <Text style={styles.newsTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

// Gallery Item Component (Center Focus Style)
const GallerySliderItem: React.FC<{
  item: SliderItem;
  index: number;
  scrollX: Animated.SharedValue<number>;
  itemWidth: number;
  spacing: number;
  onPress?: () => void;
}> = ({ item, index, scrollX, itemWidth, spacing, onPress }) => {
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
      <Animated.View style={[styles.galleryItemContainer, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.galleryImage} />
        <View style={styles.galleryOverlay}>
          <Text style={styles.galleryTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

// Main Universal Slider Component
export const UniversalSlider: React.FC<UniversalSliderProps> = ({
  data,
  title,
  autoPlay = false,
  autoPlayInterval = 5000,
  showPagination = true,
  variant,
  onItemPress,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList<SliderItem>>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Calculate dimensions based on variant
  const getItemWidth = () => {
    if (variant === 'news') return screenWidth;
    if (variant === 'gallery') return screenWidth * 0.75; // Adjusted for better center focus
    return screenWidth;
  };

  const getItemSpacing = () => {
    if (variant === 'gallery') return 20;
    return 0;
  };

  const itemWidth = getItemWidth();
  const spacing = getItemSpacing();

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && variant === 'news' && data.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data.length;
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
          return nextIndex;
        });
      }, autoPlayInterval);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, data.length, autoPlayInterval, variant]);

  // Scroll handler
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Viewable items changed handler
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems[0]?.index !== undefined &&
        viewableItems[0]?.index !== null
      ) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  // Render item based on variant
  const renderItem = ({ item, index }: { item: SliderItem; index: number }) => {
    const handlePress = () => onItemPress?.(item, index);

    if (variant === 'news') {
      return (
        <NewsSliderItem
          item={item}
          index={index}
          scrollX={scrollX}
          width={itemWidth}
          onPress={handlePress}
        />
      );
    }

    return (
      <GallerySliderItem
        item={item}
        index={index}
        scrollX={scrollX}
        itemWidth={itemWidth}
        spacing={spacing}
        onPress={handlePress}
      />
    );
  };

  // Handle scroll begin/end for auto-play
  const handleScrollBeginDrag = () => {
    setIsAutoPlay(false);
  };

  const handleScrollEndDrag = () => {
    setIsAutoPlay(autoPlay);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}

      <View style={styles.sliderContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={variant === 'news'}
          snapToInterval={
            variant === 'gallery' ? itemWidth + spacing : undefined
          }
          snapToAlignment={variant === 'gallery' ? 'center' : 'start'}
          decelerationRate={variant === 'gallery' ? 'fast' : 'normal'}
          contentContainerStyle={
            variant === 'gallery'
              ? { paddingHorizontal: (screenWidth - itemWidth) / 2 }
              : {}
          }
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={
            variant === 'news'
              ? viewabilityConfigCallbackPairs.current
              : undefined
          }
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          getItemLayout={
            variant === 'news'
              ? (data, index) => ({
                  length: itemWidth,
                  offset: itemWidth * index,
                  index,
                })
              : undefined
          }
        />

        {showPagination && (
          <SliderPagination
            items={data}
            currentIndex={currentIndex}
            variant={variant}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sliderContainer: {
    position: 'relative',
  },

  // News Slider Styles
  newsItemContainer: {
    paddingHorizontal: 16,
  },
  newsImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  newsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 180,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'flex-end',
  },
  newsSourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsSourceIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  newsSourceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  newsTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Gallery Slider Styles (Now identical to news)
  galleryItemContainer: {
    paddingHorizontal: 16,
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  galleryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 180,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'flex-end',
  },
  galleryTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Pagination Styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  paginationDot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});

// Mock Data
export const mockNewsData: SliderItem[] = [
  {
    id: '1',
    image: 'https://picsum.photos/800/400?random=1',
    title:
      'Our MD/CEO, Mrs Adesuwa Lodge, representing Tolaram on a fireside chat at the 13th annual BusinessDay CEO Forum',
    source_name: 'Business Today',
    source_icon: 'https://api.iconify.design/logos:react.svg',
  },
  {
    id: '2',
    image: 'https://picsum.photos/800/400?random=2',
    title:
      'Innovation Summit showcases cutting-edge technology solutions for the future',
    source_name: 'Tech News',
    source_icon: 'https://api.iconify.design/logos:vue.svg',
  },
  {
    id: '3',
    image: 'https://picsum.photos/800/400?random=3',
    title:
      'Strategic partnership signing ceremony with international investors and stakeholders',
    source_name: 'Financial Times',
    source_icon: 'https://api.iconify.design/logos:angular-icon.svg',
  },
];

export const mockGalleryData: SliderItem[] = [
  {
    id: '1',
    image: 'https://picsum.photos/300/200?random=11',
    title: 'Annual Company Retreat 2024',
  },
  {
    id: '2',
    image: 'https://picsum.photos/300/200?random=12',
    title: 'Innovation Workshop',
  },
  {
    id: '3',
    image: 'https://picsum.photos/300/200?random=13',
    title: 'Leadership Conference',
  },
  {
    id: '4',
    image: 'https://picsum.photos/300/200?random=14',
    title: 'Technology Summit',
  },
  {
    id: '5',
    image: 'https://picsum.photos/300/200?random=15',
    title: 'Team Building Event',
  },
];
