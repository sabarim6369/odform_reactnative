import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Modal from 'react-native-modal'; 
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {API_BASE_URL} from "@env";
import api from '../../api'
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const handleLogin = async () => {
    console.log("😒😒😒😒😒😒😪🐦‍🔥😐👏❤️‍🔥😤😎😪🎂🎉🤣😎",{API_BASE_URL})
    if (email && password) {
        try {
            const response = await axios.post(`${api}/login`, { email, password });

            if (response.status === 200) {
                const message = response.data.message || 'Login successful';
                Alert.alert('Success', message);
                

                navigation.navigate('Studenthome', { user: response.data.user,oddays:response.data.oddays,odtaken:response.data.odtaken,unread:response.data.unread});
            } else {
                const message = response.data.message || 'Login failed. Please check your credentials.';
                Alert.alert('Error', message);
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);

            if (error.response) {
                setModalMessage(error.response.data.message || 'An error occurred. Please try again later.');
            } else {
                setModalMessage('Network error. Please check your connection.');
            }
            setIsModalVisible(true);
        }
    } else {
        Alert.alert('Error', 'Please enter both email and password');
    }
};

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeButtonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('studentSignup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
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
    paddingHorizontal: wp('5%'), // 5% of screen width
    backgroundColor: '#f4f4f9',
  },
  homeButtonContainer: {
    position: 'absolute',
    top: hp('8%'), // 8% of screen height
    right: wp('5%'), // 5% of screen width
  },
  homeButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('1.5%'), // 1.5% of screen height
    paddingHorizontal: wp('4%'), // 4% of screen width
    borderRadius: wp('2%'),
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('4.5%'), // Font size based on screen width
  },
  title: {
    fontSize: wp('8%'), // Title text based on screen width
    fontWeight: 'bold',
    marginBottom: hp('4%'), // 4% of screen height
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: hp('7%'), // 7% of screen height
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: hp('2%'), // 2% of screen height
    paddingHorizontal: wp('4%'), // 4% of screen width
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'), // 4% of screen width
    backgroundColor: '#fff',
    marginBottom: hp('3%'), // 3% of screen height
  },
  passwordInput: {
    flex: 1,
    height: hp('7%'), // Password input height responsive
  },
  submitButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('2%'), // Button height
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp('5%'), // Font size based on screen width
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: hp('3%'), // Margin responsive
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#777',
    marginRight: wp('1.5%'), // Margin between elements
    fontSize: wp('4%'),
  },
  signupLink: {
    color: '#007bffc4',
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: wp('5%'), // Padding for modal
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: wp('4.5%'), // Modal message text size
    color: '#333',
    marginBottom: hp('2.5%'), // Bottom margin
  },
  closeButton: {
    backgroundColor: '#007bffc4',
    paddingVertical: hp('1.5%'), // Close button height
    paddingHorizontal: wp('6%'), // Close button width
    borderRadius: wp('2%'),
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
});

export default Login;
