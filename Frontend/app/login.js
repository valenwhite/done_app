import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    // Handle login logic here
    // For simplicity, we'll assume the login is successful
    login();
    navigation.navigate('(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <ThemedText type='subtitle' >Let's get things done</ThemedText>
        <FontAwesomeIcon icon={faSquareCheck} color="#0a7ea4" size={20} />
      </View>
      <View style={styles.inputContainer}>
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
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <ThemedText type='subtitle' style={styles.buttonText}>Login</ThemedText>
        </Pressable>
        <Pressable style={styles.signUpButton} onPress={() => navigation.navigate('signup')}>
          <ThemedText type='link'>Sign Up</ThemedText>
        </Pressable>
      </View>
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
    gap: 40,
  },
  introContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  loginButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
  },
  signUpButton: {
    borderRadius: 25,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
  },
});
