import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import store from "./store";
import { storeCurrentUser } from "./actions/user";

export default class App extends Component {
  displayName = App.name;
  constructor(props) {
    super(props);
    this.state = {
      adminData: sessionStorage.getItem("adminData")
        ? sessionStorage.getItem("adminData")
        : "",
    };
  }

  handleLogin = (adminData) => {
    sessionStorage.setItem("adminData", JSON.stringify(adminData));
    this.setState({ adminData: adminData });
  };

  componentWillUnmount() {}

  render() {
    // store.dispatch(getAllNotifications());
    if (!sessionStorage.getItem("adminData")) {
      return <Login handleLogin={(data) => this.handleLogin(data)} />;
    }
    store.dispatch(
      storeCurrentUser(JSON.parse(sessionStorage.getItem("adminData")))
    );
    return (
      <Provider store={store}>
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
          <div>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker((props) => {
                    return (
                      <route.layout noFooter {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              );
            })}
          </div>
        </Router>
      </Provider>
    );
  }
}
