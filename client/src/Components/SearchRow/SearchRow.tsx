import React, { Component } from "react";
import { ISearchRowProps } from "./SearchRow.props";

import * as pathConstants from "../../Util/PathConstants";

class SearchRow extends Component<ISearchRowProps> {
  constructor(props: ISearchRowProps) {
    super(props);
  }

  render(): JSX.Element {
    const divID = this.props.searchObject.channel ? this.props.searchObject.channel.id : "";
    return (
      <div style={{
        backgroundColor: "white",
        cursor: "pointer",
        height: "30px",
        lineHeight: "30px",
        marginLeft: "12px"
      }} onMouseDown={this.onMouseDown}>
        {this.props.searchObject.display_name}
      </div>
    );
  }

  private onMouseDown = (e: any) => {
    e.preventDefault();
    if (this.props.searchObject.channel) {
      const path = pathConstants.StreamPage + "/" + this.props.searchObject.channel.id;
      window.location.href = path;
    }
  }
}

export default SearchRow;
