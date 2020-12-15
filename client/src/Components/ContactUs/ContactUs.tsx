import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { Requests } from "../../Util/Requests";
import { useState } from "react";

const ContactUs = () => {

    const [state, setState] = useState({
        response: undefined,
        showModal: false,
        showSpinner: false
    });

    const handleSubmit = (event: any) => {
        const currentState = state;
        event.preventDefault();
        currentState.showSpinner = true;
        setState(currentState);
        const form = event.currentTarget;
        const data = {
            email: form.formEmail.value,
            // isStreamerSignUp: this.props.isStreamerSignUp,
            message: form.formMessage.value,
            name: form.formName.value + " " + form.formLastName.value,
            saveEmailToDB: false,
            shouldCC: false,
            subject: form.formSubject.value,
        };
        Requests.postData("/api/v1/feedback/sendEmail", data, /*useAuth*/ false).then(res => {
            setState({
                response: res,
                showModal: true,
                showSpinner: false,
            });
        });
    };


    const renderResponseMessage = () => {
        const currentState = state;
        const handleClose = () => {
            currentState.showModal = false;
            setState(currentState);
        };
        const response: any = currentState.response;
        const title = response.success ? "Thank you!" : "Sorry";
        return (
            <Modal show={state.showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {response.message}
                </Modal.Body>
            </Modal>
        );
    };


    return (
        <section id="contacSection" className="contacSection pt_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="contactFormWrap" id="contactFormWrap">
                            <h2>Contact Us</h2>
                            <Form className="contactForm_" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <Form.Group controlId="formName">
                                            <Form.Control
                                                custom={true}
                                                required={true} type="text"
                                                placeholder="First name"
                                                className="inputCss" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <Form.Group controlId="formLastName">
                                            <Form.Control
                                                custom={true}
                                                required={true} type="text"
                                                placeholder="Last name"
                                                className="inputCss" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <Form.Group controlId="formEmail">
                                            <Form.Control
                                                custom={true}
                                                required={true} type="text"
                                                placeholder="Email"
                                                className="inputCss" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <Form.Group controlId="formSubject">
                                            <Form.Control
                                                custom={true}
                                                required={true}
                                                type="text"
                                                placeholder="Subject"
                                                className="inputCss" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <Form.Group controlId="formMessage">
                                            <Form.Control
                                                custom={true}
                                                rows={5}
                                                required={true}
                                                as="textarea"
                                                placeholder="Message"
                                                className="textareaCss" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <button className="submitBtn" type="submit">
                                            {"Submit"}
                                            {state.showSpinner &&
                                                <Spinner
                                                    style={{ verticalAlign: "middle", margin: "8px" }}
                                                    animation="border"
                                                    variant="light"
                                                    size="sm" />}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                            {state.response && state.showModal && renderResponseMessage()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
