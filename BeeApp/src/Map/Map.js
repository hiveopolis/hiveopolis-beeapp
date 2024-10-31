import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/IconButton';
import Map from './screens/Map';
import MapPlacePick from './screens/MapPlacePick';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();


// removed <NavigationContainer>
export default function MapAndPlaces() 
{
  return (
    <>
      <StatusBar style='dark' />
      <Stack.Navigator screenOptions={{
        headerStyle: {backgroundColor: '#EBBC4E'},
        headerTintColor: '#ffffff',
        contentStyle: { backgroundColor: '#ECDBBA' },
      }}>
        <Stack.Screen 
          name="AllPlaces" 
          component={AllPlaces} 
          options={({navigation}) => ({
            title: 'Your Places',
            headerRight: ({tintColor}) => (
            <IconButton 
              icon="add" 
              size={30} 
              color={tintColor} 
              onPress={() => navigation.navigate('AddPlace')}
            />
            ),
          })}
        />
        <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add a new Place',
          }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="MapPlacePick" component={MapPlacePick}
        />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            title: 'Loading Place...',
          }}
        />
      </Stack.Navigator>
    </>
  );
}
