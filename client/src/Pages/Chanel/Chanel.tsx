import React from "react";
import TopHeader from "../../Components/TopHeader/TopHeader";
import Footer from "../../Components/Footer/Footer";
import StreamObject from "../../Components/StreamObject/StreamObject";
import * as Styles from "../../Util/Styles";

const Chanel = (props: any) => {

    const contentID = props.match.params.contentID;
    const getChatRoomWidth = () => {
        const maxWidth = 400;
        const minWidth = 200;
        const twentyPercentWidth = window.innerWidth / 5;
        if (twentyPercentWidth > maxWidth) {
            return maxWidth;
        } else if (twentyPercentWidth < minWidth) {
            return minWidth;
        } else {
            return twentyPercentWidth;
        }
    };
    const chatRoomWidth = getChatRoomWidth();
    const streamWidth = (window.innerWidth - chatRoomWidth).toString();
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
                    <div className="row">
                        <div className="col-12 videoMainCol">
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
                            <div className="liveChatCol">
                                <div className="chatHead">
                                    <div className="chatTitle"><img src="images/chatboxes.svg" /> Live Chat</div>
                                    <div className="chatBoxOpt">
                                        <button type="button" className="minimize"></button>
                                        <button type="button"><img src="images/expand.svg" /></button>
                                    </div>
                                </div>
                                <div className="chatBody">
                                    <div className="message__">
                                        <h6 className="messageBy">Elegant joylin
                                        <span className="postTime">an hour ago</span></h6>
                                        <p>hi guys, welcome to our livestream today.<br />
                                        if you have questions, feel free to ask.<br />
                                        here in the livechat or in my social media or groups.</p>
                                        <p>TG: <a href="https://t.me/cautious_trader" target="_blank">
                                            https://t.me/cautious_trader</a></p>
                                        <p>BTSE: <a href="https://t.me/btse_philippines" target="_blank">
                                            https://t.me/btse_philippines</a></p>
                                        <p>AToken: <a href="https://t.me/atokenphilippine" target="_blank">
                                            https://t.me/atokenphilippine</a></p>
                                        <p>YT: <a href="https://bit.ly/3enuXdj" target="_blank">
                                            https://bit.ly/3enuXdj</a></p>
                                        <p>Let's start.</p>
                                    </div>
                                    <div className="message__">
                                        <h6 className="messageBy">
                                            Elegant joylin <span className="postTime">an hour ago</span>
                                        </h6>
                                        <p>Hi guys, welcome to our livestream today.<br />
                                        If you have questions, feel free to ask.<br />
                                        here in the livechat or in my social media or groups</p>
                                    </div>
                                </div>
                                <div className="chatFooter">
                                    <input type="text" name="" placeholder="Type a Comment..." />
                                    <button type="button"><img src="images/sendMsg.svg" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Chanel;
