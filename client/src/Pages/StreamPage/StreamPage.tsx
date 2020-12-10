import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { IStreamPageProps } from "./StreamPage.props";
import { RouteComponentProps } from "react-router-dom";
import StreamObject from "../../Components/StreamObject/StreamObject";
import WebsiteHeader from "../../Components/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "../../Components/WebsiteFooter/WebsiteFooter";
import * as Styles from "../../Util/Styles";
import ChatRoom from "src/Components/ChatRoom/ChatRoom";

class Channel extends Component<RouteComponentProps<IStreamPageProps>> {
  constructor(props: RouteComponentProps<IStreamPageProps>) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    // @ts-ignore
    const contentID = this.props.match.params.contentID;
    const chatRoomWidth = this.getChatRoomWidth();
    const streamWidth = (window.innerWidth - chatRoomWidth).toString();
    const windowHeight = (window.innerHeight - Styles.headerAndFooterHeight()).toString();

    return (
      <div>
        <WebsiteHeader />
        <div style={{
          display: "inline-flex",
          height: windowHeight + "px",
          padding: "0px"
        }}>
          <Card style={{ width: streamWidth.toString() + "px", border: "none", zIndex: 1 }}>
            <Card.Body style={{ padding: "0px", width: "inherit", height: "inherit" }}>
              <StreamObject
                contentID={"181053_c_" + contentID}
                width={streamWidth}
                height={windowHeight}
              />
            </Card.Body>
          </Card>
          <div style={{ width: chatRoomWidth.toString() + "px", backgroundColor: "black" }}>
            <ChatRoom roomId={contentID} width={chatRoomWidth} />
          </div>
        </div>
        <WebsiteFooter />
      </div>
    );
  }

  private getChatRoomWidth() {
    const maxWidth = 400;
    const minWidth = 200;
    const twentyPercentWidth = window.innerWidth / 5;
    if (twentyPercentWidth > maxWidth) {
      return maxWidth;
    } else if (twentyPercentWidth < minWidth) {
      return minWidth;
    } else {
      return twentyPercentWidth;
    }
  }

  private updateDimensions = () => {
    // Force a re-render
    this.setState({});
  }
}

export default Channel;
