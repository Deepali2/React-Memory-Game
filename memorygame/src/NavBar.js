import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = (props) => {
  return (
    <header>
      <h2>Memory Game</h2>
      <nav>
        <li><button type='button' onClick={props.easyGame}>Easy</button></li>
        <li><button type='button' onClick={props.mediumGame}>Medium</button></li>
        <li><button type='button' onClick={props.hardGame}>Hard</button></li>
        <li><button type='button' onClick={props.superhardGame}>SuperHard</button></li>
        <li><button type='button' onClick={props.ultimateGame}>Ultimate</button></li>        
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  onNewGame: PropTypes.func.isRequired,
};

export default NavBar;