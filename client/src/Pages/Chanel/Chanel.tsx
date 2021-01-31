import React from "react";
import TopHeader from "../../Components/TopHeader/TopHeader";
import Footer from "../../Components/Footer/Footer";
import StreamObject from "../../Components/StreamObject/StreamObject";
import * as Styles from "../../Util/Styles";
import ChatRoom from "src/Components/ChatRoom/ChatRoom";

const Chanel = (props: any) => {

    const contentID = props.match.params.contentID;
    const chatRoomWidth = 450;
    const streamWidth = (window.innerWidth - 20 - chatRoomWidth).toString();
    const windowHeight = (window.innerHeight - Styles.headerAndFooterHeight()).toString();

    return (
        <div>
            <header className="noFixHeader">
                <TopHeader />
            </header>
            <section className="channelsVideoSection">
                <div className="container-fluid ">
                    <div className="row channelsHead">
                        <div className="col-12 col-md-5">
                            <div className="channelsName">
                                <div className="channel_Ic">
                                    <span>CJ</span>
                                </div>Carl Jenison</div>
                        </div>
                        <div className="col-12 col-md-7">
                            <ul className="channelOption">
                                <li><a href="#"><img src="images/tw.svg" /></a></li>
                                <li><a href="#"><img src="images/fb.svg" /></a></li>
                                <li><button type="button"><img src="images/clip.svg" /></button></li>
                                <li className="ptb-0"><button type="button" className="border_btn">Follow</button></li>
                                <li><button type="button" className=""><img src="images/close.svg" /></button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="videoMainCol row">
                        <div className="videoLeftCol">
                            <StreamObject
                                contentID={"181053_c_" + contentID}
                                width={streamWidth}
                                height={windowHeight} />
                            <div className="videoTextCaption">
                                <div className="videoTH">
                                    <h3>HXRO Labs Live - EP. 61 - w/ RT and Nick Cote</h3>
                                    <div className="like__"><i className="far fa-heart"></i> 1,260</div>
                                </div>
                                <p>integer dapibus nisl sodales leo faucibus,
                                        eu dapibus felis iaculis. Phasellus. fringilla odio eu mi hendrerit id <br />
                                        elementum arcu hendrerit. Proin consectetur velit in augue vulputate aliquet.
                                        Nullam metus diam</p>
                            </div>
                        </div>
                        <ChatRoom roomId={contentID} width={chatRoomWidth} />
                    </div>
                </div>
            </section>
            <footer className="beforeNone">
                <Footer />
            </footer>
        </div>
    );
};

export default Chanel;
