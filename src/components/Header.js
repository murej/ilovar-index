import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAbout: false
    }

    this._handleHeaderClick = this._handleHeaderClick.bind(this);
  }
  render() {
    const { showAbout } = this.state;

    const about =
      <div className="Header-About" onMouseOut={this._handleHeaderClick}>
        <h1>Seznam, odpri se!</h1>
      </div>;

    return (
      <div className="Header">
        <h1 onClick={this._handleHeaderClick}>Seznam, odpri se!</h1>
        <div className="Header-Nav">
          <NavLink to="/index">Show index</NavLink>
          <NavLink to="/" className="Header-NavHome">Hide index</NavLink>
        </div>
        {showAbout && about}
      </div>
    );
  }
  _handleHeaderClick() {
    this.setState({
      showAbout: !this.state.showAbout
    })
  }
}

Header.defaultProps = {
  index: false
}

export default Header;
