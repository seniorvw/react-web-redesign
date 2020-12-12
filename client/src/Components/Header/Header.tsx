import React from "react";

const Header = () => {
    return (
        <header>
            <div className="container-fluid navCont">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-dark">
                                <a className="navbar-brand" href="index.html"><img src="images/logo.svg" /></a>
                                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                                    data-target="#collapsibleNavbar">
                                    <span className="navbarTogglerIcon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <form className="navSearch" action="">
                                        <input type="text" placeholder="Search for Channels" name="search" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </form>
                                    <div className="ml-auto headLoginCol">
                                        <a data-toggle="modal" data-target="#BecomeStreamerModal" >
                                            <label>Interested in becoming a streamer?</label>
                                        </a>
                                        <button type="button" data-toggle="modal" data-target="#LoginModal" className="btn_green">Login</button>
                                    </div>
                                    <ul className="navbar-nav ml-auto mobileNav">
                                        <li className="nav-item">
                                            <a className="nav-link" href="index.html">HOME</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">ABOUT US</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#contactFormWrap">CONTACT US</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid navMenuCont">
                <div className="container">
                    <div className="row">
                        <div className="col-12 navDexMenuCol">
                            <ul className="navDexMenu">
                                <li><a href="#" className="active">HOME</a></li>
                                <li><a href="#">ABOUT US</a></li>
                                <li><a href="#contactFormWrap">CONTACT US</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
