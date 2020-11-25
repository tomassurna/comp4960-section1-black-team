import React from 'react';

// load react components lazily through code splitting
const Login = React.lazy(() => import('./pages/login/Login'));
const Sessions = React.lazy(() => import('./pages/sessions/Sessions'));

// set path for every page
const routes = [
  { path: '/', exact: true, name: 'Home', component: Login },
  { path: '/pages/sessions', name: 'Sessions', component: Sessions },
  { path: '/pages/login', name: 'Login', component: Login },
];

export default routes;
