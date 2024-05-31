import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Task = ({ title, date }) => {

  const tintBackground= useThemeColor({}, 'tintBackground');

  const styles = StyleSheet.create({
    tasksContainer: {
      display: 'flex',
      marginBottom: 12,
    },
    taskDetails: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: tintBackground,
      padding: 16,
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
    <View style={styles.tasksContainer}>
        <ThemedView style={styles.taskDetails}>
          <BouncyCheckbox
            size={25}
            fillColor='#0a7ea4'
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: '#0a7ea4', borderRadius: 3 }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 3 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked: boolean) => {console.log(isChecked)}}
            disableText={true}
          />
          <ThemedText type="defaultSemiBold" numberOfLines={1} ellipsizeMode='tail' style={styles.taskTitle}>{title}</ThemedText>
          <ThemedText type="link">{date}</ThemedText>
        </ThemedView>
    </View>
  );
};

export default Task;
