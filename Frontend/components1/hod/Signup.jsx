import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState('');

  const handleSignup = () => {
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        navigation.navigate('Login');
      } else {
        setModalMessage("Passwords don't match"); 
        setIsModalVisible(true);
      }
    } else {
      setModalMessage('Please fill in all fields');
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('studentLogin')}>
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
  loginButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
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

export default Signup;
