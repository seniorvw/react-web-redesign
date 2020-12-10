import React, { Component } from "react";
import Avatar from "react-avatar";

import * as pathConstants from "../../Util/PathConstants";
import { IVideoPreviewProps, VideoPreviewSize } from "./VideoPreview.props";

class VideoPreview extends Component<IVideoPreviewProps> {
  constructor(props: IVideoPreviewProps) {
    super(props);
  }

  render(): JSX.Element {
    const height = this.props.size === VideoPreviewSize.SMALL ? "275px" : "400px";
    const thumbnailHeight = this.props.size === VideoPreviewSize.SMALL ? "180px" : "290px";
    const width = this.props.size === VideoPreviewSize.SMALL ? "232px" : "352px";

    return (
      <div style={{ height, padding: "24px", width }}>
        <a href={pathConstants.StreamPage + "/" + this.props.video.id}>
          <div style={{ width: "100%", height: thumbnailHeight, display: "flex", justifyContent: "center" }}>
            {this.props.video.pictures.thumbnail
              && this.props.video.pictures.thumbnail.length > 0
              && <img style={{ height: "inherit", overflow: "hidden" }}
                src={this.props.video.pictures.thumbnail[0]} />
            }
          </div>
          <div style={{ display: "inline-flex", paddingTop: "8px", width: "100%", height: "54px" }}>
            <Avatar
              round={true}
              size="36px"
              name={this.props.video.title}
              style={{ paddingTop: "8px" }}
            />
            <div style={{
              color: "white",
              fontSize: "16px",
              marginBottom: "auto",
              marginLeft: "16px",
              marginTop: "auto"
            }}>
              {this.props.video.title}
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default VideoPreview;
