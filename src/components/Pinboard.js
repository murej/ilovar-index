import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { url } from 'is_js';
import './Pinboard.css';

class Pinboard extends Component {
  getItems() {
    const { entries } = this.props;

    const items = entries.map((entry, i) => {
      const { firstname, lastname, image, born, nationality, based } = entry;

      const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
      const imageUrl = url(image) ? image : false;

      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      return (
        <div className="Pinboard-Item" key={i}>
          {imageUrl && <img src={imageUrl} alt={`${firstname} ${lastname}`}/>}
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
