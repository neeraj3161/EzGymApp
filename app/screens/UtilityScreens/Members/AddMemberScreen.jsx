import React, { useEffect, useState } from 'react';
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
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getAllPlans } from '../../../database/read';
import { insertMember } from '../../../database/insert';

const theme = themes.dark;




const AddMemberScreen = () => {

useEffect(() => {
  const allPlans = async () => {
    try {
      const result = await getAllPlans();
      console.log('All Plans:', result);
      if (result && result.length > 0) {
        const formattedPlans = result.map(plan =>
          plansObject(plan.name, plan.price, plan.id, plan.duration)
        );

        // ✅ Convert array to one JSON object { id: price }
        const formattedPlanPrices = result.reduce((acc, plan) => {
          acc[plan.id] = plan.price;
          return acc;
        }, {});

        setPlans(formattedPlans);
        setPlanPrices(formattedPlanPrices);
        setFees(result[0].price); // default fee
        setFromDate(new Date());
        setToDate(new Date(Date.now() + result[0].duration * 24 * 60 * 60 * 1000)); // default to current date + plan days
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  allPlans();
}, []);


const [plans, setPlans] = useState([]);

const plansObject = function(name, price, id, duration) {
  return { label: name, value: id, price, days:duration };
}


const [planPrices, setPlanPrices] = useState({});

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medical, setMedical] = useState('');
  const [plan, setPlan] = useState('1');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [training, setTraining] = useState(false);
  const [fees, setFees] = useState();
  const [showError, setError] = useState(false);



  // DOB states
const [dob, setDob] = useState(new Date(2008, 0, 1)); // January 1, 2008
  const [showDobPicker, setShowDobPicker] = useState(false);

  const handlePlanChange = (val) => {
  const selectedPlan = plans.find(p => p.value === val);
  console.log('Selected Plan:', selectedPlan);
  

  setPlan(val);
  setFees(planPrices[val]); // Get from the correctly structured object

  if (selectedPlan) {
    const newToDate = new Date(fromDate);
    newToDate.setDate(newToDate.getDate() + selectedPlan.days);
    setToDate(newToDate);
  }
};

  const handleSubmit = async() => {
    setError(false);
    console.log(fromDate.toISOString(), toDate.toISOString());
    
    console.log({
      name, age, phone, emergencyPhone, medical, plan,
      fromDate, toDate, dob, training,
    });

    if (!name || !phone || !dob || !plan) {
       setError(true);
      Alert.alert('Error', 'Please fill all the required fields');
     
      return;
    }
     try {
    await insertMember({
      name,
      age: parseInt(age),
      phone,
      emergency_phone: emergencyPhone,
      medical_records: medical,
      plan_id: parseInt(plan),
      start_date: fromDate.toISOString(),
      end_date: toDate.toISOString(),
      personal_training: training,
      dob: dob.toISOString(),
    })

    Alert.alert('Success', 'Member added successfully');
    navigation.navigate('MembersList'); // Navigate to the members list screen
  } catch (err) {
    Alert.alert('Error', err.message || 'Failed to add member');
  }
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
  value={fees ? fees.toString() : '' }
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
      {showError && (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20, boder: 1 }}>
        <Text style={{ color: theme.red }}>Correct the empty fields and try again!!</Text>
      </View>)}

      
      <TouchableOpacity style={styles.button} disabled={false} onPress={handleSubmit}>
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
