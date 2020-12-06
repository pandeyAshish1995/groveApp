import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import APICaller from "../utils/APICaller";
import VideoComponent from "./VideoComponent";

const VideoScreen = props => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const {
      data: { videos = [] }
    } = await APICaller({ method: "get", url: "https://private-c31a5-task27.apiary-mock.com/videos" });

    setData(videos);
  };

  useEffect(() => {
    getData();
  }, []);
  
  const { containerStyle } = styles;
  console.log("datadata", data);
  return (
    <View style={containerStyle}>
      <HeaderComponent />
      <VideoComponent  data={data} />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  bottomText: {
    fontFamily: "NunitoSans",
    fontSize: 10,
    fontWeight: "bold",
    color: "#8689a4"
  },
  containerStyle: {
    backgroundColor: "#efeff5",
    flex: 1
  }
});
