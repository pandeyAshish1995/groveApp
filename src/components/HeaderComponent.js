import React, { useEffect } from "react";
import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Octicons";

import { Switch } from "react-native-switch";
import BackImage from "../static/images/BackIcon.png";
import { Avatar } from "react-native-paper";
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
// import {showSnackBar} from '../components/SnackBar';

export default function NewCustomHeader() {
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
        backgroundColor: "#efeff5",
        paddingTop: screenHeight * 0.03,
        paddingHorizontal: 15
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <Text style={styles.titleName}>{"TODAY"}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={styles.headerName}>{"My Feed"}</Text>
        <Avatar.Text size={30} label="AP" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleName: {
    fontFamily: "NunitoSans",
    fontSize: 12,
    fontStyle: "normal",
    // lineHeight: 'normal',
    // letterSpacing: 'normal',
    textAlign: "left",
    color: "black"
  },
  headerName: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    // lineHeight: 'normal',
    // letterSpacing: 'normal',
    textAlign: "left",
    color: "black"
  }
});
