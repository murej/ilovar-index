import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _sortBy from 'lodash/sortBy';

import './SortableList.css';

class SortableList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReverse: false
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
      const { firstname, lastname } = entry;

      const title = `${firstname} ${lastname}`;
      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      return (
        <li className="SortableList-Item" key={i}>
          <a href={searchUrl} target="_blank">{title}</a>
        </li>
      );
    });
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
    this.setState({
      isReverse: !this.state.isReverse
    });
  }
}

SortableList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
  groupBy: PropTypes.string,
  sortItemsBy: PropTypes.string,
}

export default SortableList;
