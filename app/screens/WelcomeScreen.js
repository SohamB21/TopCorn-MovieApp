import React, {Component} from 'react';
import{
	ImageBackground,
	StyleSheet,
	View,
	Image, 
	Text
} from 'react-native';

export default class WelcomeScreen extends Component{
	render(){
		console.log("WelcomeScreen is executed by Soham");

		return(
			<ImageBackground style={styles.background} source={require("../assets/background.jpg")}>

				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require("../assets/logo.png")} />
					<Text style={styles.tagline}>This is my WelcomeScreen!</Text>
				</View>

				<View style={styles.loginButton}></View>  
				<View style={styles.registerButton}></View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	loginButton: {
		width: '100%',
		height: 70,
		backgroundColor: 'lightgreen',
		color: 'white',
	},
	registerButton: {
		width: '100%',
		height: 70,
		backgroundColor: 'skyblue',
		color: 'white',
	},
	logo: {
		width: 100,
		height: 100,
	},
	logoContainer: {
		position: "absolute",
		top: 50,
		alignItems: "center",
		color: "navy"
	},
	tagline: {
		marginVertical: 8,
		fontWeight: "bold",
		fontSize: 22,
	}
})