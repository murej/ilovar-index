import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _keyBy from 'lodash/keyBy';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import './ListIndex.css';

import SortableList from './SortableList';

class ListIndex extends Component {
  getGenerations() {
    const entriesWithDecades = this.props.entries.map((entry) => {
      const decade = entry.born.substr(0, 3) + '0';
      const isValidDecade = !isNaN(parseInt(decade, 10));
      entry.decade = isValidDecade ? `${decade}s` : 'Unknown';
      return entry;
    });

    return (
      <SortableList
        title="Generation"
        items={entriesWithDecades}
        groupBy='decade'
        sortItemsBy='born'
      />
    );
  }
  render() {
    const { entries } = this.props;

    return (
      <div className="ListIndex">
        <div className="ListIndex-Column">
          <SortableList
            title="A–Z"
            items={entries}
            sortItemsBy='lastname'
          />
        </div>
        <div className="ListIndex-Column">
          {this.getGenerations()}
        </div>
        <div className="ListIndex-Column">
          <SortableList
            title="Based"
            items={entries}
            groupBy='based'
            sortItemsBy='lastname'
          />
        </div>
        <div className="ListIndex-Column">
          <SortableList
            title="Nationality"
            items={entries}
            groupBy='nationality'
            sortItemsBy='lastname'
          />
        </div>
        <div className="ListIndex-Column">
          <SortableList
            title="Field"
            items={entries}
            groupBy='field'
            sortItemsBy='lastname'
          />
        </div>
      </div>
    );
  }
}

ListIndex.propTypes = {
  entries: PropTypes.array.isRequired
}

export default ListIndex;
