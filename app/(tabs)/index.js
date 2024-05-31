// React imports
import React, { useMemo, useRef, useCallback } from 'react';

// React Native imports
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  Platform, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard,
  KeyboardAvoidingView 
} from 'react-native';

// Gesture handler imports
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

// Gorhom BottomSheet imports
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Local component imports
import Task from '@/components/Task';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

// Hook imports
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TaskPage() {

  const tasks = new Array(15).fill({
    title: 'This is one of the tasks that needs to get done',
    date: 'Today'
  });
  
  const colorScheme = useColorScheme();

  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]}>

        <ScrollView style={styles.tasksContainer}>
          <ThemedText type='title'>Today's Tasks</ThemedText>
          {tasks.map((task, index) => (
            <Task key={index} title={task.title} date={task.date} />
          ))}
        </ScrollView>


        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity onPress={handleOpenPress}>
            <View style={styles.addTaskWrapper}>
              <ThemedText type='title' style={{color: '#fff'}}>+</ThemedText>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          initialSnapIndex={-1} // This makes the sheet hidden at first
          backdropComponent={renderBackdrop}
        >
          <TextInput 
            style={[styles.input, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]} 
            placeholder={'Write a task'}
          />
        </BottomSheet>
      </SafeAreaView>
    </TouchableWithoutFeedback> 
  );
}




// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  tasksContainer: {
    display: 'flex',
    flex: 1,
    padding: 14,
    hieght: '110%',
  },
  task: {
    marginBottom: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    
    borderRadius: 100,
  },
  addTaskWrapper: {
    width: 70,
    height: 70,
    position: 'absolute',
    zIndex: 1,
    bottom: 25,
    right: 25,
    backgroundColor: '#0a7ea4',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
