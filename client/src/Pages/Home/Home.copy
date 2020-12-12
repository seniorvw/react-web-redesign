import React, { Component } from "react";

import { connect } from "react-redux";
import { ISiteState } from "../../Store/state";

import WebsiteHeader from "../../Components/WebsiteHeader/WebsiteHeader";
import HomePageVideoPanel from "../../Components/HomePageVideoPanel/HomePageVideoPanel";
import WebsiteFooter from "../../Components/WebsiteFooter/WebsiteFooter";
import * as Styles from "../../Util/Styles";

class Home extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const windowHeight = (window.innerHeight - Styles.headerAndFooterHeight()).toString() + "px";

    return (
      <div>
        <WebsiteHeader />
        <div style={{ width: "100%", display: "inline-flex" }}>
          <div style={{
            backgroundColor: "black",
            minHeight: windowHeight,
            overflowX: "hidden",
            width: "100%"
          }}>
            <HomePageVideoPanel />
          </div>
        </div>
        <WebsiteFooter />
      </div>
    );
  }
}

const mapStateToProps = (state: ISiteState) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);
