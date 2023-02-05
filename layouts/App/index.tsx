import React from "react";
import { Switch, Route, Redirect } from "react-router";

import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";

//코드 스플리팅
const Login = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Workspace = loadable(() => import("@layouts/Workspace"))


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/workspace" component={Workspace} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
