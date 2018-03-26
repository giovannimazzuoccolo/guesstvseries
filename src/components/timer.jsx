import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loseLife } from '../actions/index';

const mapDispatchToProps = {
    notGuessed: loseLife
  }

const mapStateToProps = ({lives}) => {
     return { lives }
 }


class Timer extends Component {
    constructor() {
        super();
        
        this.state = { distance : 100 };
    
    }

    getInitialState() {
        return {distance : 100}
    }

    componentDidMount() { 
 
        let countdown = setInterval(() => this.timer(this),200);
        this.setState({countdown: countdown});
    }
    
   /* componentWillUnmount() {
        clearInterval(this.state.countdown)
    }*/

    timer () {
        console.log('chiamata');
        this.setState({ distance : this.state.distance - 1});
        if(this.state.distance === 0) {
            this.props.notGuessed(this.props.lives);
        }
    }



    render () {
       
        
        return <div className='timeline' style={{width:+this.state.distance+'%'}}></div>
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Timer);

