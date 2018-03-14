import React, { Component } from 'react';


import ButtonAnswer from './button.jsx';


class ContainAnswers extends Component {
	constructor(props) {
		super(props);
		console.log('myprops',props);

		this.state = { listOfAnswers : null, rightAnswerId : 0, resultClass : 'btn-primary' };
	}


	tryToGuess(e){
		if(e === this.state.rightAnswerId) {
			console.log('isRight');
			this.setState({resultClass : 'btn-success'});
		} else {
			this.setState({resultClass : 'btn-danger'});
		}
	}

	componentWillReceiveProps(nextprops) {
			 console.log('myprops3',nextprops.answers.rightAnswer.name);
			
			let answers = [];
			answers.push({ id : nextprops.answers.rightAnswer.id, name :  nextprops.answers.rightAnswer.name });
				answers.push({ id : nextprops.answers.wrongAnswer1.id, name :  nextprops.answers.wrongAnswer1.name});
 				answers.push({id : nextprops.answers.wrongAnswer2.id, name: nextprops.answers.wrongAnswer2.name });

				 this.setState({rightAnswerId : nextprops.answers.rightAnswer.id});
				const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

				answers = shuffleArray(answers);


			const answerList = answers.map( (singleAnswer) =>  {
				return (
						<ButtonAnswer dataAnswer={singleAnswer} key={singleAnswer.id} correctAnswer={nextprops.answers.rightAnswer.id} restart={this.props.restart} />
						//<button key={singleAnswer.id} className={`btn btn-lg btn-block ${result} `}  onClick={(e) => this.tryToGuess(singleAnswer.id,e)}>{singleAnswer.name}</button>
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
