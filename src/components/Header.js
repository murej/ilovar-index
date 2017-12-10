import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { title } = this.props;

    const about =
      <div className="Header-About">
        <h1><b>Seznam</b> is a curated list that helps me keep track of artist and friends whose work I admire, and expose them to others.</h1>
        <h1>If you want to become part of the list or a friend, please let me know by <a className="blue" href="mailto:mail@klemenilovar.com">email</a> or follow me on <a className="green" href="https://www.instagram.com/klemen_ilovar/" target="_blank">Instagram</a>.</h1>
        <h1>Run by<br /><a className="purple" href="https://klemenilovar.com/" target="_blank">Klemen Ilovar</a></h1>
        <h1>Built by<br /><a className="yellow" href="https://jure.io/" target="_blank">Jure Martinec</a></h1>
        <h1>Both part of<br /><a className="red" href="http://ansambel.org/" target="_blank">Ansambel</a></h1>
        <h1>2017–</h1>
      </div>;

    return (
      <div className="Header">
        <div className="Header-Main">
          <h1><b>Seznam</b></h1>
          {!title && <NavLink to="/index">Feed ← Index</NavLink>}
          {!title && <NavLink to="/" className="Header-NavHome">Feed → Index</NavLink>}
          {title && <h2>{title}</h2>}
        </div>
        <div className="Header-Nav">
          <h1><b>About</b></h1>
          {about}
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  title: null
}

export default Header;
