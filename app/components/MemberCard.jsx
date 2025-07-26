import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { themes } from '../utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const theme = themes.dark;

const MemberCard = ({ member, onPress }) => {
  if (!member) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{member.name || 'No Name'}</Text>
          <Text style={styles.subText}>ID: {member.id || 'N/A'}</Text>
          <Text style={styles.subText}>📞 {member.phone || 'N/A'}</Text>
        </View>
        <Icon name="chevron-forward" size={22} color={theme.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOpacity: 0.15,
    // shadowRadius: 6,
    // elevation: 4,
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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

export default MemberCard;
