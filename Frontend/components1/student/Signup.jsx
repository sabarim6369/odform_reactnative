import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import {API_BASE_URL} from "@env";
import api from '../../api'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [classHandling, setClassHandling] = useState('');
  const [section, setSection] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); 
  const validateForm = () => {
    if (!username || !classHandling || !section || !rollNo || !year || !email || !password || !confirmPassword) {
      setModalMessage('Please fill in all fields');
      setIsModalVisible(true);
      return false;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setIsModalVisible(true);
      return false;
    }

    if (password.length < 8) {
      setModalMessage('Password must be at least 8 characters long.');
      setIsModalVisible(true);
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${api}/signup`, {
          email, password, username, classHandling, section, rollNo, year
        });
        
        if (response.status === 200) {
          Alert.alert(
            'Success',
            'Signup successful!',
            [
              { text: 'OK', onPress: () => navigation.goBack() },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert('Error', response.data.message);

        
        
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        setAlertMessage(errorMessage);
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      }
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Student Account</Text>

      {alertMessage ? (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#a9a9a9"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={classHandling}
          onValueChange={(itemValue) => setClassHandling(itemValue)}
        >
          <Picker.Item label="Select Class" value="" />
          <Picker.Item label="CSE" value="CSE" />
          <Picker.Item label="AIDS" value="AIDS" />
          <Picker.Item label="ECE" value="ECE" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={section}
          onValueChange={(itemValue) => setSection(itemValue)}
        >
          <Picker.Item label="Select Section" value="" />
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="C" value="C" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Roll Number"
        value={rollNo}
        onChangeText={setRollNo}
        placeholderTextColor="#a9a9a9"
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          <Picker.Item label="Select Year" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#a9a9a9"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor="#a9a9a9"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        placeholderTextColor="#a9a9a9"
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('5%'), // 5% of screen width for padding
    backgroundColor: '#f0f4f8',
    paddingVertical: hp('5%'), // 5% of screen height for vertical padding
  },
  title: {
    fontSize: wp('7%'), // Font size based on screen width
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('2%'), // Margin based on screen height
    textAlign: 'center',
  },
  input: {
    height: hp('6%'), // Height based on screen height
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: hp('2%'), // Margin based on screen height
    paddingHorizontal: wp('4%'), // Padding based on screen width
    borderRadius: wp('3%'), // Border radius based on screen width
    backgroundColor: '#fff',
    color: '#333',
  },
  pickerContainer: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: wp('3%'), // Border radius based on screen width
    marginBottom: hp('2%'), // Margin based on screen height
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: hp('6%'), // Height based on screen height
  },
  signupButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('1.5%'), // Padding based on screen height
    borderRadius: wp('3%'), // Border radius based on screen width
    alignItems: 'center',
    marginTop: hp('1.5%'), // Margin based on screen height
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: wp('2%'), // Shadow radius based on screen width
    shadowOffset: { width: 0, height: hp('0.3%') }, // Shadow offset based on screen height
  },
  signupButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'), // Font size based on screen width
    fontWeight: '600',
  },
  alertContainer: {
    backgroundColor: '#e74c3c',
    padding: hp('1.5%'), // Padding based on screen height
    marginBottom: hp('2%'), // Margin based on screen height
    borderRadius: wp('3%'), // Border radius based on screen width
  },
  alertText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp('4%'), // Font size based on screen width
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: wp('5%'), // Padding based on screen width
    borderRadius: wp('3%'), // Border radius based on screen width
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: wp('4.5%'), // Font size based on screen width
    color: '#333',
    marginBottom: hp('2%'), // Margin based on screen height
  },
  closeButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('1.5%'), // Padding based on screen height
    paddingHorizontal: wp('5%'), // Padding based on screen width
    borderRadius: wp('3%'), // Border radius based on screen width
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Signup;
