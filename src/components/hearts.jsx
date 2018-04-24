import React from 'react';
import PropTypes from 'prop-types';

const showHearts = ({ hearts }) => {
  console.log('heartsComponent', hearts);
  const listHearts = [];
  for (let i = 0; i < hearts; i += 1) {
    listHearts.push(<i className="fa fa-heart red-heart" key={i} />);
  }

  return (
    <div className="heart--container">
      {listHearts}
    </div>
  );
};


showHearts.propTypes = {
  hearts: PropTypes.number,
};

showHearts.defaultProps = {
  hearts: 3,
};

export default showHearts;
