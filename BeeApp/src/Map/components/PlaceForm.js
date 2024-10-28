import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import OutlinedButton from "./OutlinedButton";
import Button from './Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import { Place } from '../models/place';

import HiveopolisImage from '../../../assets/hiveopolis-hive.png';
import BeehiveImage from '../../../assets/apiary.png';
import FlowerImage from '../../../assets/favicon.png';

function PlaceForm({ onCreatePlace }) 
{
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    };

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        console.log(pickedLocation);
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        console.log(placeData);
        onCreatePlace(placeData);
    };

    // Placeholder functions for button actions
    const onAddHiveopolis = () => {
        console.log('Adding HIVEOPOLIS');
    };

    const onAddBeehive = () => {
        console.log('Adding Beehive');
    };

    const onAddFlower = () => {
        console.log('Adding Flower');
    };

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />

            <OutlinedButton onPress={onAddHiveopolis} image={HiveopolisImage}>Add Hiveopolis</OutlinedButton>
            <OutlinedButton onPress={onAddBeehive} image={BeehiveImage}>Add Beehive</OutlinedButton>
            <OutlinedButton onPress={onAddFlower} image={FlowerImage}>Add Flower</OutlinedButton>
            
            <Button onPress={savePlaceHandler}>Add Place</Button>
            
            <View style={{ width: 50, height: 40}} />
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'black',
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2,
        backgroundColor: '#ffffff',
    },
});
