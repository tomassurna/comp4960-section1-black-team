import React from 'react';
import './Navbar.css';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';

function Navbar() {
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <nav className='nav-menu active'>
        <ul className='nav-menu-items'>
          <li className='navbar-top'>
            <div className='logo'>
              <img src={logo} alt="Logo" width="120px"/>
            </div>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
