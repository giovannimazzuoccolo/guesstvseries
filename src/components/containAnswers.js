import React, { Component } from 'react';


//import Answer from './answer.js';


class ContainAnswers extends Component {
	constructor(props) {
		super(props);
		console.log('myprops',props);

		this.state = { listOfAnswers : null }
	}

	componentWillReceiveProps(nextprops) {
 			console.log('myprops3',nextprops.answers.rightAnswer.name);
			let answers = [];
			answers.push({ id : nextprops.answers.rightAnswer.id, name :  nextprops.answers.rightAnswer.name});
				answers.push({ id : nextprops.answers.wrongAnswer1.id, name :  nextprops.answers.wrongAnswer1.name});
 				answers.push({id : nextprops.answers.wrongAnswer2.id, name: nextprops.answers.wrongAnswer2.name });


				const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

				answers = shuffleArray(answers);


			const answerList = answers.map( (singleAnswer) =>  {
				return (
						<button key={singleAnswer.id}>{singleAnswer.name}</button>
					)
			});
			console.log('myanswers', answerList);
			this.setState({listOfAnswers : answerList})
			}


	render () {

		return(
			<div className="ContainAnswers" >
				{ (!this.state.listOfAnswers) ? 'loading' : this.state.listOfAnswers }
			</div>

		);
	}

}


export default ContainAnswers;
