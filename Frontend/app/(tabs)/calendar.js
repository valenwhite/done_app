import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TasksContext } from '@/contexts/TasksContext';

// Configure the calendar locale (optional)
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
LocaleConfig.defaultLocale = 'en';

const CalendarPage = () => {
  const { tasks } = useContext(TasksContext);
  const [selectedDate, setSelectedDate] = useState('');
  const colorScheme = useColorScheme();

  const filteredTasks = tasks.filter(task => task.date.toISOString().split('T')[0] === selectedDate);

  const renderItem = ({ item }) => (
    <ThemedView style={styles.taskItem}>
      <ThemedText type='body' style={styles.taskTitle}>{item.title}</ThemedText>
      <ThemedText type='body' style={styles.taskDate}>{item.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</ThemedText>
    </ThemedView>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
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
});

export default CalendarPage;
