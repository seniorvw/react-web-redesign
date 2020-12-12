import React from "react";

const ContactUs = () => {
    return (
        <section className="contacSection pt_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="contactFormWrap" id="contactFormWrap">
                            <h2>Contact Us</h2>
                            <form className="contactForm_">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <input type="text" name="" placeholder="First name" className="inputCss" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <input type="text" name="" placeholder="Last name" className="inputCss" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <div className="form-group">
                                            <input type="text" name="" placeholder="Email" className="inputCss" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <div className="form-group">
                                            <input type="text" name="" placeholder="Subject" className="inputCss" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <div className="form-group">
                                            <textarea placeholder="Message" className="textareaCss"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-12">
                                        <button type="button" className="submitBtn">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
