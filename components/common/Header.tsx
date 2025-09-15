// components/common/Header.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  showNotificationBadge?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Welcome to One Portal',
  onMenuPress,
  onNotificationPress,
  showNotificationBadge = true,
}) => {
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <View style={[styles.headerWrapper, { paddingTop: safeTop }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.menuButton} onPress={onMenuPress}>
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </Pressable>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>{title}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Pressable
            style={styles.notificationButton}
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications" size={20} color="#FFFFFF" />
            {showNotificationBadge && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>!</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#002B82',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    backgroundColor: '#002B82',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
    paddingBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#002B82',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
