import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SmallMovieCards = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View style={[
        styles.container,

        // Apply marginLeft or marginRight based on props
        props.shoudlMarginatedAtEnd ? 
          props.isFirst ? { marginLeft: 20 } :
            props.isLast ? { marginRight: 20 } : {}
        : {},

        // Apply margin around the card based on props
        props.shouldMarginatedAround ? { margin: 15 } : {},

        // Apply maxWidth based on props
        { maxWidth: props.cardWidth },
      ]}>
        <Image
          style={[styles.cardImage, { width: props.cardWidth }]}
          source={{ uri: props.imagePath }}
        />
        <Text numberOfLines={2} style={styles.textTitle}>{props.title}</Text> 
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
    marginTop: 14,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 25, 
    borderColor: 'lightgrey',
    borderWidth: 0.12,
  },
  textTitle: {
    fontFamily: 'serif',
    fontSize: 15,
    color: 'gold',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },
});

export default SmallMovieCards;