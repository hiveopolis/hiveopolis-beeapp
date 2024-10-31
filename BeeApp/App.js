import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CategoriesScreen from './screens/CategoriesScreen';

import MapAndPlaces from './src/Map/Map'
import Weather from './src/OpenWeatherAPI';
import Autentication from './src/UserAuthentication';
import HOBeehiveLiveView from './src/HOBeehiveLiveView/HOBeehiveLiveView'
import MapAll from './src/Map/screens/MapAll';
import JournalScreen from './screens/JournalScreen.js';

import { useEffect, useState } from 'react';
import { init } from './src/Map/database';


const Stack = createNativeStackNavigator();

export default function App() 
{
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//FDA403
  return (
    <>
    <StatusBar style='light' />
    <NavigationContainer>
    
      <Stack.Navigator 
        initialRouteName="HIVEOPOLIS"  // Set the initial screen here
        screenOptions={{
          headerStyle: { backgroundColor: '#FDA403' },
          headerTintColor: 'black',
          contentStyle: { backgroundColor: '#ECDBBA' },
      }}>
        <Stack.Screen name="HIVEOPOLIS" component={CategoriesScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Places"     component={MapAndPlaces} />
        <Stack.Screen name="Weather"    component={Weather}/>
        <Stack.Screen name="Account"    component={Autentication} />
        <Stack.Screen name="Beehives"   component={HOBeehiveLiveView} />
        <Stack.Screen name="MainMap"    component={MapAll}/>
        <Stack.Screen name="Journal"    component={JournalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


