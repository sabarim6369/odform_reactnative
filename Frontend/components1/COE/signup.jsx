import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal'; 
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {API_BASE_URL} from "@env";
import api from '../../api'
const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const handleSignup = async() => {
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(`${api}/coesignup`, { name, email, password});
          Alert.alert("Signup Successful", response.data.message, [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Server error. Please try again.';
          Alert.alert("Signup Failed", errorMessage, [{ text: "OK" }]);
        }
      } else {
        Alert.alert("Password Mismatch", "Passwords don't match", [{ text: "OK" }]);
      }
    } else {
      Alert.alert("Incomplete Fields", 'Please fill in all fields', [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('coeLogin')}>
        <Text style={styles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

    

     

    
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('3%'),
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    position: 'absolute',
    top: hp('7%'),
    right: wp('5%'),
    backgroundColor: '#007bffc4',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  signupButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: hp('3%'),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: hp('2.5%'),
    color: '#333',
    marginBottom: hp('2%'),
  },
  closeButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
  },
  picker: {
    height: hp('6%'),
    width: wp('90%'),
  },
});

export default Signup;
