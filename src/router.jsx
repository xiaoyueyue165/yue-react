
import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import signIn from "./views/signIn/signIn";
import register from "./views/register/register";
import loginState from "./views/loginState/loginState";
import Home from "./views/home/home";


export default () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={signIn} />
        <Route exact path="/signIn" component={signIn} />
        <Route path="/register" component={register} />
        <Route path="/loginState" component={loginState} />
        <Route path="/home" component={Home} />
      </React.Fragment>
    </BrowserRouter>

  );
};
