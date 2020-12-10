import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

import { IStreamerSignUpButtonState } from "./StreamerSignUpButton.props";
import ContactUsForm from "../ContactUsForm/ContactUsForm";

import * as Styles from "../../Util/Styles";
import TermsDisclaimer from "../TermsDisclaimer/TermsDisclaimer";

class StreamerSignUpButton extends Component<{}, IStreamerSignUpButtonState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      show: false
    };
  }

  render(): JSX.Element {
    const { show } = this.state;

    const handleClose = () => this.setShow(false);
    const handleShow = () => this.setShow(true);

    const emailSubject = "Joining TRXR";
    const emailBody = "Hi, I would like to join TRXR.tv as a streamer.";

    return (
      <div style={{ padding: "8px", margin: "auto" }}>
        <div onClick={handleShow} style={{
          color: Styles.Colors.green,
          cursor: "pointer",
          fontSize: "12px",
          textDecoration: "underline"
        }}>
          Interested in becoming a streamer?
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send us an email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ContactUsForm width="400px" subject={emailSubject} message={emailBody} />
          </Modal.Body>
          <Modal.Footer>
            <TermsDisclaimer />
          </Modal.Footer>
        </Modal>
      </div >
    );
  }

  private setShow = (shouldShow: boolean) => {
    this.setState({
      show: shouldShow
    });
  }
}

export default StreamerSignUpButton;
