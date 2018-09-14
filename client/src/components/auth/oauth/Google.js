import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginViaGoogle} from "../../../redux/actions/AuthActions";

const Google = props => {

  const responseGoogle = response => {
    props.loginViaGoogle(response);
  };


  return (
    <GoogleLogin onSuccess={responseGoogle}
                 onFailure={responseGoogle}
                 clientId="479403338663-pre8143k19snfg2qmhmipuua8j9mgo52.apps.googleusercontent.com"
                 buttonText="Login with Google"
                 render={renderProps => {
                   return <button onClick={renderProps.onClick}>Login with Google</button>
                 }}

    />
  );

}

Google.propTypes = {};

export default connect(null, {loginViaGoogle})(Google);
