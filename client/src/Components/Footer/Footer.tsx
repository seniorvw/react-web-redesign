import React from "react";
import NewsletterPrompt from "../NewsletterPrompt/NewsletterPrompt";
import TermsDisclaimer from "../TermsDisclaimer/TermsDisclaimer";

const Footer = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <a href="index.html" className="fLogo"><img src="images/logo_white.svg" /></a>
                        <h5>Follow us</h5>
                        <ul className="socialLinks">
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fab fa-vk"></i></a></li>
                            <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul className="f_links">
                            <li><a href="/">HOME</a></li>
                            <li><a href="/about-us">ABOUT</a></li>
                            <li><a href="/#contacSection">CONTACT US</a></li>
                        </ul>
                    </div>
                   <NewsletterPrompt />
                </div>
            </div>
           <TermsDisclaimer />
        </>
    );
};

export default Footer;
