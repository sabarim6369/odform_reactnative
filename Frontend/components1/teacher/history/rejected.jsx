import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import InputModal from '../modalreject'; 
import {API_BASE_URL} from "@env";
import api from '../../../api'
const ODRequests = ({ navigation, route}) => {
    const [result, setResult] = useState([]);
    const { classs, section, year } = route.params;
    const [searchText, setSearchText] = useState('');
    const {method}=route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null); 
    useEffect(() => {
        if (route.params && route.params.results) {
            setResult(route.params.results);
        } else {
            console.error("No result provided via route.params");
        }
    }, [route.params]);

    const filteredResults = result.filter(item =>
        item.username.toLowerCase().includes(searchText.toLowerCase()) ||
        item.rollno.toString().includes(searchText)
    );



   
    

    const handleViewDetails = async(id) => {
        console.log(id,"😍😍🐦‍🔥🐦‍🔥🐦‍🔥")
        let type="";
        if(method==="rejectedodhod"){
         type="rejectedodhod"
        }
        else if(method==="rejectedodcoe"){
            type="rejectedodcoe";
        }
        else{
            type="rejectedodadvisor";
        }
        const response=await axios.post(`${api}/viewdetails`,{id,type});
        const od=response.data.user
        console.log(od)
        
        navigation.navigate('viewdetails', { od});
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRight}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('TeacherHome')}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Rejected OD'S</Text>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or roll number"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <ScrollView>
                <View style={styles.cardContainer}>
                    {(filteredResults.length > 0) ? filteredResults.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Text style={styles.cardTitle}>{item.username}</Text>
                            <Text style={styles.cardText}>Roll No: {item.rollno}</Text>
                            <Text style={styles.cardText}>Reason: {item.reason}</Text>
                            <Text style={styles.cardText}>Total Days: {item.total_days}</Text>
                            <View style={styles.odTypeBox}>
                                <Text style={styles.odTypeText}>{item.odtype || "Not Specified"}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => handleViewDetails(item.id)}>
                                    <Text style={styles.buttonText}>View Details</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAccept(item)}>
                                    <Text style={styles.buttonText}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleReject(item.id)}>
                                    <Text style={styles.buttonText}>Reject</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    )) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No OD Requests available</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
           
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        backgroundColor: '#007BFF',
    },
    acceptButton: {
        backgroundColor: '#28A745',
    },
    rejectButton: {
        backgroundColor: '#DC3545',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noDataContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noDataText: {
        fontSize: 18,
        color: '#888',
    },
});

export default ODRequests;
