import React, {Component} from 'react';
import HeaderLogo from './headerLogo';

class Header extends Component {

  handleLogIn = () => {
    this.setState({
      isLoggedIn: true
    })
  };

  handleLogOut = () => {
    this.setState({
      isLoggedIn: false
    })
  };

  render() {
    return (
      <div style={style}>
        <HeaderLogo title={'Training Buddy'}/>
      </div>
    )
  }
}

const style = {
  fontFamily: 'lobster',
  color: 'white',
  fontSize: "6rem",
  display: 'flex',

};

export default Header;