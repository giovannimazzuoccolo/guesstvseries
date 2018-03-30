import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loseLife, receiveAnswer } from '../actions/index';


const mapDispatchToProps = {
    notGuessed: loseLife,
    itGuessed : receiveAnswer
  }

const mapStateToProps = ({lives}) => {
     return { lives }
 }

class ButtonAnswer extends Component {
    constructor(props){
    super(props)

    this.state = { classBtn : 'btn-primary', lives : 3 }
}

   

    tryToGuess(e){
		if(e === this.props.correctAnswer) {
            this.setState({classBtn : 'btn-success'});
            this.props.itGuessed(true);
            return true;
		} else {
            this.setState({classBtn : 'btn-danger'});
            this.props.notGuessed(this.props.lives);
            return false;
		}
	}

    render() {
        const btn = this.state.classBtn;
        return (
        <button  className={`btn btn-lg btn-block max-btn ${btn} `}  onClick={(e) => this.tryToGuess(this.props.dataAnswer.id,e)}>{this.props.dataAnswer.name}</button>
        )
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(ButtonAnswer);