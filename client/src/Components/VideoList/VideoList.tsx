import React, { Component } from "react";
import { IVideo } from "../../Store/models";
import VideoPreview from "../VideoPreview/VideoPreview";

import { IVideoListProps } from "./VideoList.props";
import Spinner from "react-bootstrap/Spinner";
import { VideoPreviewSize } from "../VideoPreview/VideoPreview.props";

// @ts-ignore
import gif from "../../Assets/home_page.gif";

class VideoList extends Component<IVideoListProps> {
  constructor(props: IVideoListProps) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render(): JSX.Element {
    let justifyContent = "center";
    if (this.props.videos && this.channelsTakeUpFullWidth()) {
      justifyContent = "left";
    }

    return (
      <div style={{ height: "inherit" }}>
        <div style={{ height: "48px", padding: "16px", width: "100%" }}>
          <span style={{ fontSize: "large", color: "white" }}>
            {this.props.title}
          </span>
        </div>
        <div style={{
          alignItems: "center",
          display: "inline-flex",
          height: this.props.size === VideoPreviewSize.SMALL ? "250px" : "375px",
          justifyContent,
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%"
        }}>
          {!!!this.props.comingSoon &&
            this.renderVideos()}
          {this.props.comingSoon &&
            this.renderComingSoonMessage()}
        </div>
      </div >
    );
  }

  private renderVideos = () => {
    return (
      <div style={{ height: "fit-content", display: "inherit" }}>
        {
          this.props.videos && this.props.videos.length > 0 &&
          this.props.videos.map(
            (video: IVideo): JSX.Element => (
              <div
                style={{
                  padding: "0px 8px"
                }}
                key={video.title}
              >
                <VideoPreview size={this.props.size} video={video} />
              </div>
            )
          )
        }
        {
          this.props.videos && this.props.videos.length === 0 &&
          this.renderNoLiveChannelsView()
        }
        {
          !!!this.props.videos &&
          <div style={{ margin: "auto" }}>
            <Spinner variant="success" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        }
      </div>
    );
  }

  private renderComingSoonMessage = () => {
    const style = {
      color: "white",
      display: "inline-block",
      fontSize: "large",
      marginTop: "75px",
      padding: "16px",
      top: "50%"
    };

    return (
      <div style={{ height: "inherit", width: "inherit", textAlign: "center" }}>
        <span style={style}>
          Coming Soon...
      </span>
      </div>
    );
  }

  private renderNoLiveChannelsView = () => {
    const style = {
      color: "white",
      display: "inline-block",
      fontSize: "x-large",
      padding: "16px"
    };

    if (this.props.showGif) {
      return (
        <div style={{ height: "inherit", width: "inherit" }}>
          <img src={gif} />
        </div>
      );
    }

    return (
      <div style={{ height: "inherit", width: "inherit", textAlign: "center" }}>
        <span style={style}>
          Sorry, there are no live channels right now. Please check back later.
        </span>
      </div>
    );
  }

  private channelsTakeUpFullWidth = () => {
    const windowWidth = window.innerWidth;
    const videoWidth = this.props.size === VideoPreviewSize.SMALL ? 200 : 320;

    return this.props.videos &&
      this.props.videos.length * (videoWidth + 48) > windowWidth;
  }

  private updateDimensions = () => {
    // Force a re-render
    this.setState({});
  }
}

export default VideoList;
