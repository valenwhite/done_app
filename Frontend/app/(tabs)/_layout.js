import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTasks, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon icon={faTasks} color={color} size={focused ? 25 : 20} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon icon={faCalendarAlt} color={color} size={focused ? 25 : 20} />
            ),
          }}
        />
        <Tabs.Screen
          name="test"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={focused ? 25 : 20} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
