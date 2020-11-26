import React from "react";

// load react components lazily through code splitting
const Login = React.lazy(() => import("./pages/login/Login"));
const Sessions = React.lazy(() => import("./pages/sessions/Sessions"));

// set path for every page
const routes = [
  {
    path: "/pages/login",
    name: "Login",
    component: Login,
    requireAuthentication: false,
  },
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Login,
    requireAuthentication: false,
  },
  {
    path: "/pages/sessions",
    name: "Sessions",
    component: Sessions,
    requireAuthentication: true,
  },
];

export default routes;
