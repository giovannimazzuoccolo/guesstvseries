import React from 'react';
import PropTypes from 'prop-types';

const gameover = ({ points, trigger }) => {
  if (trigger) {
    return (<div className="gameover">GAME OVER! Points: {points}</div>);
  }
  return (<div />);
};

gameover.propTypes = {
  points: PropTypes.number,
  trigger: PropTypes.bool,
};

gameover.defaultProps = {
  points: 0,
  trigger: false,
};

export default gameover;
