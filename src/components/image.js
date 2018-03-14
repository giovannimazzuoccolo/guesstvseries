import React from 'react';

const ImageC = ({src}) => {

	return (
		<img src={`
			https://image.tmdb.org/t/p/w500${src}`} alt="question" className="img-fluid image--guess" />
	)
}


export default ImageC
