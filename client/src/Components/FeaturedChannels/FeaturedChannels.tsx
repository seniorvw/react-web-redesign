import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";

const FeaturedChannels = () => {
    const carouselResponsiveObject = {
        0: {
            items: 1
        },
        575: {
            items: 2,
            margin: 20
        },
        768: {
            items: 3,
            margin: 20
        },
        992: {
            items: 4,
            margin: 20
        },
        1200: {
            items: 5,
            margin: 55,
            loop: false
        }
    };
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
                        <OwlCarousel
                            loop={true}
                            dots={false}
                            nav={true}
                            responsiveClass={true}
                            margin={10}
                            responsive={carouselResponsiveObject}
                            className="owl-carousel owl-theme featured_Channels">
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
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedChannels;

