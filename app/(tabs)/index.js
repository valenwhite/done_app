import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, Platform  } from 'react-native';
import Task from '@/components/Task';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from '@/hooks/useColorScheme';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheet } from '@gorhom/bottom-sheet';



export default function TaskPage() {
  
  const colorScheme = useColorScheme();

  return (    
      <SafeAreaView style={[styles.container, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]}>

        <ThemedView style={styles.tasksContainer}>

          <ThemedText type='title'>Today's Tasks</ThemedText>


          <Task title='This is one of the tasks that needs to get done' date='Today'/>
          <Task title='This is one of the tasks that needs to get done' date='Today'/>
          <Task title='This is one of the tasks that needs to get done' date='Today'/>

          
        </ThemedView>


        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={[styles.input, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]} placeholder={'Write a task'}/>

          <TouchableOpacity >
            <View style={styles.addWrapper}>
              <ThemedText type='title' style={{color: '#fff'}}>+</ThemedText>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </SafeAreaView>
  );
}






// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
    height: '100%',
    backgroundColor: 'white',
  },
  tasksContainer: {
    padding: 14,
    gap: 12,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
    writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    
    borderRadius: 100,
  },
  addWrapper: {
    width: 70,
    height: 70,
    backgroundColor: '#0a7ea4',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    
  },
  sheetContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  sheetContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});


const DATA = [
  {
    title: "Today",
    data: [
      { title: "Task 1 is coming up and must be complete asap", date: "Today" },
      { title: "Task 2 is coming up and must be complete asap", date: "Today" },
      { title: "Task 3 is coming up and must be complete asap", date: "Today" }
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
      { title: "Task 4 is coming up and must be complete asap", date: "Jun 1" },
      { title: "Task 5 is coming up and must be complete asap", date: "Jun 3" },
      { title: "Task 6 is coming up and must be complete asap", date: "Jun 5" }
    ]
  },
  {
    title: "Upcoming",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Aug 27" },
      { title: "Task 5 is coming up and must be complete asap", date: "Sep 4" },
      { title: "Task 6 is coming up and must be complete asap", date: "Sep 19" }
    ]
  }
];
