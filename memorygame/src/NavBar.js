import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = (props) => {
  return (
    <header>
      <h2><a>Memory Game</a></h2>
      <nav>
        <li><a>New Game</a></li>
      </nav>
    </header>
  );
};

NavBar.propTypes = {

};

export default NavBar;