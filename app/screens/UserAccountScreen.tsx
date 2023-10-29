import React from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';

import {useNavigation} from '@react-navigation/native';
import HomeScreen from "./app/screens/HomeScreen";
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = () => {
  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close" header={'My Profile'}
          action={navigateToHome} />
      </View>

      <View style={styles.userContainer}>
        <Image source={require('../assets/images/userImg.jpg')} 
        style={styles.userImage}/>
        <Text style={styles.userText}>Soham Banik</Text>
      </View>

      <View style={styles.infoContainer}>
        <SettingComponent 
          icon="user"
          heading="Your Account"
          subheading="Edit Your Profile"
          subtitle="Change Your Password" />

          <SettingComponent 
          icon="gear"
          heading="Account Settings"
          subheading="Payments, Permissions & More"
          subtitle= "Change App Theme" />

          <SettingComponent 
          icon="gift"
          heading="Gift Coupons"
          subheading="Offers & Referrals"
          subtitle="View Your Rewards & Unlock New Ones" />

          <SettingComponent 
          icon="user"
          heading="Help Centre"
          subheading="Contact Us For Assistance"
          subtitle="About & more" />          
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  textColor: {
    color: 'black',
  },
  appHeaderContainer: {
    display: 'flex',
    marginLeft: 20,
    marginTop: 10,
  },
  userContainer: {
    alignItems: 'center',
    padding: 20,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderColor: 'firebrick',
    borderWidth: 2,
  },
  userText:{
    fontSize: 25,
    color: 'gold',
    paddingVertical: 10,
  },
});

export default UserAccountScreen;