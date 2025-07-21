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
const theme = themes.dark;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home-outline'; break;
            case 'Inventory': iconName = 'cube-outline'; break;
            case 'Reports': iconName = 'bar-chart-outline'; break;
            case 'Settings': iconName = 'settings-outline'; break;
            default: iconName = 'ellipse-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Inventory" component={InventoryScreen} />
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}
