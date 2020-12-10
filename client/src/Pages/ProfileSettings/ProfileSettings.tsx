import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { ISiteState } from "../../Store/state";
import * as pathConstants from "../../Util/PathConstants";
import { IProfileSettingsProps } from "./ProfileSettings.props";
import WebsiteHeader from "../../Components/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "../../Components/WebsiteFooter/WebsiteFooter";
import EditProfileDetailsSection from "../../Components/EditProfileDetailsSection/EditProfileDetailsSection";
import { EMPTY_USER } from "../../Store/models";
import StreamDetailsSection from "../../Components/StreamDetailsSection/StreamDetailsSection";
import * as Styles from "../../Util/Styles";

class ProfileSettings extends Component<IProfileSettingsProps> {
  constructor(props: IProfileSettingsProps) {
    super(props);

    this.isAuthenticated = this.isAuthenticated.bind(this);
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

    // Check if we have an auth token and user present, if not
    // then redirect to the home page.
    if (!this.isAuthenticated()) {
      return (
        <Redirect to={pathConstants.Home} />
      );
    }

    return (
      <div>
        <WebsiteHeader />
        <div>
          <table style={{ minHeight: minTableHeight, marginLeft: "20px", width: tableWidth }} >
            <tbody>
              <tr style={{ verticalAlign: "top" }}>
                <td style={{ padding: "8px", width: "350px" }}>
                  <EditProfileDetailsSection
                    accessToken={this.props.accessToken}
                    refreshToken={this.props.refreshToken}
                    user={this.props.user} />
                </td>
                <td style={{ padding: "8px", width: "350px" }}>
                  <StreamDetailsSection
                    accessToken={this.props.accessToken}
                    refreshToken={this.props.refreshToken}
                    user={this.props.user} />
                </td>
              </tr>
            </tbody>
          </table>
        </div >
        <WebsiteFooter />
      </div >
    );
  }

  private isAuthenticated() {
    return this.props.accessToken !== "" && this.props.refreshToken !== "";
  }

  private updateDimensions = () => {
    // Force a re-render
    this.setState({});
  }
}

const mapStateToProps = (state: ISiteState) => {
  return {
    accessToken: state.accessToken || "",
    refreshToken: state.refreshToken || "",
    user: state.user || EMPTY_USER
  };
};

export default connect(mapStateToProps)(ProfileSettings);
