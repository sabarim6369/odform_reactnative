import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const InputModal = ({ visible, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Reason for Rejection</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter reason"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <Button title="Submit" onPress={handleSubmit} />
                    <Button title="Cancel" onPress={onClose} color="red" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default InputModal;
