import React, { Component } from "react";
import VideoList from "../VideoList/VideoList";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import { IHomePageVideoPanelState } from "./HomePageVideoPanel.props";
import { VideoPreviewSize } from "../VideoPreview/VideoPreview.props";
import NewsletterPrompt from "../NewsletterPrompt/NewsletterPrompt";

class HomePageVideoPanel extends Component<{}, IHomePageVideoPanelState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      featuredChannels: undefined,
      liveChannels: undefined,
    };
  }

  componentDidMount() {
    this.getAllChannels();
    this.getLiveChannels();
    this.getStoredVideos();
  }

  render(): JSX.Element {
    const { liveChannels, featuredChannels, storedVideos } = this.state;
    return (
      <div style={{ overflowY: "hidden" }}>
        <div style={{ height: "325px" }}>
          {/* TODO we should have an animation when it completes */}
          <CountDownTimer timeTillDate="2021-01-11T09:30:00-13:00" />
          <NewsletterPrompt />
        </div>
        <div style={{ height: "425px" }}>
          <VideoList
            title="Live Channels"
            videos={liveChannels}
            backgroundColor="WhiteSmoke"
            size={VideoPreviewSize.LARGE}
            showGif={true}
          />
        </div>
        <div style={{ height: "300px" }}>
          <VideoList
            title="Featured Channels"
            videos={featuredChannels}
            backgroundColor="WhiteSmoke"
            size={VideoPreviewSize.SMALL}
          />
        </div>
        <div style={{ height: "300px" }}>
          <VideoList
            title="Saved Clips"
            videos={storedVideos}
            backgroundColor="WhiteSmoke"
            size={VideoPreviewSize.SMALL}
            comingSoon={true}
          />
        </div>
      </div>
    );
  }

  private async getAllChannels() {
    // TODO remove filter this when we launch
    fetch("/api/v1/dacast/channels?filter=fake")
      .then(res => res.json())
      .then(result => {
        // Set the state with the fetched channels.
        this.setState({
          featuredChannels: result.data
        });
      });
  }

  private getLiveChannels() {
    fetch("/api/v1/dacast/channels?filter=live")
      .then(res => res.json())
      .then(result => {
        // Set the state with the fetched channels.
        this.setState({
          liveChannels: result.data
        });
      });
  }

  private getStoredVideos() {
    fetch("/api/v1/dacast/storedVideos")
      .then(res => res.json())
      .then(result => {
        // Set the state with the fetched channels.
        this.setState({
          storedVideos: result.data
        });
      });
  }
}

export default HomePageVideoPanel;
