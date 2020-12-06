import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import VideoPlay from "../components/VideoPlayer";

const TitleComponent = ({ title }) => {
  return (
    <Text style={{ position: "absolute", bottom: -5, backgroundColor: "white", borderRadius: 10, width: "100%" }}>
      {title}
    </Text>
  );
};

const RenderFooter = ({ loading }) => {
  if (!loading) return null;

  return <ActivityIndicator animating size="large" color={"red"} />;
};
const ItemComponent = ({ item }) => {
  const { thumbnail_url, video_url, title } = item || {};
  return (
    <View style={{ ...styles.item, borderRadius: 10 }}>
      <VideoPlay thumbnail_url={thumbnail_url} video_url={video_url} />
      <TitleComponent title={title} />
    </View>
  );
};

const VideoComponent = ({ data = [] }) => {
    
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState(data);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    console.warn("data", listData.length);
    setListData(listData.concat(listData[0]))
     console.warn("data after", listData.length);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

     setSelected(true);
  };
  const loadMore=()=>{
    setLoading(true);
    setListData(listData.concat(listData[0]))
    setTimeout(() => {
        setLoading(false);
      }, 1000);
  }

  const renderItem = ({ item }) => <ItemComponent item={item} />;
  
  return (
    <FlatList
      data={data}
    //   onEndReached={() => {
    //     loadMore();
    //   }}
    //   onEndReachedThreshold={0}
    //   onRefresh={() => onRefresh()}
    //   refreshing={refreshing}
    //   extraData={selected}
      keyExtractor={(item, index) =>index}
      ListFooterComponent={() => <RenderFooter loading={loading} />}
      renderItem={renderItem}
    />
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "white",
    // borderRadius:5,
    // padding: 20,
    marginVertical: 8,
    paddingBottom: 40,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginHorizontal: 16
  },
  title: {
    fontSize: 12
  }
});
