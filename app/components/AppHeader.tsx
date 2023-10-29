import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}> 
        <Icon name={props.name} style={styles.iconStyle}/>
      </TouchableOpacity>

      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    height: 30*2,
    width: 20*2,
  },
  iconStyle: {
    color: 'lightcyan',
    fontSize: 21,
  },
  iconBG: {
    height: 15*2,
    width: 15*2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'firebrick',
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
});

export default AppHeader;