// app/(authenticated)/dashboard.tsx
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  mockGalleryData,
  mockNewsData,
  SliderItem,
  UniversalSlider,
} from '../../components/common/UniversalSlider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data for events (keeping your existing structure)
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

// Mock data for birthdays and new staff (from your figma design)
const mockBirthdays = [
  {
    id: '1',
    name: 'Benson Uwem',
    department: 'Finance',
    date: 'August 20',
    initial: 'B',
  },
  {
    id: '2',
    name: 'John Alade',
    department: 'QA/QC',
    date: 'August 20',
    initial: 'J',
  },
];

const mockNewStaff = [
  {
    id: '1',
    name: 'Ehis Osariemen',
    department: 'Operations',
    initial: 'E',
  },
  {
    id: '2',
    name: 'Chisom Nwoke',
    department: 'IT',
    initial: 'C',
  },
  {
    id: '3',
    name: 'Vanessa Obaze',
    department: 'Admin',
    initial: 'V',
  },
];

const mockHelpfulLinks = [
  { id: '1', title: 'Environment Management Policy', icon: 'leaf-outline' },
  { id: '2', title: 'Business Ethics Policy', icon: 'briefcase-outline' },
  { id: '3', title: 'CSR Policy', icon: 'people-outline' },
  { id: '4', title: 'OHS Policy', icon: 'shield-checkmark-outline' },
  { id: '5', title: 'Reports', icon: 'document-text-outline' },
  { id: '6', title: 'Staff Hand Book', icon: 'book-outline' },
];

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState<'events' | 'updates' | 'links'>(
    'events'
  );

  // Handle slider item press
  const handleNewsPress = (item: SliderItem, index: number) => {
    console.log('News item pressed:', item.title);
    // Add your navigation logic here
  };

  const handleGalleryPress = (item: SliderItem, index: number) => {
    console.log('Gallery item pressed:', item.title);
    // Add your navigation logic here
  };

  const renderEventItem = ({ item }: { item: any }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventIndicator} />
      <View style={styles.eventContent}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTitle}>{item.title}</Text>
      </View>
    </View>
  );

  const renderBirthdayItem = ({ item }: { item: any }) => (
    <View style={styles.birthdayItem}>
      <View style={[styles.avatarCircle, { backgroundColor: '#E3F2FD' }]}>
        <Text style={styles.avatarText}>{item.initial}</Text>
      </View>
      <View style={styles.birthdayContent}>
        <Text style={styles.birthdayName}>{item.name}</Text>
        <Text style={styles.birthdayDepartment}>{item.department}</Text>
        <Text style={styles.birthdayDate}>{item.date}</Text>
      </View>
    </View>
  );

  const renderNewStaffItem = ({ item }: { item: any }) => (
    <View style={styles.newStaffItem}>
      <View style={[styles.avatarCircle, { backgroundColor: '#FFF3E0' }]}>
        <Text style={styles.avatarText}>{item.initial}</Text>
      </View>
      <View style={styles.newStaffContent}>
        <Text style={styles.newStaffName}>{item.name}</Text>
        <Text style={styles.newStaffDepartment}>{item.department}</Text>
      </View>
    </View>
  );

  const renderHelpfulLinkItem = ({ item }: { item: any }) => (
    <Pressable style={styles.linkItem}>
      <View style={styles.linkIconContainer}>
        <Ionicons name={item.icon as any} size={24} color="#002B82" />
      </View>
      <Text style={styles.linkTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderQuickActionButton = (
    title: string,
    tabKey: 'events' | 'updates' | 'links',
    isActive = false
  ) => (
    <Pressable
      style={[styles.actionButton, isActive && styles.actionButtonActive]}
      onPress={() => setActiveTab(tabKey)}
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return (
          <View style={styles.section}>
            <FlatList
              data={mockEvents}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        );

      case 'updates':
        return (
          <View style={styles.section}>
            <View style={styles.updatesContainer}>
              <View style={styles.updateColumn}>
                <Text style={styles.updateColumnTitle}>Birthdays</Text>
                <FlatList
                  data={mockBirthdays}
                  renderItem={renderBirthdayItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>

              <View style={styles.updateColumn}>
                <Text style={styles.updateColumnTitle}>New Staff</Text>
                <FlatList
                  data={mockNewStaff}
                  renderItem={renderNewStaffItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            </View>
          </View>
        );

      case 'links':
        return (
          <View style={styles.section}>
            <View style={styles.linksGrid}>
              {mockHelpfulLinks.map((item) => (
                <View key={item.id} style={styles.linkItemWrapper}>
                  {renderHelpfulLinkItem({ item })}
                </View>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

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
        {/* News Slider */}
        <View style={styles.newsSection}>
          <UniversalSlider
            data={mockNewsData}
            variant="news"
            autoPlay={true}
            autoPlayInterval={5000}
            showPagination={true}
            onItemPress={handleNewsPress}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContent}
          >
            {renderQuickActionButton(
              'Upcoming Events',
              'events',
              activeTab === 'events'
            )}
            {renderQuickActionButton(
              'Employee Updates',
              'updates',
              activeTab === 'updates'
            )}
            {renderQuickActionButton(
              'Helpful Links',
              'links',
              activeTab === 'links'
            )}
          </ScrollView>
        </View>

        {/* Dynamic Tab Content */}
        {renderTabContent()}

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <UniversalSlider
            title="Gallery"
            data={mockGalleryData}
            variant="gallery"
            autoPlay={false}
            showPagination={false}
            onItemPress={handleGalleryPress}
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

  // News Section
  newsSection: {
    paddingTop: 20,
  },

  // Quick Actions
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

  // Sections
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
  },

  // Events
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

  // Updates Section
  updatesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  updateColumn: {
    flex: 1,
  },
  updateColumnTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },

  // Birthdays
  birthdayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  birthdayContent: {
    marginLeft: 12,
    flex: 1,
  },
  birthdayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  birthdayDepartment: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  birthdayDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // New Staff
  newStaffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  newStaffContent: {
    marginLeft: 12,
    flex: 1,
  },
  newStaffName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  newStaffDepartment: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // Avatar Circle (shared for birthdays and new staff)
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002B82',
  },

  // Helpful Links
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  linkItemWrapper: {
    width: '30%',
    minWidth: 90,
  },
  linkItem: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'center',
  },
  linkIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  linkTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 12,
  },

  // Gallery Section
  gallerySection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 16,
  },
});
