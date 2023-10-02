import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Mapping of genre IDs to genre names
const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const BigMovieCards = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View style={[
        styles.container,

        // Apply marginLeft or marginRight based on props
        props.shoudlMarginatedAtEnd ? 
          props.isFirst ? { marginLeft: 22 } :
            props.isLast ? { marginRight: 22 } : {}
        : {},

        // Apply margin around the card based on props
        props.shoudlMarginatedAround ? { margin: 5 } : {},

        // Apply maxWidth based on props
        { maxWidth: props.cardWidth },
      ]}>
        <Image
          style={[styles.cardImage, { width: props.cardWidth }]}
          source={{ uri: props.imagePath }}
        />
        <View>
          <View style={styles.rateContainer}>
            <Icon name="star" size={15} color="gold"/>
            <Text style={styles.voteText}>
              {props.vote_average} ({props.vote_count})
            </Text>
          </View>

          <Text numberOfLines={2} style={styles.textTitle}>{props.title}</Text> 

          <View style={styles.genreContainer}>
            {props.genre.map((item: any) => {
              return (
                <View key={item} style={styles.genreBox}>
                  <Text style={styles.genreText}>{genres[item]}</Text>
                </View>
              );
            })}
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 15,
    borderColor: 'lightgrey',
    borderWidth: 0.12,
  },
  textTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    color: 'gold',
    textAlign: 'center',
    paddingVertical: 8,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  voteText: {
    color: 'white',
    fontSize: 13,
  },
  genreContainer: {
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
});

export default BigMovieCards;