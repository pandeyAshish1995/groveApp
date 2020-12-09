import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import VideoPlay from "../components/VideoPlayer";

const TitleComponent = ({ title }) => {
  const { container, bottomSecContainer, newTextStyle, titleStyle, sampletextStyle } = titleStyles || {};
  return (
    <View style={container}>
      <View style={bottomSecContainer}>
        <Text style={newTextStyle}>{"new"}</Text>
        <Text>{new Date().toLocaleDateString()}</Text>
      </View>
      <Text style={titleStyle}>{title}</Text>
      <Text style={sampletextStyle}>{"sample text"}</Text>
    </View>
  );
};

const RenderFooter = ({ loading }) => {
  if (!loading) return null;
  return <ActivityIndicator animating size="large" color={"red"} />;
};

const ItemComponent = ({ item }) => {
  const { thumbnail_url, video_url, title } = item || {};
  return (
    <View style={styles.itemContainer}>
      <View style={{ borderRadius: 25, paddingBottom: 68 }}>
        <VideoPlay thumbnail_url={thumbnail_url} video_url={video_url} />
      </View>
      <TitleComponent title={title} />
    </View>
  );
};

const VideoComponent = ({ data = [] }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setListData(data);
    }, 10);
    setSelected(true);
  };

  const loadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setListData(listData.concat(listData.length ? listData : data));
      setLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }) => <ItemComponent item={item} />;

  return (
    <FlatList
      style={styles.listContainer}
      data={listData.length ? listData : data}
      onEndReached={() => {
        loadMore();
      }}
      bounce={false}
      onEndReachedThreshold={0}
      onRefresh={() => onRefresh()}
      refreshing={refreshing}
      extraData={selected}
      keyExtractor={(item, index) => index.toString()}
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
  itemContainer: {
    marginVertical: 8,

    marginHorizontal: 16
  },
  listContainer: { flex: 1, marginTop: 5 },
  title: {
    fontSize: 12
  }
});
const titleStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    position: "absolute",
    width: "100%",
    bottom: -4,
    borderRadius: 25,
    backgroundColor: "white",
    elevation: 1
  },
  bottomSecContainer: {
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-between"
  },
  newTextStyle: {
    color: "rgba(4, 74, 174,0.8)"
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "100"
  },
  sampletextStyle: {
    fontSize: 12,
    paddingBottom: 10
  }
});
