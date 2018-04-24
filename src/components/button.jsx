import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loseLife, receiveAnswer } from '../actions/index';


const mapDispatchToProps = {
  notGuessed: loseLife,
  itGuessed: receiveAnswer,
};

const mapStateToProps = ({ lives }) => ({ lives });

class ButtonAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = { classBtn: 'btn-primary' };
  }

  tryToGuess(e) {
    if (e === this.props.correctAnswer) {
      this.setState({ classBtn: 'btn-success' });

      setTimeout(() => { this.props.itGuessed(true); }, 400);
      return true;
    }
    this.setState({ classBtn: 'btn-danger' });
    this.props.notGuessed(this.props.lives);
    return false;
  }

  render() {
    return (
      <button className={`btn btn-lg btn-block max-btn ${this.state.classBtn} `} onClick={e => this.tryToGuess(this.props.dataAnswer.id, e)}>{this.props.dataAnswer.name}</button>
    );
  }
}

ButtonAnswer.propTypes = {
  lives: PropTypes.number,
  correctAnswer: PropTypes.number,
  itGuessed: PropTypes.func,
  notGuessed: PropTypes.func,
  dataAnswer: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
};

ButtonAnswer.defaultProps = {
  lives: 3,
  correctAnswer: 0,
  itGuessed: PropTypes.func,
  notGuessed: PropTypes.func,
  dataAnswer: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAnswer);
