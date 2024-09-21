import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CodeInputScreen({ navigation }) {
  const [code, setCode] = useState('');

  const handleNext = () => {
    // Validate the code here
    if (code.length === 6 && /^\d+$/.test(code)) { // Checks if the code is exactly 6 digits
      navigation.navigate('PasswordReset');
    } else {
      alert('Please enter a valid 6-digit code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
      />

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={!code} // Disable button if code is not provided
        >
          <Text style={styles.buttonText}>Verify Code</Text>
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
});
