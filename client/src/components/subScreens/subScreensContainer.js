import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SubscreenTopContainer from "./subscreenTop/subscreenTopContainer";
import SubescreenBottomContainer from "./subscreenBottom/subscreenBottomContainer";

class SubScreensContainer extends Component {
  render() {
    return (
      <div style={style}>
        <SubscreenTopContainer/>
        <SubescreenBottomContainer/>
      </div>
    );
  }
}

const style = {
  width: "30%"
}

SubScreensContainer.propTypes = {};

export default SubScreensContainer;
