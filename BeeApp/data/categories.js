import Category from '../models/category';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Image } from 'react-native';


//<a href="https://www.flaticon.com/free-icons/beehive" title="beehive icons">Beehive icons created by Freepik - Flaticon</a>

export const CATEGORIES = [
  new Category('Places'  , 'Places',   '#ECDBBA', <Ionicons name='location-outline' size={40} color="black" />),
  new Category('Weather' , 'Weather',  '#ECDBBA', <Ionicons name='partly-sunny-outline' size={40} color="black" />),
  new Category('Account' , 'Account',  '#ECDBBA', <Ionicons name='person-outline' size={40} color="black" />),
  new Category('Beehives', 'Beehives', '#ECDBBA', <Image source={require('../assets/apiary.png')} fadeDuration={0} style={{ width: 40, height: 40 }} />),
  new Category('MainMap' , 'Main Map', '#ECDBBA', <Ionicons name='map-outline' size={40} color="black" />),
  new Category('Journal' , 'Journal',  '#ECDBBA', <Ionicons name='clipboard-outline' size={40} color="black" />),
];