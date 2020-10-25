import React from 'react';

// load react components lazily through code splitting
const Timeslots = React.lazy(() => import('./pages/timeslots/Timeslots'));
const Calendar = React.lazy(() => import('./pages/calendar/Calendar'));
const Speakers = React.lazy(() => import('./pages/speakers/Speakers'));
const Sessions = React.lazy(() => import('./pages/sessions/Sessions'));
const Rooms = React.lazy(() => import('./pages/rooms/Rooms'));

// set path for every page
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/pages/timeslots', name: 'Timeslots', component: Timeslots },
  { path: '/pages/calendar', name: 'Calendar', component: Calendar },
  { path: '/pages/speakers', name: 'Speakers', component: Speakers },
  { path: '/pages/sessions', name: 'Sessions', component: Sessions },
  { path: '/pages/rooms', name: 'Rooms', component: Rooms },
];

export default routes;