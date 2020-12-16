import React, { Component } from "react";
import io from "socket.io-client";
import Spinner from "react-bootstrap/Spinner";

import * as Styles from "../../Util/Styles";

import { IChatRoomProps, IChatRoomState } from "./ChatRoom.props";
import ChatMessageInputForm from "../ChatMessageInputForm/ChatMessageInputForm";
import ChatRoomMessage from "../ChatRoomMessage/ChatRoomMessage";
import { Requests } from "../../Util/Requests";
import { IChatMessage, EMPTY_USER, IChatAuthorColor } from "../../Store/models";
import { ISiteState } from "../../Store/state";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { setChatAuthorColors } from "../../Store/actions";
import ChatRoomHeader from "../ChatRoomHeader/ChatRoomHeader";

// TODO slengieza: need to test how this scales
// TODO slengieza: only activate chat room when stream is live
// TODO slengieza: clear messages from DB on a schedule
// TODO slengieza: add ability to disable chat from server.
class ChatRoom extends Component<IChatRoomProps, IChatRoomState> {
  socket: SocketIOClient.Socket;
  // @ts-ignore
  endOfMessagesEl: any;

  constructor(props: IChatRoomProps) {
    super(props);
    const SOCKET_IO_URL = this.getBaseUrl() + ":" + this.getPort();
    this.socket = io(SOCKET_IO_URL);

    this.state = {
      error: false,
      messages: [],
      promptUserForHandle: false,
      showSpinner: false
    };
  }

  componentDidMount() {
    this.setState({
      showSpinner: true
    });

    this.fetchMessages();
    this.connectToRoom();
  }

  render() {
    const windowHeight = (window.innerHeight - Styles.headerAndFooterHeight());
    const inputFormHeight = 60;
    const headerHeight = 36;
    const messagesHeight = windowHeight - inputFormHeight - headerHeight - 16;

    return (
      <div className="liveChatCol">
        <div className="chatHead">
          <div className="chatTitle"><img src="images/chatboxes.svg" /> Live Chat</div>
          <div className="chatBoxOpt">
            <button type="button" className="minimize"></button>
            <button type="button"><img src="images/expand.svg" /></button>
          </div>
        </div>
        <div className="chatBody">
          {this.renderMessages()}
        </div>
        <ChatMessageInputForm roomId={this.props.roomId} handleSubmit={this.handleSubmitMessage} />
      </div>
    );
  }

  private getMessagesDivStyle() {
    const { error, messages, showSpinner } = this.state;
    if (showSpinner || error || messages.length === 0) {
      return {
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      };
    } else {
      return {};
    }
  }

  private renderMessages = () => {
    const { messages, error, showSpinner } = this.state;
    if (showSpinner) {
      return (
        <Spinner
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          animation="border"
          variant="success" />
      );
    } else if (error) {
      return (
        <div>
          Sorry, we couldnt load the chat right now. Please try again later.
        </div>
      );
    } else if (messages.length === 0) {
      return (
        <div>
          Send a message to get started!
        </div>
      );
    }

    const returnElement: JSX.Element[] = [];
    let lastTimestamp: Date = new Date("01-Jan-1970");
    messages.forEach(m => {
      const messageTime = new Date(m.timestamp);
      // Get the time difference in milliseconds, then divide by 1000 for
      // seonds then check if it is greater than 60*30 seconds (30 min)
      const authorColor = this.getAuthorColor(m.author);
      returnElement.push(<ChatRoomMessage time={this.getReadableTimestamp(m.timestamp)}
message={m} width={this.props.width} authorColor={authorColor} />);
      lastTimestamp = messageTime;
    });

    return returnElement;
  }

  private setShow = (shouldShow: boolean) => {
    this.setState({
      promptUserForHandle: shouldShow
    });
  }

  private renderChatHandlePrompt = () => {
    const { promptUserForHandle } = this.state;
    const handleClose = () => this.setShow(false);

    return (
      <Modal show={promptUserForHandle} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let everyone know who is messaging</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmitChatHandle}>
            <Form.Group controlId="formChatHandle">
              <Form.Label>Chat Handle</Form.Label>
              <Form.Control required type="text" placeholder="Handle" />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  private getAuthor = () => {
    const { chatHandle } = this.state;
    const { user } = this.props;
    if (user && user.name !== "") {
      return user.name.split(" ")[0];
    } else if (chatHandle) {
      return chatHandle;
    } else {
      // This should never be hit, but we have it here
      // just in case.
      return "anonymous";
    }
  }

  private handleSubmitMessage = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.elements.formMessage.value;
    const { chatHandle } = this.state;
    const { roomId, user } = this.props;

    if (!chatHandle && (!user || user.name === "")) {
      this.setState({
        promptUserForHandle: true
      });
      return;
    }

    const data: IChatMessage = {
      author: this.getAuthor(),
      message,
      roomId,
      timestamp: Date.UTC.toString()
    };
    this.socket.emit("message", data);

    // Reset the text in the form.
    form.elements.formMessage.value = "";
  }

  private handleSubmitChatHandle = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const handle = form.elements.formChatHandle.value;
    this.setState({
      chatHandle: handle,
      promptUserForHandle: false
    });
  }

  private connectToRoom() {
    const { roomId } = this.props;

    this.socket.on("connect", (_: any) => {
      this.socket.emit("join", roomId);
    });

    this.socket.on("newMessage", (_: any) => {
      this.fetchMessages();
    });
  }

  private fetchMessages = () => {
    const messagesUrl = `/api/v1/chat/messages/${this.props.roomId}`;
    Requests.getData(messagesUrl, /* useAuth */ false).then(res => {
      if (res.success) {
        this.setState({
          error: false,
          messages: res.data,
          showSpinner: false
        }, () => {
          this.scrollToBottom();
        });
      } else {
        this.setState({
          error: true,
          showSpinner: false
        });
      }
    });
  }

  private getBaseUrl() {
    return process.env.REACT_APP_BASE_SERVER_URL || "http://localhost";
  }

  private getPort() {
    // This is just a fail safe in case the PORT isn't being set as
    // an environment variable.
    if (process.env.REACT_APP_BASE_SERVER_URL === "https://trxr.tv") {
      return "443";
    }

    return process.env.REACT_APP_BASE_SERVER_PORT || "5000";
  }

  private getTimestampSeparator = (timestamp: string) => {
    const { width } = this.props;

    const lineWidth = (width - 100) / 2;
    const lineStyle = { width: lineWidth + "px", backgroundColor: Styles.Colors.textOnBlackBackground };
    return (
      <div style={{ display: "flex" }}>
        <hr style={lineStyle} />
        <div style={{
          fontSize: "small",
          fontWeight: "bold",
          lineHeight: "33px",
          textAlign: "center",
          width: "50px"
        }}>
          <span style={{ color: Styles.Colors.textOnBlackBackground }}>
            {this.getReadableTimestamp(timestamp)}
          </span>
        </div>
        <hr style={lineStyle} />
      </div>
    );
  }

  // Convert the UTC timestamp to local time, then return
  // only the hours and minutes.
  private getReadableTimestamp = (timestamp: string) => {
    const localTimestamp = new Date(timestamp);
    let hours = localTimestamp.getHours();
    const minutes = localTimestamp.getMinutes();
    let timeOfDay = "am";

    // Convert the hours to normal clock time if it is over 12.
    if (hours > 12) {
      hours -= 12;
      timeOfDay = "pm";
    }

    // Make sure we get 9:03 instead of 9:3 for a time.
    let minutesString = minutes.toString();
    if (minutes < 10) {
      minutesString = "0" + minutesString;
    }

    return hours.toString() + ":" + minutesString + timeOfDay;
  }

  private getAuthorColor = (author: string) => {
    if (this.props.chatColors) {
      const obj = this.props.chatColors.find(item => {
        return item.author === author;
      });
      if (obj) {
        return obj.color;
      }
    }

    const randomColor = this.getRandomChatColor();
    this.updateChatAuthorColor(randomColor, author);
    return randomColor;
  }

  private getRandomChatColor = () => {
    const colors = ["green", "red", "blue", "orange", "purple"];
    const randomInt = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[randomInt];
  }

  private updateChatAuthorColor = (color: string, author: string) => {
    const { chatColors } = this.props;
    const newColors = chatColors || [];
    newColors.push({ author, color });
    this.props.updateChatAuthorColor(newColors);
  }

  private scrollToBottom = () => {
    // @ts-ignore
    if (this.endOfMessagesEl) {
      this.endOfMessagesEl.scrollIntoView({ behavior: "smooth" });
    }
  }
}

const mapStateToProps = (state: ISiteState) => {
  return {
    accessToken: state.accessToken || "",
    chatColors: state.chatAuthorColors || [],
    refreshToken: state.refreshToken || "",
    user: state.user || EMPTY_USER
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateChatAuthorColor(chatColors: IChatAuthorColor[]) {
      dispatch(setChatAuthorColors(chatColors));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
