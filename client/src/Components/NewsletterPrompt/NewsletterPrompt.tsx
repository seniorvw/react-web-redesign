import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import * as Styles from "../../Util/Styles";

import { Requests } from "../../Util/Requests";
import { INewsletterPromptState } from "./NewsletterPrompt.props";

class NewsletterPrompt extends Component<{}, INewsletterPromptState> {
  constructor(props: any) {
    super(props);

    this.state = {
      response: undefined,
      showModal: false,
      showSpinner: false
    };
  }

  render() {
    const { showModal, showSpinner, response } = this.state;

    const handleClose = () => this.setShow(false);
    const handleShow = () => this.setShow(true);

    return (
      <div style={{ zIndex: 10, textAlign: "center" }}>
        <div onClick={handleShow} style={{
          color: "white",
          display: "inline-flex",
          fontSize: "small",
          width: "fit-content"
        }}>
          Click here if you want to join our&nbsp;
          <div style={{
            color: Styles.Colors.green,
            cursor: "pointer",
            fontSize: "12px",
            textDecoration: "underline"
          }}>
            Newsletter
          </div>
        </div>


        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Join our Newsletter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Hey, want to get updates about our launch? Enter your email address
            below and we'll keep you in the loop.
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
                  Subscribe
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
      email: form.elements.formEmail.value,
      isStreamerSignUp: false,
      message: "Thanks for joining the TRXR Newsletter mailing list. You’ve made the best decision of your life!",
      saveEmailToDB: true,
      shouldCC: true,
      subject: "Newsletter Sign Up",
    };

    Requests.postData("/api/v1/feedback/sendEmail", data, /*useAuth*/ false).then(res => {
      this.setState({
        response: res,
        showModal: true,
        showSpinner: false,
      });
    });
  }
}

export default NewsletterPrompt;
