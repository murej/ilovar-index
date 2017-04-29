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
      <div className="Header-About">
        <h1>Seznam, odpri se!</h1>
        <h1>Run by<br />Klemen Ilovar, member of Ansambel</h1>
        <h1>Built by<br />Jure Martinec, member of Ansambel</h1>
        <h1>2017</h1>
      </div>;

    return (
      <div className="Header">
        <div className="Header-Main">
          {about}
          <h1>Seznam, odpri se!</h1>
          {title && <h1>{title}</h1>}
        </div>
        <div className="Header-Nav">
          <NavLink to="/index">Show index</NavLink>
          <NavLink to="/" className="Header-NavHome">Hide index</NavLink>
        </div>
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
