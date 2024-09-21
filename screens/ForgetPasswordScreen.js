import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleNext = async () => {
    if (!email) {
      setAlertMessage('Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset',
        'Password reset email sent successfully.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <ImageBackground 
      source={{uri: 'https://picsum.photos/id/307/3000/3333/?blur'}}
      style={styles.container}
    >
      <View style={styles.containers}>
        <Image 
          source={require('../images/MENB1.png')}
          style={{width: 120, height: 120}}       
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
            disabled={!email} // Disable button if email is not provided
          >
            <Text style={styles.buttonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
        
        {alertMessage ? <Text style={styles.alert}>{alertMessage}</Text> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containers: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 8,
    marginTop: 5,
  },
  button: {
    backgroundColor: 'rgba(223, 181, 147, 0.8)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alert: {
    color: 'red',
    marginTop: 10,
  },
});
