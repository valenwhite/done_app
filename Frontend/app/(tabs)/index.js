// React imports
import React, { useMemo, useRef, useCallback, useState } from 'react';

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
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
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





export default function TaskPage() {
 
  const [task, setTask] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const [taskItems, setTaskItems] = useState([]);

  const addTask = (title, date) => {
    setTaskItems(prevTaskItems => [...prevTaskItems, { title, date }]);
  };

  const todaysTasks = useMemo(() => taskItems.filter(task => isToday(task.date)), [taskItems]);
  const tomorrowsTasks = useMemo(() => taskItems.filter(task => isTomorrow(task.date)), [taskItems]);
  const futureTasks = useMemo(() => taskItems.filter(task => isFuture(task.date)), [taskItems]);
  const overdueTasks = useMemo(() => taskItems.filter(task => isOverdue(task.date)), [taskItems]);

  const handleOpenBottom = () => {
    bottomSheetRef.current?.expand();
    inputRef.current.focus();
  };

  const handleAddTask = () => {
    bottomSheetRef.current?.close();
    console.log(task);
    console.log(date);
    setTaskItems(prevTaskItems => [...prevTaskItems, { title: task, date: date }]);
    setTask(null);
  }

  const completeTask =(index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
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

  const filterOptions = ['All', 'Today', 'Tomorrow', 'Overdue', 'Completed'];

  return (   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'}]}>

        <View style={styles.headerContainer}>
          <View style={styles.welcomeContainer}>
            <ThemedText type='title'>Hello, Valen</ThemedText>
            <HelloWave/>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            <View style={styles.filterContainer}>
              {filterOptions.map((option) => (
                <Pressable key={option} style={styles.filterOption}>
                  <Text style={styles.filterTitle}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>



        {todaysTasks.length === 0 && tomorrowsTasks.length === 0 && futureTasks.length === 0 ? (
          <ThemedView style={styles.emptyTasksContainer}>
            <ThemedText type='title'>You're all caught up!</ThemedText>
          </ThemedView>
          ) : (
          
          <ScrollView style={styles.tasksContainer}>
          

            <ThemedView>
              {overdueTasks.length > 0 && (
                <View>
                  <ThemedText type='subtitle' style={styles.sectionTitle}>Overdue Tasks</ThemedText>
                  {overdueTasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task, index) => (
                    <Task key={index} title={task.title} date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} completeTask={completeTask} index={index} />
                  ))}
                </View>
              )}

              {todaysTasks.length > 0 && (
                <ThemedView>
                  <ThemedText type='subtitle' style={styles.sectionTitle}>Today's Tasks</ThemedText>
                  {todaysTasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task, index) => (
                    <Task key={index} title={task.title} date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} completeTask={completeTask} index={index} />
                  ))}
                </ThemedView>
              )}

              {tomorrowsTasks.length > 0 && (
                <View>
                  <ThemedText type='subtitle' style={styles.sectionTitle}>Tomorrow's Tasks</ThemedText>
                  {tomorrowsTasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task, index) => (
                    <Task key={index} title={task.title} date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} completeTask={completeTask} index={index} />
                  ))}
                </View>
              )}

              {futureTasks.length > 0 && (
                <View>
                  <ThemedText type='subtitle' style={styles.sectionTitle}>Future Tasks</ThemedText>
                  {futureTasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map((task, index) => (
                    <Task key={index} title={task.title} date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} completeTask={completeTask} index={index} />
                  ))}
                </View>
              )}
            </ThemedView>
          </ScrollView>
        )}
        
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
    gap:  16,
  },
  welcomeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  filterOption: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTitle: {
    color: 'white'
  },
  emptyTasksContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksContainer: {
    display: 'flex',
    padding: 14,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  task: {
    marginBottom: 8,
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
    padding: 30, // Adjust this value as needed for your layout
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
