import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Pages/Home/Home";
import StreamPage from "./Pages/StreamPage/StreamPage";
import UnspportedPage from "./Pages/UnsupportedPage";

import * as pathConstants from "./Util/PathConstants";
import * as Styles from "./Util/Styles";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import StreamerSignupPage from "./Pages/StreamerSignupPage/StreamerSignupPage";
import ProfileSettings from "./Pages/ProfileSettings/ProfileSettings";
import Chanel from "./Pages/Chanel/Chanel";

class App extends Component {
  render() {
    return (
      <Switch>
        <div style={{ fontFamily: Styles.Fonts.default }}>
          <Switch>
            <Route exact path={pathConstants.Home} component={Home} />
            <Route exact path={pathConstants.StreamPage + "/:contentID"} component={Chanel} />
            {/* <Route
              exact
              path={pathConstants.StreamPage + "/:contentID"}
              component={StreamPage}
            /> */}
            <Route exact path={pathConstants.AboutUs} component={AboutUs} />
            <Route exact path={pathConstants.contactUs} component={ContactUs} />
            <Route exact path={pathConstants.streamerSignUp} component={StreamerSignupPage} />
            <Route exact path={pathConstants.profileSettings} component={ProfileSettings} />
            {/* Handle all other pages. */}
            <Route component={UnspportedPage}
            />
          </Switch>
        </div>
      </Switch>
    );
  }
}

export default App;
