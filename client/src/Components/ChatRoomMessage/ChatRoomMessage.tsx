import React, { Component } from "react";

import * as Styles from "../../Util/Styles";
import { IChatRoomMessageProps } from "./ChatRoomMessage.props";

class ChatRoomMessage extends Component<IChatRoomMessageProps> {
  constructor(props: IChatRoomMessageProps) {
    super(props);
  }

  render() {
    const { authorColor, message, width, time } = this.props;

    const authorWidth = 75;
    const messageWidth = (width - authorWidth - 16).toString() + "px";

    return (
      <div className="message__">
        <h6 className="messageBy">
          {message.author} <span className="postTime">{time}</span>
        </h6>
        <p>{message.message}</p>
      </div>
    );
  }
}

export default ChatRoomMessage;
