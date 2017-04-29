import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { url } from 'is_js';
import './Pinboard.css';

import Header from './Header';

class Pinboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null
    }
  }
  getItems() {
    const { entries } = this.props;

    const items = entries.map((entry, i) => {
      const { firstname, lastname, imageurl, born, nationality, based } = entry;

      const isEven = i % 2 === 0;
      const isOdd = !isEven;

      const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
      const image = url(imageurl) ? imageurl : false;

      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      const className = cx({
        'Pinboard-Item': true,
        'Pinboard-Item--odd': isOdd,
        'Pinboard-Item--even': isEven,
      })

      return (
        <div className={className} key={i}>
          <div className="Pinboard-ItemContent">
            {image &&
              <a href={searchUrl} target="_blank" title={`More ${firstname} ${lastname} →`}>
                <img
                  onMouseEnter={this._handleMouseEnter.bind(this, `→ ${title}`)}
                  onMouseLeave={this._handleMouseEnter.bind(this, null)}
                  src={image}
                  alt={`${firstname} ${lastname}`}
                />
              </a>
            }
          </div>
        </div>
      );
    });

    return items;
  }
  render() {
    const { title } = this.state;

    return (
      <div className="Pinboard">
        <Header title={title} />
        {this.getItems()}
      </div>
    );
  }
  _handleMouseEnter(title) {
    this.setState({
      title: title
    })
  }
}

Pinboard.propTypes = {
  entries: PropTypes.array.isRequired
}

export default Pinboard;
