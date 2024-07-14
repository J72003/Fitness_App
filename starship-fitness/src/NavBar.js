import React from 'react';
import './NavBar.css';

const NavBar = ({ currentTab, setCurrentTab }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Starship Fitness</div>
      <ul className="navbar-nav">
        <li className={currentTab === 'home' ? 'active' : ''} onClick={() => setCurrentTab('home')}>Home</li>
        <li className={currentTab === 'form' ? 'active' : ''} onClick={() => setCurrentTab('form')}>Form</li>
        <li className={currentTab === 'about' ? 'active' : ''} onClick={() => setCurrentTab('about')}>About</li>
      </ul>
    </nav>
  );
};

export default NavBar;
