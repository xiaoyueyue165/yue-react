
import React from "react";
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import {
  SignIn,
  LoginControl,
  Home,
  NoMatch,
} from "./views";
import ScrollToTop from "./utils/ScrollToTop";

export default class Router extends React.Component {
  componentWillMount() {
    window.yueGlobal = {
      assests_path: "../../assets/"
    };
  }
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/index.html" component={Home} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/register" component={LoginControl} />
            <Route path="/forgetPwd" component={LoginControl} />
            <Route path="/home" component={Home} />
            {/* 404 */}
            <Route path="/404" component={NoMatch} />
            <Route path="*" render={() => (<Redirect to="/404" />)} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>

    );
  }
};
