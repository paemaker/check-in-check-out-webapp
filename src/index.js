// import './index.css';

// import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import App            from "./App";
import Dashboard      from "./Dashboard";
import Homefront      from "./Homefront";
import LogIn          from "./LogIn";
import Profile        from "./in&out/Profile";
import { Provider }   from "react-redux";
import React          from "react";
import ReactDOM       from "react-dom";
import Store          from "./Redux/Store";
import Test           from "./test";
import Test2          from "./test2";

const Main = () => (
  <Provider store={Store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/"             component={App} />
        <Route exact path="/LogIn"        component={LogIn} />
        <Route exact path="/Homefront"    component={Homefront} />
        <Route exact path="/Profile"      component={Profile} />
        <Route exact path="/Dashboard"    component={Dashboard} />
        <Route exact path="/Test"         component={Test} />
        <Route exact path="/Test2"        component={Test2} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
