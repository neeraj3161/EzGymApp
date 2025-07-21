import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { themes } from '../../utils/theme';

const theme = themes.dark;

const settingsOptions = [
  { title: 'Account', icon: 'person-outline' },
  { title: 'Notifications', icon: 'notifications-outline' },
  { title: 'Language', icon: 'globe-outline' },
  { title: 'Appearance', icon: 'color-palette-outline' },
  { title: 'Security', icon: 'lock-closed-outline' },
  { title: 'Privacy Policy', icon: 'document-text-outline' },
  { title: 'Support', icon: 'help-circle-outline' },
  { title: 'Logout', icon: 'log-out-outline', danger: true },
];

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      {settingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, item.danger && { backgroundColor: '#442222' }]}
          onPress={() => console.log(item.title)}
        >
          <View style={styles.row}>
            <Icon name={item.icon} size={20} color={item.danger ? '#FF6B6B' : '#5CE1E6'} />
            <Text style={[styles.cardText, item.danger && { color: '#FF6B6B' }]}>
              {item.title}
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={18} color={theme.textSecondary} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.background,
  },
  header: {
    fontSize: 20,
    color: theme.textPrimary,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardText: {
    color: theme.textPrimary,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
});

export default SettingsScreen;
