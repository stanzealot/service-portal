// components/dashboard/TabContent.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

// Types
interface Event {
  id: string;
  title: string;
  date: string;
}

interface Person {
  id: string;
  name: string;
  department: string;
  initial: string;
  date?: string;
}

interface HelpfulLink {
  id: string;
  title: string;
  icon: string;
}

// Event Item Component
export const EventItem: React.FC<{ item: Event }> = ({ item }) => (
  <View style={styles.eventItem}>
    <View style={styles.eventIndicator} />
    <View style={styles.eventContent}>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventTitle}>{item.title}</Text>
    </View>
  </View>
);

// Birthday Item Component
export const BirthdayItem: React.FC<{ item: Person }> = ({ item }) => (
  <View style={styles.birthdayItem}>
    <View style={[styles.avatarCircle, { backgroundColor: '#E3F2FD' }]}>
      <Text style={styles.avatarText}>{item.initial}</Text>
    </View>
    <View style={styles.birthdayContent}>
      <Text style={styles.birthdayName}>{item.name}</Text>
      <Text style={styles.birthdayDepartment}>{item.department}</Text>
      {item.date && <Text style={styles.birthdayDate}>{item.date}</Text>}
    </View>
  </View>
);

// New Staff Item Component
export const NewStaffItem: React.FC<{ item: Person }> = ({ item }) => (
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

// Helpful Link Item Component
export const HelpfulLinkItem: React.FC<{
  item: HelpfulLink;
  onPress?: () => void;
}> = ({ item, onPress }) => (
  <Pressable style={styles.linkItem} onPress={onPress}>
    <View style={styles.linkIconContainer}>
      <Ionicons name={item.icon as any} size={24} color="#002B82" />
    </View>
    <Text style={styles.linkTitle}>{item.title}</Text>
  </Pressable>
);

// Events Tab Content
export const EventsTabContent: React.FC<{ events: Event[] }> = ({ events }) => (
  <View style={styles.section}>
    <FlatList
      data={events}
      renderItem={({ item }) => <EventItem item={item} />}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
    />
  </View>
);

// Updates Tab Content
export const UpdatesTabContent: React.FC<{
  birthdays: Person[];
  newStaff: Person[];
}> = ({ birthdays, newStaff }) => (
  <View style={styles.section}>
    <View style={styles.updatesContainer}>
      <View style={styles.updateColumn}>
        <Text style={styles.updateColumnTitle}>Birthdays</Text>
        <FlatList
          data={birthdays}
          renderItem={({ item }) => <BirthdayItem item={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.updateColumn}>
        <Text style={styles.updateColumnTitle}>New Staff</Text>
        <FlatList
          data={newStaff}
          renderItem={({ item }) => <NewStaffItem item={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
  </View>
);

// Links Tab Content
export const LinksTabContent: React.FC<{
  links: HelpfulLink[];
  onLinkPress?: (link: HelpfulLink) => void;
}> = ({ links, onLinkPress }) => (
  <View style={styles.section}>
    <View style={styles.linksGrid}>
      {links.map((item) => (
        <View key={item.id} style={styles.linkItemWrapper}>
          <HelpfulLinkItem item={item} onPress={() => onLinkPress?.(item)} />
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  // Common Section Style
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Events Styles
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#002B82',
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
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292929',
    lineHeight: 20,
  },

  // Updates Styles
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

  // Birthday Styles
  birthdayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
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

  // New Staff Styles
  newStaffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
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

  // Avatar Circle (shared)
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

  // Links Styles
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
});
