import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

const ViewDetails = ({ route, navigation }) => {
    const { od } = route.params;

    const handlePDFView = () => {
        if (od.pdf) {
            Linking.openURL(od.pdf).catch(err => console.error("Couldn't load PDF", err));
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>OD Request Details</Text>
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Applicant Information</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Email:</Text> {od.email}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Roll No:</Text> {od.rollno}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Username:</Text> {od.username}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Class:</Text> {od.classs}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Section:</Text> {od.section}</Text>

                    <Text style={styles.subHeader}>OD Details</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Reason:</Text> {od.reason}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Applied Date:</Text> {od.applieddate}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Start Date:</Text> {od.startdate}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>End Date:</Text> {od.enddate}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Total Days:</Text> {od.total_days}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>Related To:</Text> {od.relatedto}</Text>
                    <Text style={styles.detailText}><Text style={styles.boldText}>OD Type:</Text> {od.odtype}</Text>

                    {/* Display PDF link if available */}
                    {od.pdf && (
                        <TouchableOpacity onPress={handlePDFView} style={styles.linkContainer}>
                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>PDF:</Text> View PDF
                            </Text>
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
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        textAlign: 'center',
        fontSize: 28,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        elevation: 3,
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
    },
    linkContainer: {
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 8,
    },
});

export default ViewDetails;
