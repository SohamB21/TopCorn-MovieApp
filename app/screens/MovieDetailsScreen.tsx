import React, {Component} from 'react';
import{
	StyleSheet,
	View,
	Text
} from 'react-native';

export default class MovieDetailsScreen extends Component{
	render(){
		console.log("MovieDetailsScreen is executed by Soham");

		return(
			<View style={styles.container}>
				<Text>This is my MovieDetailsScreen!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {

	}
});