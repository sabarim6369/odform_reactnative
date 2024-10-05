import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo or Graphic at the Top */}
      <Image 
        source={require('../assets/logo/eshwar logo.jpg')} // Add your logo/image path here
        style={styles.logo}
      />
      
      {/* Title Section */}
      <Text style={styles.title}>Let's Get Started</Text>

      {/* Login Buttons */}
      <TouchableOpacity 
        style={[styles.button, styles.teacherButton]} 
        onPress={() => navigation.navigate('teacherLogin')}
      >
        <Text style={styles.buttonText}>Teacher Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.studentButton]} 
        onPress={() => navigation.navigate('studentLogin')}
      >
        <Text style={styles.buttonText}>Student Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.hodButton]} 
        onPress={() => navigation.navigate('hodLogin')}
      >
        <Text style={styles.buttonText}>HOD Login</Text>
      </TouchableOpacity>

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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30, // Add some space below the logo
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#2c3e50',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  button: {
    width: '85%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  teacherButton: {
    backgroundColor: '#1abc9c',
    borderColor: '#16a085',
    borderWidth: 1,
  },
  studentButton: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
    borderWidth: 1,
  },
  hodButton: {
    backgroundColor: '#e74c3c',
    borderColor: '#c0392b',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 40, // Space above the footer
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
