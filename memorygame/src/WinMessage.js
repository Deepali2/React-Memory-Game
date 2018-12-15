import React from 'react';
import PropTypes from 'prop-types';
import './WinMessage.css';

const WinMessage = (props) => {
  return (
    <div>
    <h1 className='winMessage'>{props.winMessage}</h1>
    </div>
  );
};

WinMessage.propTypes = {
  winMessage: PropTypes.string.isRequired
}







export default WinMessage;