import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider, useAuth } from '../AuthContext';
import { TasksProvider } from '@/contexts/TasksContext';
import LoginScreen from './login';
import SignupScreen from './signup';
import TabLayout from './(tabs)/_layout'; // Adjust this path as needed

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="(tabs)" component={TabLayout} />
        )}
      </Stack.Navigator>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TasksProvider>
        <RootLayoutInner />
      </TasksProvider>
    </AuthProvider>
  );
}
