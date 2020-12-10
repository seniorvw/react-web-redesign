import React, { Component } from "react";
import WebsiteHeader from "../../Components/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "../../Components/WebsiteFooter/WebsiteFooter";
import ContactUsForm from "../../Components/ContactUsForm/ContactUsForm";
import * as Styles from "../../Util/Styles";

class ContactUs extends Component<any> {
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
        <div>
          <table style={{ minHeight: minTableHeight, marginLeft: "20px", width: tableWidth }} >
            <tbody>
              <tr style={{ verticalAlign: "top" }}>
                <td style={{ padding: "8px", width: "500px" }}>
                  <ContactUsForm width="500px" />
                </td>
              </tr>
            </tbody>
          </table>
        </div >
        <WebsiteFooter />
      </div >
    );
  }

  private updateDimensions = () => {
    // Force a re-render
    this.setState({});
  }
}

export default ContactUs;
