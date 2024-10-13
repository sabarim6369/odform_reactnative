import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button ,Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import api from '../../api';
function AdminHome({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');

  const handleRemove = (type) => {
    setUserType(type);
    setModalVisible(true);
  };
  const handleSubmit = async () => {
    console.log(`Removing ${userType} with email: ${email}`);
    try {
        const response = await axios.post(`${api}/admin`, { email, userType });

        if (response.status === 200) {
            Alert.alert("Success", `Successfully removed email from ${userType} database`);
        } else if (response.status === 404) {
            Alert.alert("Sorry", `Email does not exist in ${userType} database`);
        } else {
            Alert.alert("Failure", "Some error occurred. Please try again.");
        }
    } catch (error) {
        if (error.response) {
            // Handle the case when the email is not found in the database
            if (error.response.status === 404) {
                Alert.alert("Sorry", `Email does not exist in ${userType} database`);
            } else if (error.response.status === 400) {
                Alert.alert("Error", `Invalid request. Please check the input.`);
            } else {
                Alert.alert("Failure", "Some error occurred. Please try again.");
            }
        } else {
            Alert.alert("Error", "An error occurred while trying to remove the user.");
        }
        console.error("Error while removing user:", error);
    } finally {
        setEmail(''); 
        setModalVisible(false); 
    }
};


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
            onPress={() => {
              if (item.title.startsWith('Remove')) {
                handleRemove(item.title.split(' ')[1]); 
              } else {
                navigation.navigate(item.screen);
              }
            }}
          >
            <MaterialIcons name={item.icon} size={24} color="white" style={styles.iconStyle} />
            <Text style={styles.menuButtonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for Email Input */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setEmail('');
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Remove {userType}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => {
              setModalVisible(false);
              setEmail(''); // Clear email on cancel
            }} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default AdminHome;
