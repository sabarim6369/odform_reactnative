import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { API_BASE_URL } from "@env";
import api from '../../api';

const Dashboard = ({ navigation, route }) => {
  const { user, oddays, odtaken } = route.params;
  const name = user?.username || "Guest";
  const email = user?.email || "guest@example.com";
  const year = user?.year || 5;
  const classs = user?.classs || "SE";
  const section = user?.section || "C";
  const internallimit = oddays?.internallimit;
  const externallimit = oddays?.externallimit;
  const internal = odtaken?.total_internal_od_taken;
  const external = odtaken?.total_external_od_taken;
  const od = user?.od || "Internal";
  const rollno = user?.rollno || "Unknown";
  const [userdetails, setuserdetails] = useState(null);
  const [internalBalance, setInternalBalance] = useState(0);
  const [externalBalance, setExternalBalance] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const internalTaken = parseInt(internal, 10);
    const externalTaken = parseInt(external, 10);
    const internalLimit = parseInt(internallimit, 10) || 0;
    const externalLimit = parseInt(externallimit, 10) || 0;

    setInternalBalance(internalLimit - internalTaken);
    setExternalBalance(externalLimit - externalTaken);
  }, [internal, external, internallimit, externallimit]);

  const previousod = async (category) => {
    if(category==="internalOD"){
      const response = await axios.post(`${api}/fetchResultsByCategoryods`, { category, email });
      console.log(response.data.results);
      navigation.navigate("Previousodinternal", { results: response.data.results, email });
    }
    else{
      const response = await axios.post(`${api}/fetchResultsByCategoryods`, { category, email });
      console.log(response.data.results);
      navigation.navigate("Previousodexternal", { results: response.data.results, email });
    }
    
  };

  const handlePreviousOdSelection = () => {
    Alert.alert(
      "Select OD Type",
      "Choose the type of On-Duty to view:",
      [
        {
          text: "Internal OD",
          onPress: () => previousod("internalOD"), // Update this with the appropriate category
        },
        {
          text: "External OD",
          onPress: () => previousod("externalOD"), // Update this with the appropriate category
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleGetonduty = async () => {
    const response = await axios.post(`${api}/odinput`, { email });
    console.log(response.data);

    const { details } = response.data;
    setuserdetails(details);
    navigation.navigate("odform", {
      userdetails: response.data.details,
      internallimit: internallimit,
      externallimit: externallimit,
      internaltaken: response.data.odtaken.total_internal_od_taken,
      externaltaken: response.data.odtaken.total_external_od_taken,
      useremail: email,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ON-Duty Hub</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="more-vert" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal for Options */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => { navigation.navigate('ChangePassword'); setModalVisible(false); }}
            >
              <Text style={styles.modalButtonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => { navigation.navigate('studentLogin'); setModalVisible(false); }}
            >
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.welcomeText}>Hello, {name}!</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={20} color="#007bffc4" />
            <Text style={styles.detailsText}>{email}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="id-card" size={20} color="#007bffc4" />
            <Text style={styles.detailsText}>Year: {year}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="id-card" size={20} color="#007bffc4" />
            <Text style={styles.detailsText}>Roll No: {rollno}</Text>
          </View>
        </View>
      </View>

      {/* OD Balance Info */}
      <View style={styles.odInfoBoxes}>
        <View style={styles.odBox}>
          <Text style={styles.odTitle}>Internal OD</Text>
          <Text style={styles.odText}>Limit: {internallimit}</Text>
          <Text style={styles.odText}>Taken: {internal}</Text>
          <Text style={styles.odBalanceText}>Balance: {internalBalance}</Text>
        </View>
        <View style={styles.odBox}>
          <Text style={styles.odTitle}>External OD</Text>
          <Text style={styles.odText}>Limit: {externallimit}</Text>
          <Text style={styles.odText}>Taken: {external}</Text>
          <Text style={styles.odBalanceText}>Balance: {externalBalance}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetonduty}>
          <Text style={styles.buttonText}>Get On-Duty Letter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePreviousOdSelection}>
          <Text style={styles.buttonText}>View Previous ODs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
  headerTitle: {
    fontSize: wp('6%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp('5%'), 
    borderRadius: wp('2.5%'),
    alignItems: 'center',
    width: '80%',
  },
  modalButton: {
    paddingVertical: hp('2%'), // Responsive paddingVertical
    marginVertical: hp('1%'), // Responsive marginVertical
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: wp('2%'), // Responsive border radius
  },
  modalButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'), // Responsive font size
    fontWeight: 'bold',
  },
  userInfoContainer: {
    padding: wp('5%'), // Responsive padding
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: wp('7%'), // Responsive font size
    fontWeight: 'bold',
    color: '#007bffc4',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: wp('2.5%'), // Responsive border radius
    padding: wp('4%'), // Responsive padding
    marginTop: hp('1%'), // Responsive marginTop
    width: '90%',
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'), // Responsive marginVertical
  },
  detailsText: {
    fontSize: wp('4%'), // Responsive font size
    color: '#555',
    marginLeft: wp('2.5%'), // Responsive marginLeft
  },
  odInfoBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: wp('2.5%'), // Responsive padding
    marginVertical: hp('2.5%'), // Responsive marginVertical
  },
  odBox: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'), // Responsive border radius
    padding: wp('5%'), // Responsive padding
    flex: 1,
    marginHorizontal: wp('2.5%'), // Responsive marginHorizontal
    elevation: 5,
    alignItems: 'center',
  },
  odTitle: {
    fontSize: wp('5%'), // Responsive font size
    color: '#0b76e8c9',
    marginBottom: hp('1%'), // Responsive marginBottom
  },
  odText: {
    fontSize: wp('4%'), // Responsive font size
    color: '#555',
  },
  odBalanceText: {
    fontSize: wp('4%'), // Responsive font size
    fontWeight: 'bold',
    color: '#007bffc4',
    marginTop: hp('1.5%'), // Responsive marginTop
  },
  buttonContainer: {
    padding: wp('5%'), // Responsive padding
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: hp('2%'), // Responsive paddingVertical
    borderRadius: wp('2%'), // Responsive border radius
    alignItems: 'center',
    marginBottom: hp('1.5%'), // Responsive marginBottom
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'), // Responsive font size
    fontWeight: 'bold',
  },
});
export default Dashboard;
