import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, Image, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/FontAwesome';

const adminEmail = 'olannyennamdi123@gmail.com';
const adminPassword = '1234567890';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    setAlertMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlertMessage('Login successful!');
      
      if (email === adminEmail && password === adminPassword) {
        navigation.navigate('Admin'); // Navigate to the admin page
      } else {
        navigation.navigate('User'); // Navigate to the user page
      }
      
      // Clear the input fields
      setEmail('');
      setPassword('');
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
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
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.textInput}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            style={[styles.textInput, styles.passwordInput]}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.showPasswordButton}>
            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="grey" />
          </TouchableOpacity>
        </View>

        <View style={styles.middleContainer}>
          <TouchableOpacity onPress={handleForgetPassword} style={styles.middleButton}>
            <Text style={styles.middleButtonText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
        {/*{alertMessage ? <Text style={styles.alert}>{alertMessage}</Text> : null}*/}

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Do not have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>

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
    fontSize: 24,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
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
  loadingIndicator: {
    marginTop: 20,
  },
  alert: {
    color: 'red',
    marginTop: 10,
  },
  middleContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 20,
    width: '90%',
  },
  middleButton: {
    backgroundColor: 'transparent',
  },
  middleButtonText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
  },
  bottomButton: {
    backgroundColor: 'transparent',
  },
  bottomButtonText: {
    color: 'white',
    textDecorationLine: 'underline',
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
