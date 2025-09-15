// components/slider/config.ts
import { SliderVariant } from './types';

export const SLIDER_CONFIG = {
  news: {
    itemWidthRatio: 1.0, // Full screen width
    spacing: 0,
    height: 180,
    autoPlay: true,
    autoPlayInterval: 5000,
    showPagination: true,
    pagingEnabled: true,
    snapToInterval: false,
    snapToAlignment: 'start' as const,
    decelerationRate: 'normal' as const,
  },
  gallery: {
    itemWidthRatio: 0.8, // 80% of screen width
    spacing: 15,
    height: 160,
    autoPlay: false,
    autoPlayInterval: 0,
    showPagination: false,
    pagingEnabled: false,
    snapToInterval: true,
    snapToAlignment: 'center' as const,
    decelerationRate: 'fast' as const,
  },
} as const;

export const getSliderConfig = (variant: SliderVariant) => {
  return SLIDER_CONFIG[variant];
};
