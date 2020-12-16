import React, { Component } from "react";

// @ts-ignore
import ZackImage from "../../Assets/zack.png";
// @ts-ignore
import ChrisImage from "../../Assets/chris.png";
// @ts-ignore
import SteveImage from "../../Assets/steve.png";
// @ts-ignore
import TrxrImage from "../../Assets/trxr.png";

import * as Bios from "../../Assets/Bios";
import * as Styles from "../../Util/Styles";

import FounderBio from "../../Components/FounderBio/FounderBio";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import TopHeader from "src/Components/TopHeader/TopHeader";
import Footer from "src/Components/Footer/Footer";

class AboutUs extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const windowHeight = (window.innerHeight - Styles.headerAndFooterHeight()).toString() + "px";

    return (
      <div>
        <header className="noFixHeader">
          <TopHeader />
        </header>
        <div
          style={{
            alignItems: "center",
            display: "block",
            height: "fit-content",
            justifyContent: "center",
            margin: "auto",
            minHeight: windowHeight,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Card
            style={{
              alignItems: "center",
              border: "none",
              padding: "0px",
            }}
          >
            <Card.Body style={{ padding: "0px" }}>
              <Card.Img
                style={{
                  height: "200px",
                  width: "500px"
                }}
                src={TrxrImage}
              />
            </Card.Body>
            <Card.Text style={{ width: "800px" }}>
              {Bios.OurStory}
            </Card.Text>
          </Card>
          <CardGroup style={{ width: "1200px", margin: "auto" }}>
            <FounderBio
              bioImage={SteveImage}
              bioName="Steve Lengieza"
              bioDescription={Bios.SteveBio}
            />
            <FounderBio
              bioImage={ZackImage}
              bioName="Zack Raposo"
              bioDescription={Bios.ZackBio}
            />
            <FounderBio
              bioImage={ChrisImage}
              bioName="Chris Damschroder"
              bioDescription={Bios.ChrisBio}
            />
          </CardGroup>
          <br /> <br />
          We’d love to hear your feedback. Sends us your ideas through the
          Contact Us button at the bottom of the page.
        </div>
        <footer className="beforeNone">
          <Footer />
        </footer>
      </div>
    );
  }

  private updateDimensions = () => {
    // Force a re-render
    this.setState({});
  }
}

export default AboutUs;
