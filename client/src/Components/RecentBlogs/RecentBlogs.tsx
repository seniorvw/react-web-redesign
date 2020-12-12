import React from "react";
import OwlCarousel from "react-owl-carousel";

const RecentBlogs = () => {
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
                            <h3>Recent Blogs</h3>
                            <p>Excepteur sint occaecat cupidatat</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <OwlCarousel {...carouselOptions} className="owl-carousel owl-theme recent_blogs">
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_01.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">PINE SCRIPT</label>
                                        <h6>New Parameters to Manage Drawings Count</h6>
                                        <p>Today, most people know about or at least have
                                            heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_02.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">CHARTING LIBRARY</label>
                                        <h6>Alpaca Now Has <br />Brackets!</h6>
                                        <p>Today, most people know about or at
                                            least have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_03.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">MARKET ANALYSIS</label>
                                        <h6>New Watchlist Features in <br />TXTR</h6>
                                        <p>Today, most people know about or at least
                                            have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_01.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">PINE SCRIPT</label>
                                        <h6>New Parameters to Manage Drawings Count</h6>
                                        <p>Today, most people know about or at least
                                            have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_02.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">CHARTING LIBRARY</label>
                                        <h6>Alpaca Now Has <br />Brackets!</h6>
                                        <p>Today, most people know about or at least
                                            have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_03.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">MARKET ANALYSIS</label>
                                        <h6>New Watchlist Features in <br />TXTR</h6>
                                        <p>Today, most people know about or at least
                                            have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_01.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">PINE SCRIPT</label>
                                        <h6>New Parameters to Manage Drawings Count</h6>
                                        <p>Today, most people know about or at least
                                            have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_02.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">CHARTING LIBRARY</label>
                                        <h6>Alpaca Now Has <br />Brackets!</h6>
                                        <p>Today, most people know about or at least have
                                            heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="recent_blogsCol">
                                    <div className="recent_blogsImg">
                                        <img src="images/blog_03.png" />
                                    </div>
                                    <div className="recent_blogsTitle">
                                        <label className="label_Blog">MARKET ANALYSIS</label>
                                        <h6>New Watchlist Features in <br />TXTR</h6>
                                        <p>Today, most people know about or at least
                                            have heard about cryptocurrency,
                                            but few know the true history of bitcoin.
                                            Learn about origins of bitcoin here!</p>
                                        <a href="#" className="redMore">READ MORE</a>
                                        <div className="date_B">November 6, 2020</div>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentBlogs;
