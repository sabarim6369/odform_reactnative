import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Use FontAwesome for icons

const ViewDetails = ({ route }) => {
    const { od } = route.params;

    const handlePDFView = () => {
        if (od.pdf) {
            Linking.openURL(od.pdf).catch(err => console.error("Couldn't load PDF", err));
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="file-text" size={32} color="#4A90E2" style={styles.headerIcon} />
                    <Text style={styles.header}>OD Request Details</Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Applicant Information</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Email:</Text> {od.email}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Roll No:</Text> {od.rollno}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Username:</Text> {od.username}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Class:</Text> {od.classs}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Section:</Text> {od.section}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>year:</Text> {od.presentyear}</Text>
                    </View>

                    <Text style={styles.subHeader}>OD Details</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Reason:</Text> {od.reason}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Applied Date:</Text> {od.applieddate}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Start Date:</Text> {od.startdate}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>End Date:</Text> {od.enddate}</Text>
                        <Text style={styles.detailText}><Text style={styles.boldText}>Total Days:</Text> {od.total_days}</Text>
                        {/* <Text style={styles.detailText}><Text style={styles.boldText}>Related To:</Text> {od.relatedto}</Text> */}
                        <Text style={styles.detailText}><Text style={styles.boldText}>OD Type:</Text> {od.odtype}</Text>
                        {od.rejectedby?(
                                                    <Text style={styles.detailText}><Text style={styles.boldText}>Rejected By:</Text> {od.rejectedby}</Text>

                        ):null
                        }
                        {od.reasonofrejection?(
                                                    <Text style={styles.detailText}><Text style={styles.boldText}>Reason of Rejection:</Text> {od.reasonofrejection}</Text>

                        ):null
                        }

                    </View>

                    {/* Display PDF link if available */}
                    {od.pdf && (
                        <TouchableOpacity onPress={handlePDFView} style={styles.pdfButton}>
                            <Text style={styles.pdfButtonText}>📄 View PDF</Text>
                        </TouchableOpacity>
                    )}

                    {/* Display image if available */}
                    {od.photo && (
                        <Image source={{ uri: od.photo }} style={styles.image} />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e6ed', // Subtle gradient or background color
        padding: 15,
        paddingTop: 50, // Adjust top padding to bring content down
    },
    scrollView: {
        paddingBottom: 30,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    headerIcon: {
        marginRight: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginBottom: 20,
        marginTop: 30, // Additional margin to push card further down
    },
    subHeader: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingBottom: 5,
    },
    infoContainer: {
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    boldText: {
        fontWeight: '700',
        color: '#000',
    },
    pdfButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    pdfButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 15,
        resizeMode: 'cover',
    },
});

export default ViewDetails;
