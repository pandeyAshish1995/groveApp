import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-paper";
import FileInput from "./FileUpload";
import * as Storage from "../utils/AsyncStorage";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function NewCustomHeader(props) {
  const [loader, setLoader] = useState(false);
  const [userImage, setImage] = useState(void 0);
  const getImageData = async () => {
    const imgsrc = await Storage.get("userImage");
    setImage(imgsrc);
  };

  useEffect(() => {
    getImageData();
  }, []);
  const upload = async value => {
    let {  uri, name } = value;
    setLoader(true);
    let setImageres = await Storage.set("userImage", uri);
    getImageData();
    return { name };
  };
  const { title = "My Feed", titleColor = "black", showAvtar = true, nextComponent = null } = props;
  return (
    <View
      style={{
        backgroundColor: "#efeff5",
        paddingTop: screenHeight * 0.03,
        paddingHorizontal: 15
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <View style={{ flex: 1 }}>{showAvtar ? <Text style={styles.titleName}>{"TODAY"}</Text> : null}</View>
        {nextComponent}
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
