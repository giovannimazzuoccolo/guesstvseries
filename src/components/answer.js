import React from 'react';

const Answer = ({answData}) => {

			return(
				<button key={answData.id}>{answData.name}</button>

		);

}

export default Answer;
