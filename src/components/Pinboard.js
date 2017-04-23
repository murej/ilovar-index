import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { url } from 'is_js';
import './Pinboard.css';

class Pinboard extends Component {
  getItems() {
    const { entries } = this.props;

    const items = entries.map((entry, i) => {
      const { firstname, lastname, imageurl, born, nationality, based } = entry;

      const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
      const image = url(imageurl) ? imageurl : false;

      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      return (
        <div className="Pinboard-Item" key={i}>
          {image && <img src={image} alt={`${firstname} ${lastname}`}/>}
          <h2><a href={searchUrl} target="_blank">{title}</a></h2>
        </div>
      );
    });

    return items;
  }
  render() {
    return (
      <div className="Pinboard">
        {this.getItems()}
      </div>
    );
  }
}

Pinboard.propTypes = {
  entries: PropTypes.array.isRequired
}

export default Pinboard;
