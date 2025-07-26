import { red } from "react-native-reanimated/lib/typescript/Colors";

const darkTheme = {
  background: '#000f24',
  cardBackground: '#0E2433',
  primary: '#5CE1E6',
  secondary: '#3EB3CC',
  accent: '#9C27B0', // Optional gradient tone
  textPrimary: '#FFFFFF',
  textSecondary: '#ADB9C6',
  fontFamily: 'Poppins', // Use custom font
  red: '#DC2525',
};

const lightTheme = {
  background: '#F7F9FB',
  cardBackground: '#FFFFFF',
  primary: '#007ACC',
  secondary: '#4DA6FF',
  accent: '#9C27B0',
  textPrimary: '#1E1E1E',
  textSecondary: '#5A5A5A',
  fontFamily: 'Poppins',
  red: '#DC2525',

};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
