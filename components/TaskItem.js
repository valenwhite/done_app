import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Image } from 'react-native';

const TaskItem = ({ title, date }) => {
  return (
    <ThemedView style={styles.tasksContainer}>
        <ThemedView style={styles.taskDetails}>
          <Image source={require('../assets/images/favicon.png')} style={{width: 30, height: 30}}/>
          <ThemedText type="defaultSemiBold" numberOfLines={1} ellipsizeMode='tail' style={styles.taskTitle}>{title}</ThemedText>
          <ThemedText type="link">{date}</ThemedText>
        </ThemedView>
    </ThemedView>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  tasksContainer: {
    display: 'flex',
    marginBottom: 10,
  },
  taskDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  taskTitle: {
    flex: 1,
  },
});