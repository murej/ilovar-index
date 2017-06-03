import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { title } = this.props;

    const about =
      <div className="Header-About">
        <h1>Seznam is a curated list that helps me keep track of artist and friends whose work I admire, and expose them to others.</h1>
        <h1>If you want to become part of the list or a friend, please let me know by <a href="mailto:mail@klemenilovar.com">email</a> or follow me on <a href="https://www.instagram.com/klemen_ilovar/" target="_blank">Instagram</a>.</h1>
        <h1>Run by<br /><a href="https://klemenilovar.com/" target="_blank">Klemen Ilovar</a></h1>
        <h1>Built by<br /><a href="https://jure.io/" target="_blank">Jure Martinec</a></h1>
        <h1>Both part of<br /><a href="http://ansambel.org/" target="_blank">Ansambel</a></h1>
        <h1>2017–</h1>
      </div>;

    return (
      <div className="Header">
        <div className="Header-Main">
          {about}
          <h1>Seznam, odpri se!</h1>
          {title && <h1>{title}</h1>}
        </div>
        <div className="Header-Nav">
          <NavLink to="/index">Index →</NavLink>
          <NavLink to="/" className="Header-NavHome">← Images</NavLink>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  title: null
}

export default Header;
