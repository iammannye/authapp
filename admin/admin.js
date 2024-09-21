import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios';

export default function AdminPage() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch existing notifications from the server
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://192.168.74.255:3000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAddNotification = async () => {
    if (!notificationMessage.trim()) {
      Alert.alert('Error', 'Notification message cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://192.168.74.255:3000/api/notifications', { message: notificationMessage });
      setNotifications([...notifications, response.data]);
      setNotificationMessage('');
      Alert.alert('Success', 'Notification added successfully');
    } catch (error) {
      console.error('Error adding notification:', error);
      Alert.alert('Error', 'Failed to add notification');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`http://192.168.74.255:3000/api/notifications/${id}`);
      setNotifications(notifications.filter(notification => notification.id !== id));
      Alert.alert('Success', 'Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification');
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
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <TextInput
        value={notificationMessage}
        onChangeText={setNotificationMessage}
        placeholder="Enter notification message"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNotification}>
        <Text style={styles.addButtonText}>Add Notification</Text>
      </TouchableOpacity>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notificationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  addButton: {
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
