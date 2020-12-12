import React from "react";
import TopHeader from "../../Components/TopHeader/TopHeader";

const Header = () => {
    return (
        <header>
            <TopHeader />
            <div className="container-fluid navMenuCont">
                <div className="container">
                    <div className="row">
                        <div className="col-12 navDexMenuCol">
                            <ul className="navDexMenu">
                                <li><a href="/" className="active">HOME</a></li>
                                <li><a href="/channel">ABOUT US</a></li>
                                <li><a href="/channel">CONTACT US</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
