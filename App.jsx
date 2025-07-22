import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './app/screens/DashScreens/HomeScreen';
import InventoryScreen from './app/screens/DashScreens/InventoryScreen';
import ReportsScreen from './app/screens/DashScreens/ReportsScreen';
import SettingsScreen from './app/screens/DashScreens/SettingsScreen';
import SplashScreen from './app/screens/Splash/SplashScreen'; // 👈 create this

import { themes } from './app/utils/theme';
import BMIScreen from './app/screens/UtilityScreens/BMIScreen';
import QRScreen from './app/screens/UtilityScreens/QRScreen';
import AllMembers from './app/screens/DashScreens/AllMembers';
import MemberDetailScreen from './app/screens/UtilityScreens/Members/MemberDetailScreen';
import MembersBirthdayList from './app/screens/UtilityScreens/Members/MembersBirthdayList';
import { View } from 'react-native';
const theme = themes.dark;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MainTabs() {
  const [hasBirthdays, setHasBirthdays] = useState(true);
useEffect(() => {
  const checkBirthdays = async () => {
    const result = await getTodayBirthdays();
    setHasBirthdays(result.length > 0);
  };
  checkBirthdays();
}, []);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home-outline'; break; 
            case 'Reports': iconName = 'bar-chart-outline'; break;
            case 'Settings': iconName = 'settings-outline'; break;
            case 'Birthday': iconName = 'gift-outline'; break;
            default: iconName = 'ellipse-outline';
          }
          return (
        <View>
          <Icon name={iconName} size={size} color={color} />
          {route.name === 'Birthday' && hasBirthdays && (
            <View style={{
              position: 'absolute',
              top: -2,
              right: -8,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 10,
              height: 10,
            }} />
          )}
        </View>
          )
        },
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AllMembers" component={AllMembers}/> 
     <Tab.Screen name="Birthday" component={MembersBirthdayList} />
     {/* <Tab.Screen name="Inventory" component={InventoryScreen} /> */}

      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate splash delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}

        <Stack.Screen name="BMI" component={BMIScreen} />
        <Stack.Screen name="OQ" component={QRScreen} />
        <Stack.Screen name="MemberDetail" component={MemberDetailScreen} /> 


      </Stack.Navigator>
    </NavigationContainer>
  );
}
