// components/slider/hooks.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { getSliderConfig } from './config';
import { SliderItem, SliderVariant } from './types';

export const useSliderDimensions = (variant: SliderVariant) => {
  const { width: screenWidth } = useWindowDimensions();
  const config = getSliderConfig(variant);

  const itemWidth = screenWidth * config.itemWidthRatio;
  const spacing = config.spacing;

  return { screenWidth, itemWidth, spacing, config };
};

export const useSliderAnimation = () => {
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return { scrollX, onScrollHandler };
};

export const useSliderAutoPlay = (
  data: SliderItem[],
  variant: SliderVariant,
  itemWidth: number,
  autoPlayInterval?: number
) => {
  const flatListRef = useRef<FlatList<SliderItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const config = getSliderConfig(variant);

  const shouldAutoPlay =
    config.autoPlay && (autoPlayInterval ?? config.autoPlayInterval) > 0;

  useEffect(() => {
    setIsAutoPlay(shouldAutoPlay);
  }, [shouldAutoPlay]);

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
      }, autoPlayInterval ?? config.autoPlayInterval);
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
  }, [
    isAutoPlay,
    data.length,
    autoPlayInterval,
    variant,
    config.autoPlayInterval,
  ]);

  const handleScrollBeginDrag = useCallback(() => {
    setIsAutoPlay(false);
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    setIsAutoPlay(shouldAutoPlay);
  }, [shouldAutoPlay]);

  return {
    flatListRef,
    currentIndex,
    setCurrentIndex,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  };
};
