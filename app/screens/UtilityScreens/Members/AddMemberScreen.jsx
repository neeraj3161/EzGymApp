import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { themes } from '../../../utils/theme';

const theme = themes.dark;

const plans = [
  { label: '1 Month', value: '1', days: 30 },
  { label: '3 Months', value: '3', days: 90 },
  { label: '6 Months', value: '6', days: 180 },
  { label: '1 Year', value: '12', days: 365 },
];

const planPrices = {
  '1': 1000,
  '3': 2700,
  '6': 5000,
  '12': 9000,
};


const AddMemberScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medical, setMedical] = useState('');
  const [plan, setPlan] = useState('1');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [training, setTraining] = useState(false);
  const [fees, setFees] = useState(planPrices[plan]);


  // DOB states
const [dob, setDob] = useState(new Date(2008, 0, 1)); // January 1, 2008
  const [showDobPicker, setShowDobPicker] = useState(false);

  const handlePlanChange = (val) => {
  const selectedPlan = plans.find(p => p.value === val);
  setPlan(val);
  setFees(planPrices[val]); // reset fees to default for selected plan
  const newToDate = new Date(fromDate);
  newToDate.setDate(newToDate.getDate() + selectedPlan.days);
  setToDate(newToDate);
};

  const handleSubmit = () => {
    console.log({
      name, age, phone, emergencyPhone, medical, plan,
      fromDate, toDate, dob, training,
    });
    navigation.goBack();
  };

 const handleDobChange = (event, selectedDate) => {
  setShowDobPicker(false);
  if (selectedDate) {
    setDob(selectedDate);

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - selectedDate.getFullYear();
    const m = today.getMonth() - selectedDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
      age--;
    }

    setAge(age.toString());
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

     <Text style={styles.label}>Age</Text>
<TextInput
  style={styles.input}
  value={age}
  editable={false}
  placeholder="Auto-calculated from DOB"
  placeholderTextColor={theme.textSecondary}
/>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Emergency Phone Number</Text>
      <TextInput style={styles.input} value={emergencyPhone} onChangeText={setEmergencyPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Medical Records</Text>
      <TextInput style={styles.input} value={medical} onChangeText={setMedical} />

      {/* DOB Picker */}
      <Text style={styles.label}>Date of Birth</Text>
      <Pressable onPress={() => setShowDobPicker(true)}>
        <Text style={styles.date}>{dob.toDateString()}</Text>
      </Pressable>
      {showDobPicker && (
  <DateTimePicker
    value={dob}
    mode="date"
    display={Platform.OS === 'android' ? 'calendar' : 'spinner'} // <- key fix
    onChange={handleDobChange}
    maximumDate={new Date()}
  />
)}


      <Text style={styles.label}>Plan</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={plan} onValueChange={handlePlanChange} style={styles.picker}>
          {plans.map(p => (
            <Picker.Item key={p.value} label={p.label} value={p.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>From Date</Text>
      <Text style={styles.date}>{fromDate.toDateString()}</Text>

      <Text style={styles.label}>To Date</Text>
      <Text style={styles.date}>{toDate.toDateString()}</Text>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Personal Training Required</Text>
        <Switch value={training} onValueChange={setTraining} />
      </View>

<Text style={styles.label}>Total Fees (₹)</Text>
<TextInput
  style={styles.input}
  value={fees.toString()}
  keyboardType="numeric"
  onChangeText={(val) => setFees(Number(val))}
/>

{fees < planPrices[plan] && (
  <View style={styles.discountBox}>
    <Text style={styles.discountText}>
      ₹{planPrices[plan] - fees} OFF ({Math.round((1 - fees / planPrices[plan]) * 100)}%)
    </Text>
  </View>
)}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddMemberScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.background,
  },
  label: {
    fontSize: 14,
    color: theme.textPrimary,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
    color: theme.textPrimary,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    fontFamily: 'Poppins-Regular',
  },
  pickerWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  picker: {
    color: theme.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  date: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  discountBox: {
  backgroundColor: '#2ecc71',
  padding: 8,
  borderRadius: 8,
  marginBottom: 12,
},
discountText: {
  color: '#fff',
  fontFamily: 'Poppins-SemiBold',
  fontSize: 14,
  textAlign: 'center',
},

});
