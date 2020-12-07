import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Octicons";

import { Switch } from "react-native-switch";
import BackImage from "../static/images/BackIcon.png";
import { Avatar } from "react-native-paper";
import FileInput from "./FileUpload";
import * as Storage from "../utils/AsyncStorage";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

// import {showSnackBar} from '../components/SnackBar';

export default function NewCustomHeader(props) {
  const [loader, setLoader] = useState(false);
  const [userImage, setImage] = useState(void 0);
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
  const upload = async value => {
    let { data, uri, name } = value;
    setLoader(true);
    let res = await Storage.set("userImage", uri);
    let res2 = await Storage.get("userImage");
    console.log("res2", res2);
    setTimeout(() => {
      setLoader(false);
    }, 200);
    setImage(res2);
    return { name };
  };
  const { title = "My Feed", titleColor = "black", showAvtar = true } = props;
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
        <Text style={{ ...styles.headerName, color: titleColor }}>{title}</Text>
        {showAvtar ? (
          <>
            {userImage ? (
              <FileInput
                browseComponent={
                  <Image style={{ width: 24, height: 24, borderRadius: 15 }} source={{ uri: userImage }} />
                }
                data={{}}
                field={"userImage"}
                onlyImage={true}
                upload={upload}
              />
            ) : loader ? (
              <ActivityIndicator size="small" color="red" />
            ) : (
              <FileInput
                browseComponent={<Avatar.Text size={24} label="AP" />}
                data={{}}
                field={"userImage"}
                onlyImage={true}
                upload={upload}
              />
            )}
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleName: {
    fontFamily: "NunitoSans",
    fontSize: 12,
    fontStyle: "normal",
    textAlign: "left",
    color: "black"
  },
  headerName: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "left"
  }
});
