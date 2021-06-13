import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Login from "./views/User/Login";
import { Provider } from "react-redux";
import store from "./store";
import { storeCurrentUser } from "./actions/user";

export default class App extends Component {
  displayName = App.name;
  constructor(props) {
    super(props);
    this.state = {
      endUserData: sessionStorage.getItem("endUserData")
        ? sessionStorage.getItem("endUserData")
        : "",
    };
  }

  handleLogin = (endUserData) => {
    sessionStorage.setItem("endUserData", JSON.stringify(endUserData));
    this.setState({ endUserData: endUserData });
  };

  componentWillUnmount() {}

  render() {
    // store.dispatch(getAllNotifications());
    if (!sessionStorage.getItem("endUserData")) {
      return <Login handleLogin={(data) => this.handleLogin(data)} />;
    }
    store.dispatch(
      storeCurrentUser(JSON.parse(sessionStorage.getItem("token")))
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
