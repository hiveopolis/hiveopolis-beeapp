import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, Modal, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/IconButton';

function Map({ navigation, route }) {
    const initialLocation = route.params && {
      lat: route.params.initialLat,
      lng: route.params.initialLng,
    };
  
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const [modalVisible, setModalVisible] = useState(false);
    const [hiveDetails, setHiveDetails] = useState({
      beesInside: 10000,
      beesOutside: 300,
      weight: "30kg",
      temperature: "34°C",
      humidity: "45%"
    });
  
    const region = {
      latitude: initialLocation ? initialLocation.lat : 47.08084083743499,
      longitude: initialLocation ? initialLocation.lng : 15.455417752857404,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  
    function selectLocationHandler(event) {
      if (initialLocation) {
        setModalVisible(true);
        return;
      }
      const lat = event.nativeEvent.coordinate.latitude;
      const lng = event.nativeEvent.coordinate.longitude;
  
      setSelectedLocation({ lat: lat, lng: lng });
    }
  
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={selectLocationHandler}
        >
          {selectedLocation && (
            <Marker
              title="Beehive Adam"
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={require('../../../assets/apiary.png')}
                style={{ width: 30, height: 30, tintColor: 'black' }}
                resizeMode="contain"
              />
            </Marker>
          )}
        </MapView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleText}>🐝 Beehive Adam Details:</Text>
              <Text style={styles.detailText}>👥 Bees inside: <Text style={styles.infoText}>{hiveDetails.beesInside}</Text></Text>
              <Text style={styles.detailText}>🌼 Bees outside: <Text style={styles.infoText}>{hiveDetails.beesOutside}</Text></Text>
              <Text style={styles.detailText}>⚖️ Weight: <Text style={styles.infoText}>{hiveDetails.weight}</Text></Text>
              <Text style={styles.detailText}>🌡️ Temperature: <Text style={styles.infoText}>{hiveDetails.temperature}</Text></Text>
              <Text style={styles.detailText}>💧 Humidity: <Text style={styles.infoText}>{hiveDetails.humidity}</Text></Text>
              <Button
                title="Close"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
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
      backgroundColor: "#f0f0f0",
      borderRadius: 20,
      padding: 35,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    titleText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    detailText: {
      fontSize: 16,
      marginBottom: 5,
    },
    infoText: {
      fontWeight: "bold",
    },
});

export default Map;
