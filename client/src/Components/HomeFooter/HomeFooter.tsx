import React from "react";

const HomeFooter = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-4">
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
                            <li><a href="index.html">HOME</a></li>
                            <li><a href="#">ABOUT</a></li>
                            <li><a href="#contactFormWrap">CONTACT US</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-5 newsletterCol">
                        <h5>Newsletter</h5>
                        <p>Join our newsletter to get updates</p>
                        <form className="newsletterForm">
                            <input type="text" name="" placeholder="Enter your email" />
                            <button type="button">JOIN</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-fluid copyRightBar">
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright 2020 <span>TXTR</span> All Right Reserved</p>
                        <p>By using this site, you agree to our <span>Terms and Conditions</span> </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
