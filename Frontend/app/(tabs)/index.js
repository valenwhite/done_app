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
  Button, 
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

// Hook imports
import { useColorScheme } from '@/hooks/useColorScheme';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretUp,faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HelloWave } from '@/components/HelloWave';


// Extract date comparison functions
const isToday = (date) => new Date(date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0);
const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(date).setHours(0,0,0,0) === tomorrow.setHours(0,0,0,0);
};
const isFuture = (date) => {
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  return new Date(date).setHours(0,0,0,0) >= dayAfterTomorrow.setHours(0,0,0,0);
};
const isOverdue = (date) => new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

const userId = 1;



export default function TaskPage() {

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
  }, [])



  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const addTask = (title, date) => {
    setTasks(prevtasks => [...prevtasks, { title, date }]);
  };

  const handleOpenBottom = () => {
    bottomSheetRef.current?.expand();
    inputRef.current.focus();
  };

  const handleAddTask = () => {
    bottomSheetRef.current?.close();
    console.log(task);
    console.log(date);
    setTasks(prevtasks => [...prevtasks, { title: task, date: date }]);
    setTask(null);
  }
  
  const colorScheme = useColorScheme();

  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef(null);
  const inputRef = useRef(null);

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

const updateTaskInState = (updatedTask) => {
  console.log('Updating task in state', updatedTask);

  console.log('Tasks before update:', tasks);

  console.log('Complete value in updatedTask:', updatedTask.complete);

  setTasks(tasks.map(task => 
    task.task_id === updatedTask.id 
      ? { ...task, complete: updatedTask.complete } 
      : task
  ));
};


  const filterOptions = ['All', 'Today', 'Tomorrow', 'Overdue', 'Completed'];

  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredTasks = tasks.filter(task => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);

    switch (selectedFilter) {
      case 'Today':
        return taskDate.getTime() === today.getTime() && task.complete !== 1;
      case 'Tomorrow':
        return taskDate.getTime() === tomorrow.getTime() && task.complete !== 1;
      case 'Overdue':
        return taskDate.getTime() < today.getTime() && task.complete !== 1;
      case 'Completed':
        return task.complete === 1;
      default:
        // if 'All' or any other value is selected, return all tasks
        return task.complete !== 1;
    }
  });

  return (   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]}>
        <View style={styles.headerContainer}>
          <View style={styles.welcomeContainer}>
            <ThemedText type='title'>Hello, Valen</ThemedText>
            <HelloWave/>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {filterOptions.map((option) => (
              <Pressable 
                key={option} 
                style={[
                  styles.filterOption, 
                  selectedFilter === option ? styles.selectedFilter : null
                ]}
                onPress={() => setSelectedFilter(option)}
              >
                <Text style={styles.filterTitle}>{option}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>


        <View style={styles.taskContainer}>
          <ScrollView>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Task key={task.task_id} id={task.task_id} title={task.title} date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} complete={task.complete} updateTaskInState={updateTaskInState}/>
              ))
            ) : (
              <ThemedView style={styles.noTask}>
                <FontAwesomeIcon icon={faSquareCheck} color="#0a7ea4" size='50' />
                <ThemedText type='subtitle'>All tasks complete!</ThemedText>
              </ThemedView>

            )}
          </ScrollView>
        </View>

        
        <ThemedView style={styles.absoluteContainer}>
          <TouchableOpacity onPress={handleOpenBottom} style={styles.addTaskWrapper}>
            <ThemedText type='title' style={{color: '#fff'}}>+</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          initialSnapIndex={-1} // This makes the sheet hidden at first
          backdropComponent={renderBackdrop}
          styles={styles.bottomContainer}
          backgroundStyle={{backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff'}}
          handleIndicatorStyle={{ display: "none" }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.writeTaskWrapper}>
              <TextInput 
                style={styles.input} 
                placeholder={'What do you need to do?'}
                placeholderTextColor={'#787878'}
                color={colorScheme === 'dark' ? '#fff' : '#000'}
                onChangeText={text => setTask(text)}
                value={task}
                ref={inputRef}
              />

              <TouchableOpacity onPress={() => handleAddTask()}>
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
  headerContainer: {
    flexDirection: 'column',
    padding: 14,
  },
  welcomeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  filterOption: {
    backgroundColor: '#58a9c4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#0a7ea4', // change this to the color you want
  },
  filterTitle: {
    color: 'white'
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 14,
    height: '100%',
  },
  task: {
    marginBottom: 8,
  },
  noTask: {
    display: 'flex',
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
    color: 'white',
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    width: 28,
    height: 28,
    alignItems: 'center',
    borderRadius: 100,
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 10, // Adjust these values as needed
    right: 10, // Adjust these values as needed
    width: 70, // Adjust these values as needed
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 30,
    backgroundColor: 'transparent', // Adjust this value as needed for your layout
  },
  addTaskWrapper: {
    width: 70,
    height: 70,
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
});
