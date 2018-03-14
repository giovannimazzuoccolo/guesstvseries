import React, { Component } from 'react';

class HeartsContainer extends Component {
    constructor(props){
        super(props)
    
        this.state = {hearts : 3}
    }

    initialState() {
        this.setState({hearts : 3});
    }

    removeHearts() {
        const countHearts = this.state.hearts-1;
        this.setState({ hearts : countHearts });
    }

    render () {
        
        let listHearts = [];
        for( let i = 0; i < this.state.hearts; i++) {
            listHearts.push(<i className="fa fa-heart red-heart" key={i}></i>);
        }
        console.log('hearts',listHearts);

        return (
            <div className='heart--container'>
                {listHearts}
            </div>
        )
    }
    
}

export default HeartsContainer;