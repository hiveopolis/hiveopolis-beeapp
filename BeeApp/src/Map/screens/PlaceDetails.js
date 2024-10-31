import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this library installed for icons
import OutlinedButton from '../components/OutlinedButton.js';
import { fetchPlaceDetails, deletePlace, updatePlace } from '../database';

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      setNote(place.note || '');
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  function showAlert() {
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
        onDismiss: () => {},
      }
    );
  }

  async function onDeletePlace() {
    await deletePlace(selectedPlaceId);
    navigation.navigate('AllPlaces');
  }

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  function saveNoteHandler() {
    if (fetchedPlace) {
      const updatedPlace = { ...fetchedPlace, note };
      setFetchedPlace(updatedPlace);
      updatePlace(updatedPlace);
      setIsEditing(false); // Exit edit mode after saving
    }
  }

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

        {/* Horizontal Button Row */}
        <View style={styles.buttonRow}>
            {/* Edit and Save Button */}
            {isEditing ? (
              <OutlinedButton icon="save-outline" onPress={saveNoteHandler} >
                Save Note
              </OutlinedButton>
            ) : (
              <OutlinedButton icon="pencil-outline" onPress={() => setIsEditing(true)}>
                Edit Note
              </OutlinedButton>
            )}
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
          <OutlinedButton icon="trash-outline" onPress={showAlert}>
            Delete
          </OutlinedButton>
        </View>

        {/* Editable Note Section */}
        <TextInput
          style={[styles.noteInput, isEditing ? styles.editable : styles.readOnly]}
          value={note}
          onChangeText={setNote}
          placeholder="Add a note..."
          multiline
          editable={isEditing} // Only editable in edit mode
        />
        
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
    padding: 20,
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
  noteInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
    width: '100%',
    textAlignVertical: 'top',
    fontSize: 16,
  },
  editable: {
    backgroundColor: 'white',
  },
  readOnly: {
    //backgroundColor: '#f0f0f0',
    color: 'black'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
});
