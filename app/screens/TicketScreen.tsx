import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TicketScreen = () => {
  console.log("TicketScreen is executed by Soham");

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>This is my TicketScreen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  textColor: {
    color: 'black',
  }
});

export default TicketScreen;