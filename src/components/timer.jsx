import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loseLife } from '../actions/index';

const mapDispatchToProps = {
    notGuessed: loseLife
  }

const mapStateToProps = ({lives, answer}) => {
     return { lives, answer }
 }


class Timer extends Component {
    constructor(props) {
        super(props);
        
        this.state = { distance : 100 };
    
    }

    componentDidMount() { 
        
        let countdown = setInterval(() => this.timer(this),200);
        this.setState({countdown: countdown});
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('i am receiving props!',nextProps);
       if(nextProps.restart) {
           console.log('i should update!');
        this.setState({distance : 100});
        }
    }

    timer () {
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

