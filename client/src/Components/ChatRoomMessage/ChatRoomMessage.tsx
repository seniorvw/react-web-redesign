import React, { Component } from "react";

import * as Styles from "../../Util/Styles";
import { IChatRoomMessageProps } from "./ChatRoomMessage.props";

class ChatRoomMessage extends Component<IChatRoomMessageProps> {
  constructor(props: IChatRoomMessageProps) {
    super(props);
  }

  render() {
    const { authorColor, message, width } = this.props;

    const authorWidth = 75;
    const messageWidth = (width - authorWidth - 16).toString() + "px";

    return (
      <div style={{ display: "inline-flex" }}>
        {/* Author */}
        <div style={{
          color: authorColor,
          display: "inline-block",
          fontWeight: "bold",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: authorWidth.toString() + "px"
        }}
          title={message.author}>
          {message.author}
        </div>
        {/* Message */}
        <div style={{ padding: "4px", width: messageWidth, wordWrap: "break-word" }}>
          <span style={{ color: Styles.Colors.textOnBlackBackground }}>
            {message.message}
          </span>
        </div>
      </div>
    );
  }
}

export default ChatRoomMessage;
