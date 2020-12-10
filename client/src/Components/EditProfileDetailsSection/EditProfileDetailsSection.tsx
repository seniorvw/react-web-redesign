import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import {
    IEditProfileDetailsSectionProps,
    IEditProfileDetailsSectionState,
    UpdateFailure
} from "./EditProfileDetailsSection.props";
import {
    MismatchedPasswordsErrorString,
    MalformedPasswordErrorString,
    MalformedEmailErrorString,
    IncorrectPasswordsErrorString,
    checkPasswordRequirements,
    checkEmailRequirements,
    MissingPasswordErrorString,
    DuplicateAccountErrorString
} from "../../Util/Strings";
import { Requests } from "../../Util/Requests";
import { IUser, EMPTY_USER } from "../../Store/models";
import { setProfile } from "../../Store/actions";
import { ISiteState } from "../../Store/state";
import Modal from "react-bootstrap/Modal";

class EditProfileDetailsSection extends Component<IEditProfileDetailsSectionProps, IEditProfileDetailsSectionState> {
    constructor(props: IEditProfileDetailsSectionProps) {
        super(props);
        this.state = {
            failureState: UpdateFailure.NONE,
            showDeleteAccountModal: false,
            showDeleteAccountSpinner: false,
            showUpdateProfileSpinner: false
        };

        this.setDeleteAccountModalShow = this.setDeleteAccountModalShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    render() {
        const {
            failureState,
            showDeleteAccountModal,
            showUpdateProfileSpinner,
            showDeleteAccountSpinner } = this.state;

        return (
            <div style={{ width: "350px", margin: "0 auto" }}>
                <Form style={{ padding: "8px" }} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{ width: "300px" }}
                            type="name"
                            placeholder={this.props.user.name} />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            style={{ width: "300px" }}
                            type="email"
                            placeholder={this.props.user.email} />
                    </Form.Group>

                    <Form.Group controlId="formOldPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            style={{ width: "300px" }}
                            type="password"
                            placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            style={{ width: "300px" }}
                            type="password"
                            placeholder="New Password" />
                    </Form.Group>
                    <Form.Group controlId="formNewPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            style={{ width: "300px" }}
                            type="password"
                            placeholder="Confirm new Password" />
                    </Form.Group>
                    {failureState !== UpdateFailure.NONE &&
                        this.renderFailureMessage()}
                    <div style={{ display: "inline-block" }}>
                        <Button variant="success" type="submit">
                            Update profile
                            {showUpdateProfileSpinner &&
                                <Spinner
                                    style={{ verticalAlign: "middle", margin: "8px" }}
                                    animation="border"
                                    variant="light" />}
                        </Button>
                        <Button
                            style={{ marginLeft: "8px" }}
                            variant="danger"
                            onClick={this.handleDeleteAccount}>
                            Delete Account
                            {showDeleteAccountSpinner &&
                                <Spinner
                                    style={{ verticalAlign: "middle", margin: "8px" }}
                                    animation="border"
                                    variant="light" />}
                        </Button>
                    </div>
                </Form>
                {showDeleteAccountModal &&
                    this.renderDeleteAccountModal()}
            </div>
        );
    }

    private renderFailureMessage() {
        let message = "";
        const { failureState } = this.state;
        switch (failureState) {
            case UpdateFailure.MALFORMED_EMAIL: {
                message = "Please provide a properly formatted email";
                break;
            }
            case UpdateFailure.MALFORMED_PASSWORD: {
                message = `A password must be at least 8 characters
                    and needs one uppercase letter, one lowercase
                    letter, a number and a special character.`;
                break;
            }
            case UpdateFailure.MISMATCHED_PASSWORDS: {
                message = "Your new passwords do not match.";
                break;
            }
            case UpdateFailure.INCORRECT_PASSWORD: {
                message = "Your old password is incorrect.";
                break;
            }
            case UpdateFailure.MISSING_PASSWORD: {
                message = "You must enter your old password.";
                break;
            }
            case UpdateFailure.DUPLICATE_ACCOUNT: {
                message = "An account with that email already exists.";
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

    private renderDeleteAccountModal() {
        const handleClose = () => this.setDeleteAccountModalShow(false);
        return (
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <Button
                        style={{ width: "100px", margin: "16px" }}
                        variant="danger"
                        onClick={this.deleteAccount}>
                        Yes
                    </Button>
                    <Button
                        style={{ width: "100px", margin: "16px" }}
                        variant="outline-success"
                        onClick={handleClose}>
                        No
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }

    private setDeleteAccountModalShow(shouldShow: boolean) {
        this.setState({
            showDeleteAccountModal: shouldShow
        });
    }

    private handleFailure(message: string) {
        let failureState: UpdateFailure = UpdateFailure.NONE;

        if (message === MalformedPasswordErrorString) {
            failureState = UpdateFailure.MALFORMED_PASSWORD;
        } else if (message === MismatchedPasswordsErrorString) {
            failureState = UpdateFailure.MISMATCHED_PASSWORDS;
        } else if (message === IncorrectPasswordsErrorString) {
            failureState = UpdateFailure.INCORRECT_PASSWORD;
        } else if (message === MalformedEmailErrorString) {
            failureState = UpdateFailure.MALFORMED_EMAIL;
        } else if (message === MissingPasswordErrorString) {
            failureState = UpdateFailure.MISSING_PASSWORD;
        } else if (message === DuplicateAccountErrorString) {
            failureState = UpdateFailure.DUPLICATE_ACCOUNT;
        } else {
            failureState = UpdateFailure.UNKNOWN;
        }

        this.setState({
            failureState,
            showDeleteAccountModal: false,
            showDeleteAccountSpinner: false,
            showUpdateProfileSpinner: false
        });
    }

    private handleSubmit(event: any) {
        event.preventDefault();
        this.setState({ showUpdateProfileSpinner: true });

        const form = event.currentTarget;
        const data = {
            email: form.elements.formEmail.value,
            name: form.elements.formName.value,
            newPassword: form.elements.formNewPassword.value,
            newPasswordConfirm: form.elements.formNewPassword.value,
            oldPassword: form.elements.formOldPassword.value
        };

        if (data.newPassword.length > 0 && data.oldPassword.length === 0) {
            this.handleFailure(MissingPasswordErrorString);
            return;
        } else if (data.newPassword !== data.newPasswordConfirm) {
            this.handleFailure(MismatchedPasswordsErrorString);
            return;
        } else if (data.newPassword.length > 0 && !checkPasswordRequirements(data.newPassword)) {
            this.handleFailure(MalformedPasswordErrorString);
            return;
        } else if (data.email.length > 0 && !checkEmailRequirements(data.email)) {
            this.handleFailure(MalformedEmailErrorString);
            return;
        }

        Requests.postData("/api/v1/user/updateProfile", data, /*useAuth*/ true).then(res => {
            if (res.success) {
                this.setState({ showUpdateProfileSpinner: false });
                this.props.updateProfile(res.user as IUser);
            } else {
                this.handleFailure(res.message);
            }
        });
    }

    private deleteAccount() {
        this.setState({ showDeleteAccountSpinner: true });

        const data = { token: this.props.refreshToken };
        Requests.postData("/api/v1/user/delete", data, /*useAuth*/ true).then(res => {
            if (res.success) {
                this.setState({
                    showDeleteAccountModal: false,
                    showDeleteAccountSpinner: false
                });
                this.props.updateProfile(EMPTY_USER);
            } else {
                this.handleFailure(res.message);
            }
        });
    }

    private handleDeleteAccount(event: any) {
        event.preventDefault();
        this.setDeleteAccountModalShow(true);
    }
}

const mapStateToProps = (state: ISiteState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfile: (user: IUser) => {
            dispatch(setProfile(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDetailsSection);
