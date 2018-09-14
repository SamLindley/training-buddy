import React, {Component} from 'react';
import HeaderLogo from './headerLogo';
import HeaderLogInContainer from "./headerLogInContainer";

const Header = props => {


  return (
    <div style={style}>
      <HeaderLogo title={'Training Buddy'}/>
      <HeaderLogInContainer/>
    </div>
  )

};

const style = {
  fontFamily: 'lobster',
  color: 'white',
  fontSize: "6rem",
  display: 'flex',
  justifyContent: 'space-between'
};

export default Header;