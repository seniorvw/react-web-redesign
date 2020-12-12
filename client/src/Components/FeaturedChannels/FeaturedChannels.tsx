import React, { useEffect } from "react";

const FeaturedChannels = () => {
    return (
        <section className="pt_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="titleHead">
                            <h3>Featured Channels</h3>
                            <p>Channels that have most Followers now</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div id="featured_Channels" className="owl-carousel owl-theme featured_Channels">
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_01.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>HXRO Labs</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_02.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>CollegeofPips</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="channels.html" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_03.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>Carl Jenison</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_04.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>Ryan Tucker</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_05.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>Lyle Cunningham</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_01.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>HXRO Labs</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_02.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>CollegeofPips</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_03.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>Carl Jenison</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_04.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>Ryan Tucker</h5>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="channelsCol">
                                    <div className="channelsImg">
                                        <img src="images/channels_05.png" />
                                    </div>
                                    <div className="channelsTitle">
                                        <h5>Lyle Cunningham</h5>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedChannels;

