import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import routes from "../routes";
import $ from "jquery";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  authenticate(callback, password, username) {
    $.ajax({
      method: "POST",
      url: "/DayOfPassword/authenticate",
      data: password,
      type: "json",
      contentType: "application/json",
      success: (response) => {
        this.setState({ isAuthenticated: true, username: username });

        callback(response);
      },
    });
  }

  render() {
    return (
      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component && route.requireAuthentication ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        {!this.state.isAuthenticated ? (
                          <Redirect to="/" />
                        ) : (
                          <route.component
                            {...props}
                            username={this.state.username}
                          />
                        )}
                      </CFade>
                    )}
                  />
                ) : (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component
                          authenticate={this.authenticate.bind(this)}
                          {...props}
                        />
                      </CFade>
                    )}
                  />
                );
              })}
              <Redirect from="/" to="/pages/login" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    );
  }
}

// only renders if props have changed
export default React.memo(Content);
