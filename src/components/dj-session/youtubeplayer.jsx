 import React from "react";
 import YouTube from "react-youtube";

class Ytplayer extends React.Component {
  player = null;

  _onReady = (event) => {
    this.player = event.target;
    console.log("✅ YT ready");
  };

  _onEnd = () => {
    console.log("🏁 Video ended");
    this.props.onVideoEnd?.();
  };

  componentDidUpdate(prevProps) {
    if (
      this.player &&
      prevProps.videoId !== this.props.videoId &&
      this.props.videoId
    ) {
      console.log("▶️ Autoplaying next:", this.props.videoId);

      this.player.loadVideoById(this.props.videoId);
      this.player.mute();
      this.player.playVideo();

      setTimeout(() => {
        this.player.unMute();
      }, 500);
    }
  }

  render() {
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={{
          height: "390",
          width: "640",
          playerVars: { controls: 1 },
        }}
        onReady={this._onReady}
        onEnd={this._onEnd}
      />
    );
  }
}


  export default Ytplayer;