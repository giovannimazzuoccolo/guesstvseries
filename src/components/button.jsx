import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loseLife } from '../actions/index';

const mapDispatchToProps = (dispatch) => {
    return {
        notGuessed: () => {
            dispatch(loseLife());
        }
    }
}


class ButtonAnswer extends Component {
    constructor(props){
    super(props)
    console.log('buttonProps',props);

    this.state = { classBtn : 'btn-primary' }
}

   

    tryToGuess(e){
        console.log('rightAnswer',this.props.correctAnswer);
        console.log('e',e)
		if(e === this.props.correctAnswer) {
			console.log('isRight');
            this.setState({classBtn : 'btn-success'});
            return true;
            //this.props.restart();
		} else {
            this.setState({classBtn : 'btn-danger'});
            this.props.notGuessed();
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

export default connect(null,mapDispatchToProps)(ButtonAnswer);