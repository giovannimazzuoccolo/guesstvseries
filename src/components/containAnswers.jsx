import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonAnswer from './button';


class ContainAnswers extends Component {
  constructor(props) {
    super(props);

    this.state = { listOfAnswers: null };
  }

  componentWillReceiveProps(nextprops) {
    let answers = [];
    answers.push({
      id: nextprops.answers.rightAnswer.id,
      name: nextprops.answers.rightAnswer.name,
    });
    answers.push({
      id: nextprops.answers.wrongAnswer1.id,
      name: nextprops.answers.wrongAnswer1.name,
    });
    answers.push({
      id: nextprops.answers.wrongAnswer2.id,
      name: nextprops.answers.wrongAnswer2.name,
    });

    // this.setState({ rightAnswerId: nextprops.answers.rightAnswer.id }); // FIXME: d

    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

    answers = shuffleArray(answers);


    const answerList = answers.map(singleAnswer => (
      <ButtonAnswer
        dataAnswer={singleAnswer}
        key={singleAnswer.id}
        correctAnswer={nextprops.answers.rightAnswer.id}
        restart={this.props.restart}
      />
    ));
    // console.log('myanswers', answerList);
    this.setState({ listOfAnswers: answerList });
  }

  render() {
    return (
      <div className="ContainAnswers" >
        { (!this.state.listOfAnswers) ? 'loading' : this.state.listOfAnswers }
      </div>

    );
  }
}

export default ContainAnswers;

ContainAnswers.propTypes = {
  restart: PropTypes.func,
};

ContainAnswers.defaultProps = {
  restart: this.props.restart(),
};
