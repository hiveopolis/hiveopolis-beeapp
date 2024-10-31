import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, TextInput, Text, ScrollView, Button, StyleSheet, Keyboard, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OutlinedButton from "../src/Map/components/OutlinedButton";

function JournalScreen({ navigation }) {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        loadNotes();

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollToEditingNote();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            scrollToEditingNote();
        });

        return () => {
            
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (editingIndex !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingIndex]);

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.error("Failed to load notes.", error);
        }
    };

    const saveNotes = async (newNotes) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
            setNotes(newNotes);
            setEditingIndex(null);
        } catch (error) {
            console.error("Failed to save notes.", error);
        }
    };

    const handleSaveNote = () => {
        if (note.trim() === '') return;

        Keyboard.dismiss();

        if (editingIndex !== null) {
            const updatedNotes = notes.map((item, index) =>
                index === editingIndex ? { ...item, text: note } : item
            );
            saveNotes(updatedNotes);
        } else {
            const timestamp = new Date().toLocaleString();
            const newNotes = [...notes, { text: note, timestamp }];
            saveNotes(newNotes);
        }

        setNote('');
    };

    const handleNewEntry = () => {
        const timestamp = new Date().toLocaleString();
        const newNotes = [...notes, { text: '', timestamp }];
        setNotes(newNotes);
        setEditingIndex(newNotes.length - 1);
        setNote('');
    };

    const handleEditNote = (index) => {
        setEditingIndex(index);
        setNote(notes[index].text);
    };

    const handleDeleteNote = (index) => {
        Alert.alert(
            "Confirm Delete",
            "Do you really want to delete this entry?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        const updatedNotes = notes.filter((_, i) => i !== index);
                        saveNotes(updatedNotes);
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const scrollToEditingNote = () => {
        if (editingIndex !== null) {
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    y: editingIndex * 100,
                    animated: true,
                });
            }, 100);
        }
    };

    const renderNote = (item, index) => (
        <View key={index} style={styles.noteContainer}>
            <Text style={styles.timestampText}>{item.timestamp}</Text>
            {editingIndex === index ? (
                <TextInput
                    ref={inputRef}
                    style={styles.editInput}
                    multiline
                    value={note}
                    onChangeText={setNote}
                />
            ) : (
                <Text style={styles.noteText}>{item.text}</Text>
            )}
            <View style={styles.noteActions}>
                {editingIndex === index ? (
                    <OutlinedButton onPress={handleSaveNote} icon="save-outline" >Save</OutlinedButton>
                ) : (
                    <>
                        <OutlinedButton onPress={() => handleEditNote(index)} icon="pencil-outline" >Edit</OutlinedButton>
                        <OutlinedButton onPress={() => handleDeleteNote(index)} icon="trash-outline" >Delete</OutlinedButton>
                    </>
                )}
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
            behavior="padding"
            enabled
        >
            <SafeAreaView style={styles.container}>
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {notes.map((item, index) => renderNote(item, index))}
                </ScrollView>
                {editingIndex === null && (
                    <View style={styles.newEntryButton}>
                        <OutlinedButton onPress={handleNewEntry} icon="add-circle-outline" >New Entry</OutlinedButton>
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    noteContainer: {
        padding: 10,
        borderRadius: 6,
        marginVertical: 12,
        marginHorizontal: 2,
        backgroundColor: '#ECDBBA',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    timestampText: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5,
    },
    noteText: {
        fontSize: 16,
    },
    noteActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editInput: {
        fontSize: 16,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        marginBottom: 5,
    },
    newEntryButton: {
        marginVertical: 10,
    },
});

export default JournalScreen;
