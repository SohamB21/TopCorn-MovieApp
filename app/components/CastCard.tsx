import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: 20}
            : props.isLast
            ? {marginRight: 20}
            : {}
          : {},
        {maxWidth: props.cardWidth},
      ]}>
      <Image
        source={{uri: props.imagePath}}
        style={[styles.cardImage, {width: props.cardWidth}]}
      />
      <Text style={styles.title} numberOfLines={2}> {props.title} </Text>
      <Text style={styles.subtitle} numberOfLines={1}> {props.subtitle} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1920 / 2880,
    borderRadius: 20 * 4,
  },
  title: {
    alignSelf: 'stretch',
    fontFamily: 'serif',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    alignSelf: 'stretch',
    fontSize: 11,
    color: 'lightgray',
  },
});

export default CastCard;