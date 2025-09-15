// components/slider/UniversalSlider.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { GallerySliderItem } from './GallerySliderItem';
import {
  useSliderAnimation,
  useSliderAutoPlay,
  useSliderDimensions,
} from './hooks';
import { NewsSliderItem } from './NewsSliderItem';
import { SliderPagination } from './SliderPagination';
import { SliderProps } from './types';

export const UniversalSlider: React.FC<SliderProps> = ({
  data,
  title,
  autoPlay,
  autoPlayInterval,
  showPagination,
  variant,
  onItemPress,
}) => {
  // Custom hooks for clean separation of concerns
  const { screenWidth, itemWidth, spacing, config } =
    useSliderDimensions(variant);
  const { scrollX, onScrollHandler } = useSliderAnimation();
  const {
    flatListRef,
    currentIndex,
    setCurrentIndex,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  } = useSliderAutoPlay(data, variant, itemWidth, autoPlayInterval);

  // Render item based on variant
  const renderItem = ({ item, index }: { item: any; index: number }) => {
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

  // Get content container style for gallery center alignment
  const getContentContainerStyle = () => {
    if (variant === 'gallery') {
      return { paddingHorizontal: (screenWidth - itemWidth) / 2 };
    }
    return {};
  };

  // Create viewability config for news pagination only
  const viewabilityConfigCallbackPairs = React.useMemo(() => {
    if (variant !== 'news') return undefined;

    return [
      {
        viewabilityConfig: { itemVisiblePercentThreshold: 50 },
        onViewableItemsChanged: ({ viewableItems }: any) => {
          if (
            viewableItems[0]?.index !== undefined &&
            viewableItems[0]?.index !== null
          ) {
            setCurrentIndex(viewableItems[0].index);
          }
        },
      },
    ];
  }, [variant, setCurrentIndex]);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.sliderContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={config.pagingEnabled}
          snapToInterval={
            config.snapToInterval ? itemWidth + spacing : undefined
          }
          snapToAlignment={config.snapToAlignment}
          decelerationRate={config.decelerationRate}
          contentContainerStyle={getContentContainerStyle()}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          getItemLayout={
            config.pagingEnabled
              ? (data, index) => ({
                  length: itemWidth,
                  offset: itemWidth * index,
                  index,
                })
              : undefined
          }
        />

        {(showPagination ?? config.showPagination) && (
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sliderContainer: {
    position: 'relative',
  },
});
