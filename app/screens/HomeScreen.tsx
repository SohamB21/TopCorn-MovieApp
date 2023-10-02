import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {nowPlayingMovies, popularMovies, upcomingMovies, baseImagePath} from "../api/apicalls";
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SmallMovieCards from '../components/SmallMovieCards';
import BigMovieCards from '../components/BigMovieCards';

const  {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async() => {
  try{
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch(error){
    console.error('Something went wrong in getNowPlayingMoviesList function', error);
  }
};

const getPopularMoviesList = async() => {
  try{
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch(error){
    console.error('Something went wrong in getPopularMoviesList function', error);
  }
};

const getUpcomingMoviesList = async() => {
  try{
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch(error){
    console.error('Something went wrong in getUpcomingMoviesList function', error);
  }
};

const HomeScreen = ({navigation}: any) => {

  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  // To fetch and set data
  useEffect(() => {
    (async() => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([{id: 'dummy1'}, ...tempNowPlaying.results, {id: 'dummy2'}]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, []);

  const searchMoviesFunction = () => { 
    navigation.navigate("Search");
  };

  // To display loading indicator while data is being fetched
  if((nowPlayingMoviesList==undefined || nowPlayingMoviesList==null)
  && (popularMoviesList==undefined || popularMoviesList==null) 
  && (upcomingMoviesList==undefined || upcomingMoviesList==null)){
    return(
      <ScrollView style={styles.container} bounces={false} 
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden/>

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction}/>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'gold'}/>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden/>
      <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction}/>
      </View>

      {/*Now Playing Movies Section*/}
      <CategoryHeader title={"Now Playing Movies"} 
        tagline={"Lights, Camera, Action: Get Your Popcorns Ready!"}
        iconName={"film"}/>
      <FlatList 
        data={nowPlayingMoviesList} 
        keyExtractor={(item: any) => item.id} 
        contentContainerStyle={styles.containerGap} 
        bounces={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width*0.7 + 20}
        decelerationRate={1}
        horizontal
        renderItem={({item, index}) => {
          if (!item.original_title){
            return (
              <View
                style={{
                  width: (width - (width*0.7 + 20*2)) / 2,
                }}></View>
            );
          }
          return (
            <BigMovieCards title={item.original_title} 
              imagePath={baseImagePath('w780', item.poster_path)}
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }} 
              cardWidth={width * 0.7}
              isFirst={index==0 ? true : false}
              isLast={index==nowPlayingMoviesList?.length-1 ? true : false}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />

      {/*Popular Movies Section*/}
      <CategoryHeader title={"Popular Movies"} 
        tagline={"For the Movie Buff in You: Hits at Your Fingertips!"}
        iconName={"bomb"}/>
      <FlatList 
        data={popularMoviesList} 
        keyExtractor={(item: any) => item.id} 
        contentContainerStyle={styles.containerGap} 
        bounces={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <SmallMovieCards title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)}
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }} 
            cardWidth={width / 3}
            isFirst={index==0 ? true : false}
            isLast={index==popularMoviesList?.length-1 ? true : false}
          />
        )}
      />
      
      {/*Upcoming Movies Section*/}
      <CategoryHeader title={"Upcoming Movies"} 
        tagline={"Sneak a Peek: Be First in Line for Upcoming Movies!"}
        iconName={"forward"}/>
      <FlatList 
        data={upcomingMoviesList} 
        keyExtractor={(item: any) => item.id} 
        contentContainerStyle={styles.containerGap} 
        bounces={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <SmallMovieCards title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)}
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }} 
            cardWidth={width / 3}
            isFirst={index==0 ? true : false}
            isLast={index==upcomingMoviesList?.length-1 ? true : false}
          />
        )}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    backgroundColor: 'black',
  },
  textColor: {
    color: 'gold',
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: 10, 
    marginTop: 10,
  },
  containerGap: {
    gap: 20,
  },
});

export default HomeScreen;