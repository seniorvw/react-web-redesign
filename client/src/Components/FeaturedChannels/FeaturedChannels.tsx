import React, { useEffect } from "react";
import { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import * as pathConstants from "../../Util/PathConstants";

const FeaturedChannels = () => {

    const [channelList, setChannelList] = useState([]);

    useEffect(() => {
        getAllChannels();
    }, []);

    const getAllChannels = () => {
        // TODO remove filter this when we launch
        fetch("/api/v1/dacast/channels?filter=fake")
            .then(res => res.json())
            .then(result => {
                setChannelList(result.data);
            });
    };

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
                        {channelList.length && <OwlCarousel
                            {...carouselOptions}
                            className="owl-carousel owl-theme featured_Channels">
                            {channelList.map((item: any, index) => {
                                return (
                                    <div key={index} className="item">
                                        <a href={pathConstants.StreamPage + "/" + item.id} className="channelsCol">
                                            <div className="channelsImg">
                                                <img
                                                    src={item && item.pictures &&
                                                        item.pictures.thumbnail &&
                                                        item.pictures.thumbnail[0]} />
                                            </div>
                                            <div className="channelsTitle">
                                                <h5>{item.title}</h5>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </OwlCarousel>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedChannels;

