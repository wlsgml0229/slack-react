import React from "react";
import { Switch, Route, Redirect } from "react-router";

import { BrowserRouter } from "react-router-dom";
import loadble from "@loadable/component";

//코드 스플리팅
const Login = loadble(() => import("@pages/Login"));
const SignUp = loadble(() => import("@pages/SignUp"));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;