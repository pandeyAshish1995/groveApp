import React from "react";
import { ActivityIndicator, TouchableOpacity, Share } from "react-native";
import VideoPlayer from "react-native-video-player";

class VideoPlayerComponent extends React.Component {
  state = {};
  onShare = async ({ video_url }) => {
    try {
      const result = await Share.share({
        message: video_url
      });
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const { thumbnail_url, video_url } = this.props || {};

    return (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => {
          this.onShare({ video_url });
        }}
      >
        <VideoPlayer
          endWithThumbnail
          style={{ borderRadius: 25 }}
          customStyles={{ thumbnail: { borderRadius: 25, resizeMode: "cover" } }}
          ref={r => (this.player = r)}
          hideControlsOnStart={true}
          video={{ uri: video_url }}
          thumbnail={{ uri: thumbnail_url }}
        />
        {this.state.loader ? <ActivityIndicator size={"small"} color={"red"} /> : null}
      </TouchableOpacity>
    );
  }
}

export default VideoPlayerComponent;
