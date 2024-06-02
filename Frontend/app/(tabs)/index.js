import React, { useContext, useState, useRef } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Task from '@/components/Task';
import TaskBottomSheet from '@/components/TaskBottomSheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { TasksContext } from '@/contexts/TasksContext';

// Date comparison functions
const isToday = (date) => new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(date).setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0);
};
const isOverdue = (date) => new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

const TaskPage = () => {
  const { tasks, setTasks, updateTask, deleteTask } = useContext(TasksContext);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetRef = useRef(null);

  const resetForm = () => {
    setTask('');
    setDate(new Date());
    setIsEditing(false);
    setCurrentTaskId(null);
    setIsOpen(false);
    bottomSheetRef.current?.close(); // Ensure this is called here
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

  const filterOptions = ['All', 'Today', 'Tomorrow', 'Overdue', 'Completed'];
  
  const filterFunctions = {
    'All': task => task.complete !== 1,
    'Today': task => isToday(task.date) && task.complete !== 1,
    'Tomorrow': task => isTomorrow(task.date) && task.complete !== 1,
    'Overdue': task => isOverdue(task.date) && task.complete !== 1,
    'Completed': task => task.complete === 1
  };

  const filteredTasks = tasks.filter(filterFunctions[selectedFilter] || filterFunctions['All']);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: useThemeColor({}, 'background') }]}>
        <View>
          <View style={styles.welcomeContainer}>
            <ThemedText type='title'>Hello, Valen</ThemedText>
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
          <ScrollView style={{ flex: 1 }}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Task 
                  key={task.task_id} 
                  id={task.task_id} 
                  title={task.title} 
                  date={task.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} 
                  complete={task.complete} 
                  updateTaskInState={updateTaskInState}
                  onPress={() => {
                    setTask(task.title);
                    setDate(task.date);
                    setCurrentTaskId(task.task_id);
                    setIsEditing(true);
                    setIsOpen(true);
                    bottomSheetRef.current?.expand();
                  }}
                />
              ))
            ) : (
              selectedFilter !== 'Completed' && (
                <ThemedView style={styles.noTask}>
                  <FontAwesomeIcon icon={faSquareCheck} color="#0a7ea4" size={50} />
                  <ThemedText type='subtitle'>All tasks complete!</ThemedText>
                </ThemedView>
              )
            )}
          </ScrollView>
        </View>

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
  filterContainer: {
    marginBottom: 20,
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

export default TaskPage;
