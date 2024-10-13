import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import api from '../../api';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as ImageManipulator from 'expo-image-manipulator';
import { storage } from '../../config';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Canvas from 'react-native-canvas';

const ODRequests = ({ navigation, route }) => {
    const [result, setResult] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('inProgressAdvisor'); 
    const [locationPermission, setLocationPermission] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const canvasRef = useRef(null);
    const { method, email } = route.params;

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
            } else {
                setLocationPermission(true);
                const location = await Location.getCurrentPositionAsync({});
                setCurrentLocation(location.coords);
            }
        };

        requestLocationPermission();

        if (route.params && route.params.results) {
            setResult(route.params.results);
        } else {
            console.error("No result provided via route.params");
        }
    }, [route.params]);

    const fetchResultsByCategory = async (category) => {
        console.log("Fetching results for category:", category);
        try {
            let odtype='external';
            const response = await axios.post(`${api}/fetchResultsByCategory`, { category, email,odtype });
            console.log("Fetched results:", response.data.results);
            setResult(response.data.results);
        } catch (error) {
            console.error("Error fetching results:", error);
            Alert.alert("Error", "Could not fetch results. Please try again later.");
        }
    };
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        fetchResultsByCategory(category);
        console.log("Selected category:", category);  
    };

    const filteredResults = result.filter(item => 
        item.username.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleViewDetails = async (id, odtype, category) => {
        let type = '';

        if (category === "inProgressAdvisor") {
            type = "registeredodadvisor";
        } else if (category === "inProgressHOD"){
            type = "acceptedodadvisor";
        } else if (category === "inProgresscoe") {
            type = "acceptedodhodexternal";
        } else if (category === "inProgressJioTagexternal") {
            type = "acceptedodcoe";
        } else if (category === "accepted") {
            type="accepted"
        } else if (category === "rejected") {
           type="rejectedodadvisor"
        } else {
            type = "acceptedodadvisor";
        }

        try {
            const response = await axios.post(`${api}/viewdetails`, { id, type });
            const od = response.data.user;
            navigation.navigate('viewdetails', { od });
        } catch (error) {
            console.error("Error fetching details:", error);
            Alert.alert("Error", "Could not fetch details. Please try again later.");
        }
    };

    const handleUploadJioTag = async (id, type, email, startdate1, enddate1) => {
       // const response = await axios.post(`${api}/date`, { id, type });
        const startDate = new Date(startdate1);
        const endDate = new Date(enddate1);
    
        const today = new Date();
        const todayDateString = today.toISOString().split('T')[0]; 
        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = endDate.toISOString().split('T')[0];
    
        console.log("Start Date:", startDateString);
        console.log("End Date:", endDateString);
        console.log("Today's Date:", todayDateString);
        if (todayDateString >= startDateString && todayDateString <= endDateString) {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    
            if (cameraStatus === 'granted' && locationStatus === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
    
                if (!result.canceled && result.assets && result.assets.length > 0) {
                    const { uri } = result.assets[0]; // Accessing the first asset's URI
                    console.log("Image URI:", uri);
    
                    const photoData = {
                        id,
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        photoUri: uri,
                    };
                    console.log("Photo Data:", photoData);
                    renderImageWithLocation(uri, photoData.latitude, photoData.longitude, id, email,todayDateString,startDateString,endDateString);
                }
            } else {
                Alert.alert('Permission denied', 'Camera and location permissions are required.');
            }
        } else {
            Alert.alert("Not allowed", "You can post only during the OD period.");
        }
    };
    
const renderImageWithLocation = async (uri, latitude, longitude,id,email,todayDateString,startDateString,endDateString) => {
    console.log("🎉🎉🎉🎉🎉🎉🎉🎉", uri);
    
    const path = 'geotag_photos';
        const uploadedImageUrl = await uploadImage(uri, path);
        console.log('Uploaded image URL:', uploadedImageUrl);

        const response=await axios.post(`${api}/saveImageUrl`, { imageUrl: uploadedImageUrl,id:id,email:email});
        Alert.alert("Success","photo uploaded successfully");
        if(todayDateString===endDateString){
            console.log("😍😍😍😍😍😍😍😍😍😍")
            type="external";
            const response=await axios.post(`${api}/lastdayupload`,{id:id,email:email,type:type});
            Alert.alert("Success","Your od has been finally accepted");
        }
    }

    const uploadImage = async (imageurl, path) => {
        try {
          const response = await fetch(imageurl);
          if (!response.ok) throw new Error('Network response was not ok');
          const blobfile = await response.blob();
          const reference = ref(storage, `${path}/${Date.now()}`); 
          const result = await uploadBytes(reference, blobfile);
          const image = await getDownloadURL(result.ref);
          return image;
        } catch (error) {
          console.error("Error uploading image:", error);
          throw error; 
        }
      };
    const uploadJioTagPhoto = async(photoData) => {
        console.log('Uploading photo with location:', photoData);
        // Upload the photo with the geotag data
        // Implement your upload logic here
    };    

    const categories = [
        { key: 'inProgressAdvisor', label: 'In-progress (Advisor)' },
        { key: 'inProgressHOD', label: 'In-progress (HOD)' },
        { key: 'inProgresscoe', label: 'In-progress (COE)' },
        { key: 'inProgressJioTagexternal', label: 'In-progress (JioTag)' },
        { key: 'accepted', label: 'Accepted' },
        { key: 'rejected', label: 'Rejected' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.topRight}>
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('TeacherHome')}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity> */}
            </View>

            <Text style={styles.title}>OD Requests</Text>

            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or roll number"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={styles.buttonContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category.key}
                            style={[styles.filterButton, selectedCategory === category.key ? styles.activeButton : styles.inactiveButton]}
                            onPress={() => handleCategorySelect(category.key)}
                        >
                            <Text style={styles.buttonText}>{category.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView>
                <View style={styles.cardContainer}>
                    {filteredResults.length > 0 ? filteredResults.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Text style={styles.cardTitle}>{item.username}</Text>
                            <Text style={styles.cardText}>Roll No: {item.rollno}</Text>
                            <Text style={styles.cardText}>Reason: {item.reason}</Text>
                            <Text style={styles.cardText}>Total Days: {item.total_days}</Text>
                            
                            <View style={styles.odTypeBox}>
                                <Text style={styles.odTypeText}>{item.odtype || "Not Specified"}</Text>
                            </View>
                            
                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={[styles.button, styles.viewButton]} 
                                    onPress={() => handleViewDetails(item.id, item.odtype, selectedCategory)}
                                >
                                    <Text style={styles.buttonText}>View Details</Text>
                                </TouchableOpacity>

                                {selectedCategory === "inProgressJioTagexternal" && (
                                    <TouchableOpacity 
                                        style={[styles.button, styles.uploadJioTagButton]} 
                                        onPress={() => handleUploadJioTag(item.id,item.odtype,item.email,item.startdate,item.enddate)}
                                    >
                                        <Text style={styles.buttonText}>Upload JioTag</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No OD Requests available</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <Canvas ref={canvasRef} style={styles.canvas} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    topRight: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        color: '#333',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 5,
    },
    searchIcon: {
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterButton: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#007BFF',
    },
    inactiveButton: {
        backgroundColor: '#ddd',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'column',
    },
    card: {
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        elevation: 3,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    odTypeBox: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 5,
        elevation: 2,
    },
    odTypeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    viewButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
    },
    uploadJioTagButton: {
        backgroundColor: '#28A745', // Green background for the JioTag button
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        marginLeft: 10,
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noDataText: {
        fontSize: 18,
        color: '#888',
    },
});


export default ODRequests;