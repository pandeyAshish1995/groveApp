import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Octicons';
import {Text} from 'react-native-paper';
import {Switch} from 'react-native-switch';
import BackImage from '../static/images/BackIcon.png';
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
// import {showSnackBar} from '../components/SnackBar';

export default function NewCustomHeader({
  onPressLeftIcon,
  Title,
  onRefresh = () => {},
  leftIconName,
  hideRefresh = false,
  hideRevenueViewSwitch = false,
  switchVal,
  onSwitchToggle = () => {},
  hideTitle = false,
}) {
  // useEffect(() => {
  //   showSnackBar({
  //     message: `Revenue View is ${switchVal ? 'on' : 'off'}`,
  //     textColor: '#FFF', // message text color
  //     position: 'bottom', // enum(top/bottom).
  //     duration: 2000, // (in ms), duartion for which snackbar is visible.
  //     animationTime: 200, // time duration in which snackbar will complete its open/close animation.
  //     backgroundColor: '#323232', //background color for snackbar
  //   });
  // }, [switchVal]);
  return (
    <View
      style={{
        width: screenWidth,
        backgroundColor: '#efeff5',
        justifyContent: 'center',
        paddingTop: screenHeight * 0.03,
        paddingBottom: 16,
      }}>
      <View style={{marginBottom: 8}}>
        <TouchableOpacity onPress={onPressLeftIcon}>
          <Image source={BackImage} resizeMode={'contain'} />
        </TouchableOpacity>
      </View>
      {!hideTitle && (
        <View>
          <Text style={styles.headerName}>{Title}</Text>
        </View>
      )}
      {/* {!hideRefresh && (
        <View style={{paddingRight: 20}}>
          <Icon1 name="retweet" size={30} color={'#000'} onPress={onRefresh} />
        </View>
      )}
      {!hideRevenueViewSwitch && (
        <View style={{paddingRight: 15}}>
          <Switch
            changeValueImmediately={true}
            value={switchVal}
            useNativeDriver={true}
            onValueChange={onSwitchToggle}
          />
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerName: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    // lineHeight: 'normal',
    // letterSpacing: 'normal',
    textAlign: 'left',
    color: '#fd6481',
  },
});
