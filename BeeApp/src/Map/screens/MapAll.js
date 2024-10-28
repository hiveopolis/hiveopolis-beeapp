import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { LineChart, BarChart } from 'react-native-chart-kit';

import IconButton from '../components/IconButton';

import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../database";


function PlaceMarker({ place, onPress }) 
{  
  if( place === undefined ) {
    return (<></>);
  } 
  
  console.log("id: " + place.id);
  
  return (
    <Marker
      key = {"marker-" + place.id}
      identifier={"marker-" + place.id}
      title={"Name: " + place.title}
      description={place.address}
      coordinate={{latitude: place.location.lat, longitude: place.location.lng}}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={onPress}
    >
      <Image source={require('../../../assets/hiveopolis-hive.png')} style={{ width: 32, height: 32 }} />
    </Marker>
  );
}


function Information({hiveDetails}) 
{
  console.log(hiveDetails);
  
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line color
    strokeWidth: 2, // Line stroke width
    barPercentage: 0.5,

    useShadowColorFromDataset: false, 
    propsForDots: {
      r: "4", // Radius of the point
      strokeWidth: "2", // Stroke width of the point border
      stroke: "#ffa726", // Border color of the point
      fill: '#ECDBBA' // Fill color of the point
    }
  };
  
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = (screenWidth - 80) / 2;
  
  return (
    <View>
      <Text style={styles.modalText}>Beehive Details</Text>
      <Text style={styles.detailText}>↜🐝 Bees inside: <Text style={styles.infoText}>{hiveDetails.beesInside}</Text></Text>
      <Text style={styles.detailText}>↝🌼 Bees outside: <Text style={styles.infoText}>{hiveDetails.beesOutside}</Text></Text>
      <Text style={styles.detailText}>⚖️ Weight: <Text style={styles.infoText}>{hiveDetails.weight}</Text></Text>
      <Text style={styles.detailText}>🌡️ Temperature: <Text style={styles.infoText}>{hiveDetails.temperature}</Text></Text>
      <Text style={styles.detailText}>💧 Humidity: <Text style={styles.infoText}>{hiveDetails.humidity}</Text></Text>
      
      {/* Spacer View for adding space between the details and graphs */}
      <View style={{ height: 20 }}></View> 

      <View style={styles.graphRow}>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Avg. Hive Temperature</Text>
          <LineChart data = {hiveDetails.temperatureData} width={chartWidth} height={160} chartConfig={chartConfig} bezier />
        </View>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Avg. Hive Humidity</Text>
          <LineChart data = {hiveDetails.humidityData} width={chartWidth} height={160} chartConfig={chartConfig} bezier />
        </View>
      </View>

      <View style={styles.graphRow}>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Avg. Bee Activity Levels</Text>
          <LineChart data = {hiveDetails.beeActivityData} width={chartWidth} height={160} chartConfig={chartConfig} bezier />
        </View>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Avg. Honey Production</Text>
          <LineChart data = {hiveDetails.honeyProductionData} width={chartWidth} height={160} chartConfig={chartConfig} bezier />
        </View>
      </View>
    </View>
    );
}


function MapAll({ route }) 
{
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const [loadedPlaces, setLoadedPlaces] = useState([]);

  // load saved places  
  const isFocused = useIsFocused();

  useEffect(() => {
      async function loadPlaces() {
          const places = await fetchPlaces();
          setLoadedPlaces(places)
      }
      if (isFocused) {
          loadPlaces();
          //setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
      }
  }, [isFocused]);


  const [hiveDetails, setHiveDetails] = useState({
    beesInside: 1000,
    beesOutside: 200,
    weight: "30kg",
    temperature: "34°C",
    humidity: "45%",
    
    temperatureData: {
      labels: ["Oct", "", "", "", "Feb", ""],
      datasets: [{ data: [33, 35, 34, 36, 37, 38] }],
    },
    
    humidityData: {
      labels: ["Oct", "", "", "", "Feb", ""],
      datasets: [{ data: [55, 58, 60, 62, 65, 63] }],
    },
    
    beeActivityData: {
      labels: ["Oct", "", "", "", "Feb", ""],
      datasets: [{ data: [200, 300, 250, 400, 450, 500] }],
    },
    
    honeyProductionData: {
      labels: ["Oct", "", "", "", "Feb", ""],
      datasets: [{ data: [20, 25, 22, 30, 35, 40] }],
    }
  });

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation ? initialLocation.lat : 47.08084083743499,
          longitude: initialLocation ? initialLocation.lng : 15.455417752857404,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {
        loadedPlaces.map( item => {
          return (<PlaceMarker place={item} onPress={selectLocationHandler}/>)
        })
      }
      </MapView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Information hiveDetails={hiveDetails} />
            <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
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

export default MapAll;

