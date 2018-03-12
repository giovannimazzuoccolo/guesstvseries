import React from 'react';

const ImageC = ({src}) => {

	return (
		<img src={`
			https://image.tmdb.org/t/p/w500${src}`} alt="question" className="responsive" />
	)
}


export default ImageC
