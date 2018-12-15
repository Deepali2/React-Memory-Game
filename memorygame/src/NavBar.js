import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = (props) => {
  return (
    <header>
      <h2>Memory Game</h2>
      <nav>
        <li onClick={props.onNewGame}>New Game </li>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  onNewGame: PropTypes.func.isRequired,
};

export default NavBar;