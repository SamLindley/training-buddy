import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MainScreenContainer extends Component {
  render() {
    return (
      <div style={style}>
        MAIN SCREEN
      </div>
    );
  }
}

const style = {
  background: "#ccc",
  color: "white",
  minWidth: "60%"
};

MainScreenContainer.propTypes = {};

export default MainScreenContainer;
