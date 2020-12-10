import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import * as Styles from "../../Util/Styles";
import { Requests } from "../../Util/Requests";

import { IChatRoomHeaderProps, IChatRoomHeaderState } from "./ChatRoomHeader.props";

class ChatRoomHeader extends Component<IChatRoomHeaderProps, IChatRoomHeaderState> {
  constructor(props: IChatRoomHeaderProps) {
    super(props);

    this.state = {
      response: undefined,
      showModal: false,
      showSpinner: false
    };
  }

  render() {
    const { showModal, showSpinner, response } = this.state;
    const { height } = this.props;

    const handleClose = () => this.setShow(false);
    const handleShow = () => this.setShow(true);

    return (
      <div>
        <div style={{
          display: "inline-flex",
          fontSize: "large",
          fontWeight: "bold",
          height: height.toString() + "px",
          width: "100%"
        }}>
          <span style={{ color: Styles.Colors.textOnBlackBackground, lineHeight: height.toString() + "px" }}>
            Stream Chat
          </span>
          {/* TODO slengieza align to the right hand side */}
          <div style={{ padding: "4px 16px" }}>
            <Button style={{
              fontSize: "6pt",
              height: "16px",
              padding: "0px",
              width: "40px"
            }} onClick={handleShow} variant="outline-success">
              Follow
          </Button>
          </div>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Like What You See?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Enter your email and we'll let you know when your favorite streamer goes live.
            <Form style={{ paddingTop: "16px" }} onSubmit={this.handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  style={{ width: "80%" }}
                  type="email"
                  placeholder="Email"
                  required={true} />
              </Form.Group>
              <div style={{ display: "inline-block" }}>
                <Button variant="success" type="submit">
                  Follow
                  {showSpinner &&
                    <Spinner
                      style={{ verticalAlign: "middle", margin: "8px" }}
                      animation="border"
                      variant="light"
                      size="sm" />}
                </Button>
                {response &&
                  this.renderResponseMessage()}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }


  private renderResponseMessage = () => {
    const { response } = this.state;
    let message = "Sorry, that didn't work. Please try again.";
    if (response.success) {
      message = "Great! You'll hear from us shortly.";
    }
    return (
      <div style={{ paddingTop: "16px" }}>
        {message}
      </div>
    );
  }

  private setShow = (shouldShow: boolean) => {
    this.setState({
      showModal: shouldShow
    });
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({ showSpinner: true });

    const form = event.currentTarget;
    const data = {
      channelId: this.props.channelId,
      email: form.elements.formEmail.value,
    };

    Requests.postData("/api/v1/channel/follow", data, /*useAuth*/ false).then(res => {
      this.setState({
        response: res,
        showModal: true,
        showSpinner: false,
      });
    });
  }
}

export default ChatRoomHeader;
