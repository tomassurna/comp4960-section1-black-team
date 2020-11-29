import React from 'react';

// load react components lazily through code splitting
const Timeslots = React.lazy(() => import('./pages/timeslots/Timeslots'));
const Calendar = React.lazy(() => import('./pages/calendar/Calendar'));
const Speakers = React.lazy(() => import('./pages/speakers/Speakers'));
const Sessions = React.lazy(() => import('./pages/sessions/Sessions'));
const Rooms = React.lazy(() => import('./pages/rooms/Rooms'));
const Password = React.lazy(() => import('./pages/password/DayOfPassword'));
const Count = React.lazy(() => import('./pages/count/Count'));

// set path for every page
const routes = [
  { path: '/', exact: true, name: 'Home', component: Calendar },
  { path: '/pages/timeslots', name: 'Timeslots', component: Timeslots },
  { path: '/pages/calendar', name: 'Calendar', component: Calendar },
  { path: '/pages/speakers', name: 'Speakers', component: Speakers },
  { path: '/pages/sessions', name: 'Sessions', component: Sessions },
  { path: '/pages/rooms', name: 'Rooms', component: Rooms },
  { path: '/pages/password', name: 'Day of Password', component: Password },
  { path: '/pages/count', name: 'Count', component: Count },
];

export default routes;
