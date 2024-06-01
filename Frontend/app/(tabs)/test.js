import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Alert, View } from 'react-native';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    if (email && password) {
      // Handle login logic here
      Alert.alert('Login', `Welcome back, ______`);
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const handleSignup = () => {
    if (name && username && password) {
      // Handle signup logic here
      Alert.alert('Signup', `Welcome, ${name}!`);
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowForm(true);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  return (
    <SafeAreaView>
      {showForm ? (
        <View>
          {!isLogin && (
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title={isLogin ? "Login" : "Signup"} onPress={isLogin ? handleLogin : handleSignup} />
          <Button title="Back" onPress={handleBackClick} />
        </View>
      ) : (
        <View>
          <Button title="Login" onPress={handleLoginClick} />
          <Button title="Signup" onPress={handleSignupClick} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginPage;