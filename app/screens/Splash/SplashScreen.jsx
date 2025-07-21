import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
    ]).start(() => {
      navigation.replace('Home'); // Navigate to home after splash
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeAnim,
            transform: [{ translateY: moveAnim }],
          },
        ]}
      >
        EzGym
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: fadeAnim,
            transform: [{ translateY: moveAnim }],
          },
        ]}
      >
        Developed by Neeraj Tripathi
      </Animated.Text>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061829', // Use dark background from your theme image
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#5CE1E6', // Aqua/Teal tone from your theme
    letterSpacing: 2,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    color: '#ADB9C6', // Soft grey-blue from your theme
  },
});

export default SplashScreen;
