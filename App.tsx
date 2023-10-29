import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './app/navigators/TabNavigator';
import MovieDetailsScreen from "./app/screens/MovieDetailsScreen";
import SeatBookingScreen from "./app/screens/SeatBookingScreen";
import HomeScreen from "./app/screens/HomeScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  console.log("TopCorn is executed by Soham");

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={TabNavigator} 
        options={{animation: 'default'}}/>

        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} 
        options={{animation: 'slide_from_right'}}/>

        <Stack.Screen name="SeatBooking" component={SeatBookingScreen}
        options={{animation: 'slide_from_bottom'}}/>

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;