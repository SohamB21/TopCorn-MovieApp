import React, {Component} from 'react';
import{
	StyleSheet,
	View,
	Text
} from 'react-native';

export default class SeatBookingScreen extends Component{
	render(){
		console.log("SeatBookingScreen is executed by Soham");

		return(
			<View style={styles.container}>
				<Text>This is my SeatBookingScreen!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {

	}
});