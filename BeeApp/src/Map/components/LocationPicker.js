import { Alert, Image, Text, StyleSheet, View } from "react-native";

import OutlinedButton from "./OutlinedButton";

import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../location/location";

import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

function LocationPicker({ onPickLocation }) 
{
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();



    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                console.log("dada: " + pickedLocation);
                const address = await getAddress(
                    pickedLocation.lat, 
                    pickedLocation.lng
                );
                console.log("address: " + address);
                onPickLocation({...pickedLocation, address: address});
            }
        }
        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        const permissionResponse = await requestPermission();
      
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location psermissions to use this app.'
            );
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        console.log("get location");
        const hasPermission = await verifyPermissions();
        console.log("hasPermission: " + hasPermission);
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        console.log(location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet.</Text>
    if (pickedLocation) {
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} />
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Current Location</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
});