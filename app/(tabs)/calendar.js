import { StyleSheet, SafeAreaView } from 'react-native'
import { Link } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

export default function Calendar() {

  return (
    <ThemedView style={styles.content}>
      <SafeAreaView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Calendar</ThemedText>
            <HelloWave/>
          </ThemedView>
          <ThemedText type="defaultSemiBold">Date</ThemedText>
          <ThemedText type="defaultSemiBold">Time</ThemedText>
          <Link href='../settings' style={{color: 'blue'}}>Settings</Link>
      </SafeAreaView>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
