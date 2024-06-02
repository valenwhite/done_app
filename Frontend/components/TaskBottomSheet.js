import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretUp, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedView } from '@/components/ThemedView';

const TaskBottomSheet = ({ 
  bottomSheetRef, 
  task, 
  setTask, 
  date, 
  setDate, 
  isEditing, 
  currentTaskId, 
  setTasks, 
  resetForm,
  isOpen,
  setIsOpen
}) => {
  const colorScheme = useColorScheme();
  const inputRef = useRef(null);
  const [isEditingTask, setIsEditingTask] = useState(false);

  const snapPoints = useMemo(() => (isEditing ? ["55%"] : ["50%"]), [isEditing]);

  useEffect(() => {
    if (isOpen && !isEditing) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeout);
    }
  }, [isEditing, isOpen]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  const handleAddOrUpdateTask = async () => {
    const url = isEditing ? `http://localhost:8080/tasks/${currentTaskId}` : 'http://localhost:8080/tasks';
    const method = isEditing ? 'PUT' : 'POST';
    const body = isEditing 
      ? JSON.stringify({ title: task, date }) 
      : JSON.stringify({ userId: 1, title: task, date });

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error);
      }

      const data = await res.json();

      if (isEditing) {
        setTasks(prevTasks => prevTasks.map(t => 
          t.task_id === currentTaskId ? { ...t, title: data.title, date: new Date(data.date) } : t
        ));
      } else {
        setTasks(prevTasks => [...prevTasks, { ...data, date: new Date(data.date) }]);
      }
      resetForm();
      setIsOpen(false);
      bottomSheetRef.current?.close();
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const res = await fetch(`http://localhost:8080/tasks/${currentTaskId}`, { method: 'DELETE' });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error);
      }

      await res.json();
      setTasks(prevTasks => prevTasks.filter(t => t.task_id !== currentTaskId));
      resetForm();
      setIsOpen(false);
      bottomSheetRef.current?.close();
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const startEditingTask = () => {
    setIsEditingTask(true);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      initialSnapIndex={0} // Keeps the bottom sheet closed initially
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }}
      handleIndicatorStyle={{ display: "none" }}
      onChange={(index) => setIsOpen(index !== -1)}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.writeTaskWrapper}>
          <TextInput 
            style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]} 
            placeholder={'What do you need to do?'}
            placeholderTextColor={'#787878'}
            onChangeText={setTask}
            value={task}
            ref={inputRef}
            editable={isEditingTask || !isEditing}
            onFocus={() => setIsEditingTask(true)}
          />
          <TouchableOpacity onPress={isEditingTask ? handleAddOrUpdateTask : startEditingTask}>
            <ThemedView style={styles.submitTask}>
              <FontAwesomeIcon icon={isEditingTask ? faCaretUp : faPencilAlt} color="#fff" />
            </ThemedView>
          </TouchableOpacity>
        </View>
        <View style={styles.dateAndDeleteWrapper}>
          <View style={styles.dateSelector}>
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
          {isEditing && (
            <TouchableOpacity onPress={handleDeleteTask} style={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrash} color="#fff" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
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
  dateAndDeleteWrapper: {
    marginHorizontal: 10,
    marginTop: 16,
  },
  dateSelector: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  submitTask: {
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    width: 28,
    height: 28,
    alignItems: 'center',
    borderRadius: 100,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TaskBottomSheet;
