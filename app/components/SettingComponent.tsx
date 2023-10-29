import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingComponent = (props: any) => {
  return (
    <View style={styles.container}>
      <Icon name={props.icon} style={styles.iconStyle} />

      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subheading}>{props.subheading}</Text>
        <View style={styles.subtitleContainer}>
          <Icon name={"bolt"} style={styles.subtitleIconStyle} />
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
      </View>

      <Icon name={'caret-right'} style={styles.arrowIconStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: 'gold',
    fontSize: 28,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    color: 'lightcyan',
  },
  subheading: {
    fontSize: 14,
    color: 'tomato',    
  },
  subtitleContainer: {
    flexDirection: 'row',
  },
  subtitle: {
    fontSize: 14,
    color: 'tomato',
  },
  subtitleIconStyle: {
    fontSize: 14,
    color: 'tomato',
    marginRight: 6,
    paddingVertical: 2,
  },
  arrowIconStyle: {
    color: 'lightcyan',
    fontSize: 28,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SettingComponent;
