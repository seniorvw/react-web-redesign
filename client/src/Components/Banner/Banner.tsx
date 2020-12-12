import React from "react";

const Banner = () => {
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
                            <a href="#" data-toggle="modal" data-target="#BecomeStreamerModal" className="btn_red">
                                Become a streamer
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
