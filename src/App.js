import React, { Component } from 'react';
import GoogleSpreadsheetStore from './google-spreadsheet-store';
import { url } from 'is_js';
import './App.css';

const store = new GoogleSpreadsheetStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    store.getSpreadsheet('1SJy-kAc4Ypse51x5LHs2Z0Cols4pZ642c0A3slzlKys')
         .then((data) => this.setState({ data: data }));
  }
  render() {
    const { data } = this.state;

    if(data === null) {
      return false;
    }

    const collection = data.rows;
    const entries = collection.map((entry, i) => {
      const name = entry.name;
      const imageUrl = url(entry.image) ? entry.image : false;

      return (
        <div key={i}>
          {entry.name}
          {imageUrl && <img src={imageUrl} />}
        </div>
      );
    })

    return (
      <div className="App">
        {entries}
      </div>
    );
  }
}

export default App;
