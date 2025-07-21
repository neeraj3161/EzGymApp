import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { themes } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';



const theme = themes.dark;

const HomeScreen = ({ route }) => {
const navigation = useNavigation();

  const gymName = route.params?.gymName || 'My Gym';

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Icon name="barbell" size={24} color="#fff" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.gymName}>{gymName}</Text>
            <Text style={styles.version}>V1.0.0 | 1.1.1</Text>
          </View>
          <Icon name="chevron-forward" size={22} color={theme.textSecondary} />
        </View>

        {/* DIET & HEALTH */}
        <Section title="Diet & Health">
          <Card label="Prepare Diet Plan" icon="nutrition-outline" />
          <Card 
  label="BMI Calculator" 
  icon="calculator-outline" 
  onPress={() => navigation.navigate('BMI')} 
/>

        </Section>

        {/* PAYMENTS */}
        <Section title="Payments">
          <Card label="Show QR" icon="qr-code-outline" onPress={() => navigation.navigate('OQ')}  />
          <Card label="Generate QR" icon="qr-code" />
          <Card label="Recent Transactions" icon="time-outline" />
        </Section>

        {/* SETTINGS */}
        <Section title="Settings">
          <Card label="Private Mode" icon="eye-off-outline" />
          <Card label="Bluetooth" icon="bluetooth" />
        </Section>

        {/* INSIGHTS */}
        <Section title="Insights">
          <Card label="Sales Report" icon="stats-chart-outline" />
          <Card label="User Insights" icon="people-outline" />
        </Section>

        {/* MISC */}
        <Section title="Other">
          <Card label="Profile" icon="person-circle-outline" />
          <Card label="Settings" icon="cog-outline" />
        </Section>

        <View style={{ height: 100 }} /> {/* extra space for floating button */}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          console.log('Add Member Pressed');
        }}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.cardGrid}>{children}</View>
  </View>
);

const Card = ({ label, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
    <Icon name={icon} size={22} color={theme.primary} style={{ marginBottom: 8 }} />
    <Text style={styles.cardLabel}>{label}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: theme.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: theme.secondary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  gymName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.textPrimary,
    fontFamily: 'Poppins-Medium',
  },
  version: {
    fontSize: 12,
    color: theme.textSecondary,
    fontFamily: 'Poppins-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: theme.textSecondary,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardLabel: {
    color: theme.textPrimary,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default HomeScreen;
