import React from 'react';
import PropTypes from 'prop-types';

const ImageC = ({ src }) => (
  <img
    src={`https://image.tmdb.org/t/p/w500${src}`}
    alt="question"
    className="img-fluid image--guess"
  />
);

export default ImageC;

ImageC.propTypes = {
  src: PropTypes.string,
};

ImageC.defaultProps = {
  src: '',
};
