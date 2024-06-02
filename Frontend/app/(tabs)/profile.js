import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import Collapsible from 'react-native-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Mock function to get open source licenses (replace with actual implementation)
const getOpenSourceLicenses = () => [
  { name: 'React', license: 'MIT' },
  { name: 'React Native', license: 'MIT' },
];

const ProfilePage = () => {
  const colorScheme = useColorScheme();
  const [fontSize, setFontSize] = useState('medium');
  const [isFontSizeCollapsed, setIsFontSizeCollapsed] = useState(true);
  const [isMoreCollapsed, setIsMoreCollapsed] = useState(true);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState('john.doe@example.com');
  const user = {
    name: 'Valen White',
    email,
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem('fontSize');
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }
      } catch (e) {
        console.error('Failed to load settings.', e);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (size) => {
    try {
      await AsyncStorage.setItem('fontSize', size);
      setFontSize(size);
    } catch (e) {
      console.error('Failed to save settings.', e);
    }
  };

  const licenses = getOpenSourceLicenses();

  const handleUpdateEmail = () => {
    setIsEditingEmail(false);
    // Logic to save the updated email would go here
  };

  const Line = () => (
    <View style={{ borderBottomWidth: 1, borderColor: '#0a7ea4', marginVertical: 5, opacity: 0.3 }}/>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type='title'>My Details</ThemedText>

            <View style={styles.detailsContainer}>
              <ThemedText type='subtitle'>{user.name}</ThemedText>
              <View style={styles.emailContainer}>
                {isEditingEmail ? (
                  <TextInput
                    style={styles.emailInput}
                    value={email}
                    onChangeText={setEmail}
                    onBlur={handleUpdateEmail}
                    autoFocus
                  />
                ) : (
                  <ThemedText type='subtitle' style={styles.emailText}>{user.email}</ThemedText>
                )}
                <TouchableOpacity onPress={isEditingEmail ? handleUpdateEmail : () => setIsEditingEmail(true)}>
                  <ThemedText type='link' style={styles.updateLink}>{isEditingEmail ? 'Save' : 'Update'}</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <Line/>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type='subtitle'>Settings</ThemedText>
            <TouchableOpacity onPress={() => setIsFontSizeCollapsed(!isFontSizeCollapsed)}>
              <View style={styles.collapsibleHeader}>
                <ThemedText type='default'>Font Size</ThemedText>
                <View style={styles.fontSizeContainer}>
                  <ThemedText type='default' style={styles.currentFontSize}>
                    {fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
                  </ThemedText>
                  <FontAwesomeIcon icon={isFontSizeCollapsed ? faChevronDown : faChevronUp} size={12} color={'#0a7ea4'} />
                </View>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isFontSizeCollapsed}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={fontSize}
                  style={styles.picker}
                  onValueChange={(itemValue) => saveSettings(itemValue)}
                >
                  <Picker.Item label="Small" value="small" />
                  <Picker.Item label="Medium" value="medium" />
                  <Picker.Item label="Large" value="large" />
                </Picker>
              </View>
            </Collapsible>
          </ThemedView>

          <ThemedView style={styles.sectionContainer}>
            <ThemedText type='subtitle'>About</ThemedText>
            <ThemedText type='default' style={styles.aboutDescription}>
              This application is designed to help users manage their tasks efficiently.
            </ThemedText>
            <TouchableOpacity onPress={() => setIsMoreCollapsed(!isMoreCollapsed)}>
              <View style={styles.collapsibleHeader}>
                <ThemedText type='link' style={styles.moreLink}>
                  {isMoreCollapsed ? 'More...' : '...Less'}
                </ThemedText>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isMoreCollapsed}>
              <View style={styles.licensesContainer}>
                <ThemedText type='subtitle'>Licenses</ThemedText>
                {licenses.map((license, index) => (
                  <View key={index} style={styles.licenseItem}>
                    <ThemedText type='body' style={styles[fontSize]}>{license.name}</ThemedText>
                    <ThemedText type='body' style={styles[fontSize]}>{license.license}</ThemedText>
                  </View>
                ))}
              </View>
            </Collapsible>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 14,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailInput: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 40,
    flex: 1,
  },
  emailText: {
    height: 40,
    lineHeight: 40, // Ensures text is vertically centered
  },
  updateLink: {
    marginLeft: 10,
    color: '#0a7ea4',
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentFontSize: {
    marginRight: 8,
  },
  pickerContainer: {
    height: 280,
  },
  aboutDescription: {
    marginTop: 10,
    marginBottom: 8,
  },
  licensesContainer: {
    marginTop: 10,
  },
  licenseItem: {
    marginBottom: 10,
  },
});

export default ProfilePage;
