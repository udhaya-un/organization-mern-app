import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./containers/login/login-container";
import Organizations from "./containers/organizations/find-organization";
import NewOrganization from "./containers/organizations/new-organization";
import CreateEmployee from "./containers/employees/new-employee";
import Employees from "./containers/employees/find-employee";
import { isLoggedIn } from "./services/auth";
import Dictionary from "./config/static/Dictionary";

const history = createBrowserHistory();

export default class Routes extends Component {
  async UNSAFE_componentWillMount() {
    // const { pathname } = window.location;
    // const logged = await isLoggedIn();
    // const allow = Dictionary.WHITE_LISTED_ROUTES.includes(pathname);
    // if (!logged && !allow) {
    //   history.push('/login');
    // }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Organizations} />
          <Route path="/organizations" component={Organizations} />
          <Route path="/create-organization" component={NewOrganization} />
          <Route path="/create-employee" component={CreateEmployee} />
          <Route path="/employees" component={Employees} />
        </Switch>
      </Router>
    );
  }
}
