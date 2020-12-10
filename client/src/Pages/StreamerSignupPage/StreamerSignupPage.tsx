import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import WebsiteHeader from "../../Components/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "../../Components/WebsiteFooter/WebsiteFooter";
import ContactUsForm from "../../Components/ContactUsForm/ContactUsForm";

// @ts-ignore
import TrxrImage from "../../Assets/trxr.png";
import * as Styles from "../../Util/Styles";

class StreamerSignupPage extends Component<any> {
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
    const tableWidth = (window.innerWidth - 40).toString() + "px";
    const minTableHeight = (window.innerHeight - Styles.headerAndFooterHeight()).toString() + "px";

    return (
      <div>
        <WebsiteHeader />

        <div
          style={{
            alignItems: "center",
            display: "block",
            height: "fit-content",
            justifyContent: "center",
            margin: "auto",
            minHeight: minTableHeight,
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
            <Card.Text style={{ width: "600px" }}>
              <span>
                Hey, we're excited you took the opportunity to check us out!<br />
                Please leave your information below so we can follow up with the next steps.
              </span>
            </Card.Text>
          </Card>
          <table style={{ marginLeft: "20px", width: tableWidth }} >
            <tbody>
              <tr style={{ verticalAlign: "top" }}>
                <td style={{ padding: "8px", width: "500px" }}>
                  <ContactUsForm isStreamerSignUp={true} width="500px" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <WebsiteFooter />
      </div >
    );
  }

  private updateDimensions = () => {
    // Force a re-render
    this.setState({});
  }
}

export default StreamerSignupPage;
