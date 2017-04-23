import React, { Component } from 'react';
import './Pinboard.css';

class Pinboard extends Component {
  getEntries() {
    const { items } = this.props;

    const entries = items.map((item, i) => {
      const { firstname, lastname, born, nationality, based, image } = item;

      const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
      const imageUrl = url(image) ? image : false;

      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      return (
        <div className="Pinboard-Entry" key={i}>
          {imageUrl && <img src={imageUrl} alt={`${firstname} ${lastname}`}/>}
          <h2><a href={searchUrl} target="_blank">{title}</a></h2>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="Pinboard">
        {this.getEntries()}
      </div>
    );
  }
}

Pinboard.propTypes = {
  items: React.PropTypes.array.isRequired
}

export default Pinboard;
