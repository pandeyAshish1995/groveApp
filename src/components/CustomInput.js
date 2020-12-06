import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import color from '../styles/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const {customInputBorderColor} = color;

const CustomInput = ({label, secureTextEntry = false, value, onChange}) => {
  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainerStyle}>
        <TextInput
          value={value}
          placeholder={label}
          onChangeText={(text) => onChange({name: label, value: text})}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    // backgroundColor:'red',
    width: screenWidth * 0.775,
    // width: screenWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'yellow'
  },
  labelContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textInputContainerStyle: {
    flex: 1,
    height: screenHeight * 0.0625,
    // backgroundColor:'green',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: customInputBorderColor,
    borderRadius: 6,
    justifyContent: 'center',
  },
});

export default CustomInput;
