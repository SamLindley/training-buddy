import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Facebook = props => {


  const componentClicked = () => {
    console.log("Clicked")
  };

  const responseFacebook = response => {
    console.log("RUNNOSNFSOIDFN");
    console.log(response);
  };


  let fbContent;


  fbContent = (
    <FacebookLogin
      appId="631676327228873"
      fields="name,email,picture"
      callback={responseFacebook}
      onClick={componentClicked}
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

export default Facebook;



