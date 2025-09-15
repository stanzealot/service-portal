// app/(authenticated)/dashboard.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/common/Header';
import {
  mockGalleryData,
  mockNewsData,
  SliderItem,
  UniversalSlider,
} from '../../components/common/UniversalSlider';
import {
  EventsTabContent,
  LinksTabContent,
  UpdatesTabContent,
} from '../../components/dashboard/TabContent';
import {
  TabNavigation,
  TabType,
} from '../../components/dashboard/TabNavigation';

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
  const [activeTab, setActiveTab] = useState<TabType>('events');

  // Event handlers
  const handleMenuPress = () => {
    console.log('Menu pressed');
    // Add your menu logic here
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
    // Add your notification logic here
  };

  const handleNewsPress = (item: SliderItem, index: number) => {
    console.log('News item pressed:', item.title);
    // Add your navigation logic here
  };

  const handleGalleryPress = (item: SliderItem, index: number) => {
    console.log('Gallery item pressed:', item.title);
    // Add your navigation logic here
  };

  const handleLinkPress = (link: any) => {
    console.log('Link pressed:', link.title);
    // Add your link navigation logic here
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventsTabContent events={mockEvents} />;
      case 'updates':
        return (
          <UpdatesTabContent
            birthdays={mockBirthdays}
            newStaff={mockNewStaff}
          />
        );
      case 'links':
        return (
          <LinksTabContent
            links={mockHelpfulLinks}
            onLinkPress={handleLinkPress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#002B82" />

      {/* Header */}
      <Header
        title="Welcome to One Portal"
        onMenuPress={handleMenuPress}
        onNotificationPress={handleNotificationPress}
        showNotificationBadge={true}
      />

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
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

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5FD', // Updated background color as requested
  },
  content: {
    flex: 1,
    backgroundColor: '#F2F5FD',
  },
  newsSection: {
    paddingTop: 20,
  },
  gallerySection: {
    marginBottom: 20,
  },
});
