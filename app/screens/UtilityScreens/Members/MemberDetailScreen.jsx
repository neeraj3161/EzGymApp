import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { themes } from '../../../utils/theme'; // ✅ your dark theme
import Icon from 'react-native-vector-icons/Ionicons';

const colors = themes.dark; // Use dark theme colors

const MemberDetailScreen = ({ route }) => {
  const { member } = route.params;

  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    id: member.id,
    name: member.name,
    since: '2022-04-01',
    dob: '1995-08-15',
    blood: 'B+',
    medical: 'None',
    contact: member.phone,
    emergency: '9876543210',
    type: 'Gold',
    plan: 'Annual',
    start: '2024-08-01',
    end: '2025-07-31',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const renderField = (label, key, keyboardType = 'default') => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={form[key]}
        editable={editable}
        onChangeText={(text) => handleChange(key, text)}
        style={[styles.input, !editable && styles.disabledInput]}
        keyboardType={keyboardType}
      />
    </View>
  );

  const transactionData = [
    { date: '2024-08-01', amount: '₹5000', type: 'Annual Membership' },
    { date: '2023-08-01', amount: '₹5000', type: 'Annual Membership' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Member Details</Text>
        <TouchableOpacity onPress={() => setEditable(!editable)}>
          <Icon name={editable ? 'close' : 'create-outline'} size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {renderField('Member ID', 'id')}
      {renderField('Name', 'name')}
      {renderField('Member Since', 'since')}
      {renderField('Date of Birth', 'dob')}
      {renderField('Blood Group', 'blood')}
      {renderField('Medical History', 'medical')}
      {renderField('Contact Number', 'contact', 'phone-pad')}
      {renderField('Emergency Contact', 'emergency', 'phone-pad')}
      {renderField('Membership Type', 'type')}
      {renderField('Membership Plan', 'plan')}
      {renderField('Start Date', 'start')}
      {renderField('End Date', 'end')}

      {editable && (
        <TouchableOpacity style={styles.saveBtn} onPress={() => setEditable(false)}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.transactionTitle}>Transactions</Text>
      {transactionData.map((txn, i) => (
        <View key={i} style={styles.txnCard}>
          <Text style={styles.txnText}>{txn.date}</Text>
          <Text style={styles.txnText}>{txn.amount}</Text>
          <Text style={styles.txnText}>{txn.type}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'Poppins',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: 4,
    fontFamily: 'Poppins',
  },
  input: {
    backgroundColor: colors.card,
    color: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontFamily: 'Poppins',
  },
  disabledInput: {
    opacity: 0.6,
  },
  saveBtn: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  transactionTitle: {
    fontSize: 18,
    color: colors.accent,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  txnCard: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  txnText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Poppins',
  },
});

export default MemberDetailScreen;
