import { useLayoutEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { CATEGORIES } from '../data/categories';

import Weather from '../src/OpenWeatherAPI';
import HOBeehiveLiveView from '../src/HOBeehiveLiveView/HOBeehiveLiveView'
import MapAndPlaces from '../src/Map/Map'

import Map from '../src/Map/screens/Map';
import JournalScreen from '../screens/JournalScreen'

import Autentication from '../src/UserAuthentication';
import { useEffect, useState } from 'react';

function WeatherScreen({route, navigation}) 
{
    const catId = route.params.categoryId;
    

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation]);


    if (catId == 'c1' ) {
        return (
          <View style={styles.container}>
            <MapAndPlaces />
          </View>
        )
    } else if (catId == 'c2' ) {
        return (
          <View style={styles.container}>
            <Weather />
          </View>
        )
    } else if (catId == 'c3' ) {
        return (
          <View style={styles.container}>
            <Autentication />
          </View>
        )
    } else if (catId == 'c4' ) {
        return (
          <View style={styles.container}>
            <HOBeehiveLiveView />
          </View>
        )
    } else if (catId == 'c5' ) {
      useEffect(() => {
          navigation.navigate('MainMap');
      }, []);
      return;
      return (
        <View style={styles.container}>
          <MapAndPlaces />
        </View>
      )
    } else if (catId == 'c6') {
      return (
        <View style={styles.container}>
          <JournalScreen />
        </View>
      )
  } else {
      return (
      <View style={styles.container}>
        <Text>Das ist screen - {catId} </Text>
      </View>
      )
    }
};

export default WeatherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
    }
});