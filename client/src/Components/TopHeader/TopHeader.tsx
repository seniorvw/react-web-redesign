import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
import TermsDisclaimer from "../TermsDisclaimer/TermsDisclaimer";
import { connect } from "react-redux";
import { ISiteState } from "../../Store/state";
import { IUser } from "../../Store/models";
import { setLoginState } from "../../Store/actions";
import LoginButton from "../LoginButton/LoginButton";

const TopHeader = (props: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const emailSubject = "Joining TRXR";
    const emailBody = "Hi, I would like to join TRXR.tv as a streamer.";

    return (
        <div className="container-fluid navCont">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-md navbar-dark">
                            <a className="navbar-brand" href="/"><img src="images/logo.svg" /></a>
                            <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                                data-target="#collapsibleNavbar">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <form className="navSearch" action="">
                                    <input type="text" placeholder="Search for Channels" name="search" />
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </form>
                                <div className="ml-auto headLoginCol">
                                    <label onClick={handleShow}>Interested in becoming a streamer?</label>
                                    <LoginButton onLogin={props.updateLoginState} />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <Modal id="BecomeStreamerModal" show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h4 className="modal-title">Send us an email</h4>
                </div>
                <div className="modal-body">
                    <ContactUsForm width="400px" subject={emailSubject} message={emailBody} />
                </div>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state: ISiteState) => {
    return {
        user: state.user
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateLoginState: (user?: IUser, accessToken?: string, refreshToken?: string) => {
            dispatch(setLoginState(user, accessToken, refreshToken));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
