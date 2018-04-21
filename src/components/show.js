import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newAnswer } from '../actions/index';

// import api
import Api from '../api';

// components
import ImageC from './image';
import ContainAnswers from './containAnswers';
import HeartsContainer from './heartsContainer';
import Timer from './timer';
import Points from './points';
import Gameover from './gameover';

const mapStateToProps = ({ answer, lives }) => ({
  answer,
  lives,
});

const mapDispatchToProps = { newAnswer };

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {
        wrongAnswer1: {
          name: null,
          id: null,
        },
        wrongAnswer2: {
          name: null,
          id: null,
        },
        rightAnswer: {
	   name: null,
		  id: null },
}, image: null, selectedAnswer: null, seriesList: [], resetTimer: 0, gameover: false };
}

		componentWillReceiveProps({answer, lives}) {
			if(lives === 0) {
					this.gameover();
			}

			if(answer) {
				this.restart();
			}
		}


	gameover() {
		this.setState( {gameover : true} );

	}

	componentDidMount() {
				const apiKey = Api();
				const fetchAsyncA = async() => {
					let response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key='+apiKey+'&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false');

					let data = await response.json();

					await this.prepareQuestion(data.results);
				}
		fetchAsyncA();
	}

	restart() {
		if(this.state.resetTimer % 10 === 0) {
				this.refetch((this.state.resetTimer/10)+1);
			} else {
				this.prepareQuestion(this.state.seriesList);
			}
		this.setState({resetTimer : this.state.resetTimer+1});
		return true;
	}

	refetch(page) {
		const apiKey = Api();
		const fetchAsyncA = async () => {
			let response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key='+apiKey+'&language=en-US&sort_by=popularity.desc&page='+page+'&timezone=America%2FNew_York&include_null_first_air_dates=false');

			let data = await response.json();

			await this.prepareQuestion(data.results);
		}
		fetchAsyncA();
	}

	prepareQuestion(seriesList) {
		//extract a random movie, save image, title and number.
		let number = Math.floor(Math.random() * seriesList.length);
		let rightAnswer =  seriesList[number];
		seriesList = seriesList.filter(item => item !== seriesList[number]);


		//extract other 2 possibles answers, exluding the right one and the same.
		let number1 = Math.floor(Math.random() * seriesList.length);
		let number2 = Math.floor(Math.random() * seriesList.length);

		if(number1 === number2) {
			number1 = Math.floor(Math.random() * seriesList.length);
			while (number2 ==! number1) {
				number1 = Math.floor(Math.random() * seriesList.length);
			}
		}
		//console.log('numbers, ',number1, number2);

		let wrongAnswer1 = seriesList[number1];
		let wrongAnswer2 = seriesList[number2];

		this.setState({image : rightAnswer.backdrop_path, answers : { rightAnswer : {  name : rightAnswer.name, id : rightAnswer.id  }, wrongAnswer1 : { name : wrongAnswer1.name, id : wrongAnswer1.id }, wrongAnswer2 : { name : wrongAnswer2.name, id: wrongAnswer2.id } }  , seriesList : seriesList, restart : this.restart, resetTimer : this.state.resetTimer+1 } );
		this.props.newAnswer();
	}

	render() {
		return(
			<div>
				<Points points={this.state.resetTimer-1}/>
				<ImageC src={this.state.image} />
				<HeartsContainer  />
				<ContainAnswers answers={this.state.answers} restart={this.restart} />
				<Timer restart={this.state.resetTimer}/>
				<Gameover trigger={this.state.gameover} points={this.state.resetTimer-1} />
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
