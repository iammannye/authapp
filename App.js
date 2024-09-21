import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, } from 'react-native'; // Use TouchableOpacity instead of Button
import AdminScreen from './admin/AdminScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen'; // Assuming you have a UserScreen component
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import CodeInputScreen from './screens/CodeInputScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ title: 'Admin' }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ title: 'User' }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={{ title: 'Forgot Password' }}
        />
        <Stack.Screen
          name="CodeInput"
          component={CodeInputScreen}
          options={{ title: 'Enter Code' }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordResetScreen}
          options={{ title: 'Reset Password' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#f5f5f5', // Light background for the container
  },
  loginButton: {
    backgroundColor: '#3f51b5', // Adjust to your desired primary color
    padding: 15,
    borderRadius: 20, // Create a circular button
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    marginBottom: 10
  },
  signupButton: {
    backgroundColor: '#3f51b5', // Adjust to your desired secondary color
    padding: 15,
    borderRadius: 20, // Create a more rounded rectangular button
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white', // Consistent white text for both buttons
    fontSize: 16,
    fontWeight: 'bold',
  },
});
