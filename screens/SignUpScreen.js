import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, ImageBackground, Image, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {
    if (password !== repeatedPassword) {
      setAlertMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setAlertMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);
      
      // Alert successful signup and navigate to login
      Alert.alert('Signup Successful', 'Verification email sent. Please check your email.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
      
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (text) => setUsername(text);

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(text) && password.length >= 6 && password === repeatedPassword);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsValid(email.includes('@') && text.length >= 6 && text === repeatedPassword);
  };

  const handleRepeatedPasswordChange = (text) => {
    setRepeatedPassword(text);
    setIsValid(email.includes('@') && password.length >= 6 && text === password);
  };

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
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
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Username"
          style={styles.textInput}
        />
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password (minimum 6 characters)"
          secureTextEntry
          style={styles.textInput}
        />
        <TextInput
          value={repeatedPassword}
          onChangeText={handleRepeatedPasswordChange}
          placeholder="Repeat Password"
          secureTextEntry
          style={styles.textInput}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transparentButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.transparentButtonText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
        {alertMessage ? <Text style={styles.alert}>{alertMessage}</Text> : null}
       
        <Text style={styles.orText}>OR</Text>

        <View style={styles.socialButtonContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => openURL('https://www.google.com')}>
            <Image source={require('../images/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => openURL('https://www.facebook.com')}>
            <Image source={require('../images/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => openURL('https://www.x.com')}>
            <Image source={require('../images/twitter.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
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
    marginTop: 5,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#f0e7e0',
    marginBottom: 12,
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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentButtonText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  alert: {
    color: 'red',
    marginTop: 10,
  },
  orText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 20,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  socialButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});
