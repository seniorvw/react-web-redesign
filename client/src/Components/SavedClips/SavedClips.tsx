import React from "react";
import OwlCarousel from "react-owl-carousel";

const SavedClips = () => {
    const carouselOptions = {
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2,
                margin: 20
            },
            1000: {
                items: 3,
                margin: 20,
                loop: false
            },
            1200: {
                items: 3,
                margin: 40,
                loop: false
            }
        }
    };
    return (
        <section className="pt_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="titleHead">
                            <h3>Saved Clips</h3>
                            <p>Videos that has been saved more</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <OwlCarousel {...carouselOptions} className="owl-carousel owl-theme saved_Clips">
                            <div className="item">
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_01.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>HXRO Labs Live - Ep. 62 - w/ RT</h6>
                                        <p>RT will sit down with the legendary Bitcoin trader @BTC_JackSparrow.</p>
                                    </div>
                                </a>
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_04.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>FTF trade on NAS100 yesterday</h6>
                                        <p>FTF trade is one of the trades that I invented by myself,
                                            and it gave a nice run yesterday on NAS100</p>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_02.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>Crypto-Trading Virtual Conference</h6>
                                        <p>Thousands of crypto trading enthusiasts will
                                            take part in community-driven workshops,
                                            learn from top trading .</p>
                                    </div>
                                </a>
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_05.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>HXRO Labs Live - Ep. 62 - w/ RT</h6>
                                        <p>RT will sit down with the legendary Bitcoin trader @BTC_JackSparrow.</p>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_03.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>Live - Analysis - Forecast for Forex, Crypto</h6>
                                        <p>Live Trading Analysis for Upcoming Trading Week - 7 to 11 December 2020</p>
                                    </div>
                                </a>
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_06.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>HXRO Labs Live - Ep. 62 - w/ RT</h6>
                                        <p>RT will sit down with the legendary Bitcoin trader @BTC_JackSparrow.</p>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_01.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>HXRO Labs Live - Ep. 62 - w/ RT</h6>
                                        <p>RT will sit down with the legendary Bitcoin trader @BTC_JackSparrow.</p>
                                    </div>
                                </a>
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_04.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>FTF trade on NAS100 yesterday</h6>
                                        <p>FTF trade is one of the trades that I invented by myself,
                                            and it gave a nice run yesterday on NAS100</p>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_02.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>Crypto-Trading Virtual Conference</h6>
                                        <p>Thousands of crypto trading enthusiasts will
                                            take part in community-driven workshops,
                                            learn from top trading .</p>
                                    </div>
                                </a>
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_05.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>HXRO Labs Live - Ep. 62 - w/ RT</h6>
                                        <p>RT will sit down with the legendary Bitcoin trader @BTC_JackSparrow.</p>
                                    </div>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_03.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>Live - Analysis - Forecast for Forex, Crypto</h6>
                                        <p>Live Trading Analysis for Upcoming Trading Week - 7 to 11 December 2020</p>
                                    </div>
                                </a>
                                <a href="#" className="clipsCol">
                                    <div className="clipsImg">
                                        <button type="button" className="playBtn">
                                            <img src="images/playBtn.svg" />
                                            </button>
                                        <img src="images/saved_clips_06.png" />
                                    </div>
                                    <div className="clipsTitle">
                                        <h6>HXRO Labs Live - Ep. 62 - w/ RT</h6>
                                        <p>RT will sit down with the legendary Bitcoin trader @BTC_JackSparrow.</p>
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

export default SavedClips;
