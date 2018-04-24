import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newAnswer } from '../actions/index';

// import api
import Api from '../api';

// components
import ImageC from './image';
import ContainAnswers from './containAnswers';
import Hearts from './heartsContainer';
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
          id: null,
        },
      },
      image: null,
      seriesList: [],
      resetTimer: 0,
      gameover: false,
    };
  }

  componentDidMount() {
    const apiKey = Api();
    const fetchAsyncA = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);

      const data = await response.json();

      await this.prepareQuestion(data.results);
    };
    fetchAsyncA();
  }

  componentWillReceiveProps({ answer, lives }) {
    console.log('showlives', this.state.showLives);

    if (lives === 0) {
      this.gameover();
    }

    if (answer) {
      this.restart();
    }
  }

  gameover() {
    this.setState({ gameover: true });
  }

  restart() {
    if (this.state.resetTimer % 10 === 0) {
      this.refetch((this.state.resetTimer / 10) + 1);
    } else {
      this.prepareQuestion(this.state.seriesList);
    }
    this.setState({ resetTimer: this.state.resetTimer + 1 });
    return true;
  }

  refetch(page) {
    const apiKey = Api();
    const fetchAsyncA = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false`);

      const data = await response.json();

      await this.prepareQuestion(data.results);
    };
    fetchAsyncA();
  }

  prepareQuestion(seriesList) {
    // extract a random movie, save image, title and number.
    const number = Math.floor(Math.random() * seriesList.length);
    const rightAnswer = seriesList[number];
    const updatedSeriesList = seriesList.filter(item => item !== seriesList[number]);


    // extract other 2 possibles answers, exluding the right one and the same.
    let number1 = Math.floor(Math.random() * updatedSeriesList.length);
    const number2 = Math.floor(Math.random() * updatedSeriesList.length);

    if (number1 === number2) {
      number1 = Math.floor(Math.random() * updatedSeriesList.length);
      while (number2 !== number1) {
        number1 = Math.floor(Math.random() * updatedSeriesList.length);
      }
    }

    const wrongAnswer1 = updatedSeriesList[number1];
    const wrongAnswer2 = updatedSeriesList[number2];

    this.setState({
      image: rightAnswer.backdrop_path,
      answers:
      {
        rightAnswer:
         {
           name: rightAnswer.name,
           id: rightAnswer.id,
         },
        wrongAnswer1: { name: wrongAnswer1.name, id: wrongAnswer1.id },
        wrongAnswer2: { name: wrongAnswer2.name, id: wrongAnswer2.id },
      },
      seriesList: updatedSeriesList,
      resetTimer: this.state.resetTimer + 1,
    });
    this.props.newAnswer();
  }

  render() {
    return (
      <div>
        <Points points={this.state.resetTimer - 1} />
        <ImageC src={this.state.image} />
        <Hearts />
        <ContainAnswers answers={this.state.answers} restart={this.restart} />
        <Timer restart={this.state.resetTimer} />
        <Gameover trigger={this.state.gameover} points={this.state.resetTimer - 1} />
      </div>
    );
  }
}

Show.propTypes = {
  answer: PropTypes.bool,
  lives: PropTypes.number,
  newAnswer: PropTypes.func,
};

Show.defaultProps = {
  answer: false,
  lives: 3,
  newAnswer: newAnswer(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
