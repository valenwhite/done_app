import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTasks, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import IndexScreen from './index';
import CalendarScreen from './calendar';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="index"
        component={IndexScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={faTasks} color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={faCalendarAlt} color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
