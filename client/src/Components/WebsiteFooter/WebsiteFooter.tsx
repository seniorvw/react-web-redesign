import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import * as pathConstants from "../../Util/PathConstants";
import * as Styles from "../../Util/Styles";

// @ts-ignore
import TrxrImage from "../../Assets/trxr.png";
import TermsDisclaimer from "../TermsDisclaimer/TermsDisclaimer";

class WebsiteFooter extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render(): JSX.Element {
    const windowWidth = window.innerWidth;

    return (
      <Navbar
        bg="light"
        expand="lg"
        sticky="bottom"
        style={{
          display: "inline-flex",
          height: Styles.Sizes.FooterHeight,
          textAlign: "center",
          width: "100%"
        }}
      >
        <TermsDisclaimer />
        <ul
          style={{
            fontSize: "14px",
            listStyleType: "none",
            margin: "auto",
            padding: "0px",
            position: "absolute",
            width: "100%",
          }}
        >
          <li
            style={{
              display: "inline",
              paddingLeft: "50px",
              paddingRight: "50px"
            }}
          >
            <Link
              style={{ color: Styles.Colors.green }}
              to={pathConstants.AboutUs}>About Us</Link>
          </li>
          <li
            style={{
              display: "inline",
              paddingLeft: "50px",
              paddingRight: "50px"
            }}
          >
            <img src={TrxrImage} height="40px" width="100px" />
          </li>
          <li
            style={{
              display: "inline",
              paddingLeft: "50px",
              paddingRight: "50px"
            }}
          >
            <Link
              style={{ color: Styles.Colors.green }}
              to={pathConstants.contactUs}>Contact Us</Link>
          </li>
        </ul>
      </Navbar>
    );
  }
}

export default WebsiteFooter;
