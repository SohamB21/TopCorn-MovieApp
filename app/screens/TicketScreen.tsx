import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(()=> {
    (async ()=> {
      try{
        const ticket = await EncryptedStorage.getItem('ticket');
        if(ticket !== undefined && ticket !== null)
          setTicketData(JSON.parse(ticket));
      } catch (error){
        console.error('Something went wrong in TicketScreen while getting data', error);
      }
    })();
  }, []);

  if(ticketData!==route.params && route.params!=undefined){
    setTicketData(route.params);
  }

  if(ticketData==undefined || ticketData==null){
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close" header={'My Tickets'}
            action={() => navigation.goBack()} />
        </View>

      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close" header={'My Tickets'}
          action={() => navigation.goBack()} />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBGImage}>

          <LinearGradient
            colors={['transparent', 'gold']}
            style={styles.linearGradient}>
            <View style={[ styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40} ]}>
            </View>
            <View style={[ styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40} ]}>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View style={[ styles.blackCircle,
              {position: 'absolute', top: -40, left: -40} ]}>
          </View>

          <View style={[ styles.blackCircle,
              {position: 'absolute', top: -40, right: -40} ]}>
          </View>

          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Icon name="clock-o" style={styles.clockIcon} />
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>

          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>2 A</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>

          <Image
            source={require('../assets/images/qrCode.jpg')}
            style={styles.qrcodeImage} />
          <Text style={styles.scanText}>* Scan this QR code before entering the hall</Text>
        </View>
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
  appHeaderContainer: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 250,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderTopColor: 'firebrick',
    borderWidth: 0.25,
  },
  linearGradient: {
    height: '50%',
  },
  blackCircle: {
    height: 75,
    width: 75,
    borderRadius: 80,
    backgroundColor: 'black',
  },
  linear: {
    borderTopColor: 'navy',
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'gold',
    borderStyle: 'dotted',
  },
  ticketFooter: {
    backgroundColor: 'gold',
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'navy',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'navy',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'firebrick',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 24,
    color: 'navy',
    paddingBottom: 5,
  },
  qrcodeImage: {
    width: 85,
    height: 85,
    borderColor: 'navy',
    borderWidth: 1,
  },
  scanText: {
    textAlign: 'center',
    color: 'navy',
    paddingVertical: 8,
    fontSize: 10,
  }
});

export default TicketScreen;