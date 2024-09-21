import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PasswordResetScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (newPassword !== repeatPassword) {
      setError('Passwords do not match.');
    } else {
      // Implement your password reset logic here
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={!newPassword || !repeatPassword} // Disable button if any field is empty
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
