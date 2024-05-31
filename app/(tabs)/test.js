import  AddTask  from '@/components/AddTask';
import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, Platform  } from 'react-native';
import Task from '@/components/Task';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from '@/hooks/useColorScheme';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheet } from '@gorhom/bottom-sheet';


const test = () => {
  return (
    <SafeAreaView>
      <Text>HI</Text>
    </SafeAreaView>
  )
}

export default test
