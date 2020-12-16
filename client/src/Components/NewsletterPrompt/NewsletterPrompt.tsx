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
      showSpinner: false
    };
  }

  render() {
    const { showSpinner, response } = this.state;

    return (
      <div className="col-md-4 newsletterCol">
        <h5>Newsletter</h5>
        <p>Join our newsletter to get updates</p>
        <Form onSubmit={this.handleSubmit} className="newsletterForm">
          <Form.Group controlId="formEmail">
            <Form.Control
              custom={true}
              type="email"
              placeholder="Enter your email"
              required={true} />
          </Form.Group>
          <button className="btn_" type="submit">
            Join
                {showSpinner &&
              <Spinner
                style={{ verticalAlign: "middle", margin: "8px" }}
                animation="border"
                variant="light"
                size="sm" />}
          </button>
        </Form>
        {response &&
          this.renderResponseMessage()}
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
      <div style={{ paddingTop: "16px", color: "#a54747" }}>
        {message}
      </div>
    );
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
        showSpinner: false,
      });
    });
  }
}

export default NewsletterPrompt;
