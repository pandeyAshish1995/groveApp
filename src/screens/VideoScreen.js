import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import Loader from "../components/Loader";
import VideoComponent from "./VideoComponent";
import { connect } from "react-redux";
import { fetchPosts } from "../redux/actions/VideoAction";

const VideoScreen = props => {
  const getData = () => {
    props.getPosts();
  };

  useEffect(() => {
    getData();
  }, []);

  const { containerStyle, indicatorContainerStyle } = styles;
  const { videoData = [], loading } = props || {};
  return (
    <View style={containerStyle}>
      <HeaderComponent />
      <Loader loader={loading} />
      <VideoComponent data={videoData} />
    </View>
  );
};
const mapStateToProps = state => state.video;
const mapDispatchToProps = { getPosts: fetchPosts };

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);

const styles = StyleSheet.create({
  bottomText: {
    fontFamily: "NunitoSans",
    fontSize: 10,
    fontWeight: "bold",
    color: "#8689a4"
  },
  indicatorContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerStyle: {
    backgroundColor: "#efeff5",
    flex: 1
  }
});
