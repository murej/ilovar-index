import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import GoogleSpreadsheetStore from './google-spreadsheet-store';

import './index.css';

import App from './components/App';
import Pinboard from './components/Pinboard';
import ListIndex from './components/ListIndex';

const store = new GoogleSpreadsheetStore();

store.getSpreadsheet('1SJy-kAc4Ypse51x5LHs2Z0Cols4pZ642c0A3slzlKys')
     .then((entries) => render(entries));

function render(entries) {
  const routes = (
    <App>
      <Route exact path="/" render={props => <Pinboard entries={entries} {...props} />} />
      <Route path="/index" render={props => <ListIndex entries={entries} {...props} />} />
    </App>
  );

  ReactDOM.render(
    <Router>
      {routes}
    </Router>,
    document.getElementById('root')
  );
}
