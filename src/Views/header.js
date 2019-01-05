import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { eraseCookie, getCookie } from '../helper/cookie';
import { Redirect } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blank_cookie: true
    }
    this.logout = this.logout.bind(this);
  }
  logout() {
    eraseCookie(`user`);
    this.props.data("header")
  }
 
  render() {
    // let cookieData=getCookie(`user`);
    // console.log(cookieData,"cookieData")9

    return (
      <Icon className="logout_btn" name="sign-out "  onClick={this.logout} />
    );
  }
}
export default Header;
