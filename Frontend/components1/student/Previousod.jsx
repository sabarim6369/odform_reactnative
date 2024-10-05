import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const ODInformation = ({navigation}) => {

  const [selectedSection, setSelectedSection] = useState('in-progress-advisor');
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);
  const [activeJioTag, setActiveJioTag] = useState(null);

  const results = {
    studentod: [
      { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
      { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
      { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
      { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
    
    ],
    hodod:[
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
    
    ],
    jiotag:[
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
    ],
    accepted:[
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
    ],
    rejected:[
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },
        { id: 1, username: 'John Doe', rollno: '123', classs: '10', section: 'A', presentyear: '2024', reason: 'Sports Event', applieddate: '2024-09-01', startdate: '2024-09-05', enddate: '2024-09-10', total_days: '5' },

    ]
   
  };

  const showSection = (section) => {
    setSelectedSection(section);
  };

  const openCameraModal = (id) => {
    setActiveJioTag(id);
    setCameraModalVisible(true);
  };

  const closeCameraModal = () => {
    setCameraModalVisible(false);
    setActiveJioTag(null);
  };

  return (
    <ScrollView style={styles.container}>
 <TouchableOpacity onPress={() => navigation.goBack()}>
  <Text style={styles.backButton}>Back to Home</Text>
</TouchableOpacity>

      
      <Text style={styles.header}>Previous OD Information</Text>

 
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => showSection('in-progress-advisor')} style={styles.button}>
          <Text style={styles.buttonText}>In-Progress (Advisor)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showSection('in-progress-hod')} style={styles.button}>
          <Text style={styles.buttonText}>In-Progress (HOD)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showSection('in-progress-jiotag')} style={styles.button}>
          <Text style={styles.buttonText}>In-Progress (Jiotag)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showSection('accepted')} style={styles.button}>
          <Text style={styles.buttonText}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showSection('rejected')} style={styles.button}>
          <Text style={styles.buttonText}>Rejected</Text>
        </TouchableOpacity>
      </View>

      {/* Section: In-Progress (Advisor) */}
      {selectedSection === 'in-progress-advisor' && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>In-Progress (Advisor) OD Details</Text>
          {/* Table Implementation */}
          {results.studentod.map((od) => (
            <View key={od.id} style={styles.row}>
              <Text style={styles.rowText}>{od.username}</Text>
              <Text style={styles.rowText}>{od.rollno}</Text>
              <Text style={styles.rowText}>{od.classs}</Text>
              <Text style={styles.rowText}>{od.section}</Text>
              <Text style={styles.rowText}>{od.presentyear}</Text>
              <Text style={styles.rowText}>{od.reason}</Text>
              <Text style={styles.rowText}>{od.applieddate}</Text>
              <Text style={styles.rowText}>{od.startdate}</Text>
              <Text style={styles.rowText}>{od.enddate}</Text>
              <Text style={styles.rowText}>{od.total_days}</Text>
              <TouchableOpacity onPress={() => console.log('View Details', od.id)} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {/* Section: In-Progress (hod) */}
      {selectedSection === 'in-progress-hod' && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>In-Progress (Advisor) OD Details</Text>
          {/* Table Implementation */}
          {results.hodod.map((od) => (
            <View key={od.id} style={styles.row}>
              <Text style={styles.rowText}>{od.username}</Text>
              <Text style={styles.rowText}>{od.rollno}</Text>
              <Text style={styles.rowText}>{od.classs}</Text>
              <Text style={styles.rowText}>{od.section}</Text>
              <Text style={styles.rowText}>{od.presentyear}</Text>
              <Text style={styles.rowText}>{od.reason}</Text>
              <Text style={styles.rowText}>{od.applieddate}</Text>
              <Text style={styles.rowText}>{od.startdate}</Text>
              <Text style={styles.rowText}>{od.enddate}</Text>
              <Text style={styles.rowText}>{od.total_days}</Text>
              <TouchableOpacity onPress={() => console.log('View Details', od.id)} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {/* Section: In-Progress (jiotag) */}
      {selectedSection === 'in-progress-jiotag' && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>In-Progress (Advisor) OD Details</Text>
         
          {results.jiotag.map((od) => (
            <View key={od.id} style={styles.row}>
              <Text style={styles.rowText}>{od.username}</Text>
              <Text style={styles.rowText}>{od.rollno}</Text>
              <Text style={styles.rowText}>{od.classs}</Text>
              <Text style={styles.rowText}>{od.section}</Text>
              <Text style={styles.rowText}>{od.presentyear}</Text>
              <Text style={styles.rowText}>{od.reason}</Text>
              <Text style={styles.rowText}>{od.applieddate}</Text>
              <Text style={styles.rowText}>{od.startdate}</Text>
              <Text style={styles.rowText}>{od.enddate}</Text>
              <Text style={styles.rowText}>{od.total_days}</Text>
              <TouchableOpacity onPress={() => console.log('View Details', od.id)} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {/*section::accepted */}
      {selectedSection === 'accepted' && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>In-Progress (Advisor) OD Details</Text>
       
          {results.accepted.map((od) => (
            <View key={od.id} style={styles.row}>
              <Text style={styles.rowText}>{od.username}</Text>
              <Text style={styles.rowText}>{od.rollno}</Text>
              <Text style={styles.rowText}>{od.classs}</Text>
              <Text style={styles.rowText}>{od.section}</Text>
              <Text style={styles.rowText}>{od.presentyear}</Text>
              <Text style={styles.rowText}>{od.reason}</Text>
              <Text style={styles.rowText}>{od.applieddate}</Text>
              <Text style={styles.rowText}>{od.startdate}</Text>
              <Text style={styles.rowText}>{od.enddate}</Text>
              <Text style={styles.rowText}>{od.total_days}</Text>
              <TouchableOpacity onPress={() => console.log('View Details', od.id)} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      {/* Section: rejected */}
      {selectedSection === 'rejected' && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>In-Progress (Advisor) OD Details</Text>

           {results.rejected.map((od) => (
            <View key={od.id} style={styles.row}>
              <Text style={styles.rowText}>{od.username}</Text>
              <Text style={styles.rowText}>{od.rollno}</Text>
              <Text style={styles.rowText}>{od.classs}</Text>
              <Text style={styles.rowText}>{od.section}</Text>
              <Text style={styles.rowText}>{od.presentyear}</Text>
              <Text style={styles.rowText}>{od.reason}</Text>
              <Text style={styles.rowText}>{od.applieddate}</Text>
              <Text style={styles.rowText}>{od.startdate}</Text>
              <Text style={styles.rowText}>{od.enddate}</Text>
              <Text style={styles.rowText}>{od.total_days}</Text>
              <TouchableOpacity onPress={() => console.log('View Details', od.id)} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Camera Modal for Jiotag */}
      <Modal visible={isCameraModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Capture Photo for Jiotag ID: {activeJioTag}</Text>
          {/* Camera and Form Elements */}
          <Button title="Close" onPress={closeCameraModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'), // Responsive padding
  },
  backButton: {
    marginTop: hp('3%'), // Responsive marginTop
    backgroundColor: '#4caf50',
    paddingVertical: hp('1.5%'), // Responsive paddingVertical
    paddingHorizontal: wp('5%'), // Responsive paddingHorizontal
    borderRadius: 30,
    position: 'relative',
    alignSelf: 'center',
    marginBottom: hp('2%'), // Responsive marginBottom
    left: wp('25%'), // Adjusted to use percentage
  },
  backButtonText: {
    fontSize: wp('4.5%'), // Responsive font size
    color: '#fff', 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    fontSize: wp('6%'), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp('2%'), // Responsive marginBottom
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: hp('2%'), // Responsive marginBottom
  },
  button: {
    backgroundColor: 'lightgray',
    padding: wp('3%'), // Responsive padding
    borderRadius: wp('2%'), // Responsive borderRadius
    flex: 1,
    margin: wp('1.5%'), // Responsive margin
    minWidth: '40%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: wp('4%'), // Responsive font size
  },
  section: {
    marginTop: hp('2%'), // Responsive marginTop
  },
  sectionHeader: {
    fontSize: wp('5%'), // Responsive font size
    fontWeight: 'bold',
    marginBottom: hp('1.5%'), // Responsive marginBottom
  },
  row: {
    flexDirection: 'column',
    marginBottom: hp('1.5%'), // Responsive marginBottom
    padding: wp('4%'), // Responsive padding
    backgroundColor: '#f9f9f9',
    borderRadius: wp('2%'), // Responsive borderRadius
  },
  rowText: {
    marginBottom: hp('1%'), // Responsive marginBottom
    fontSize: wp('4%'), // Responsive font size
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: wp('2.5%'), // Responsive padding
    borderRadius: wp('1.5%'), // Responsive borderRadius
    alignSelf: 'flex-start',
    marginTop: hp('1.5%'), // Responsive marginTop
  },
  viewButtonText: {
    color: '#fff',
    fontSize: wp('4%'), // Responsive font size
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'), // Responsive padding
  },
  modalHeader: {
    fontSize: wp('5.5%'), // Responsive font size
    marginBottom: hp('2.5%'), // Responsive marginBottom
  },
});
export default ODInformation;
