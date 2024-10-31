import AsyncStorage from '@react-native-async-storage/async-storage';
import { Place } from '../Map/models/place';

const PLACES_KEY = 'places';

async function clearStorage() {
  try {
    await AsyncStorage.clear();
    console.log('Storage successfully cleared!');
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}

// Initialize storage (optional in AsyncStorage)
export async function init() {
  try {
    //clearStorage();
    const existingPlaces = await AsyncStorage.getItem(PLACES_KEY);
    if (!existingPlaces) {
      await AsyncStorage.setItem(PLACES_KEY, JSON.stringify([]));
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

// Insert a new place
export async function insertPlace(place) {
  try {
    const existingPlaces = JSON.parse(await AsyncStorage.getItem(PLACES_KEY)) || [];
    const newPlace = {
      id: Date.now(), // Generate a unique ID
      type: place.type,
      title: place.title,
      imageUri: place.imageUri,
      address: place.address,
      location: {
        lat: place.location.lat,
        lng: place.location.lng,
      },
      note: place.note,
    };
    existingPlaces.push(newPlace);
    await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(existingPlaces));
    return Promise.resolve(newPlace);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Delete a place by ID
export async function deletePlace(id) {
  try {
    const existingPlaces = JSON.parse(await AsyncStorage.getItem(PLACES_KEY)) || [];
    const updatedPlaces = existingPlaces.filter((place) => place.id !== id);
    await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(updatedPlaces));
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

// Fetch all places
export async function fetchPlaces() {
  try {
    const existingPlaces = JSON.parse(await AsyncStorage.getItem(PLACES_KEY)) || [];
    const places = existingPlaces.map((dp) => new Place(
      dp.type,
      dp.title,
      dp.imageUri,
      {
        address: dp.address,
        lat: dp.location.lat,
        lng: dp.location.lng,
      },
      dp.id,
      dp.note || '',
    ));
    return Promise.resolve(places);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Fetch place details by ID
export async function fetchPlaceDetails(id) {
  try {
    const existingPlaces = JSON.parse(await AsyncStorage.getItem(PLACES_KEY)) || [];
    const dbPlace = existingPlaces.find((place) => place.id === id);
    if (!dbPlace) {
      return Promise.reject('Place not found');
    }
    const place = new Place(
      dbPlace.type,
      dbPlace.title,
      dbPlace.imageUri,
      {
        lat: dbPlace.location.lat,
        lng: dbPlace.location.lng,
        address: dbPlace.address,
      },
      dbPlace.id,
      dbPlace.note || '',
    );
    return Promise.resolve(place);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updatePlace(updatedPlace) {
  try {
    const existingPlaces = JSON.parse(await AsyncStorage.getItem(PLACES_KEY)) || [];

    // Find the index of the place to update
    const placeIndex = existingPlaces.findIndex((place) => place.id === updatedPlace.id);

    if (placeIndex === -1) {
      return Promise.reject('Place not found');
    }

    // Update the place at the found index
    existingPlaces[placeIndex] = {
      ...existingPlaces[placeIndex],
      ...updatedPlace,  // Use the properties from updatedPlace
    };

    // Save the updated places array back to AsyncStorage
    await AsyncStorage.setItem(PLACES_KEY, JSON.stringify(existingPlaces));
    return Promise.resolve(existingPlaces[placeIndex]);
  } catch (error) {
    return Promise.reject(error);
  }
}
