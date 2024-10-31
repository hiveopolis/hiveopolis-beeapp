import React, { useCallback, useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native";

import { ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
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
    const route = useRoute();
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();


    useEffect(() => {
        if (route.params?.pickedLat && route.params?.pickedLng) {
            setPickedLocation({
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            });
        }
    }, [route.params]);


    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    };

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    const savePlaceHandler = (type) => {
        // Validation check for required fields
        if (!enteredTitle) {
            Alert.alert(
                "Title Missing",
                "Please enter a title for the place.",
                [{ text: "OK" }]
            );
            return;
        }
        if (!selectedImage) {
            Alert.alert(
                "Image Missing",
                "Please select an image for the place.",
                [{ text: "OK" }]
            );
            return;
        }
        if (!pickedLocation) {
            Alert.alert(
                "Location Missing",
                "Please select an location for the place.",
                [{ text: "OK" }]
            );
            return;
        }

        const placeData = new Place(type, enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    };

    // Placeholder functions for button actions
    const onAddHiveopolis = () => {
        console.log('Adding HIVEOPOLIS');
        savePlaceHandler("hiveopolis");
    };

    const onAddBeehive = () => {
        console.log('Adding Beehive');
        savePlaceHandler("hive");
    };

    const onAddFlower = () => {
        console.log('Adding Flower');
        savePlaceHandler("flower");
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

            <View style={{ width: 50, height: 40 }} />
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
