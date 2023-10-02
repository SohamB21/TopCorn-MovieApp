import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setSearchText(textInput)} value={searchText}
        placeholder="Search for movies..." placeholderTextColor={'grey'}/>

      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <Icon name="search" size={26} color="lightcyan"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 1,
    paddingHorizontal: 12,
    marginHorizontal: 3,
    borderWidth: 1.5,
    borderColor: 'gold',
    borderRadius: 20,
    marginTop: 3,
  },
  textInput: {
    width: '88%',
    fontSize: 18,
    color: 'white',
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default InputHeader;