import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import {API_BASE_URL} from "@env";
const Teacherhome = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { name, email, classs, section, year } = route.params;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    console.log('Logout');
    setModalVisible(false);
  };

  const handleChangePassword = () => {
    console.log('Change Password');
    setModalVisible(false);
  };
const handlebuttons=async(item)=>{
  if (item === 'Check Registered OD') {
    console.log(".....😐😐😐😐😐");
    try {
        const response = await axios.post(`${API_BASE_URL}/registeredodadvisor`, { classs, section, year });
        const result = response.data.user;  // Removed redundant await
        console.log(result);
        navigation.navigate('registeredodadvisor', { result, classs, section, year, name, email });
    } catch (error) {
        console.error("Error fetching registered OD:", error);  // Added error handling
    }
} else if (item === 'Check Accepted OD History') {
    try {
        const response = await axios.post(`${API_BASE_URL}/acceptedodadvisor`, { classs, section, year });
        const result = response.data.user;
        console.log(result);
        navigation.navigate('acceptedodadvisor', {results:result});
    } catch (error) {
        console.error("Error fetching accepted OD history:", error);
    }
} else if (item === 'Check Rejected OD History') {
    try {
        const response = await axios.post(`${API_BASE_URL}/rejectedodadvisor`, { classs, section, year });
        const result = response.data.user;
        console.log("🙏🙏🙏🙏🙏🙏🙏🎉🎉😍😍❤️‍🔥😍🤣🐦‍🔥🎂😪😒");
        console.log(result);
        navigation.navigate('rejectedodadvisor', { results:result});
    } catch (error) {
        console.error("Error fetching rejected OD history:", error);
    }
} else {
    console.log(item);
}

}
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {name}</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="more-vert" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.info}>
        {email} - Class: {year}-{classs}-{section}
      </Text>

      <View style={styles.buttonContainer}>
        {['Check Registered OD', 'Check Accepted OD History', 'Check Rejected OD History', 'Student List'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlebuttons(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for Change Password and Logout */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={handleChangePassword}>
              <Text style={styles.modalButtonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#4a90e2', // Changed color for better aesthetics
    borderRadius: 10,
    padding: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  info: {
    fontSize: wp('4.5%'),
    marginVertical: hp('3%'),
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  button: {
    backgroundColor: '#007bff', // Updated button color
    padding: hp('2.5%'),
    borderRadius: 15,
    width: wp('85%'),
    marginVertical: hp('1.5%'),
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalView: {
    width: wp('80%'),
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: wp('5%'),
    alignItems: 'center',
    elevation: 5,
  },
  modalButton: {
    padding: hp('2%'),
    borderRadius: 10,
    backgroundColor: '#6200ea', 
    marginBottom: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
  },
  closeButton: {
    padding: hp('2%'),
    borderRadius: 10,
    backgroundColor: '#f44336', // Red close button
    marginTop: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
  },
});

export default Teacherhome;
