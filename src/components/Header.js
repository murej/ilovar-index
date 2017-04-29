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
    this._handleHeaderMouseOver = this._handleHeaderMouseOver.bind(this);
  }
  render() {
    const { title } = this.props;
    const { showAbout } = this.state;

    const about =
      <div className="Header-About" onMouseOut={this._handleHeaderClick}>
        <h1>Seznam, odpri se!</h1>
      </div>;

    return (
      <div className="Header">
        <div className="Header-Main">
          <h1 onMouseOver={this._handleHeaderMouseOver} onClick={this._handleHeaderClick}>Seznam, odpri se!</h1>
          {title && <h1>{title}</h1>}
        </div>
        <div className="Header-Nav">
          <NavLink to="/index">Show index</NavLink>
          <NavLink to="/" className="Header-NavHome">Hide index</NavLink>
        </div>
        {showAbout && about}
      </div>
    );
  }
  _handleHeaderMouseOver() {
    this.setState({

    });
  }
  _handleHeaderClick() {
    this.setState({
      showAbout: !this.state.showAbout
    })
  }
}

Header.defaultProps = {
  title: null
}

export default Header;
