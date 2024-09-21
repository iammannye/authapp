import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Image, ImageBackground } from 'react-native';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Adjust the path as necessary
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Import signOut and onAuthStateChanged from firebase auth

export default function AdminPage({ navigation }) {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications whenever the component mounts or updates
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notifications'));
        const fetchedNotifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        Alert.alert('Error', 'Failed to fetch notifications');
      }
    };

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        fetchNotifications();
      } else {
        // User is signed out, clear notifications
        setNotifications([]);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe(); // Unsubscribe from authentication state changes
    };
  }, []);

  const handleAddNotification = async () => { 
    if (!notificationMessage.trim()) {
      Alert.alert('Error', 'Notification message cannot be empty');
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, 'notifications'), { message: notificationMessage });
      setNotifications([...notifications, { id: docRef.id, message: notificationMessage }]);
      setNotificationMessage(''); // Clear the input field
      Alert.alert('Success', 'Notification added successfully');
    } catch (error) {
      console.error('Error adding notification:', error);
      Alert.alert('Error', 'Failed to add notification');
    }
  };
  

  const handleDeleteNotification = async (id) => {
    try {
      await deleteDoc(doc(db, 'notifications', id));
      setNotifications(notifications.filter(notification => notification.id !== id));
      Alert.alert('Success', 'Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Assuming auth is your Firebase Auth instance
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
      <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
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

        <View style={styles.inputContainer}>
          <TextInput
            value={notificationMessage}
            onChangeText={setNotificationMessage}
            placeholder="Enter notification message"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddNotification}>
            <Text style={styles.addButtonText}>Add Notification</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    width: '95%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  addButton: {
    width: '95%',
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationsList: {
    paddingBottom: 20,
    width: '95%',
  },
  notificationItem: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    position: 'absolute',
    right: 5
  },
  logoutContainer: {
    width: '100%',
    padding: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});