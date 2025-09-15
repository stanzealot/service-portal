// components/slider/SliderPagination.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaginationProps } from './types';

export const SliderPagination: React.FC<PaginationProps> = ({
  items,
  currentIndex,
  variant,
}) => {
  // Gallery variant doesn't show pagination
  if (variant === 'gallery') return null;

  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});
