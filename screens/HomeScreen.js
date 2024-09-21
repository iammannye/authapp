import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'; // Use TouchableOpacity instead of Button

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{uri: 'https://picsum.photos/id/307/2000/3333'}}
      style={styles.container}
    >
      
      <View style={styles.container}>
        
        <Image 
          source={require('../images/MENB1.png')}
          style={{width: 350, height: 350, }}       
        />
      
        <View style={styles.bottomcontainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
          </View>
          <StatusBar style="auto" />
        </View>

      </View>

    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uppercontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer: {
    position: 'absolute', // Ensures the container is positioned at the bottom
    bottom: 0, // Places the bottom of the container at the bottom of the screen
    width: '90%', // Sets the width to 90% of the screen
    alignItems: 'flex-start', // Centers the buttons horizontally
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Ensuring the title is visible on the background
  },
  buttonContainer: {
    flexDirection: 'column', // Arranges buttons in a column
    width: '100%', // Maintains the full width of the bottomContainer
    marginBottom: 20,
    //backgroundColor: 'rgba(245, 245, 245, 0.8)', // Light background for the container with some transparency
    borderRadius: 5, // Optional: Adding border radius to the container
    padding: 10, // Optional: Adding some padding
  },
  signupButton: {
    width: '100%', // Adjusts width to fit the buttonContainer
    backgroundColor: 'rgba(223, 181, 147, 0.8)', // Adjust to your desired secondary color
    padding: 15,
    borderRadius: 5, // Create a more rounded rectangular button
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  loginButton: {
    width: '100%', // Adjusts width to fit the buttonContainer
    backgroundColor: 'rgba(223, 181, 147, 0.8)', // Adjust to your desired primary color
    padding: 15,
    borderRadius: 5, // Create a circular button
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center',
  },
  adminButton: {
    backgroundColor: '#3f51b5', // Adjust to your desired primary color
    padding: 15,
    borderRadius: 15, // Create a circular button
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', // Consistent white text for both buttons
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
