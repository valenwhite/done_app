// React imports
import React, { useRef, useState } from 'react';

// React Native imports
import { View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';

// Gorhom BottomSheet imports
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Hook imports
import { useColorScheme } from '@/hooks/useColorScheme';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Local component imports
import { ThemedView } from '@/components/ThemedView';

const AddTaskBottomSheet = ({ bottomSheetRef, handleAddTask, task, setTask, date, setDate }) => {
  const colorScheme = useColorScheme();
  const inputRef = useRef(null);

  const snapPoints = ["50%"];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleOpenBottom = () => {
    bottomSheetRef.current?.expand();
    inputRef.current.focus();
  };

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      initialSnapIndex={-1}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.writeTaskWrapper}>
          <TextInput 
            style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]} 
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
  );
};

const styles = StyleSheet.create({
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
});

export default AddTaskBottomSheet;
