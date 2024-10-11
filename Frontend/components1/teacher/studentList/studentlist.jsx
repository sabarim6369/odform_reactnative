import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import axios from 'axios';
const StudentTable = ({ navigation,route }) => {
    const [searchTerm, setSearchTerm] = useState('');
const{results}=route.params;
    const filteredResults = results.filter(student => {
        const search = searchTerm.toLowerCase();
        return (
            student.email.toLowerCase().includes(search) ||
            student.username.toLowerCase().includes(search) ||
            student.rollno.toString().includes(search)
        );
    });

    const handleDetails = async(email) => {
        let odtype="all";
        const response = await axios.post(`${api}/fetchResultsByCategoryods`, {email,odtype });
        console.log(response.data.results); 

        navigation.navigate('studentdetails', {  results: response.data.results,email });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#007bff" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by email, name, or roll number..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        {/* <Text style={styles.cell}>{item.email}</Text> */}
                        <Text style={styles.cell}>{item.username}</Text>
                        <Text style={styles.cell}>{item.rollno}</Text>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => handleDetails(item.email)}
                        >
                            <Text style={styles.buttonText}>More Details</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        {/* <Text style={styles.headerText}>Email</Text> */}
                        <Text style={styles.headerText}>Name</Text>
                        <Text style={styles.headerText}>Roll No</Text>
                        <Text style={styles.headerText}>Actions</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8', 
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        borderColor: '#007bff',
        borderWidth: 1,
        paddingHorizontal: 15, 
        marginBottom: 20,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#007bff', // Blue header background
        padding: 10,
        borderRadius: 8, // Rounded corners for header
        marginBottom: 10, // Space below header
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        color: '#ffffff', // White text color for header
        fontSize: 16, // Adjust font size for visibility
        textAlign: 'center', // Center align header text
    },
    row: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', // Light gray border for rows
        alignItems: 'center', // Center vertically
        backgroundColor: '#ffffff', // Row background
        borderRadius: 8,
        marginBottom: 10, // Space between rows
        elevation: 1, // Shadow effect for rows
    },
    cell: {
        flex: 1,
        color: '#333', // Dark text color
        fontSize: 16,
        textAlign: 'center', // Center text for cells
    },
    detailsButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#28a745', // Green button for more details
        borderRadius: 30, // Rounded corners for button
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff', // White text for button
        fontSize: 14,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
});

export default StudentTable;
