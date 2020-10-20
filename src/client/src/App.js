import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Calendar from './pages/Calendar.js';
import Sessions from './pages/Sessions.js';
import Timeslots from './pages/Timeslots.js';
import Speakers from './pages/Speakers.js';
import Rooms from './pages/Rooms.js';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Calendar} />
          <Route path='/sessions' component={Sessions} />
          <Route path='/timeslots' component={Timeslots} />
          <Route path='/speakers' component={Speakers} />
          <Route path='/rooms' component={Rooms} />
        </Switch>
      </Router>
    </>
  );
}

export default App;