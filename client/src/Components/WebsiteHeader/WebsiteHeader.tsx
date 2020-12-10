import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";

import * as pathConstants from "../../Util/PathConstants";
import * as Styles from "../../Util/Styles";

import LoginButton from "../LoginButton/LoginButton";
import RegistrationButton from "../RegistrationButton/RegistrationButton";
import StreamerSignUpButton from "../StreamerSignUpButton/StreamerSignUpButton";

import SearchBar from "../SearchBar/SearchBar";
import { ISiteState } from "../../Store/state";
import { setLoginState } from "../../Store/actions";
import { IWebsiteHeaderProps } from "./WebsiteHeader.props";
import UserDropDown from "../UserDropDown/UserDropDown";
import { IUser } from "../../Store/models";

// @ts-ignore
import TrxrImage from "../../Assets/trxr.png";

class WebsiteHeader extends Component<IWebsiteHeaderProps> {
  constructor(props: IWebsiteHeaderProps) {
    super(props);
  }

  render(): JSX.Element {
    // When we are ready for new users, allow for sign ups.
    const allowSignUp = false;

    return (
      <Navbar style={{ height: Styles.Sizes.HeaderHeight, zIndex: 10 }} bg="light" expand="lg">
        <Navbar.Brand href={pathConstants.Home}>
          <img src={TrxrImage} height="40px" width="100px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{ justifyContent: "flex-end" }} id="basic-navbar-nav" >
          <SearchBar />
          {!!!this.props.user && (
            <div style={{ display: "inline-flex" }}>
              {!allowSignUp &&
                <StreamerSignUpButton />}
              {allowSignUp &&
                <RegistrationButton onSignUp={this.props.updateLoginState} />}
              <LoginButton onLogin={this.props.updateLoginState} />
            </div>
          )}
          {this.props.user && (
            <UserDropDown
              onLogout={this.props.updateLoginState}
              user={this.props.user}
            />
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: ISiteState) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateLoginState: (user?: IUser, accessToken?: string, refreshToken?: string) => {
      dispatch(setLoginState(user, accessToken, refreshToken));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteHeader);
