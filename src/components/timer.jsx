import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loseLife } from '../actions/index';

const mapDispatchToProps = {
  notGuessed: loseLife,
};

const mapStateToProps = ({ lives, answer }) => ({ lives, answer });


class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = { distance: 100 };
  }

  componentDidMount() {
    setInterval(() => this.timer(this), 200);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('i am receiving props!', nextProps);
    if (nextProps.restart) {
      // console.log('i should update!');
      this.setState({ distance: 100 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer(this));
  }

  timer() {
    this.setState({ distance: this.state.distance - 1 });
    if (this.state.distance === 0) {
      this.props.notGuessed(this.props.lives);
    }
  }


  render() {
    return <div className="timeline" style={{ width: `${+this.state.distance}%` }} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  notGuessed: PropTypes.func,
  lives: PropTypes.number,
  restart: PropTypes.number,
};

Timer.defaultProps = {
  notGuessed: () => {},
  lives: 3,
  restart: 0,
};
