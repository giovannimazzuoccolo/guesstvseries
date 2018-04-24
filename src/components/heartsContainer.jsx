import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ lives: state.lives });

class HeartsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { lives: props.lives };
  }

  componentWillReceiveProps({ lives }) {
    this.setState({ lives });
  }


  render() {
    const heartsNumber = this.state.lives;

    const listHearts = [];
    for (let i = 0; i < heartsNumber; i += 1) {
      listHearts.push(<i className="fa fa-heart red-heart" key={i} />);
    }
    // console.log('hearts',listHearts);

    return (
      <div className="heart--container">
        {listHearts}
      </div>
    );
  }
}

HeartsContainer.propTypes = {
  lives: PropTypes.number,
};

HeartsContainer.defaultProps = {
  lives: 3,
};

export default connect(mapStateToProps)(HeartsContainer);
