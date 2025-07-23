import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { themes } from '../../utils/theme'; // ✅ your dark theme
import MemberCard from '../../components/MemberCard';

const colors = themes.dark; // Use dark theme colors

const membersData = Array.from({ length: 200 }, (_, i) => ({
  id: `M${1000 + i}`,
  name: `Member ${i + 1}`,
  phone: `98${Math.floor(10000000 + Math.random() * 89999999)}`,
}));

const AllMembersScreen = () => {
  const [search, setSearch] = useState('');

  const filtered = membersData.filter(m =>
    m.phone.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <MemberCard
      member={item}
      onPress={() => navigation.navigate('MemberDetail', { member: item })}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.stickyHeader}>
        <Text style={styles.title}>All Members</Text>
        <TextInput
          placeholder="🔍 Search members"
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />
      </View>

      <FlashList
        data={filtered}
        renderItem={renderItem}
        estimatedItemSize={100}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  stickyHeader: {
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#18364f',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: 'Poppins',
  },
  searchBar: {
    backgroundColor: colors.inputBg,
    color: colors.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 20,
    fontFamily: 'Poppins',
    marginTop: 10,
  },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 18,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  name: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  id: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: 'Poppins',
  },
  phone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: 'Poppins',
  },
});

export default AllMembersScreen;
