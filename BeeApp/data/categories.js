import Category from '../models/category';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Image } from 'react-native';


//<a href="https://www.flaticon.com/free-icons/beehive" title="beehive icons">Beehive icons created by Freepik - Flaticon</a>

export const CATEGORIES = [
  new Category('c1', 'Places',   '#ECDBBA', <Ionicons name='location-outline' size={40} color="black" />),
  new Category('c2', 'Weather',  '#ECDBBA', <Ionicons name='partly-sunny-outline' size={40} color="black" />),
  new Category('c3', 'Account',  '#ECDBBA', <Ionicons name='person-outline' size={40} color="black" />),
  new Category('c4', 'Beehives', '#ECDBBA', <Image source={require('../assets/apiary.png')} fadeDuration={0} style={{ width: 40, height: 40 }} />),
  new Category('c5', 'Map',      '#ECDBBA', <Ionicons name='map-outline' size={40} color="black" />),
  new Category('c6', 'Journal',  '#ECDBBA', <Ionicons name='clipboard-outline' size={40} color="black" />),
];