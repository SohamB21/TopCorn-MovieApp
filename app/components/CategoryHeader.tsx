import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryHeader = (props: any) => {
  return(
    <View style={styles.container}>
      <View style={styles.titleIconContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Icon name={props.iconName} size={22} color="navy" />
      </View>
      <Text style={styles.taglineText}>{props.tagline}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'serif',
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginVertical: 16,
    paddingVertical: 6,
    backgroundColor: 'gold',
    borderRadius: 12,
    borderColor: 'firebrick',
    borderWidth: 1,
  },
  titleIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 19,
    fontWeight:'bold',
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  taglineText: {
    fontSize: 15,
    fontWeight:'bold',
    color: 'firebrick',
  },
});

export default CategoryHeader;