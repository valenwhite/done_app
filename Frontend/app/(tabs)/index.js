// React imports
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';

// React Native imports
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  KeyboardAvoidingView, 
  Pressable
} from 'react-native';

// Gesture handler imports
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

// Gorhom BottomSheet imports
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Local component imports
import Task from '@/components/Task';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';

// Hook imports
import { useColorScheme } from '@/hooks/useColorScheme';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretUp, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Extract date comparison functions
const isToday = (date) => new Date(date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0);
const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(date).setHours(0,0,0,0) === tomorrow.setHours(0,0,0,0);
};
const isOverdue = (date) => new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

// Active user ID
const userId = 1;

export default function TaskPage() {

  // Task state variables
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Vriables used for the bottomsheet 
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef(null);
  const inputRef = useRef(null);

  // Fetches the tasks from the backend  and stores them in the state variable above
  useEffect(() => {
    fetch('http://localhost:8080/tasks/1')
      .then(res => res.json())
      .then(data => {
        const tasksWithDateObjects = data.map(task => ({
          ...task,
          date: new Date(task.date)
        }));
        setTasks(tasksWithDateObjects);
      })
      .catch(err => console.log('Error:', err))
  }, []);

  // Controls the bottom sheet which is where a user can add a new task
  const handleOpenBottom = () => {
    bottomSheetRef.current?.expand();
    inputRef.current.focus();
  };

  // Casts a backdrop when the bottom sheet is active
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ), []
  );

  // Handles the date selector input located within the bottom sheet
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // Handles the add task function located in the bottom sheet
  const handleAddTask = () => {
    bottomSheetRef.current?.close();
    setTasks(prevTasks => [...prevTasks, { title: task, date }]);
    setTask('');
  };

  // Handles the task update in the task state variable when a task is set to complete or uncomplete
  const updateTaskInState = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.task_id === updatedTask.id 
          ? { ...task, complete: updatedTask.complete } 
          : task
      )
    );
  };

  // Filter options for the tasks
  const filterOptions = ['All', 'Today', 'Tomorrow', 'Overdue', 'Completed'];
  
  // Logic for the filtered views
  const filterFunctions = {
    'All': task => task.complete !== 1,
    'Today': task => isToday(task.date) && task.complete !== 1,
    'Tomorrow': task => isTomorrow(task.date) && task.complete !== 1,
    'Overdue': task => isOverdue(task.date) && task.complete !== 1,
    'Completed': task => task.complete === 1
  };

  const filteredTasks = tasks.filter(filterFunctions[selectedFilter] || filterFunctions['All']);

  return (   

    // Main container, view is contained within safe area and will be themed automatically to user devices theme
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]}>
        <View>
          <View style={styles.welcomeContainer}>
            <ThemedText type='title'>Hello, Valen</ThemedText>
            <HelloWave />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {filterOptions.map((option) => (
              <Pressable 
                key={option} 
                style={[
                  styles.filterOption, 
                  selectedFilter === option && styles.selectedFilter
                ]}
                onPress={() => setSelectedFilter(option)}
              >
                <Text style={styles.filterTitle}>{option}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.taskContainer}>
          <ScrollView style={{flex: 1}}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Task key={task.task_id} id={task.task_id} title={task.title} date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} complete={task.complete} updateTaskInState={updateTaskInState} />
              ))
            ) : (
              selectedFilter !== 'Completed' && (
                <ThemedView style={styles.noTask}>
                  <FontAwesomeIcon icon={faSquareCheck} color="#0a7ea4" size='50' />
                  <ThemedText type='subtitle'>All tasks complete!</ThemedText>
                </ThemedView>
              )
            )}
          </ScrollView>
        </View>

        <ThemedView style={styles.absoluteContainer}>
          <TouchableOpacity onPress={handleOpenBottom} style={styles.addTaskWrapper}>
            <ThemedText type='title' style={styles.addTaskText}>+</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          initialSnapIndex={-1}
          backdropComponent={renderBackdrop}
          styles={styles.bottomContainer}
          backgroundStyle={{backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff'}}
          handleIndicatorStyle={{ display: "none" }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.writeTaskWrapper}>
              <TextInput 
                style={[styles.input, {color: colorScheme === 'dark' ? '#fff' : '#000'}]} 
                placeholder={'What do you need to do?'}
                placeholderTextColor={'#787878'}
                onChangeText={setTask}
                value={task}
                ref={inputRef}
              />
              <TouchableOpacity onPress={handleAddTask}>
                <ThemedView style={styles.submitTask}>
                  <FontAwesomeIcon icon={faCaretUp} color="#fff" />
                </ThemedView>
              </TouchableOpacity>
            </View>
            <View style={styles.dateSelector}>
              <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            </View>
          </KeyboardAvoidingView>
        </BottomSheet>
      </SafeAreaView>
    </TouchableWithoutFeedback> 
  );
}

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  welcomeContainer: {
    flexDirection: 'row',
    paddingTop: 14,
    marginLeft: 14,
    marginBottom: 16,
    gap: 16,
  },
  filterOption: {
    backgroundColor: '#58a9c4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginLeft: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#0a7ea4',
  },
  filterTitle: {
    color: 'white'
  },
  taskContainer: {
    flex: 1,
    padding: 14,
  },
  noTask: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '60%',
    gap: 12,
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingRight: 24,
    paddingBottom: 0,
    paddingLeft: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    borderRadius: 100,
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  dateSelector: {
    marginTop: 16,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  submitTask: {
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    width: 28,
    height: 28,
    alignItems: 'center',
    borderRadius: 100,
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 70,
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 30,
    backgroundColor: 'transparent',
  },
  addTaskWrapper: {
    width: 70,
    height: 70,
    backgroundColor: '#0a7ea4',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskText: {
    color: '#fff',
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
