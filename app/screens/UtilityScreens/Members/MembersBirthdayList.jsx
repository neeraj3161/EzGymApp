import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';
import React from 'react';
import { themes } from '../../../utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const theme = themes.dark;

const gymName = 'IronFit Gym'; // Replace with your gym name

const MembersBirthdayList = () => {
  const membersWithBirthday = [
    { id: '1', name: 'John Doe', phone: '9876543210' },
    { id: '2', name: 'Jane Smith', phone: '9123456789' },
  ]; // Replace with real birthday-filtered list

  const handleWish = (member) => {
  Alert.alert(
  'Send Birthday Wish',
  `Choose how to wish ${member.name}`,
  [
    {
      text: 'WhatsApp',
      onPress: () => {
        const url = `whatsapp://send?phone=+91${member.phone}&text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
          Alert.alert('WhatsApp not installed');
        });
      },
    },
    {
      text: 'SMS',
      onPress: () => {
        const url = `sms:${member.phone}?body=${encodeURIComponent(message)}`;
        Linking.openURL(url);
      },
    },
    {
      text: 'Call',
      onPress: () => {
        Linking.openURL(`tel:${member.phone}`);
      },
    },
    {
      text: 'Cancel',
      onPress: () => {}, // 👈 ADD THIS or it might not show!
      style: 'cancel',
    },
  ],
  { cancelable: true }
);

};

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleWish(item)}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>📞 {item.phone}</Text>
      </View>
      <Icon name="gift-outline" size={22} color="#ffcc00" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎂 Birthdays Today</Text>
      <FlatList
        data={membersWithBirthday}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default MembersBirthdayList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  card: {
  backgroundColor: theme.cardBackground,
  padding: 16,
  borderRadius: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
}
,
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  subText: {
    fontSize: 13,
    color: theme.textSecondary,
    marginTop: 4,
  },
});
