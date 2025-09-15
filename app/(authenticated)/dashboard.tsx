import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Quarterly Staff Meeting',
    date: 'Thursday • Sept 04, 2025',
  },
  {
    id: '2',
    title: 'World Safety Day',
    date: 'Friday • Sept 12, 2025',
  },
  {
    id: '3',
    title: 'September Birthday Celebrants',
    date: 'Tuesday • Sept 30, 2025',
  },
];

const mockGalleryItems = [
  {
    id: '1',
    image: 'https://picsum.photos/300/200?random=1',
    title: 'Business Forum 2024',
  },
  {
    id: '2',
    image: 'https://picsum.photos/300/200?random=2',
    title: 'Innovation Summit',
  },
  {
    id: '3',
    image: 'https://picsum.photos/300/200?random=3',
    title: 'Technology Workshop',
  },
  {
    id: '4',
    image: 'https://picsum.photos/300/200?random=4',
    title: 'Leadership Conference',
  },
];

const mockCarouselData = [
  {
    id: '1',
    image: 'https://picsum.photos/400/200?random=5',
    title:
      'Our MD/CEO, Mrs Adesuwa Lodge, representing Tolaram on a fireside chat at the 13th annual BusinessDay CEO Forum',
  },
  {
    id: '2',
    image: 'https://picsum.photos/400/200?random=6',
    title:
      'Lagos Free Zone Annual Innovation Summit showcasing cutting-edge technology solutions',
  },
  {
    id: '3',
    image: 'https://picsum.photos/400/200?random=7',
    title:
      'Strategic partnership signing ceremony with international investors',
  },
];

export default function DashboardScreen() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselScrollX = useRef(new Animated.Value(0)).current;

  const handleCarouselScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: carouselScrollX } } }],
    { useNativeDriver: false }
  );

  const onCarouselMomentumScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / SCREEN_WIDTH);
    setCurrentCarouselIndex(currentIndex);
  };

  const renderCarouselItem = ({ item }: { item: any }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <View style={styles.carouselOverlay}>
        <Text style={styles.carouselText}>{item.title}</Text>
      </View>
    </View>
  );

  const renderCarouselDots = () => (
    <View style={styles.dotsContainer}>
      {mockCarouselData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { opacity: index === currentCarouselIndex ? 1 : 0.3 },
          ]}
        />
      ))}
    </View>
  );

  const renderEventItem = ({ item }: { item: any }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventIndicator} />
      <View style={styles.eventContent}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTitle}>{item.title}</Text>
      </View>
    </View>
  );

  const renderGalleryItem = ({ item }: { item: any }) => (
    <Pressable style={styles.galleryItem}>
      <Image source={{ uri: item.image }} style={styles.galleryImage} />
    </Pressable>
  );

  const renderQuickActionButton = (
    title: string,
    subtitle: string,
    isActive = false
  ) => (
    <Pressable
      style={[styles.actionButton, isActive && styles.actionButtonActive]}
    >
      <Text
        style={[
          styles.actionButtonText,
          isActive && styles.actionButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#002B82" />

      <View style={styles.headerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.menuButton}>
              <Ionicons name="menu" size={24} color="#FFFFFF" />
            </Pressable>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Welcome to One Portal</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.notificationButton}>
              <Ionicons name="notifications" size={20} color="#FFFFFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>!</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={mockCarouselData}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleCarouselScroll}
            onMomentumScrollEnd={onCarouselMomentumScrollEnd}
            scrollEventThrottle={16}
          />
          {renderCarouselDots()}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContent}
          >
            {renderQuickActionButton('Upcoming Events', '', true)}
            {renderQuickActionButton('Employee Update', '')}
            {renderQuickActionButton('Helpful Link', '')}
          </ScrollView>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <FlatList
            data={mockEvents}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Gallery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <FlatList
            data={mockGalleryItems}
            renderItem={renderGalleryItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.galleryRow}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#002B82',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#002B82',

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 123,
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
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  carouselContainer: {
    height: 200,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  carouselContent: {
    paddingHorizontal: 0,
  },
  carouselItem: {
    height: 200,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 2,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  carouselText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  quickActionsContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  quickActionsContent: {
    gap: 12,
    paddingRight: 16,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#002B82',
    borderColor: '#002B82',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  actionButtonTextActive: {
    color: '#FFFFFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventIndicator: {
    width: 4,
    height: 40,
    backgroundColor: '#002B82',
    borderRadius: 2,
    marginRight: 12,
    marginTop: 2,
  },
  eventContent: {
    flex: 1,
  },
  eventDate: {
    fontSize: 12,
    color: '#595959',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292929',
    lineHeight: 20,
  },
  galleryContent: {
    paddingRight: 16,
  },
  galleryItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  galleryRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
