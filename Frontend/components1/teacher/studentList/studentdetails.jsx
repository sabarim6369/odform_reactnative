    import React, { useState, useEffect, useRef } from 'react';
    import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, Image,Modal} from 'react-native';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import axios from 'axios';
    import api from '../../../api';
    import * as ImagePicker from 'expo-image-picker';
    import * as Location from 'expo-location';
    import * as ImageManipulator from 'expo-image-manipulator';
    import { storage } from '../../../config';
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
        const [modalVisible, setModalVisible] = useState(false);
        const [internalOD, setInternalOD] = useState({ limit: 0, availed: 0, balance: 0 });
        const [externalOD, setExternalOD] = useState({ limit: 0, availed: 0, balance: 0 });
    
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
                let odtype='all';
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
            } else if (category === "inProgressHOD") {
                type = "acceptedodadvisor";
            } else if (category === "inProgresscoe") {
                type = "acceptedodhodexternal";
            } else if (category === "inProgressJioTagexternal") {
                type = "acceptedodcoe";
            } else if (category === "accepted") {
                // Handle accepted category
            } else if (category === "rejected") {
                // Handle rejected category
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

        const handleUploadJioTag = async (id) => {
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
                    console.log("😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😍😍😍😍😍😍",photoData)
                    renderImageWithLocation(uri, photoData.latitude, photoData.longitude);
                }
            } else {
                Alert.alert('Permission denied', 'Camera and location permissions are required.');
            }
        };
    
    const renderImageWithLocation = async (uri, latitude, longitude) => {
        console.log("🎉🎉🎉🎉🎉🎉🎉🎉", uri);
        
        const path = 'geotag_photos';
            const uploadedImageUrl = await uploadImage(uri, path);
            console.log('Uploaded image URL:', uploadedImageUrl);

            await axios.post(`${api}/saveImageUrl`, { imageUrl: uploadedImageUrl });
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
        
            const handleEdit = async() => {
                const response=await axios.post(`${api}/editodlimit`,{email});
                console.log(response.data.internal);
                console.log(response.data.external);
                console.log(response.data.internallimit);
                console.log(response.data.externallimit);
                const internalbalance=response.data.internallimit-response.data.internal
                const externalbalance=response.data.externallimit-response.data.external
                console.log(internalbalance)
                setInternalOD({limit:response.data.internallimit,availed:response.data.internal,balance:internalbalance})
                setExternalOD({limit:response.data.externallimit,availed:response.data.external,balance:externalbalance})
                console.log(externalOD)
                console.log(internalOD)
               
                setModalVisible(true);
            };
        
            // const handleSubmit = () => {
            //     if (internalOD.balance < 0 || externalOD.balance < 0) {
            //         Alert.alert("Error", "Balance cannot be below zero.");
            //         return;
            //     }
            //     // Here, you would typically handle submission to your API
            //     // Example: await axios.post(`${api}/updateOD`, { internalOD, externalOD });
            //     setModalVisible(false);
            // };
        
            const updateInternalLimit = (value) => {
                const limit = Number(value);
                const balance = limit - internalOD.availed;
                setInternalOD({ ...internalOD, limit, balance });
            };
        
            const updateExternalLimit = (value) => {
                const limit = Number(value);
                const balance = limit - externalOD.availed;
                setExternalOD({ ...externalOD, limit, balance });
            };
        const handleInternalSubmit=async()=>{
            if (internalOD.balance < 0 || isNaN(internalOD.balance)) {
                Alert.alert("Error", "Internal OD balance cannot be below zero.");
                return;
            }
            
            console.log(internalOD.balance)
            console.log(internalOD.limit)
            console.log(internalOD.availed)
            const response=await axios.post(`${api}/updateodlimit`,{a:internalOD.limit,type:"internallimit",email:email})
            Alert.alert("Success",response.data.message)
        }
        const handleExternalSubmit=async()=>{
            if (externalOD.balance < 0 || isNaN(externalOD.balance)) {
                Alert.alert("Error", "Internal OD balance cannot be below zero.");
                return;
            }
            const response=await axios.post(`${api}/updateodlimit`,{a:externalOD.limit,type:"externallimit",email:email})
            Alert.alert("Success",response.data.message)
        }
            return (
                <View style={styles.container}>
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
                                                onPress={() => handleUploadJioTag(item.id)}
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
                    <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => handleEdit()} // You can switch to 'external' to edit external OD
            >
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
                    <Canvas ref={canvasRef} style={styles.canvas} />
                    <Modal
    transparent={true}
    animationType="slide"
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
>
    <View style={styles.overlay}>
        <View style={styles.modalBox}>
            <Text style={styles.modalHeader}>Edit OD Details</Text>

            {/* Internal OD Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>Internal OD</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Enter Internal OD Limit"
                    keyboardType="numeric"
                    onChangeText={updateInternalLimit}
                    value={String(internalOD.limit)}
                />
                <Text style={styles.dataText}>Availed: {internalOD.availed}</Text>
                <Text style={styles.dataText}>Balance: {internalOD.balance}</Text>

                {/* Submit button for Internal OD */}
                <TouchableOpacity
                    style={[styles.actionButton, styles.internalActionButton]}
                    onPress={handleInternalSubmit}
                >
                    <Text style={styles.buttonText}>Submit Internal OD</Text>
                </TouchableOpacity>
            </View>

            {/* External OD Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>External OD</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Enter External OD Limit"
                    keyboardType="numeric"
                    onChangeText={updateExternalLimit}
                    value={String(externalOD.limit)}
                />
                <Text style={styles.dataText}>Availed: {externalOD.availed}</Text>
                <Text style={styles.dataText}>Balance: {externalOD.balance}</Text>

                {/* Submit button for External OD */}
                <TouchableOpacity
                    style={[styles.actionButton, styles.externalActionButton]}
                    onPress={handleExternalSubmit}
                >
                    <Text style={styles.buttonText}>Submit External OD</Text>
                </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
            >
                <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>


                </View>
            );
        }    

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#f4f4f4',
        },
        editButton: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#007BFF',
            padding:15,
            paddingLeft:20,
            paddingRight:20,
            borderRadius: 20,
            elevation: 3,
        },
        editButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
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
            backgroundColor: '#29292a',
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
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            elevation: 5,
        },
        modalTitle: {
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
        },
        odBox: {
            marginBottom: 20,
        },
        input: {
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        },
        submitButton: {
            backgroundColor: '#007BFF',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 10,
        },
        submitButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        closeButton: {
            backgroundColor: '#dc3545',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 10,
        },
        closeButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
            overlay: {
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            modalBox: {
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                elevation: 5,
            },
            modalHeader: {
                fontSize: 24,
                marginBottom: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#333',
            },
            sectionContainer: {
                marginBottom: 20,
                padding: 15,
                borderRadius: 8,
                backgroundColor: '#f8f9fa',
                borderColor: '#ddd',
                borderWidth: 1,
            },
            sectionHeader: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                color: '#007BFF',
            },
            inputField: {
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                fontSize: 16,
                backgroundColor: '#fff',
            },
            dataText: {
                fontSize: 16,
                marginBottom: 5,
                color: '#333',
            },
            actionButton: {
                padding: 15,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
            },
            internalActionButton: {
                backgroundColor: '#28a745',
            },
            externalActionButton: {
                backgroundColor: '#007BFF',
            },
            buttonText: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
            },
            closeModalButton: {
                backgroundColor: '#dc3545',
                padding: 15,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
            },
    
    });


    export default ODRequests;
