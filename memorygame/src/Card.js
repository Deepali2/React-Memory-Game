import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = (props) => {
  console.log(props);
  let style = {};
  if (props.showing) {
    style.backgroundColor = props.backgroundColor;
  }
  return (
    <div 
      className='card-container' 
      style={style}
      onClick={props.onClick}
      >
      {props.cardText}
    </div>
  );
}

Card.propTypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};


export default Card;