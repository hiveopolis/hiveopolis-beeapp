import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import WeatherScreen from './screens/WeatherScreen';
import { useEffect, useState } from 'react';
import { init } from './src/Map/database';

const Stack = createNativeStackNavigator();

export default function App() {
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


  return (
    <>
    <StatusBar style='light' />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#351401' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#3f2f25' },
      }}>
        <Stack.Screen name="HIVEOPOLIS" component={CategoriesScreen} options={{
          title: 'All Categories',

        }}

        />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} options={({ route, navigation }) => {
          const catId = route.params.categoryId;
          return {
            title: catId,
          };
        }}

        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


