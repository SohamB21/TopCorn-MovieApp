import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import {View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
	const dimensions = useWindowDimensions();
  	const isPortrait = dimensions.height > dimensions.width;
  	const tabBarHeight = isPortrait ? '7%' : '15%'; 

	return(
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: 'black',
					borderTopWidth: 0,
					height: tabBarHeight,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}
			}}
		>
	      <Tab.Screen name="Home" component={HomeScreen} 
	      	options={{
	      		tabBarShowLabel: false,
	      		tabBarIcon: ({focused, color, size}) => {
	      			return (
	      				<View style={[styles.activeTabBackground, 
	      					focused ? {backgroundColor: 'gold'} : {}]}>
	      					<Text style={[styles.textColor, 
	      						focused ? {color: 'black', fontWeight: 'bold'} : {}]}>Home</Text>
	      				</View>
      				);
	      		},
	      	}}/>
	      <Tab.Screen name="Search" component={SearchScreen} 
	      	options={{
	      		tabBarShowLabel: false,
	      		tabBarIcon: ({focused, color, size}) => {
	      			return (
	      				<View style={[styles.activeTabBackground, 
	      					focused ? {backgroundColor: 'gold'} : {}]}>
	      					<Text style={[styles.textColor, 
	      						focused ? {color: 'black', fontWeight: 'bold'} : {}]}>Search</Text>
	      				</View>
      				);
	      		},
	      	}}/>
	      <Tab.Screen name="Ticket" component={TicketScreen} 
	      	options={{
	      		tabBarShowLabel: false,
	      		tabBarIcon: ({focused, color, size}) => {
	      			return (
	      				<View style={[styles.activeTabBackground, 
	      					focused ? {backgroundColor: 'gold'} : {}]}>
	      					<Text style={[styles.textColor, 
	      						focused ? {color: 'black', fontWeight: 'bold'} : {}]}>Tickets</Text>
	      				</View>
      				);
	      		},
	      	}}/>
	      <Tab.Screen name="User" component={UserAccountScreen}
	      	options={{
	      		tabBarShowLabel: false,
	      		tabBarIcon: ({focused, color, size}) => {
	      			return (
	      				<View style={[styles.activeTabBackground, 
	      					focused ? {backgroundColor: 'gold'} : {}]}>
	      					<Text style={[styles.textColor, 
	      						focused ? {color: 'black', fontWeight: 'bold'} : {}]}>Profile</Text>
	      				</View>
      				);
	      		},
	      	}}/>
	    </Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	activeTabBackground: {
		backgroundColor: 'black',
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 24,
	},
	textColor: {
		color: 'gold',
		fontSize: 16,
	}
});
export default TabNavigator;