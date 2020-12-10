import React, { Component, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import jwt from "jwt-decode";

import {
  IRegistrationButtonState,
  IRegistrationButtonProps,
  RegistrationFailure
} from "./RegistrationButton.props";
import {
  MismatchedPasswordsErrorString,
  MalformedPasswordErrorString,
  MalformedEmailErrorString,
  DuplicateAccountErrorString,
  checkEmailRequirements,
  checkPasswordRequirements
} from "../../Util/Strings";
import { Requests } from "../../Util/Requests";
import { IUser } from "../../Store/models";

class RegistrationButton extends Component<
  IRegistrationButtonProps,
  IRegistrationButtonState
  > {
  constructor(props: IRegistrationButtonProps) {
    super(props);
    this.state = {
      failureState: RegistrationFailure.NONE,
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
        <Button onClick={handleShow} variant="success">
          Sign Up
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register for an account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control required type="name" placeholder="First name" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid first name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="name" placeholder="Last name" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid last name.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Username/email input */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
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
              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                />
                <Form.Control.Feedback type="invalid">
                  Your passwords do not match.
                </Form.Control.Feedback>
              </Form.Group>
              {failureState !== RegistrationFailure.NONE &&
                this.renderFailureMessage()}
              <Button variant="success" type="submit">
                Sign Up
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  private renderFailureMessage() {
    let message = "";
    const { failureState } = this.state;
    switch (failureState) {
      case RegistrationFailure.DUPLICATE_ACCOUNT: {
        message = "An account with this email already exists.";
        break;
      }
      case RegistrationFailure.MALFORMED_EMAIL: {
        message = "Please provide a properly formatted email";
        break;
      }
      case RegistrationFailure.MALFORMED_PASSWORD: {
        message = `A password must be at least 8 characters
                  and needs one uppercase letter, one lowercase
                  letter, a number and a special character.`;
        break;
      }
      case RegistrationFailure.MISMATCHED_PASSWORDS: {
        message = "Your passwords do not match.";
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
      failureState: RegistrationFailure.NONE,
      show: shouldShow
    });
  }

  private handleFailure(message: string) {
    if (message === DuplicateAccountErrorString) {
      this.setState({
        failureState: RegistrationFailure.DUPLICATE_ACCOUNT
      });
    } else if (message === MalformedPasswordErrorString) {
      this.setState({
        failureState: RegistrationFailure.MALFORMED_PASSWORD
      });
    } else if (message === MismatchedPasswordsErrorString) {
      this.setState({
        failureState: RegistrationFailure.MISMATCHED_PASSWORDS
      });
    } else if (message === MalformedEmailErrorString) {
      this.setState({
        failureState: RegistrationFailure.MALFORMED_EMAIL
      });
    } else {
      this.setState({
        failureState: RegistrationFailure.UNKNOWN
      });
    }
  }

  private handleSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      email: form.elements.formBasicEmail.value,
      firstName: form.elements.formFirstName.value,
      lastName: form.elements.formLastName.value,
      password: form.elements.formBasicPassword.value,
      password_confirm: form.elements.formBasicPasswordConfirm.value
    };

    if (data.password !== data.password_confirm) {
      this.handleFailure(MismatchedPasswordsErrorString);
      return;
    } else if (!checkPasswordRequirements(data.password)) {
      this.handleFailure(MalformedPasswordErrorString);
      return;
    } else if (!checkEmailRequirements(data.email)) {
      this.handleFailure(MalformedEmailErrorString);
      return;
    }

    // Send input to the backend
    Requests.postData("/api/v1/auth/signUp", data, /*useAuth*/ false).then(res => {
      if (res.success) {
        const accessToken = res.accessToken;
        const user = jwt(accessToken) as IUser;
        this.props.onSignUp(user, accessToken, res.refreshToken);
        this.setShow(false);
      } else {
        this.handleFailure(res.message);
      }
    });
  }
}

export default RegistrationButton;
