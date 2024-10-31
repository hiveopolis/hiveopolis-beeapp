import React, { useState, useLayoutEffect  } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Alert, Modal, StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/IconButton';

function MapPlacePick({ route }) 
{
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);


  useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: ({tintColor}) => (
            <IconButton 
              icon="add" 
              size={30} 
              color={tintColor} 
              onPress={confirmLocationHandler}
            />
          ),
      });
  }, [navigation, selectedLocation]);
  
  
  function confirmLocationHandler() {
      if (!selectedLocation) {
          Alert.alert(
              "No location selected",
              "Please pick a location by tapping on the map."
          );
          return;
      }
      // Navigate back to AddPlace with the selected location
      navigation.navigate('AddPlace', {
          pickedLat: selectedLocation.lat,
          pickedLng: selectedLocation.lng,
      });
  }
    

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLocation ? initialLocation.lat : 47.08084083743499,
          longitude: initialLocation ? initialLocation.lng : 15.455417752857404,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Hiveopolis Hive"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image source={require('../../../assets/hiveopolis-hive.png')} style={{ width: 32, height: 32 }} />
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%', //Size of the Modal
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    marginVertical: 10, // Adjusted for more space between each detail
  },
  infoText: {
    fontWeight: "bold",
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  graphContainer: {
    alignItems: 'center',
    width: '50%', // Each graph container takes up half of the row width
  },
  graphTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default MapPlacePick;

