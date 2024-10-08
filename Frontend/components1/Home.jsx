import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function Home({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('');
    const logoScale = useState(new Animated.Value(1))[0]; 
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleNavigation = (value) => {
    if (value) {
      setSelectedOption(value);
      navigation.navigate(value);
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
          source={require('../assets/logo/eshwar logo.jpg')} // Ensure to replace this with the correct image path
          style={[styles.logo, { transform: [{ scale: logoScale }] }]} // Apply scale transformation
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
        </Picker>
      </View>

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
});

export default Home;
