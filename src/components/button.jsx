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
    
   componentWillReceiveProps(newProps) {
       //this.setState({classBtn : 'btn-primary'});
       console.log('proprs',newProps);
   }

    tryToGuess(e){
		if(e === this.props.correctAnswer) {
            this.setState({classBtn : 'btn-success'});
            
            setTimeout(() => {this.props.itGuessed(true)},400);
            return true;
		} else {
            this.setState({classBtn : 'btn-danger'});
            
            this.props.notGuessed(this.props.lives);
            return false;
		}
	}

    render() {
        return (
        <button  className={`btn btn-lg btn-block max-btn ${this.state.classBtn} `}  onClick={(e) => this.tryToGuess(this.props.dataAnswer.id,e)}>{this.props.dataAnswer.name}</button>
        )
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(ButtonAnswer);