import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TasksContext } from '@/contexts/TasksContext';
import TaskBottomSheet from '@/components/TaskBottomSheet';
import Task from '@/components/Task';

// Configure the calendar locale (optional)
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
LocaleConfig.defaultLocale = 'en';

const CalendarPage = () => {
  const { tasks, setTasks, updateTask, deleteTask } = useContext(TasksContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetRef = useRef(null);
  const colorScheme = useColorScheme();

  const filteredTasks = tasks.filter(task => task.date.toISOString().split('T')[0] === selectedDate);

  const resetForm = () => {
    setTask('');
    setDate(new Date());
    setIsEditing(false);
    setCurrentTaskId(null);
    setIsOpen(false);
    bottomSheetRef.current?.close();
  };

  const updateTaskInState = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.task_id === updatedTask.id 
          ? { ...task, complete: updatedTask.complete } 
          : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <Task 
      key={item.task_id} 
      id={item.task_id} 
      title={item.title} 
      complete={item.complete} 
      updateTaskInState={updateTaskInState}
      onPress={() => {
        setTask(item.title);
        setDate(item.date);
        setCurrentTaskId(item.task_id);
        setIsEditing(true);
        setIsOpen(true);
        bottomSheetRef.current?.expand();
      }}
      showDate={false} // Hide the date in the Task component for the CalendarPage
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: useThemeColor({}, 'background') }]}>
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText type='title'>Calendar</ThemedText>
        </ThemedView>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#00adf5' },
          }}
          theme={{
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            calendarBackground: colorScheme === 'dark' ? '#000' : '#fff',
            textSectionTitleColor: colorScheme === 'dark' ? '#fff' : '#000',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#fff',
            todayTextColor: '#00adf5',
            dayTextColor: colorScheme === 'dark' ? '#fff' : '#000',
            textDisabledColor: colorScheme === 'dark' ? '#444' : '#d9e1e8',
            monthTextColor: colorScheme === 'dark' ? '#fff' : '#000',
            indicatorColor: '#00adf5',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.task_id.toString()}
          ListEmptyComponent={<ThemedText type='subtitle' style={styles.noTasks}>No tasks for this date</ThemedText>}
        />

        <ThemedView style={styles.absoluteContainer}>
          <TouchableOpacity onPress={() => {
            setIsEditing(false);
            setTask('');
            setDate(new Date());
            setIsOpen(true);
            bottomSheetRef.current?.expand();
          }} style={styles.addTaskWrapper}>
            <ThemedText type='title' style={styles.addTaskText}>+</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <TaskBottomSheet
          bottomSheetRef={bottomSheetRef}
          task={task}
          setTask={setTask}
          date={date}
          setDate={setDate}
          isEditing={isEditing}
          currentTaskId={currentTaskId}
          setTasks={setTasks}
          resetForm={resetForm}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

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
  taskItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#888',
  },
  noTasks: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
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
});

export default CalendarPage;
