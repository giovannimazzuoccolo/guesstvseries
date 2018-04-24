import React from 'react';

const showPoints = ({ points }) => {
  if (points > 0) {
    return (<div className="points">{points}</div>);
  }
  return ('');
};

export default showPoints;
