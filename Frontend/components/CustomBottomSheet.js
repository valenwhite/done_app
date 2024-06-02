import React, { useRef, useMemo, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useColorScheme, StyleSheet } from 'react-native';

const CustomBottomSheet = () => { // Add children and inputRef props

  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef(null);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ), []
  );

  const styles = StyleSheet.create({ // Add styles
    bottomContainer: {
      // Your styles here
    },
  });

  return (
    <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnapIndex={-1}
        backdropComponent={renderBackdrop}
        style={styles.bottomContainer}
        backgroundStyle={{backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff'}}
        handleIndicatorStyle={{ display: "none" }}
    >
    </BottomSheet>
  );
};

export default CustomBottomSheet;
