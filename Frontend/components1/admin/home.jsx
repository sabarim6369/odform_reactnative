import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

function AdminHome({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Panel</Text>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Menu */}
      <View style={styles.navMenu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuButton} 
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialIcons name={item.icon} size={20} color="white" />
            <Text style={styles.menuButtonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Sample data for menu items
const menuItems = [
  { title: 'Add Teacher', screen: 'teacherSignup', icon: 'person-add' },
  { title: 'Remove Teacher', screen: 'RemoveTeacher', icon: 'person-remove' },
  { title: 'Add HOD', screen: 'AddHOD', icon: 'group-add' },
  { title: 'Remove HOD', screen: 'RemoveHOD', icon: 'group-remove' },
  { title: 'Add COE', screen: 'AddCOE', icon: 'business-center' },
  { title: 'Remove COE', screen: 'RemoveCOE', icon: 'business-off' },
  { title: 'Add Student', screen: 'AddStudent', icon: 'person-add-alt' },
  { title: 'Remove Student', screen: 'RemoveStudent', icon: 'person-remove-alt' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15, // Increased padding for better header appearance
    backgroundColor: '#007BFF', // Changed to a blue color
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25, // Increased margin for spacing
    elevation: 4, // Added elevation for shadow effect
  },
  headerText: {
    fontSize: 26, // Increased font size for better visibility
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    fontSize: 16,
    color: 'white',
  },
  navMenu: {
    marginVertical: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 20, // Added padding to bring buttons down
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue', // Keep button color as blue
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
  },
  menuButtonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default AdminHome;
