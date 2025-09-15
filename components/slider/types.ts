// components/slider/types.ts
export interface SliderItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  source_name?: string;
  source_icon?: string;
}

export type SliderVariant = 'news' | 'gallery';

export interface SliderProps {
  data: SliderItem[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  variant: SliderVariant;
  onItemPress?: (item: SliderItem, index: number) => void;
}

export interface SliderItemProps {
  item: SliderItem;
  index: number;
  onPress?: () => void;
}

export interface NewsSliderItemProps extends SliderItemProps {
  scrollX: any; // Animated.SharedValue<number>
  width: number;
}

export interface GallerySliderItemProps extends SliderItemProps {
  scrollX: any; // Animated.SharedValue<number>
  itemWidth: number;
  spacing: number;
}

export interface PaginationProps {
  items: SliderItem[];
  currentIndex: number;
  variant: SliderVariant;
}
