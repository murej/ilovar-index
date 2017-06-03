import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _sortBy from 'lodash/sortBy';
import { url } from 'is_js';

import './SortableList.css';

class SortableList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReverse: false,
    }

    this._handleOnTitleClick = this._handleOnTitleClick.bind(this);
  }

  getItems(entries) {
    const { sortItemsBy, groupBy } = this.props;
    const { isReverse } = this.state;
    const isGrouped = groupBy !== undefined;

    entries = Array.isArray(entries) ? entries : [entries];
    entries = sortItemsBy ? _sortBy(entries, [sortItemsBy]) : entries;

    if(!isGrouped && isReverse) {
      entries.reverse();
    }

    return entries.map((entry, i) => {
      const { firstname, lastname, imageurl } = entry;
      const hasFirstName = firstname !== '';
      const hasLastName = lastname !== '';

      const searchUrlPrefix = `https://www.google.com/search?q=`;
      const searchUrlSuffix = `&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      let title;
      let searchUrl;
      if(hasFirstName && hasLastName) {
        title = `${firstname} ${lastname}`;
        searchUrl = `${searchUrlPrefix}${firstname}+${lastname}${searchUrlSuffix}`;
      } else if(hasFirstName) {
        title = `${firstname}`;
        searchUrl = `${searchUrlPrefix}${firstname}${searchUrlSuffix}`;
      } else if(hasLastName) {
        title = `${lastname}`;
        searchUrl = `${searchUrlPrefix}${lastname}${searchUrlSuffix}`;
      } else {
        title = 'Unknown'
      }

      const imageUrl = url(imageurl) ? imageurl : null;

      return (
        <li className="SortableList-Item" key={i}>
          <a
            href={searchUrl}
            target="_blank"
            onMouseEnter={this.handleOnItemMouseEnter.bind(this, imageUrl)}
            onMouseLeave={this.handleOnItemMouseLeave.bind(this)}
          >{title}</a>
        </li>
      );
    });
  }
  handleOnItemMouseEnter(imageUrl, event) {
    const image = {
      isRight: event.clientX < window.innerWidth/2 ? true : false,
      url: imageUrl
    }

    this.props.onItemMouseEnter && this.props.onItemMouseEnter(image);
  }
  handleOnItemMouseLeave() {
    this.props.onItemMouseLeave && this.props.onItemMouseLeave();
  }
  getGroups() {
    const { items, groupBy } = this.props;
    const { isReverse } = this.state;
    const isGrouped = groupBy !== undefined;

    let entryGroups = items.reduce((entryGroups, item) => {
      const currentValueArrayExists = entryGroups[item[groupBy]] !== undefined;

      if(currentValueArrayExists) {
        entryGroups[item[groupBy]].push(item);
      } else {
        entryGroups[item[groupBy]] = [item];
      }

      return entryGroups;
    }, []);

    entryGroups = Object.values(entryGroups);
    entryGroups = _sortBy(entryGroups, [(o) => o[0][groupBy]]);

    if(isGrouped && isReverse) {
      entryGroups.reverse();
    }

    const groups = entryGroups.map((entries, i) => {
      const header = entries[0][groupBy];
      return (
        <div className="SortableList-ItemGroup" key={i}>
          <h3 className="SortableList-ItemGroupTitle">{header}</h3>
          <ul className="SortableList-Items">
            {this.getItems(entries)}
          </ul>
        </div>
      );
    });

    return groups;
  }

  render() {
    const { title, items, groupBy } = this.props;

    return (
      <div className="SortableList">
        <h2 className="SortableList-Title" onClick={this._handleOnTitleClick}>{title}</h2>
        {this.getGroups()}
      </div>
    );
  }

  _handleOnTitleClick() {
    const { onTitleClick } = this.props;

    if(onTitleClick) {
      onTitleClick();
    } else {
      this.setState({
        isReverse: !this.state.isReverse
      });
    }
  }
  _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

SortableList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
  groupBy: PropTypes.string,
  sortItemsBy: PropTypes.string,
  onTitleClick: PropTypes.func,
  onItemMouseEnter: PropTypes.func,
  onItemMouseLeave: PropTypes.func
}

export default SortableList;
