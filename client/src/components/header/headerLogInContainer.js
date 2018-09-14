import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Facebook from "../auth/oauth/Facebook";
import Google from "../auth/oauth/Google";

class HeaderLogInContainer extends Component {



  render() {

  return !this.props.user ?  (
      <div style={style}>
        <Facebook/>
        <Google/>
      </div>
    ) : <div>Welcome <span style={{color: "#f58549"}}>{this.props.user}</span></div>

  }
}

const style = {
  display: 'flex'
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

HeaderLogInContainer.propTypes = {

};

export default connect(mapStateToProps)(HeaderLogInContainer);




