import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import api from '../../api';

const ODRequests = ({ navigation, route }) => {
    const [result, setResult] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('inProgressAdvisor'); // State for selected category

    const { classs, section, year, method } = route.params;

    useEffect(() => {
        if (route.params && route.params.results) {
            setResult(route.params.results);
        } else {
            console.error("No result provided via route.params");
        }
    }, [route.params]);

    // Filter results based on search text and selected category
    const filteredResults = result.filter(item =>
        (item.username.toLowerCase().includes(searchText.toLowerCase()) || item.rollno.toString().includes(searchText)) &&
        item.category === selectedCategory // Category filter
    );

    const handleViewDetails = async (id, odtype) => {
        let type = '';

        if (method === "acceptedodhod") {
            type = odtype === "internal" ? "acceptedodhodinternal" : "acceptedodhodexternal";
        } else if (method === "acceptedodcoe") {
            type = "acceptedodcoe";
        } else {
            type = "acceptedodadvisor";
        }

        const response = await axios.post(`${api}/viewdetails`, { id, type });
        const od = response.data.user;
        navigation.navigate('viewdetails', { od });
    };

    // Categories for buttons
    const categories = [
        { key: 'inProgressAdvisor', label: 'In-progress (Advisor)' },
        { key: 'inProgressHOD', label: 'In-progress (HOD)' },
        { key: 'inProgressJioTag', label: 'In-progress (JioTag)' },
        { key: 'accepted', label: 'Accepted' },
        { key: 'rejected', label: 'Rejected' }
    ];

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
                style={[
                    styles.filterButton,
                    selectedCategory === category.key ? styles.activeButton : styles.inactiveButton
                ]}
                onPress={() => setSelectedCategory(category.key)}
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
                                <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => handleViewDetails(item.id, item.odtype)}>
                                    <Text style={styles.buttonText}>View Details</Text>
                                </TouchableOpacity>
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
        justifyContent: 'space-between',
        marginTop: 10,
    },
    viewButton: {
        backgroundColor: '#007BFF',
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
