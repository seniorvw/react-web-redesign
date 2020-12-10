import React, { Component } from "react";
import * as pathConstants from "../Util/PathConstants";
import WebsiteHeader from "../Components/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "../Components/WebsiteFooter/WebsiteFooter";
import Card from "react-bootstrap/Card";

// @ts-ignore
import Whoopsies from "../Assets/Whoopsies.webp";

class UnspportedPage extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <WebsiteHeader />
        <div
          style={{
            alignItems: "center",
            display: "block",
            justifyContent: "center",
            margin: "auto",
            textAlign: "center",
            width: "1200px"
          }}
        >
          <Card
            style={{
              border: "none",
              paddingBottom: "20px",
              paddingLeft: "25%",
              paddingRight: "25%",
              paddingTop: "20px"
            }}
          >
            <Card.Img
              style={{
                alignItems: "center",
                display: "block",
                height: "500px",
                justifyContent: "center",
                margin: "auto",
                width: "700px"
              }}
              variant="bottom"
              src={Whoopsies}
            />
            <Card.Body style={{}}>
              <Card.Title style={{ fontSize: "16px", color: "black" }}>
                {pathConstants.siteName + this.props.location.pathname} doesn't
                exist
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <WebsiteFooter /> -->
      </div>
    );
  }
}

export default UnspportedPage;
