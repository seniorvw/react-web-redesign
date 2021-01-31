import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ContactUsForm from "../ContactUsForm/ContactUsForm";
import TermsDisclaimer from "../TermsDisclaimer/TermsDisclaimer";

const Banner = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const emailSubject = "Joining TRXR";
    const emailBody = "Hi, I would like to join TRXR.tv as a streamer.";

    return (
        <section className="bannerSection">
            <div className="bgImgHolder" style={{ backgroundImage: "url(images/bgHero.png)" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 wow fadeInUp">
                        <div className="bannerText">
                            <h1>TRXR LIVE STREAMS</h1>
                            <p>Live streaming for traders and investors.
                                Watch live trading, educational and<br />
                                informational content and chat with millions of
                                other traders from around the world.</p>
                            <a onClick={handleShow} className="btn_red">
                                Become a streamer
                                </a>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="BecomeStreamerModal" show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h4 className="modal-title">Send us an email</h4>
                </div>
                <Modal.Body>
                    <ContactUsForm width="400px" subject={emailSubject} message={emailBody} />
                </Modal.Body>
                {/* <Modal.Footer>
                    <TermsDisclaimer />
                </Modal.Footer> */}
            </Modal>
        </section>
    );
};

export default Banner;
