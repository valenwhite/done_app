// React and React Native imports
import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Image, SectionList, Text, Button  } from 'react-native';

// Navigation imports
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Expo imports
import { Link } from 'expo-router';

// Local imports
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { useThemeColor } from '@/hooks/useThemeColor';
import TaskItem from './TaskItem';







// Styles
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tasksContainer: {
    display: 'flex',
  },
  dateSection: {
    display: 'flex',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  taskDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  taskTitle: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
});


const DATA = [
  {
    title: "Today",
    data: [
      { title: "Task 1 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 2 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 3 is coming up and must be complete asap", date: "Tomorrow" }
    ]
  },
  {
    title: "Tomorrow",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 5 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 6 is coming up and must be complete asap", date: "Tomorrow" }
    ]
  },
  {
    title: "Next 7 Days",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 5 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 6 is coming up and must be complete asap", date: "Tomorrow" }
    ]
  },
  {
    title: "Upcoming",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 5 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 6 is coming up and must be complete asap", date: "Tomorrow" }
    ]
  }
];