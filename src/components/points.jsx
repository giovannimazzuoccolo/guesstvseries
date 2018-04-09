import React from 'react';

const points = ({points}) => {

    if(points < 1) {
      points = "";
    }
    return (<div className='points'>{points}</div>)
}

export default points;
