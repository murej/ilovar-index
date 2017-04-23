import React, { Component } from 'react';
import GoogleSpreadsheetStore from '../google-spreadsheet-store';
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

    if(data === null)
      return false;

    const collection = data.rows;
    const entries = collection.map((entry, i) => {
      const { firstname, lastname, born, nationality, based, image } = entry;

      const title = `${firstname} ${lastname} (b. ${born} ${nationality}, w. ${based})`;
      const imageUrl = url(image) ? image : false;

      const searchUrl = `https://www.google.com/search?q=${firstname}+${lastname}&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiDr9X5sLnTAhXJaFAKHR64DrkQ_AUICCgB&biw=1625&bih=948`;

      return (
        <div className="Entry" key={i}>
          {imageUrl && <img src={imageUrl} alt={`${firstname} ${lastname}`}/>}
          <h2><a href={searchUrl} target="_blank">{title}</a></h2>
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
