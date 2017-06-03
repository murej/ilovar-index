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
      title: null,
      showLimit: 10
    }

    this.columnRefs = [];
    this._handleOnWindowScroll = this._handleOnWindowScroll.bind(this);
  }
  getItems(entries) {
    const items = entries.map((entry, i) => {
      const { firstname, lastname, imageurl, born, nationality, based } = entry;

      const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
      const image = url(imageurl) ? imageurl : false;

      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      const className = cx({
        'Pinboard-Item': true,
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
  componentDidMount() {
    window.addEventListener('scroll', this._handleOnWindowScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleOnWindowScroll)
  }
  render() {
    const { entries } = this.props;
    const { title, showLimit } = this.state;

    const reversedEntries = entries.slice(0).reverse();

    const entriesWithImages = reversedEntries.reduce((entriesWithImages, entry, i) => {
      const hasImage = url(entry.imageurl);
      hasImage && entriesWithImages.push(entry);
      return entriesWithImages;
    }, []);

    const oddEntries = entriesWithImages.reduce((oddEntries, entry, i) => {
      const isWithinShowLimit = i < showLimit;

      const isOdd = i % 2 === 0;

      (isOdd && isWithinShowLimit) && oddEntries.push(entry);
      return oddEntries;
    }, []);

    const evenEntries = entriesWithImages.reduce((evenEntries, entry, i) => {
      const isWithinShowLimit = i < showLimit;

      const isEven = i % 2 === 1;

      (isEven && isWithinShowLimit) && evenEntries.push(entry);
      return evenEntries;
    }, []);

    return (
      <div className="Pinboard">
        <Header title={title} />
        <div className="Pinboard-Column" ref={(ref) => this.columnRefs[0] = ref}>
          {this.getItems(oddEntries)}
        </div>
        <div className="Pinboard-Column" ref={(ref) => this.columnRefs[1] = ref}>
          {this.getItems(evenEntries)}
        </div>
      </div>
    );
  }
  _handleOnWindowScroll(event) {
    const bodyBottom = event.target.scrollingElement.scrollHeight;
    let smallestColumnHeight = bodyBottom;

    this.columnRefs.forEach((ref) => {
      const columnHeight = ref.clientHeight;
      const isSmallerHeight = columnHeight < smallestColumnHeight;

      if(isSmallerHeight) {
        smallestColumnHeight = columnHeight;
      }
    })

    const windowHeight = window.innerHeight;
    const windowBottom = window.scrollY+windowHeight;

    const hasReachedEnd = smallestColumnHeight-windowHeight <= windowBottom;

    hasReachedEnd && this.setState({
      showLimit: this.state.showLimit + 10
    })
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
