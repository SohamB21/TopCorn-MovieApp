import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, 
	ToastAndroid } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const timeArray: string[] = [ '08.30', '10:00', '12:30', '14:00', '15:30', '19:00', '21:00' ];

const generateDate = ()=> {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i *24*60*60*1000).getDate(),
      day: weekday[new Date(date.getTime() + i *24*60*60*1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = ()=> {
  let numRow = 10;
  let numColumn = 5;
  let rowArray = [];
  let start = 1;

  for (let i=0; i<numRow; i++) {
    let columnArray = [];
    for (let j=0; j<numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
        blank: (i>2 && j==5) ? true : false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if(i>=0 && i<=2)
      numColumn += 2;
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}: any) => {

  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subindex: number, num: number) => {
    if(!twoDSeatArray[index][subindex].taken && 
        !twoDSeatArray[index][subindex].blank){
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if(!array.includes(num)){
        array.push(num);
        setSelectedSeatArray(array);
      }
      else{
        const tempindex = array.indexOf(num);
        if(tempindex > -1){
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async ()=> {
    if(selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined){
      try{
        await EncryptedStorage.setItem(
          'ticket', JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.PosterImage,
          }),
        );
      } catch(error){
        console.error('Something went wrong in BookSeats function', error);
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
    }
    else{
      ToastAndroid.showWithGravity(
        'Please choose your preferred seats, select a date and showtime.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <ScrollView style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false} >
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{ uri: route.params?.BackdropImage }}
          style={styles.imageBG}>

          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close" header={''}
                action={() => navigation.goBack()} />
            </View>
          </LinearGradient>

        </ImageBackground>
        <Text style={styles.screenText}>Screen This Side</Text>
      </View>

      <View style={styles.seatContainer}>
      	<View style={styles.containerGap}>
          {twoDSeatArray?.map((item, index) => {
          	return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem, subindex) => {
                  return (

                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {selectSeat(index, subindex, subitem.number);}}>
                      <Icon name="user-o"
                        style={[
                          styles.seatIcon,
                          subitem.taken ? {color: 'firebrick'} : {},
                          subitem.selected ? {color: 'gold'} : {},
                          subitem.blank ? {color: 'black'} : {},
                        ]}
                      />
                    </TouchableOpacity>

                  );
                })}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <Icon name="user" 
            	style={[styles.radioIcon, {color: 'white'}]}/>
            <Text style={styles.radioText}>Available</Text>
          </View>

          <View style={styles.radioContainer}>
            <Icon name="user" 
            	style={[styles.radioIcon, {color: 'gold'}]}/>
            <Text style={styles.radioText}>Selected</Text>
          </View>

          <View style={styles.radioContainer}>
            <Icon name="user" 
            	style={[styles.radioIcon, {color: 'firebrick'}]}/>
            <Text style={styles.radioText}>Sold</Text>
          </View>
        </View>

        <View>
        <FlatList
          data={dateArray}
          bounces={false}
          keyExtractor={item => item.date}
          contentContainerStyle={styles.containerGap}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: 18}
                      : index == dateArray.length - 1
                      ? {marginRight: 18}
                      : {},
                    index == selectedDateIndex
                      ? {
	                      	backgroundColor: 'lightcyan', 
						  	borderColor: 'gold', 
						  	borderWidth: 1.5,
					  	}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.outerContainer}>
        <FlatList
          data={timeArray}
          bounces={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.containerGap}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? {marginLeft: 18}
                      : index == dateArray.length - 1
                      ? {marginRight: 18}
                      : {},
                    index == selectedTimeIndex
                      ? {
	                      	backgroundColor: 'lightcyan', 
						  	borderColor: 'gold', 
						  	borderWidth: 1.5,
                      	}
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Amount</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Confirm Tickets</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  	backgroundColor: 'black',
  },
  appHeaderContainer: {
    marginHorizontal: 15,
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
  imageBG: {
    flex: 1, 
    resizeMode: 'cover', 
    justifyContent: 'center', 
    alignItems: 'center',
    aspectRatio: 3072 / 1727,
  },
  screenText: {
    textAlign: 'center',
    fontSize: 10,
    color: 'lightgrey',
  },
  seatContainer: {
    marginVertical: 20,
  },
  containerGap: {
    gap: 18,
  },
  seatRow: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: 19,
    color: 'white',
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: 20,
    color: 'white',
  },
  radioText: {
    fontSize: 14,
    color: 'white',
  },
  dateContainer: {
    width: 10 * 6,
    height: 10 * 8,
    borderRadius: 10 * 10,
    borderColor: 'firebrick',
    borderWidth: 1.5,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 25,
    color: 'navy',
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 12,
    color: 'navy',
  },
  outerContainer: {
    marginVertical: 15,
  },
  timeContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderColor: 'firebrick',
    borderWidth: 1.5,
    borderRadius: 25,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'navy',
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gold',
  },
  price: {
    fontSize: 24,
    color: 'lightcyan',
    fontFamily: 'serif',
  },
  buttonText: {
    backgroundColor: 'lightcyan',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    borderColor: 'gold',
    borderWidth: 1.5,
    fontSize: 16,
    color: 'navy',
    fontWeight: 'bold',
  },
});

export default SeatBookingScreen;