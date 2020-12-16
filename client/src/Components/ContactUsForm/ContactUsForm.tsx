import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { IContactUsFormProps, IContactUsFormState } from "./ContactUsForm.props";

import { Requests } from "../../Util/Requests";

class ContactUsForm extends Component<IContactUsFormProps, IContactUsFormState> {
    constructor(props: IContactUsFormProps) {
        super(props);

        this.state = {
            response: undefined,
            showModal: false,
            showSpinner: false
        };
    }

    render() {
        const { showModal, showSpinner, response } = this.state;

        const buttonMessage = this.props.isStreamerSignUp ? "Join Us!" : "Send";

        return (
            <div>
                <Form className="modalLoginForm" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formName">
                        {!!!this.props.isStreamerSignUp &&
                            <Form.Label>Name</Form.Label>
                        }
                        <Form.Control
                            type="text"
                            custom={true}
                            placeholder="Name"
                            required={true} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        {!!!this.props.isStreamerSignUp &&
                            <Form.Label>Email address</Form.Label>
                        }
                        <Form.Control
                            type="email"
                            custom={true}
                            placeholder="Email"
                            required={true} />
                    </Form.Group>
                    {!!!this.props.isStreamerSignUp &&
                        <Form.Group controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="name"
                                custom={true}
                                placeholder="Subject"
                                required={true}
                                defaultValue={this.props.subject} />
                        </Form.Group>
                    }
                    <Form.Group controlId="formMessage">
                        {!!!this.props.isStreamerSignUp &&
                            <Form.Label>Message</Form.Label>
                        }
                        <Form.Control
                            as="textarea"
                            rows={5}
                            custom={true}
                            required={!!!this.props.isStreamerSignUp}
                            placeholder="Message"
                            className="textareaCss"
                            defaultValue={this.props.message} />
                    </Form.Group>

                    <div className="form-group">
                        <button className="btn_" type="submit">
                            {buttonMessage}
                            {showSpinner &&
                                <Spinner
                                    style={{ verticalAlign: "middle", margin: "8px" }}
                                    animation="border"
                                    variant="light"
                                    size="sm" />}
                        </button>
                    </div>
                </Form>
                {response && showModal && this.renderResponseMessage()}
            </div>
        );
    }

    private setShow = (shouldShow: boolean) => {
        this.setState({
            showModal: shouldShow
        });
    }

    private getSubject = (form: any) => {
        if (!!!this.props.isStreamerSignUp) {
            return form.elements.formSubject.value;
        } else {
            return "Joining TRXR";
        }
    }

    private handleSubmit = (event: any) => {
        event.preventDefault();
        this.setState({ showSpinner: true });

        const form = event.currentTarget;
        const data = {
            email: form.elements.formEmail.value,
            isStreamerSignUp: this.props.isStreamerSignUp,
            message: form.elements.formMessage.value,
            name: form.elements.formName.value,
            saveEmailToDB: false,
            shouldCC: false,
            subject: this.getSubject(form),
        };

        Requests.postData("/api/v1/feedback/sendEmail", data, /*useAuth*/ false).then(res => {
            this.setState({
                response: res,
                showModal: true,
                showSpinner: false,
            });
        });
    }

    private renderResponseMessage = () => {
        const { showModal, response } = this.state;

        const handleClose = () => this.setShow(false);

        const title = response.success ? "Thank you!" : "Sorry";

        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {response.message}
                </Modal.Body>
            </Modal>
        );
    }
}

export default ContactUsForm;
