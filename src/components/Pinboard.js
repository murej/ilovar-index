import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { url } from 'is_js';
import './Pinboard.css';

import Header from './Header';
import AtomicImage from './AtomicImage';

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
  getItem(entry) {
    const { firstname, lastname, born, nationality, based, imageurl, imagesize } = entry;

    const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
    const image = url(imageurl) ? imageurl : false;
    const size = imagesize === 'L' ? 'large' : 'small';

    const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

    const className = cx({
      'Pinboard-Item': true,
      [`Pinboard-Item--${size}`]: true
    })

    return (
      <div className={className}>
        {image &&
          <a href={searchUrl} target="_blank" title={`More ${firstname} ${lastname} →`}>
            <AtomicImage
              onMouseEnter={this._handleMouseEnter.bind(this, `${title}`)}
              onMouseLeave={this._handleMouseEnter.bind(this, null)}
              src={image}
              alt={`${firstname} ${lastname}`}
            />
          </a>
        }
      </div>
    );
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

    const entryGroups = entriesWithImages.reduce((entryGroups, entry, i) => {
      const isWithinShowLimit = i < showLimit;

      const isOdd = i % 2 === 1;
      const isEven = i % 2 === 0 || i === 0;

      if(isEven && isWithinShowLimit) {
        const evenEntry = entriesWithImages[i];
        const oddEntry = entriesWithImages[i+1];

        entryGroups.push(
          <div className="Pinboard-Group" key={i}>
            {this.getItem(evenEntry)}
            {oddEntry &&
              this.getItem(oddEntry)
            }
          </div>
        );
      }

      return entryGroups;
    }, []);

    return (
      <div className="Pinboard">
        <Header title={title} />
        {entryGroups}
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
  _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
}

Pinboard.propTypes = {
  entries: PropTypes.array.isRequired
}

export default Pinboard;
