  import React, { useEffect, useState } from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
  import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import {API_BASE_URL} from "@env";
  const Dashboard = ({ navigation,route }) => {
    const{user,oddays,odtaken}=route.params;
    console.log("😎😎😎😎😎",user.year);
    console.log("🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥",odtaken)
    console.log("helllllllllllllllllllllllllllllllo",user)
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
const[userdetails,setuserdetails]=useState(null);
const [odDetails, setOdDetails] = useState({ internal: 0, external: 0 });
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
  const handleGetonduty=async()=>{
    const response=await axios.post(`${API_BASE_URL}/odinput`,{email});
    console.log(response.data) 

    const { details, odtaken } = response.data;
 
    setuserdetails(details);
   console.log("🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥",response.data.details)
    navigation.navigate("odform",{userdetails:response.data.details,
      internallimit:internallimit,
      externallimit:externallimit,
      internaltaken:response.data.odtaken.total_internal_od_taken,
      externaltaken:response.data.odtaken.total_external_od_taken,
    useremail:email});

    console.log("helloooo😍😍")
  }
    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
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
              <FontAwesome name="envelope" size={20} color="#00796b" />
              <Text style={styles.detailsText}>{email}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="id-card" size={20} color="#00796b" />
              <Text style={styles.detailsText}>Year: {year}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="id-card" size={20} color="#00796b" />
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Previousod', { id: email })}>
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
      backgroundColor: '#4caf50',
      padding: wp('5%'), // Responsive padding
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: hp('5%'), // Responsive paddingTop
    },
    headerTitle: {
      fontSize: wp('6%'), // Responsive font size
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
      padding: wp('5%'), // Responsive padding
      borderRadius: wp('2.5%'), // Responsive border radius
      alignItems: 'center',
      width: '80%',
    },
    modalButton: {
      paddingVertical: hp('2%'), // Responsive paddingVertical
      marginVertical: hp('1%'), // Responsive marginVertical
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#00796b',
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
      color: '#00796b',
    },
    infoCard: {
      backgroundColor: '#fff',
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
      color: '#00796b',
      marginBottom: hp('1%'), // Responsive marginBottom
    },
    odText: {
      fontSize: wp('4%'), // Responsive font size
      color: '#555',
    },
    odBalanceText: {
      fontSize: wp('4%'), // Responsive font size
      fontWeight: 'bold',
      color: '#00796b',
      marginTop: hp('1.5%'), // Responsive marginTop
    },
    buttonContainer: {
      padding: wp('5%'), // Responsive padding
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#4caf50',
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
