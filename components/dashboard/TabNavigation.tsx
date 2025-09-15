// components/dashboard/TabNavigation.tsx
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export type TabType = 'events' | 'updates' | 'links';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { key: 'events' as TabType, title: 'Upcoming Events' },
  { key: 'updates' as TabType, title: 'Employee Updates' },
  { key: 'links' as TabType, title: 'Helpful Links' },
];

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const renderTabButton = (tab: { key: TabType; title: string }) => (
    <Pressable
      key={tab.key}
      style={[
        styles.actionButton,
        activeTab === tab.key && styles.actionButtonActive,
      ]}
      onPress={() => onTabChange(tab.key)}
    >
      <Text
        style={[
          styles.actionButtonText,
          activeTab === tab.key && styles.actionButtonTextActive,
        ]}
      >
        {tab.title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {tabs.map(renderTabButton)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  content: {
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
});
