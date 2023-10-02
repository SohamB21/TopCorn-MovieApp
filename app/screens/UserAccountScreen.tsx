import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const UserAccountScreen = () => {
  console.log("UserAccountScreen is executed by Soham");

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>This is my UserAccountScreen!</Text>
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

export default UserAccountScreen;