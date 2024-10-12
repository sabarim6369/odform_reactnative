import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Modal, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function Home({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [passkeyModalVisible, setPasskeyModalVisible] = useState(false);
  const [passkey, setPasskey] = useState('');
  const logoScale = useState(new Animated.Value(1))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleNavigation = (value) => {
    if (value === 'adminLogin') {
      setPasskeyModalVisible(true); // Show passkey modal for admin login
    } else if (value) {
      setSelectedOption(value);
      navigation.navigate(value);
    }
  };

  const handlePasskeySubmit = () => {
    const correctPasskey = "odform@1"; // Replace with your actual passkey
    if (passkey === correctPasskey) {
      setPasskeyModalVisible(false);
      setSelectedOption('adminPanel'); // Replace with your actual admin panel route
      navigation.navigate('adminhome'); // Navigate to the admin panel
      setPasskey(''); 
    } else {
      alert('Incorrect passkey!'); // Alert for incorrect passkey
      setPasskey(''); // Clear the input field
      
    }
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [logoScale, fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../assets/logo/eshwar logo.jpg')}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />
      </View>

      {/* Title Section */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>On-Duty Hub</Text>
        <Text style={styles.subtitle}>Choose an option to proceed</Text>
      </Animated.View>

      {/* Picker for Navigation */}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(value) => handleNavigation(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select an Option" value="" />
          <Picker.Item label="Teacher Login" value="teacherLogin" />
          <Picker.Item label="Student Login" value="studentLogin" />
          <Picker.Item label="HOD Login" value="hodLogin" />
          <Picker.Item label="COE Login" value="coeLogin" />
          <Picker.Item label="Admin Login" value="adminLogin" />
        </Picker>
      </View>

      {/* Passkey Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={passkeyModalVisible}
        onRequestClose={() => {setPasskeyModalVisible(false);
          setPasskey(''); 
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Passkey</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter passkey"
              value={passkey}
              onChangeText={setPasskey}
              secureTextEntry
              autoFocus
            />
            <TouchableOpacity style={styles.button} onPress={handlePasskeySubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {setPasskeyModalVisible(false);setPasskey('');}}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Need Help? Contact Us</Text>
        <TouchableOpacity onPress={() => { /* Add contact functionality */ }}>
          <Text style={styles.footerLink}>support@collegeapp.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  pickerWrapper: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#2c3e50',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  footerLink: {
    fontSize: 16,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f7f8fa',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default Home;
