import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';
import { ThemedText } from '@/components/ThemedText';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSignup = () => {
    // Handle signup logic here
    // For simplicity, we'll assume the signup is successful
    login();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.signUpButton} onPress={handleSignup}>
          <ThemedText type='subtitle' style={styles.buttonText}>Sign Up</ThemedText>
        </Pressable>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('login')}>
        <ThemedText type="link">Back to Login</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
  signUpButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
  },
  backButton: {
    borderRadius: 25,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
  },
});
