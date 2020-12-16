import React, { Component, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import jwt from "jwt-decode";

import {
  ILoginButtonState,
  ILoginButtonProps,
  LoginFailure
} from "./LoginButton.props";
import { Requests } from "../../Util/Requests";
import { IUser } from "../../Store/models";

class LoginButton extends Component<ILoginButtonProps, ILoginButtonState> {
  constructor(props: ILoginButtonProps) {
    super(props);
    this.state = {
      failureState: LoginFailure.NONE,
      show: false
    };

    this.setShow = this.setShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(): JSX.Element {
    const { show, failureState } = this.state;

    const handleClose = () => this.setShow(false);
    const handleShow = () => this.setShow(true);

    return (
      <div style={{ padding: "8px" }}>
        <button className="btn_green" onClick={handleShow}>
          Log In
        </button>

        <Modal id="LoginModal" show={show} onHide={handleClose}>
          <div className="modal-header">
            <h4 className="modal-title">Log In</h4>
          </div>
          <div className="modal-body">
            <Form className="modalLoginForm" onSubmit={this.handleSubmit}>
              {/* Username/email input */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              {/* Password input */}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              {failureState !== LoginFailure.NONE &&
                this.renderFailureMessage()}
              <div className="form-group">
                <button className="btn_" type="submit">Log In</button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
  private renderFailureMessage() {
    let message = "";
    const { failureState } = this.state;
    switch (failureState) {
      case LoginFailure.INVALID_ACCOUNT: {
        message = "That username/password combination did not work.";
        break;
      }
      default: {
        message = "That didnt work. Please try again.";
        break;
      }
    }

    return (
      <div style={{ color: "red", paddingBottom: "8px", fontSize: "14px" }}>
        {message}
      </div>
    );
  }

  private setShow(shouldShow: boolean) {
    this.setState({
      failureState: LoginFailure.NONE,
      show: shouldShow
    });
  }

  private handleSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      email: form.elements.formBasicEmail.value,
      password: form.elements.formBasicPassword.value
    };

    // Send input to the backend
    Requests.postData("/api/v1/auth/login", data, /*useAuth*/ false).then(res => {
      if (res.success) {
        const accessToken = res.accessToken;
        const user = jwt(accessToken) as IUser;
        this.props.onLogin(user, accessToken, res.refreshToken);
        this.setShow(false);
      } else {
        this.setState({
          failureState: LoginFailure.INVALID_ACCOUNT
        });
      }
    });
  }
}

export default LoginButton;
