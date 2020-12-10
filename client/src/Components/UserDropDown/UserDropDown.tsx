import React, { Component } from "react";
import { connect } from "react-redux";

import Dropdown from "react-bootstrap/Dropdown";

import * as pathConstants from "../../Util/PathConstants";

import { IUserDropDownProps } from "./UserDropDown.props";
import { Requests } from "../../Util/Requests";
import { ISiteState } from "../../Store/state";

class UserDropDown extends Component<IUserDropDownProps> {
  constructor(props: IUserDropDownProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
          {this.props.user.name.split(" ")[0]}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ right: 0, left: "unset" }}>
          <Dropdown.Item href={pathConstants.profileSettings}>Settings</Dropdown.Item>
          <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  private handleLogout(event: any) {
    const data = {
      token: this.props.refreshToken
    };

    Requests.postData("/api/v1/auth/logout", data, /*useAuth*/ false).then(res => {
      if (res.success) {
        this.props.onLogout(undefined);
      }
    });

  }
}

const mapStateToProps = (state: ISiteState) => {
  return {
    refreshToken: state.refreshToken || ""
  };
};

export default connect(mapStateToProps)(UserDropDown);
