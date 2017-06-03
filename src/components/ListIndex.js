import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _keyBy from 'lodash/keyBy';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import human from 'humanparser';
import './ListIndex.css';

import Header from './Header';
import SortableList from './SortableList';

class ListIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBased: false,
      image: null
    }

    this.toggleBased = this.toggleBased.bind(this);
    this.hideImage = this.hideImage.bind(this);
    this._onItemMouseEnter = this._onItemMouseEnter.bind(this);
    this._onItemMouseLeave = this._onItemMouseLeave.bind(this);
  }
  getAZ() {
    const entriesWithAlphabet = this.props.entries.map((entry) => {
      const { lastname } = entry;

      let firstUppercasePosition = 0;
      for(let i=0; i < lastname.length; i++) {
        if(lastname[i].match(/[A-Z]/) != null) {
          firstUppercasePosition = i;
          break;
        }
      }

      entry.aToZ = lastname.charAt(firstUppercasePosition).normalize('NFKD');
      return entry;
    });

    return (
      <SortableList
        title="A–Z ⇅"
        items={entriesWithAlphabet}
        groupBy='aToZ'
        sortItemsBy='lastname'
        onItemMouseEnter={this._onItemMouseEnter}
        onItemMouseLeave={this._onItemMouseLeave}
      />
    );
  }
  getGenerations() {
    const entriesWithDecades = this.props.entries.map((entry) => {
      const decade = entry.born.substr(0, 3) + '0';
      const isValidDecade = !isNaN(parseInt(decade, 10));
      entry.decade = isValidDecade ? `${decade}s` : 'Unknown';
      return entry;
    });

    return (
      <SortableList
        title="Generation ⇅"
        items={entriesWithDecades}
        groupBy='decade'
        sortItemsBy='born'
        onItemMouseEnter={this._onItemMouseEnter}
        onItemMouseLeave={this._onItemMouseLeave}
      />
    );
  }
  getBasedNationality() {
    const { entries } = this.props;
    const { showBased } = this.state;

    const based =
      <SortableList
        title="Based ⇄ Nationality"
        items={entries}
        groupBy='based'
        sortItemsBy='lastname'
        onTitleClick={this.toggleBased}
        onItemMouseEnter={this._onItemMouseEnter}
        onItemMouseLeave={this._onItemMouseLeave}
      />;

    const nationality =
      <SortableList
        title="Nationality ⇄ Based"
        items={entries}
        groupBy='nationality'
        sortItemsBy='lastname'
        onTitleClick={this.toggleBased}
        onItemMouseEnter={this._onItemMouseEnter}
        onItemMouseLeave={this._onItemMouseLeave}
      />;

    return showBased ? based : nationality;
  }
  getFields() {
    const { entries } = this.props;

    const fixedEntries = [];
    entries.forEach((entry) => {
      const hasSeparator = entry.field.indexOf(',') !== -1;
      if(hasSeparator) {
        const fieldTags = entry.field.split(',');
        fieldTags.forEach((tag) => {
          let fixedEntry = Object.assign({}, entry);
          fixedEntry.field = tag;
          fixedEntries.push(fixedEntry);
        });
      } else {
        fixedEntries.push(entry);
      }
    });
    return (
      <SortableList
        title="Field ⇅"
        items={fixedEntries}
        groupBy='field'
        sortItemsBy='lastname'
        onItemMouseEnter={this._onItemMouseEnter}
        onItemMouseLeave={this._onItemMouseLeave}
      />
    );

  }
  hideImage() {
    this.setState({ image: null });
  }
  componentWillMount() {
    document.addEventListener('click', this.hideImage);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.hideImage);
  }
  render() {
    const { entries } = this.props;
    const { image } = this.state;

    const imageContainerClassName = image && cx({
      "ListIndex-ImageContainer": true,
      "ListIndex-ImageContainer--left": !image.isRight,
      "ListIndex-ImageContainer--right": image.isRight,
    });

    return (
      <div className="ListIndex">
        <Header />
        {image &&
          <div className={imageContainerClassName} onMouseEnter={() => this.setState({ image: null })}>
            <img
              className="ListIndex-Image"
              src={image.url}
            />
          </div>
        }
        <div className="ListIndex-Column">
          {this.getAZ()}
        </div>
        <div className="ListIndex-Column">
          {this.getGenerations()}
        </div>
        <div className="ListIndex-Column">
          {this.getBasedNationality()}
        </div>
        <div className="ListIndex-Column">
          {this.getFields()}
        </div>
      </div>
    );
  }
  toggleBased() {
    this.setState({
      showBased: !this.state.showBased
    })
  }
  _onItemMouseEnter(image) {
    this.setState({
      image: image
    })
  }
  _onItemMouseLeave() {

  }
}

ListIndex.propTypes = {
  entries: PropTypes.array.isRequired
}

export default ListIndex;
