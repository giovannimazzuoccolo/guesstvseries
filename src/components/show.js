import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newAnswer } from '../actions/index';


//import api
import Api from '../api';



//components
import ImageC from './image.js';
import ContainAnswers from './containAnswers.js';
import HeartsContainer from './heartsContainer.jsx';
import Timer from './timer';
import Points from './points';

const mapStateToProps = ( {answer} ) => {
		
     return {answer};
 }

 const mapDispatchToProps = {
	 newAnswer : newAnswer 
 }

 

class Show extends Component {

	constructor(props) {
			super(props);
			this.state =  { answers: { wrongAnswer1 : { name : null, id : null }, wrongAnswer2 : { name : null, id: null }, rightAnswer: { name: null, id: null} }, image : null, selectedAnswer : null, seriesList : [], resetTimer : 0 };
		}

		componentWillReceiveProps({answer}) {
			console.log('triggere2');
			if(answer) {
				this.restart();
			}
		}


	componentDidMount() {
				const apiKey = Api();
				const fetchAsyncA = async () => {
					let response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key='+apiKey+'&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&include_null_first_air_dates=false');

					let data = await response.json();

					await this.prepareQuestion(data.results);
				}
		fetchAsyncA();
	}

	restart() {
		this.prepareQuestion(this.state.seriesList);
		this.setState({resetTimer : this.state.resetTimer+1});
		return true;
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
			while (number2 ===! number1) {
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
				<HeartsContainer />
				<ContainAnswers answers={this.state.answers} restart={this.restart} />
				<Timer restart={this.state.resetTimer}/>
			</div>
		);
	}

}

export default connect(mapStateToProps,mapDispatchToProps)(Show);
