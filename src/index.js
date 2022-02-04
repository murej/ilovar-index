import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import GoogleSpreadsheetStore from './google-spreadsheet-store';

import 'reset-css/reset.css';
import './index.css';

import ScrollToTop from './components/ScrollToTop';
import App from './components/App';
import Pinboard from './components/Pinboard';
import ListIndex from './components/ListIndex';

const store = new GoogleSpreadsheetStore();

store.getSpreadsheet('1SJy-kAc4Ypse51x5LHs2Z0Cols4pZ642c0A3slzlKys', process.env.GOOGLE_API_KEY)
     .then((entries) => render(entries));

function render(entries) {
  ReactDOM.render(
    <Router>
      <ScrollToTop>
        <App>
          <Route exact path="/" render={props => <Pinboard entries={entries} {...props} />} />
          <Route path="/index" render={props => <ListIndex entries={entries} {...props} />} />
        </App>
      </ScrollToTop>
    </Router>,
    document.getElementById('root')
  );
}
