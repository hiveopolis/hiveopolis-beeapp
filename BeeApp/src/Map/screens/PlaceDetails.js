import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Alert } from 'react-native';
import OutlinedButton from '../components/OutlinedButton.js';
import { fetchPlaceDetails, deletePlace } from '../database';



function PlaceDetails({ route, navigation }) 
{
    const [fetchedPlace, setFetchedPlace] = useState();
  
    function showAlert()
    {
      Alert.alert(
        'Delete Place',
        'Are you sure you want to delete this place?',
        [
          {
            text: 'Delete',
            onPress: onDeletePlace,
            style: 'cancel',
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {}
        },
      );
    }
    
    async function onDeletePlace() {
      const result = await deletePlace(selectedPlaceId);
      navigation.navigate('AllPlaces');
    }
  
    function showOnMapHandler() {
      navigation.navigate('Map', {
        initialLat: fetchedPlace.location.lat,
        initialLng: fetchedPlace.location.lng,
      });
    }
  
    const selectedPlaceId = route.params.placeId;
  
    useEffect(() => {
      async function loadPlaceData() {
        const place = await fetchPlaceDetails(selectedPlaceId);
        setFetchedPlace(place);
        navigation.setOptions({
          title: place.title,
        });
      }
  
      loadPlaceData();
    }, [selectedPlaceId]);
  
    if (!fetchedPlace) {
      return (
        <View style={styles.fallback}>
          <Text>Loading place data...</Text>
        </View>
      );
    }
  
    return (
      <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
          <OutlinedButton icon="trash-outline" onPress={showAlert}>
            Delete
          </OutlinedButton>
        </View>
      </ScrollView>
    );
  }
  
  export default PlaceDetails;
  
  const styles = StyleSheet.create({
    fallback: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
    },
    locationContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    addressContainer: {
      padding: 20,
    },
    address: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });