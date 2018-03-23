import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
   console.log('isupd',state);
    return { 'lives' : state.lives }
}

class HeartsContainer extends Component {
    constructor(props){
        super(props)
       
        this.state = {lives : props.lives}
    }

    /*initialState() {
        this.setState({lives : 3});
    }*/

    //useful later
    /*removeHearts() {
        const countHearts = this.state.lives-1;
        this.setState({ lives : countHearts });
    }*/

    render () {
        let heartsNumber = this.props.lives;
        //console.log('realstate',this.props.lives);
        
        let listHearts = [];
        for( let i = 0; i < heartsNumber; i++) {
            listHearts.push(<i className="fa fa-heart red-heart" key={i}></i>);
        }
        //console.log('hearts',listHearts);

        return (
            <div className='heart--container'>
                {listHearts}
            </div>
        )
    }
    
}


export default connect(mapStateToProps)(HeartsContainer);