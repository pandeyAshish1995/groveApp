import React from "react";
import { ActivityIndicator } from "react-native";
import VideoPlayer from "react-native-video-player";

class VideoPlayerComponent extends React.Component {
    state={}
  render() {
    const { thumbnail_url, video_url } = this.props || {};

    return (
      <>
        <VideoPlayer
          resizeMode={"cover"}
          onLoad={() => {
            // console.warn("jjj ir ");
            // this.setState({ loader: true });
          }}
          onEnd={() => this.setState({ loader: false })}
          style={{ borderTopRightRadius: 25,borderTopLeftRadius:25 }}
          customStyles={{  borderTopRightRadius: 25,borderTopLeftRadius:25 ,}}
          ref={r => (this.player = r)}
          hideControlsOnStart={true}
          video={{ uri: video_url }}
         thumbnail={{ uri: thumbnail_url }}
        />
        {this.state.loader ? <ActivityIndicator size={"small"} color={"red"} /> : null}
      </>
    );
  }
}

export default VideoPlayerComponent;
