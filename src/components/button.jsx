import React, { Component } from 'react';

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
            this.props.restart();
		} else {
			this.setState({classBtn : 'btn-danger'});
		}
	}

    render() {
        const btn = this.state.classBtn;
        return (
        <button  className={`btn btn-lg btn-block max-btn ${btn} `}  onClick={(e) => this.tryToGuess(this.props.dataAnswer.id,e)}>{this.props.dataAnswer.name}</button>
        )
    }

}

export default ButtonAnswer;