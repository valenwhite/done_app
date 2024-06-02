import React from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Task = ({ id, title, date, complete, updateTaskInState, onPress }) => {
  const tintBackground = useThemeColor({}, 'tintBackground');

  const completeTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: complete === 1 ? 0 : 1 }),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const text = await response.json();

      if (text) {
        const updatedCompleteStatus = parseInt(text.complete, 10);
        const updatedTask = { id, title, date, complete: updatedCompleteStatus };
        updateTaskInState(updatedTask);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = StyleSheet.create({
    tasksContainer: {
      display: 'flex',
      marginBottom: 12,
    },
    taskDetails: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: tintBackground,
      padding: 13,
      borderRadius: 10,
      gap: 16,
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
    },
    check: {
      width: 14,
      height: 14,
      backgroundColor: '#0a7ea4',
      borderRadius: 3,
    },
    taskTitle: {
      flex: 1,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.tasksContainer}>
        <ThemedView style={styles.taskDetails}>
          <BouncyCheckbox
            size={25}
            fillColor='#0a7ea4'
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: '#0a7ea4', borderRadius: 3 }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 3 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            disableText={true}
            onPress={completeTask}
            isChecked={complete === 1}
          />
          <ThemedText type="defaultSemiBold" numberOfLines={1} ellipsizeMode='tail' style={styles.taskTitle}>{title}</ThemedText>
          <ThemedText type="link">{date}</ThemedText>
        </ThemedView>
      </View>
    </Pressable>
  );
};

export default Task;
