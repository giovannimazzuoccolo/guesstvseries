import React, { Component } from 'react';

//import api
import Api from '../api';



//components
import ImageC from './image.js';
import ContainAnswers from './containAnswers.js';
import HeartsContainer from './heartsContainer.jsx';
import Timer from './timer';

class Show extends Component {

	constructor(props) {
			super(props);
			this.state =  { answers: { wrongAnswer1 : { name : null, id : null }, wrongAnswer2 : { name : null, id: null }, rightAnswer: { name: null, id: null} }, image : null, selectedAnswer : null, seriesList : [] };
		}

	componentDidMount() {
				const apiKey = Api();
				const fetchAsyncA = async () => {
					let response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key='+apiKey+'&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false');

					let data = await response.json();

					await this.prepareQuestion(data.results);
				}
		fetchAsyncA();
	}

	restart() {
		this.prepareQuestion(this.state.seriesList);
	}

	prepareQuestion(seriesList) {
		//extract a random movie, save image, title and number.
		let number = Math.floor(Math.random() * seriesList.length);
		let rightAnswer =  seriesList[number];
		//seriesList = seriesList.splice(number, 1);
		
		//extract other 2 possibles answers, exluding the right one and the same.
		let number1 = 0;
		let number2 = 0;
		do {
			number2 = Math.floor(Math.random() * seriesList.length);
		} while (number2 ===! number1 && number2 ===! number);
		
		do {
			number1 = Math.floor(Math.random() * seriesList.length);
		} while (number2 ===! number1 && number1 ===! number);
		

		

		let wrongAnswer1 = seriesList[number1];
		let wrongAnswer2 = seriesList[number2];
		this.setState({image : rightAnswer.backdrop_path, answers : { rightAnswer : {  name : rightAnswer.name, id : rightAnswer.id  }, wrongAnswer1 : { name : wrongAnswer1.name, id : wrongAnswer1.id }, wrongAnswer2 : { name : wrongAnswer2.name, id: wrongAnswer2.id } }  , seriesList : seriesList, restart : this.restart } );

	}

	render() {
		return(
			<div>
				
				<ImageC src={this.state.image} />
				<HeartsContainer />
				<ContainAnswers answers={this.state.answers} restart={this.restart} />
				<Timer />
			</div>
		);
	}

}

export default Show;
