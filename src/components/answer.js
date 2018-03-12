import React, { Component } from 'react';

class Answer extends Component {
constructor(props) {
	super(props);
	const answData = this.props.answData;
}

	clickHandeler() {
		alert('component is clicked');
	}

	render() {
			return(
				<button key={answData.id} onClick={this.clickHandeler}>{answData.name}</button>

		);
	}
}

export default Answer;
