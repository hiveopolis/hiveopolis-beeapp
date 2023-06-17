import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();


// removed <NavigationContainer>
export default function MapAndPlaces() {
  return (
    <>
      <StatusBar style='dark' />
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}>
          <Stack.Screen 
          name="AllPlaces" 
          component={AllPlaces} 
          options={({navigation}) => ({
            title: 'Your Photos of Places',
            headerRight: ({tintColor}) => (
            <IconButton 
            icon="add" 
            size={24} 
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
