import React, {useEffect, useState} from 'react';
import{StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, FlatList, ActivityIndicator, 
	Image, ImageBackground} from 'react-native';
import {baseImagePath, movieDetails, movieCastDetails} from "../api/apicalls";

import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';
import Icon from 'react-native-vector-icons/FontAwesome';

// Function to fetch movie details from API based on movieid
const getMovieDetails = async(movieid: number) => {
  try{
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch(error){
    console.error('Something went wrong in getMovieDetails function', error);
  }
};

// Function to fetch movie cast details from API based on movieid
const getMovieCastDetails = async(movieid: number) => {
  try{
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch(error){
    console.error('Something went wrong in getMovieCastDetails function', error);
  }
};

const MovieDetailsScreen = ({navigation, route}: any) => {
	const [movieData, setMovieData] = useState<any>(undefined);
	const [movieCastData, setMovieCastData] = useState<any>(undefined);

	useEffect(() => {
    // Fetch movie details
    (async() => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
  	})();

    // Fetch movie cast details
  	(async() => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
  	})();
  }, []);

  if(movieData==undefined && movieData==null 
    && movieCastData==undefined && movieCastData==null){
    return(

      /* Display a loading indicator while data is being fetched 
        or when data is not yet available */
      <ScrollView style={styles.container} bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <StatusBar hidden/>
                
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close" header={""}
            action={() => navigation.goBack()}/>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'gold'} />
        </View>
      </ScrollView>
    );
  }

  return(
    /* Render the whole screen UI */
    <ScrollView style={styles.container} bounces={false}
      showsVerticalScrollIndicator={false}>
        <StatusBar hidden/>

        <View>
          <ImageBackground
            source={{ uri: baseImagePath('w780', movieData?.backdrop_path) }}
            style={styles.imageBG}>

            {/* Linear gradient overlay */}
            <LinearGradient
              colors={['transparent', 'black']}
              style={styles.linearGradient}>
              <View style={styles.appHeaderContainer}>
                <AppHeader
                  name="close" header={''}
                  action={() => navigation.goBack()}
                />
              </View>
            </LinearGradient>
          </ImageBackground>

        <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w780', movieData?.poster_path)}}
          style={styles.cardImage}
        />
      </View>

      {/* Title and Tagline section */}

      <View>
        <Text style={styles.titleText}>{movieData?.original_title}</Text>
        <Text style={styles.tagline}>
          <Icon name="quote-left" style={styles.quoteIcon} /> 
            {movieData?.tagline} 
          <Icon name="quote-right" style={styles.quoteIcon} /> 
        </Text>

        {/* Genre section */}
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View key={item.id} style={styles.genreBox}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Star, Clock and User section */}

      <View style={styles.starClockUserContainer}>
        <View style={styles.iconTextContainer}>
          <Icon name="star" style={styles.commonIcon} />
          <Text style={styles.commonText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
        </View>

        <View style={styles.iconTextContainer}>
          <Icon name="clock-o" style={styles.commonIcon} />
          <Text style={styles.commonText}>
            {Math.floor(movieData?.runtime / 60)}h{' '}
            {Math.floor(movieData?.runtime % 60)}m
          </Text>
        </View>

        <View style={styles.iconTextContainer}>
          <Icon name="user" style={styles.commonIcon} />
          <Text style={styles.commonText}>
            {(movieData?.adult) ? "Adult" : "Universal"}
          </Text>
        </View>
      </View>

      {/* Release Date section */}

      <View style={styles.calendarContainer}>
        <View style={styles.iconTextContainer}>
          <Icon name="calendar" style={styles.commonIcon} />
          <Text style={styles.commonText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleString('default', { month: 'long' })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
      </View>

      {/* Description section */}

      <View style={styles.infoContainer}>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>

      {/* Top Casts section */}

      <View style={styles.castContainer}>
        <CategoryHeader title="Top Casts" iconName="group"
          tagline="Unveiling the Leading Faces!" />
        <FlatList
          data={movieCastData}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.containerGap}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <CastCard
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              shouldMarginatedAtEnd={true}
              cardWidth={75}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subtitle={item.character}
            />
          )}
        />

        {/* Select Seats button */}

        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('SeatBooking', {
                BackdropImage: baseImagePath('w780', movieData.backdrop_path),
                PosterImage: baseImagePath('original', movieData.poster_path),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
	container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
	},
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: 18,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageBG: {
    flex: 1, 
    resizeMode: 'cover', 
    justifyContent: 'center', 
    alignItems: 'center',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
  cardImage: {
    width: '62%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    marginTop: 72,
    alignSelf: 'center',
    borderRadius: 10,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'serif',
    fontSize: 25,
    color: 'gold',
    marginHorizontal: 20,
    marginTop: 2,
  },
  tagline: {
    marginTop: 2,
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: 'gold',
    textAlign: 'center',
    margin: 5,
  },
  quoteIcon: {
    paddingHorizontal: 5,
    color: 'firebrick',
  },
  genreContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  genreBox: {
    borderColor: 'gold',
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 13,
    color: 'lightcyan',
  },
  starClockUserContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  calendarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  iconTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonIcon: {
    fontSize: 15,
    color: 'gold',
    marginRight: 6,
  },
  commonText: {
    fontSize: 13,
    color: 'lightcyan',
  },
  infoContainer: {
    padding: 15,
    paddingBottom: 5,
  },
  descriptionText: {
    paddingTop: 8,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  containerGap: {
    gap: 18,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonText: {
    borderRadius: 12 * 2,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'firebrick',
    color: 'white',
  },
});

export default MovieDetailsScreen;