import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _keyBy from 'lodash/keyBy';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import './ListIndex.css';

class ListIndex extends Component {
  getItems(entries) {
    entries = Array.isArray(entries) ? entries : [entries];
    entries = _sortBy(entries, ['lastname']);

    const items = entries.map((entry, i) => {
      const { firstname, lastname } = entry;

      const title = `${firstname} ${lastname}`;
      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      return (
        <li className="ListIndex-Item" key={i}>
          <a href={searchUrl} target="_blank">{title}</a>
        </li>
      );
    });

    return items;
  }
  getGroups(entries, property) {
    let objectGroups = entries.reduce((objectGroups, entry) => {
      const currentValueArrayExists = objectGroups[entry[property]] !== undefined;

      if(currentValueArrayExists) {
        objectGroups[entry[property]].push(entry);
      } else {
        objectGroups[entry[property]] = [entry];
      }

      return objectGroups;
    }, []);

    objectGroups = Object.values(objectGroups);
    objectGroups = _sortBy(objectGroups, [(o) => o[0][property]]);

    const groups = objectGroups.map((objectGroup, i) => {
      const header = objectGroup[0][property];
      return (
        <div className="ListIndex-ItemGroup" key={header}>
          <h3>{header}</h3>
          <ul className="ListIndex-Items">
            {this.getItems(objectGroup)}
          </ul>
        </div>
      );
    });

    return groups;
  }
  getGenerationGroups() {
    const entriesWithDecades = this.props.entries.map((entry) => {
      const decade = entry.born.substr(0, 3) + '0';
      const isValidDecade = !isNaN(parseInt(decade, 10));
      entry.decade = isValidDecade ? `${decade}s` : 'Other';
      return entry;
    });

    return this.getGroups(entriesWithDecades, 'decade');
  }
  render() {
    return (
      <div className="ListIndex">
        <div className="ListIndex-Column">
          <div className="ListIndex-Title">A–Z</div>
          <ul className="ListIndex-Items">
            {this.getItems(this.props.entries)}
          </ul>
        </div>
        <div className="ListIndex-Column">
          <div className="ListIndex-Title">Generation</div>
          {this.getGenerationGroups()}
        </div>
        <div className="ListIndex-Column">
          <div className="ListIndex-Title">Nationality</div>
          {this.getGroups(this.props.entries, 'nationality')}
        </div>
        <div className="ListIndex-Column">
          <div className="ListIndex-Title">Field</div>
          {this.getGroups(this.props.entries, 'field')}
        </div>
      </div>
    );
  }

  _compare(a,b) {
    if (a.decade < b.decade)
      return -1;
    if (a.decade > b.decade)
      return 1;
    return 0;
  }
}

ListIndex.propTypes = {
  entries: PropTypes.array.isRequired
}

export default ListIndex;
