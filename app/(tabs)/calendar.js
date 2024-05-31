import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useMemo, useRef } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native'


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



export default function Calendar() {

  const snapPoints = useMemo(() => ["50%"], []);

  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();


  // renders
  return (
    <ThemedView style={styles.content}>
      <Button title="Open" onPress={handleOpenPress} />
      <Button title="Close" onPress={handleClosePress} />
      <BottomSheet 
        ref={bottomSheetRef} 
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        >
        <View style={styles.contentContainer}>
          <BottomSheetTextInput value="Awesome 🎉" style={styles.textInput} />
        </View>
      </BottomSheet>
    </ThemedView>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
