import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
const Odform = ({ navigation, route }) => {
  const { userdetails, internallimit, externallimit, internaltaken, externaltaken, useremail } = route.params;
  console.log("internallimit🤣🤣🤣🤣🤣🤣🤣🤣",internallimit)
  console.log("internallimit🤣🤣🤣🤣🤣🤣🤣🤣",internaltaken)
  const email = useremail || "abc@123";
  const rollno = userdetails?.rollno || "23cs999";
  const name = userdetails?.username || "error";
  const classhandling = userdetails?.classhandling || "error class";
  const section = userdetails?.section || "E";
  const year = userdetails?.year || 9;
  const internallimits = internallimit || 20;
  const externallimits = externallimit || 10;
  const internalawailed = internaltaken;
  const externalawailed = externaltaken;
console.log("internalawailed",internalawailed)
  const [odType, setOdType] = useState('');
  const [reason, setReason] = useState('');
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [relatedTo, setRelatedTo] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [photo, setPhoto] = useState('');
  const [pdf, setPdf] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState({ type: '', visible: false });
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
    const internalbalance=internallimits-internalawailed;
    const externalbalance=externallimits-externalawailed
  
  useEffect(() => {
   
    const today = new Date();
   setAppliedDate(today); 
    let availableBalance = 0;
    if (odType === 'internal') {
      console.log("****************",internalbalance,"*************************")
      availableBalance = internalbalance;
     
   
    } else if (odType === 'external') {
      availableBalance = externalbalance;
    
    }
    else{
      availableBalance=20;
    }
  
    if (availableBalance <= 0) {
      Alert.alert('No OD balance left', 'You cannot apply for more OD days.');
      setTotalDays(0);
    } else if (totalDays > availableBalance) {
    
      Alert.alert(`Exceeds Limit, You only have ${availableBalance} days left. You cannot apply for more than that.`);
      setTotalDays(0);  
    }
    else{
     
        setTotalDays(totalDays)
      

    }
  }, [odType, totalDays, internalbalance, externalbalance]);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      } else {
        console.log("Image selection was canceled.");
      }
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };

  const openPdf = async (uri) => {
    try {
      const contentUri = await FileSystem.getContentUriAsync(uri);
      console.log('Content URI:', contentUri);
  
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1,
        type: 'application/pdf',
      });
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  const handlePdfPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
  
      if (result.canceled) {
        console.log("PDF selection was canceled.");
        return;
      }
  
      console.log(result.assets[0].uri);
      setPdf(result.assets[0].uri);      
    } catch (error) {
      console.error("Error picking a PDF:", error);
    }
  };

  const calculateDaysBetweenDates = (start, end) => {
    if (start > end) {
      Alert.alert('Error', 'End Date cannot be before Start Date.');
      setTotalDays(0);
      return;
    }
  
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let availableBalance = 0;
    if (odType === 'internal') {
      availableBalance = internalbalance;
    
    } else if (odType === 'external') {
      availableBalance = externalbalance;
    }
  
    if (availableBalance <= 0) {
      Alert.alert('No OD balance left', 'You cannot apply for more OD days.');
      setTotalDays(0);
      return;
    } else if (diffDays > availableBalance) {
      Alert.alert(`'Exceeds Limit', You only have ${availableBalance} days left.`);
      
      setTotalDays(0);
      return;
    }
    else{
 
    setTotalDays(diffDays)
  
    }
  };
  const checkDateOverlap = (selectedStartDate, selectedEndDate) => {
    const externalODDates = [/* array of external OD dates */]; 
    for (let i = 0; i < externalODDates.length; i++) {
      const extStart = new Date(externalODDates[i].startDate);
      const extEnd = new Date(externalODDates[i].endDate);
  
      if (
        (selectedStartDate >= extStart && selectedStartDate <= extEnd) ||
        (selectedEndDate >= extStart && selectedEndDate <= extEnd)
      ) {
        return true;
      }
    }
    return false;
  };
  
  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      if (showDatePicker.type === 'start') {
        const newStartDate = selectedDate || startDate;
        setStartDate(newStartDate);
        if (odType === 'internal' && checkDateOverlap(newStartDate, endDate)) {
          Alert.alert('Overlap Error', 'Selected dates overlap with external OD dates.');
          setTotalDays(0);
          return;
        }
  
        calculateDaysBetweenDates(newStartDate, endDate);
      } else if (showDatePicker.type === 'end') {
        const newEndDate = selectedDate || endDate;
        setEndDate(newEndDate);
  
        if (odType === 'internal' && checkDateOverlap(startDate, newEndDate)) {
          Alert.alert('Overlap Error', 'Selected dates overlap with external OD dates.');
          setTotalDays(0);
          return;
        }
  
        calculateDaysBetweenDates(startDate, newEndDate);
      }
    }
    setShowDatePicker({ type: '', visible: false });
  };
  const formatDateForMySQL = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rollno || !reason || !startDate || !endDate || !odType || !photo||!pdf) {
      alert('Please fill all the fields before submitting.');
      return;
    }

    if (startDate > endDate) {
      alert('Start date cannot be greater than end date.');
      return;
    }
    
    const formattedStartDate = formatDateForMySQL(startDate);
    const formattedEndDate = formatDateForMySQL(endDate);
    const appliedDate1 = formatDateForMySQL(appliedDate);
    
    try {
      const response = await axios.post("http://172.16.127.53:5000/odform", {
        email,
        rollno,
        name,
        classhandling,
        section,
        year,
        odType,
        reason,
        appliedDate1,
        formattedStartDate,
        formattedEndDate,
        totalDays,
        photo,
        pdf,
        internallimits,
        externallimits
      });

      console.log("Form submitted successfully", response.data);
      const response1=await axios.post("http://172.16.127.53:5000/odform2",{email});
      if (response1.status === 200) {
        const message = response1.data.message || 'OD applied successfully';
        Alert.alert('Success', message);
        

        navigation.navigate('Studenthome', { user: response1.data.user,oddays:response1.data.oddays,odtaken:response1.data.odtaken});
    } 
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert('Error', 'There was an error submitting the form. Please try again.');
    }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.threeDotButton}>
          <FontAwesome name="ellipsis-v" size={20} color="#457b9d" />
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.header}>On-Duty Form</Text>

      <View style={styles.pickerContainer}>
      <Picker
          selectedValue={odType}
          style={styles.picker}
          onValueChange={(itemValue) => setOdType(itemValue)}
        >
          <Picker.Item label="Select OD Type" value="" />
          <Picker.Item label="Internal OD" value="internal" />
          <Picker.Item label="External OD" value="external" />
        </Picker>

      </View>

      <TextInput style={styles.input} placeholder="Reason for OD" value={reason} onChangeText={setReason} />

      {/* Image picker */}
      <TouchableOpacity onPress={handleImagePick} style={styles.button}>
        <Text style={styles.buttonText}>Upload Photo Proof</Text>
      </TouchableOpacity>
      {photo && (
        <View style={styles.previewContainer}>
          <TouchableOpacity onPress={() => setIsImageModalVisible(true)}>
            <Image source={{ uri: photo }} style={styles.imagePreview} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPhoto('')} style={styles.changeButton}>
            <Text style={styles.changeText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PDF picker */}
      <TouchableOpacity onPress={handlePdfPick} style={styles.button}>
        <Text style={styles.buttonText}>Upload PDF Proof</Text>
      </TouchableOpacity>
      {pdf && (
        <View style={styles.pdfPreviewContainer}>
          <TouchableOpacity style={styles.pdfLink}>
            <FontAwesome name="file-pdf-o" size={30} color="#e63946" />
            <Text style={styles.pdfText} onPress={() => openPdf(pdf)}> View PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPdf(null)} style={styles.changeButton}>
            <Text style={styles.changeText}>Remove PDF</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Date pickers */}
      <Text style={styles.dateText}>Applied Date: {appliedDate.toLocaleDateString()}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker({ type: 'start', visible: true })}>
        <Text style={styles.dateText}>Start Date: {startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowDatePicker({ type: 'end', visible: true })}>
        <Text style={styles.dateText}>End Date: {endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <Text style={styles.totalDaysText}>Total Days: {totalDays}</Text>

      <Button title="Submit" onPress={handleSubmit} />
      {showDatePicker.visible && (
        <DateTimePicker
          value={showDatePicker.type === 'start' ? startDate : endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Modal isVisible={isImageModalVisible}>
        <View style={styles.modalContent}>
          <Image source={{ uri: photo }} style={styles.modalImage} />
          <Button title="Close" onPress={() => setIsImageModalVisible(false)} />
        </View>
      </Modal>
      <Modal isVisible={isPdfModalVisible}>
        <View style={styles.modalContent}>
          <Text>PDF Preview</Text>
          <Button title="Close" onPress={() => setIsPdfModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp('4%'),  // Responsive padding
    backgroundColor: '#f1faee',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2.5%'),  // Responsive marginBottom
  },
  threeDotButton: {
    position: 'absolute',
    right: wp('2.5%'),  // Responsive positioning
    top: wp('2.5%'),
    padding: wp('2.5%'),
  },
  menu: {
    position: 'absolute',
    top: hp('5%'),
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 5,
    width: wp('30%'),  // Responsive width
  },
  menuItem: {
    padding: wp('2.5%'),  // Responsive padding
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: wp('5%'),  // Responsive padding
    borderRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: hp('40%'),  // Responsive height
    marginBottom: hp('2.5%'),
    borderRadius: 10,
  },
  pdfModalButton: {
    marginBottom: hp('2.5%'),
  },
  pdfModalText: {
    fontSize: wp('4.5%'),  // Responsive fontSize
    color: '#007BFF',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: wp('2.5%'),
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  menuItemText: {
    fontSize: wp('4%'),  // Responsive fontSize
    color: '#457b9d',
  },
  header: {
    fontSize: wp('6%'),  // Responsive fontSize
    fontWeight: 'bold',
    marginBottom: hp('2.5%'),
    color: '#457b9d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#457b9d',
    borderRadius: 5,
    padding: wp('2.5%'),
    marginBottom: hp('2%'),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#457b9d',
    borderRadius: 5,
    marginBottom: hp('2%'),
  },
  picker: {
    height: hp('6%'),  // Responsive height
    width: '100%',
  },
  button: {
    backgroundColor: '#457b9d',
    padding: wp('3%'),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: wp('4%'),  // Responsive fontSize
  },
  previewContainer: {
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  imagePreview: {
    width: wp('25%'),  // Responsive width
    height: wp('25%'),  // Responsive height
    borderRadius: 5,
    marginBottom: hp('1.5%'),
  },
  changeButton: {
    padding: wp('1%'),
  },
  changeText: {
    color: '#e63946',
    fontSize: wp('4%'),  // Responsive fontSize
  },
  pdfPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  pdfLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfText: {
    marginLeft: wp('2%'),
    fontSize: wp('4%'),  // Responsive fontSize
  },
  dateText: {
    marginBottom: hp('1%'),
    color: '#457b9d',
    fontSize: wp('4%'),  // Responsive fontSize
  },
  totalDaysText: {
    fontSize: wp('4.5%'),  // Responsive fontSize
    fontWeight: 'bold',
    marginBottom: hp('2.5%'),
  },
  fullImage: {
    width: '100%',
    height: 'auto',
    maxHeight: hp('80%'),  // Max height for responsive image
  },
});




export default Odform;