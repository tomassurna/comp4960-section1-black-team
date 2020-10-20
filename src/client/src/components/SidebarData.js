import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Calendar',
    path: '/',
    icon: <FaIcons.FaRegCalendarAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Sessions',
    path: '/sessions',
    icon: <AiIcons.AiFillMessage />,
    cName: 'nav-text'
  },
  {
    title: 'Timeslots',
    path: '/timeslots',
    icon: <FaIcons.FaHourglassEnd />,
    cName: 'nav-text'
  },
  {
    title: 'Speakers',
    path: '/speakers',
    icon: <FaIcons.FaUserFriends />,
    cName: 'nav-text'
  },
  {
    title: 'Rooms',
    path: '/rooms',
    icon: <FaIcons.FaWarehouse />,
    cName: 'nav-text'
  }
];