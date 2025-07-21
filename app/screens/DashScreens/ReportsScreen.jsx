// Keep all previous imports
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { themes } from '../../utils/theme';

const theme = themes.dark;
const screenWidth = Dimensions.get('window').width - 32;

const ReportsScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{ data: [50, 40, 60, 80, 70], strokeWidth: 2 }],
  };

  const collectionSummaries = [
    { label: 'Today', amount: '₹1,200' },
    { label: '1 Week', amount: '₹8,400' },
    { label: '1 Month', amount: '₹34,200' },
    { label: '6 Month', amount: '₹1.2L' },
    { label: '1 Year', amount: '₹3.6L' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      {/* Date Pickers */}
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
          <Icon name="calendar-outline" size={18} color="#fff" />
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
          <Icon name="calendar-outline" size={18} color="#fff" />
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateButton} onPress={() => console.log('Generate chart')}>
        <Text style={styles.generateText}>Generate Report</Text>
      </TouchableOpacity>

      {/* 🔵 Summary Cards */}
      <Text style={styles.chartTitle}>Collections Summary</Text>
      <View style={styles.cardRow}>
        {collectionSummaries.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardAmount}>{item.amount}</Text>
            <Text style={styles.cardLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Chart */}
      <Text style={styles.chartTitle}>Weekly Sales</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: theme.background,
          backgroundGradientFrom: theme.background,
          backgroundGradientTo: theme.background,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(92, 225, 230, ${opacity})`,
          labelColor: () => theme.textSecondary,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#5CE1E6',
          },
        }}
        bezier
        style={{ borderRadius: 16, marginBottom: 20 }}
      />

      {/* Download PDF */}
      <TouchableOpacity style={styles.downloadButton} onPress={() => console.log('Download PDF')}>
        <Icon name="download-outline" size={20} color="#fff" />
        <Text style={styles.downloadText}>Download as PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    padding: 12,
    borderRadius: 12,
    width: '48%',
    justifyContent: 'space-between',
  },
  dateText: {
    color: theme.textPrimary,
    fontFamily: 'Poppins-Regular',
  },
  generateButton: {
    backgroundColor: '#5CE1E6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateText: {
    color: '#000',
    fontWeight: 'bold',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.textSecondary,
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#444',
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5CE1E6',
    fontFamily: 'Poppins-Medium',
  },
  cardLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    fontFamily: 'Poppins-Regular',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  downloadText: {
    color: '#fff',
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
});

export default ReportsScreen;
