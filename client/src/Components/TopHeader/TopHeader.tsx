import React from "react";

const TopHeader = () => {
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
                                        <label>Interested in becoming a streamer?</label>
                                        <button type="button" data-toggle="modal" data-target="#LoginModal" className="btn_green">Login</button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default TopHeader;
