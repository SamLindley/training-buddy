import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {loginViaFacebook} from "../../../redux/actions/AuthActions";

const Facebook = props => {

  const responseFacebook = response => {
    props.loginViaFacebook(response);
  };

  let fbContent;

  fbContent = (
    <FacebookLogin
      appId="631676327228873"
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => {
        return <button onClick={renderProps.onClick}>Login with Facebook</button>
      }}
    />
  );

  return (
    <div>
      {fbContent}
    </div>
  );

};

Facebook.propTypes = {};

export default connect(null, {loginViaFacebook})(Facebook);



