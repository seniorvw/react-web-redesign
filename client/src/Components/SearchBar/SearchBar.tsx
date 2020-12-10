import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISearchBarState } from "./SearchBar.props";
import { ISearchObject } from "../../Store/models";
import Spinner from "react-bootstrap/Spinner";
import SearchRow from "../SearchRow/SearchRow";
import { Requests } from "src/Util/Requests";

class SearchBar extends Component<{}, ISearchBarState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      focused: false,
      searchData: undefined,
      searchText: ""
    };
  }

  render(): JSX.Element {
    const { searchText, focused } = this.state;

    return (
      <div style={{
        left: "50%",
        marginLeft: "-175px",
        position: "absolute",
        top: "4px",
        width: "350px"
      }}>
        <Form inline onFocus={this.onFocus} onBlur={this.onBlur} onSubmit={this.onSubmit}>
          <FormControl
            style={{ width: "350px", paddingRight: "50px" }}
            type="text"
            placeholder="Search for streams..."
            className="mr-sm-2"
            onInput={this.onSearchInputChanged}
          />
          <Button
            style={{ position: "absolute", left: "100%", marginLeft: "-50px", pointerEvents: "none" }}
            variant="outline-success"
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Form>
        {focused && searchText !== "" &&
          this.renderSearchResults()}
      </div>
    );
  }

  private onSearchInputChanged = (e: any) => {
    this.setState({
      searchText: e.target.value
    });
  }

  private renderSearchResults = () => {
    const { searchData, searchText } = this.state;

    return (
      <div style={{
        backgroundColor: "white",
        border: "solid",
        borderColor: "grey",
        borderRadius: "px",
        borderTop: "none",
        borderWidth: "thin",
        width: "342px"
      }}>
        {!!!searchData &&
          this.renderLoadingIcon()}
        {searchData &&
          searchData.map((value: ISearchObject) => {
            return (
              <div key={value.display_name}>
                {value.channel &&
                  value.channel.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 &&
                  <SearchRow searchObject={value} />
                }
              </div>
            );
          })}
      </div>
    );
  }

  private renderLoadingIcon = () => {
    return (
      <Spinner
        style={{ verticalAlign: "middle", margin: "8px" }}
        animation="border"
        variant="success"
        size="sm" />
    );
  }

  // Form property methods
  private onFocus = () => {
    this.getSearchBarData();

    this.setState({
      focused: true
    });
  }

  private onBlur = () => {
    this.setState({
      focused: false
    });
  }

  private onSubmit = (e: any) => {
    e.preventDefault();
  }

  private getSearchBarData = () => {
    Requests.getData("/api/v1/search", /* useAuth */ false).then(res => {
      if (res.success) {
        this.setState({
          searchData: res.data
        });
      } else {
        this.setState({
          searchData: []
        });
      }
    });
  }
}

export default SearchBar;
