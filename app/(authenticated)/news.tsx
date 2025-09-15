import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function NewsScreen() {
  const newsItems = [
    {
      id: '1',
      title: 'New Digital Services Platform Launch',
      summary:
        'Lagos Free Zone introduces comprehensive digital platform for all resident services',
      date: '2 hours ago',
      category: 'Technology',
    },
    {
      id: '2',
      title: 'Q3 Business Performance Review',
      summary:
        'Outstanding growth recorded across all sectors in the third quarter',
      date: '5 hours ago',
      category: 'Business',
    },
    {
      id: '3',
      title: 'Sustainability Initiative Progress',
      summary:
        'Major milestones achieved in our environmental responsibility program',
      date: '1 day ago',
      category: 'Environment',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#002B82" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News & Updates</Text>
        <Pressable>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Featured News */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredItem}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>FEATURED</Text>
            </View>
            <Text style={styles.featuredTitle}>
              Annual Innovation Summit 2024
            </Text>
            <Text style={styles.featuredSummary}>
              Join us for the biggest technology and innovation event of the
              year
            </Text>
            <Text style={styles.featuredDate}>Tomorrow • 9:00 AM</Text>
          </View>
        </View>

        {/* News Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContent}>
              {['All News', 'Announcements', 'Events', 'Updates', 'Alerts'].map(
                (category, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.categoryButton,
                      index === 0 && styles.categoryButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        index === 0 && styles.categoryButtonTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </ScrollView>
        </View>

        {/* News List */}
        <View style={styles.section}>
          {newsItems.map((item) => (
            <Pressable key={item.id} style={styles.newsItem}>
              <View style={styles.newsContent}>
                <View style={styles.newsHeader}>
                  <Text style={styles.newsCategory}>{item.category}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSummary}>{item.summary}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#002B82',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  featuredContainer: {
    margin: 16,
  },
  featuredItem: {
    backgroundColor: '#002B82',
    borderRadius: 12,
    padding: 20,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  featuredSummary: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  featuredDate: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#002B82',
    borderColor: '#002B82',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  newsContent: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#002B82',
    backgroundColor: 'rgba(0, 43, 130, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  newsSummary: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
});
