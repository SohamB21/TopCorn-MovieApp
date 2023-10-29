import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions, StatusBar, FlatList} from 'react-native';
import {searchMovies, baseImagePath} from "../api/apicalls";
import InputHeader from '../components/InputHeader';
import SmallMovieCards from '../components/SmallMovieCards';

const  {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList]= useState([]);
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  const searchMoviesFunction = async (name: string) => {
    try{
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
      setNoMoviesFound(json.results.length === 0);
    } catch(error){
      console.error("Something went wrong in searchMoviesFunction ", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <View>
        <FlatList 
          data={searchList} 
          keyExtractor={(item: any) => item.id} 
          bounces={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2} 
          contentContainerStyle={styles.contentContainer} 
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          renderItem={({item, index}) => (
            <SmallMovieCards title={item.original_title} 
              imagePath={baseImagePath('w342', item.poster_path)}
              shoudlMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }} 
              cardWidth={width/2 - 15*2}
              title={item.original_title}
            />
          )}
        />
        {noMoviesFound && (
          <View style={styles.noMoviesFound}>
            <Text style={styles.noMoviesFoundText}>No movies found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1, 
    backgroundColor: 'black',
    alignItems: 'center',
    width,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: 10, 
    marginTop: 10,
    marginBottom: 18,
  },
  centerContainer: {
    alignItems: 'center',
  },
  noMoviesFound: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50%',
  },
  noMoviesFoundText: {
    color: 'grey',
    fontSize: 18,
  },
});

export default SearchScreen;