import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebaseConfig'; // Assuming you have configured Firebase Firestore and Authentication
import { signOut } from 'firebase/auth'

export default function UserPage() {
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch notifications from Firestore
    const unsubscribe = onSnapshot(query(collection(db, 'notifications')), (snapshot) => {
      const fetchedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(fetchedNotifications);
    });

    return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
  }, []);

  const handleLogout = () => {
    // Handle user logout
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await signOut(auth); // Sign out the user
            navigation.navigate('Home'); // Navigate to the home screen or login screen
          } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <ImageBackground 
      source={{uri: 'https://picsum.photos/id/0/5000/3333/?blur'}}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Image 
          source={require('../images/MENB1.png')}
          style={{width: 120, height: 120}}       
        />
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettings(!showSettings)}>
            <FontAwesome name="gear" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {showSettings && (
          <View style={styles.settingsPanel}>
            <TouchableOpacity style={styles.settingsItem} onPress={handleLogout}>
              <Text style={styles.settingsText}>Logout</Text>
            </TouchableOpacity>
            {/* Add more settings options here */}
          </View>
        )}

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 10,
  },
  settingsPanel: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  settingsItem: {
    padding: 10,
  },
  settingsText: {
    fontSize: 16,
  },
  notificationsList: {
    paddingBottom: 20,
  },
  notificationItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
  },
});
