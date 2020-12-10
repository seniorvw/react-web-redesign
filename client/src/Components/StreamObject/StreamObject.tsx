import React, { Component } from "react";
import { IStreamObjectProps } from "./StreamObject.props";

const EMBED_URL = "https://player.dacast.com/js/player.js?contentId=";

class StreamObject extends Component<IStreamObjectProps> {
  constructor(props: IStreamObjectProps) {
    super(props);
  }

  componentDidMount() {
    let embed;
    const script = document.createElement("script");
    script.setAttribute("src", EMBED_URL + this.props.contentID);
    script.addEventListener("load", () => {
      // @ts-ignore
      embed = dacast(this.props.contentID, this.props.contentID, {
        height: this.props.height,
        width: this.props.width
      });
    });
    document.body.appendChild(script);
  }

  render(): JSX.Element {
    return (
      <div style={{ width: "inherit" }}>
        <div id={this.props.contentID}></div>
      </div>
    );
  }
}

export default StreamObject;
