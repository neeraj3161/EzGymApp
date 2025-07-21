// File: app/screens/UtilityScreens/BMIScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { themes } from '../../utils/theme';

const { width } = Dimensions.get('window');
const theme = themes.dark;

export default function BMIScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) return;
    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 24.9) setCategory('Normal');
    else if (bmiValue < 29.9) setCategory('Overweight');
    else setCategory('Obese');
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>

        <Text style={styles.description}>
          BMI (Body Mass Index) is a measure of body fat based on weight and height.
          It is calculated using the formula:
          {'\n\n'}
          <Text style={styles.formula}>BMI = weight (kg) / height² (m²)</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Weight (kg)"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Height (cm)"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

       <View>
    <TouchableOpacity style={styles.button} onPress={calculateBMI}>
      <Text style={styles.buttonText}>Calculate</Text>
    </TouchableOpacity>

    {bmi && (
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Your BMI: {bmi}</Text>
        <Text style={styles.resultText}>Category: {category}</Text>
      </View>
    )}

    <View style={styles.infoContainer}>
      <Text style={styles.infoTitle}>What is BMI?</Text>
      <Text style={styles.infoText}>
        Body Mass Index (BMI) is a value derived from the mass (weight) and height of a person. 
        It is calculated using the formula:
      </Text>
      <Text style={styles.formulaText}>BMI = weight (kg) / [height (m)]²</Text>

      <Text style={styles.tableTitle}>BMI Classification:</Text>
      <View style={styles.table}>
        <Text style={styles.tableRow}><Text style={styles.tableLabel}>Underweight:</Text> Less than 18.5</Text>
        <Text style={styles.tableRow}><Text style={styles.tableLabel}>Normal:</Text> 18.5 – 24.9</Text>
        <Text style={styles.tableRow}><Text style={styles.tableLabel}>Overweight:</Text> 25 – 29.9</Text>
        <Text style={styles.tableRow}><Text style={styles.tableLabel}>Obese:</Text> 30 and above</Text>
      </View>
    </View>
  </View>
  </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: theme.textSecondary,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 22,
  },
  formula: {
    color: theme.textSecondary,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: theme.card,
    color: theme.textSecondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: theme.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: theme.card,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  resultText: {
    color: theme.textSecondary,
    fontSize: 18,
    marginTop: 5,
  },
  tableContainer: {
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 20,
  },
  tableTitle: {
    color: theme.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: theme.textSecondary,
    borderBottomWidth: 0.4,
  },
  tableCell: {
    color: theme.text,
    fontSize: 15,
  },
  infoContainer: {
  backgroundColor: theme.card,
  padding: 20,
  borderRadius: 10,
},
infoTitle: {
  fontSize: 20,
  color: theme.textPrimary,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
infoText: {
  color: theme.textSecondary,
  fontSize: 14,
  marginBottom: 10,
  lineHeight: 20,
  textAlign: 'justify',
},
formulaText: {
  color: theme.textSecondary,
  fontStyle: 'italic',
  textAlign: 'center',
  fontSize: 16,
  marginBottom: 15,
},
tableTitle: {
  color: theme.primary,
  fontSize: 16,
  marginTop: 10,
  marginBottom: 5,
  fontWeight: '600',
},
table: {
  marginTop: 5,
},
tableRow: {
  color: theme.textSecondary,
  fontSize: 14,
  marginVertical: 2,
},
tableLabel: {
  fontWeight: 'bold',
  color: theme.textSecondary,
},

});
