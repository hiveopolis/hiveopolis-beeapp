import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

function JournalScreen({ navigation }) 
{
    const [note, setNote] = useState('');

    const saveNote = () => {
        console.log(note);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                multiline
                placeholder="Write your note here..."
                value={note}
                onChangeText={setNote}
            />
            <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        flex: 1,
        padding: 10,
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#EBBC4E',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default JournalScreen;
