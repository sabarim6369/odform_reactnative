import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Modal from 'react-native-modal'; 

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const handleLogin = () => {
    if (email && password) {
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('Studenthome');
    } else {
      setModalMessage('Please enter both email and password'); 
      setIsModalVisible(true);
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
        <TouchableOpacity onPress={() => navigation.navigate('hodSignup')}>
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
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f9',
  },
  homeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  homeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#777',
    marginRight: 5,
  },
  signupLink: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
