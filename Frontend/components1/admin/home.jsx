import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function AdminHome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Admin Panel</Text>
        <TouchableOpacity style={styles.logoutButtonContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navMenu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuButton} 
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialIcons name={item.icon} size={24} color="white" style={styles.iconStyle} />
            <Text style={styles.menuButtonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const menuItems = [
  { title: 'Add Student', screen: 'studentSignup', icon: 'person-add-alt' },
  { title: 'Remove Student', screen: 'RemoveStudent', icon: 'person-remove-alt' },
  { title: 'Add Teacher', screen: 'teacherSignup', icon: 'person-add' },
  { title: 'Remove Teacher', screen: 'RemoveTeacher', icon: 'person-remove' },
  { title: 'Add HOD', screen: 'hodSignup', icon: 'group-add' },
  { title: 'Remove HOD', screen: 'RemoveHOD', icon: 'group-remove' },
  { title: 'Add COE', screen: 'coesignup', icon: 'business-center' },
  { title: 'Remove COE', screen: 'RemoveCOE', icon: 'business-off' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#007BFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: 'absolute',
    top: 0,
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButtonContainer: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
  },
  logoutButton: {
    fontSize: 16,
    color: 'white',
  },
  navMenu: {
    width: '90%',
    marginTop: 80,
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  iconStyle: {
    marginRight: 20,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AdminHome;
